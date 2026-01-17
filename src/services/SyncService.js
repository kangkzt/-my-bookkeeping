/**
 * SyncService.js - 云端同步服务
 * 
 * 功能:
 * 1. Push: 本地未同步数据 → 上传到 Supabase
 * 2. Pull: 云端更新 → 下载到本地 IndexedDB
 * 3. 冲突解决: Last-Write-Wins 策略
 */

import { getDB } from '../db/database'
import { supabase, isSupabaseConfigured, getCurrentUser } from './supabaseClient'
import { secureStorage } from '../utils/secureStorage'
import { logger } from '../utils/logger'

// 设备 ID (用于区分多设备同步)
const getDeviceId = () => {
    let deviceId = secureStorage.get('device_id')
    if (!deviceId) {
        deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        secureStorage.set('device_id', deviceId)
    }
    return deviceId
}

// 表映射配置
const TABLES = [
    { name: 'transactions', store: 'transactions', idField: 'id' },
    { name: 'accounts', store: 'accounts', idField: 'id' },
    { name: 'categories', store: 'categories', idField: 'id' },
    { name: 'tags', store: 'tags', idField: 'id' },
    { name: 'persons', store: 'persons', idField: 'id' }
]

// 批量操作大小限制 (提升至 200 以平衡速度与稳定性)
const BATCH_SIZE = 200

/**
 * 同步服务对象
 */
export const SyncService = {
    /**
     * 检查同步是否可用
     */
    isAvailable: () => {
        return isSupabaseConfigured() && supabase !== null
    },

    /**
     * 获取当前同步状态
     */
    getStatus: () => {
        return {
            configured: isSupabaseConfigured(),
            lastSyncAt: secureStorage.get('last_sync_at'),
            lastPullAt: secureStorage.get('last_pulled_at'),
            deviceId: getDeviceId()
        }
    },

    /**
     * 执行完整同步 (Push + Pull)
     */
    sync: async (onProgress = () => { }) => {
        if (!SyncService.isAvailable()) {
            return { success: false, error: 'Supabase 未配置' }
        }

        const user = await getCurrentUser()
        if (!user) {
            return { success: false, error: '请先登录云端账号' }
        }

        try {
            logger.log('[Sync] Starting sync...')
            onProgress({ phase: 'push', progress: 0 })

            // 1. Push 本地变更
            const pushResult = await SyncService.push(user.id, (p) => {
                onProgress({ phase: 'push', progress: p })
            })

            onProgress({ phase: 'pull', progress: 0 })

            // 2. Pull 云端变更
            const pullResult = await SyncService.pull(user.id, (p) => {
                onProgress({ phase: 'pull', progress: p })
            })

            // 更新同步时间
            const now = new Date().toISOString()
            secureStorage.set('last_sync_at', now)

            logger.log('[Sync] Sync completed.')
            onProgress({ phase: 'done', progress: 100 })

            return {
                success: true,
                pushed: pushResult.count,
                pulled: pullResult.count,
                syncedAt: now
            }
        } catch (e) {
            logger.error('[Sync] Error:', e)
            return { success: false, error: e.message }
        }
    },

    /**
     * 推送本地变更到云端
     */
    push: async (userId, onProgress = () => { }) => {
        const db = getDB()
        const deviceId = getDeviceId()
        let totalPushed = 0

        for (let i = 0; i < TABLES.length; i++) {
            const table = TABLES[i]

            // 获取未同步数据
            const allItems = await db.getAll(table.store)
            const dirtyItems = allItems.filter(item => item.synced === 0 && !item.isDeleted)

            if (dirtyItems.length === 0) {
                onProgress(((i + 1) / TABLES.length) * 100)
                continue
            }

            logger.log(`[Sync] Pushing ${dirtyItems.length} items to ${table.name}`)

            // 分批上传
            for (let j = 0; j < dirtyItems.length; j += BATCH_SIZE) {
                const batch = dirtyItems.slice(j, j + BATCH_SIZE)

                // 转换为云端格式 (删除 camelCase 字段，只保留 snake_case)
                const cloudData = batch.map(item => {
                    // 数据清洗：修复非法交易类型 (针对 Supabase CHECK 约束)
                    if (table.name === 'transactions') {
                        const validTypes = ['expense', 'income', 'transfer']
                        // 某些导入数据可能包含 'balance' 或其他类型，需强制转换
                        if (item.type && !validTypes.includes(item.type)) {
                            const originalType = item.type
                            const amount = Number(item.amount) || 0

                            // 修正策略：根据金额正负归类为收入或支出
                            if (amount >= 0) item.type = 'income'
                            else item.type = 'expense'

                            // 在备注中记录
                            const fixNote = `[系统修正:原类型${originalType}]`
                            if (!item.remark || !item.remark.includes('系统修正')) {
                                item.remark = (item.remark || '') + ' ' + fixNote
                            }
                        }
                    }

                    // 创建云端格式数据
                    const cloud = {
                        id: item.id,
                        user_id: userId,
                        device_id: deviceId,
                        updated_at: new Date(item.updatedAt || Date.now()).toISOString(),
                        // 通用字段
                        type: item.type,
                        amount: item.amount,
                        name: item.name,
                        icon: item.icon,
                        color: item.color,
                        remark: item.remark,
                        date: item.date,
                        merchant: item.merchant,
                        project: item.project,
                        balance: item.balance,
                        // snake_case 转换
                        category_id: item.categoryId,
                        account_id: item.accountId,
                        to_account_id: item.toAccountId,
                        person_id: item.personId,
                        sub_category: item.subCategory,
                        balance_type: item.balanceType,
                        is_deleted: item.isDeleted || 0,
                        sort_order: item.sortOrder,
                        synced: 1
                    }
                    // 移除 undefined 值
                    Object.keys(cloud).forEach(key => {
                        if (cloud[key] === undefined) delete cloud[key]
                    })
                    return cloud
                })

                // 上传到 Supabase (使用默认主键冲突检测)
                const { error } = await supabase
                    .from(table.name)
                    .upsert(cloudData)

                if (error) {
                    logger.error(`[Sync] Push error for ${table.name}:`, error)
                    // 如果是表不存在错误，跳过
                    if (error.code === '42P01') {
                        logger.warn(`[Sync] Table ${table.name} does not exist, skipping...`)
                        continue
                    }
                    throw new Error(`Push failed for ${table.name}: ${error.message}`)
                }

                // 标记本地为已同步
                const tx = db.transaction(table.store, 'readwrite')
                for (const item of batch) {
                    const current = await tx.store.get(item.id)
                    if (current) {
                        await tx.store.put({ ...current, synced: 1 })
                    }
                }
                await tx.done

                totalPushed += batch.length
            }

            onProgress(((i + 1) / TABLES.length) * 100)
        }

        return { count: totalPushed }
    },

    /**
     * 拉取云端变更到本地
     */
    pull: async (userId, onProgress = () => { }) => {
        const lastPulledAt = secureStorage.get('last_pulled_at') || '1970-01-01T00:00:00.000Z'
        const now = new Date().toISOString()
        const deviceId = getDeviceId()
        let totalPulled = 0

        for (let i = 0; i < TABLES.length; i++) {
            const table = TABLES[i]

            try {
                // 获取云端更新 (排除自己设备的数据)
                const { data, error } = await supabase
                    .from(table.name)
                    .select('*')
                    .eq('user_id', userId)
                    .neq('device_id', deviceId)
                    .gt('updated_at', lastPulledAt)
                    .order('updated_at', { ascending: true })

                if (error) {
                    // 表不存在，跳过
                    if (error.code === '42P01') {
                        logger.warn(`[Sync] Table ${table.name} does not exist, skipping...`)
                        onProgress(((i + 1) / TABLES.length) * 100)
                        continue
                    }
                    throw error
                }

                if (!data || data.length === 0) {
                    onProgress(((i + 1) / TABLES.length) * 100)
                    continue
                }

                logger.log(`[Sync] Pulled ${data.length} items for ${table.name}`)

                // 合并到本地
                const db = getDB()
                const tx = db.transaction(table.store, 'readwrite')

                for (const remoteItem of data) {
                    // 转换为本地格式 (snake_case -> camelCase)
                    const localItem = {
                        ...remoteItem,
                        categoryId: remoteItem.category_id,
                        accountId: remoteItem.account_id,
                        toAccountId: remoteItem.to_account_id,
                        personId: remoteItem.person_id,
                        subCategory: remoteItem.sub_category,
                        balanceType: remoteItem.balance_type,
                        isDeleted: remoteItem.is_deleted,
                        updatedAt: new Date(remoteItem.updated_at).getTime(),
                        synced: 1
                    }

                    // 删除云端专用字段
                    delete localItem.user_id
                    delete localItem.device_id
                    delete localItem.updated_at
                    delete localItem.category_id
                    delete localItem.account_id
                    delete localItem.to_account_id
                    delete localItem.person_id
                    delete localItem.sub_category
                    delete localItem.balance_type
                    delete localItem.is_deleted

                    // 冲突解决: Last-Write-Wins
                    const current = await tx.store.get(localItem.id)
                    if (current) {
                        const currentUpdatedAt = current.updatedAt || 0
                        const remoteUpdatedAt = localItem.updatedAt

                        if (currentUpdatedAt > remoteUpdatedAt) {
                            // 本地更新，保持本地数据但标记为需要同步
                            continue
                        }
                    }

                    await tx.store.put(localItem)
                    totalPulled++
                }

                await tx.done
            } catch (e) {
                logger.error(`[Sync] Pull error for ${table.name}:`, e)
                // 继续处理其他表
            }

            onProgress(((i + 1) / TABLES.length) * 100)
        }

        // 更新拉取时间
        secureStorage.set('last_pulled_at', now)

        return { count: totalPulled }
    },

    /**
     * 强制重置所有数据的同步状态为未同步 (0)
     * 用于解决数据不同步的问题
     */
    resetSyncState: async () => {
        const db = getDB()
        let count = 0

        for (const table of TABLES) {
            const items = await db.getAll(table.store)
            if (items.length > 0) {
                const tx = db.transaction(table.store, 'readwrite')
                const promises = []
                for (const item of items) {
                    item.synced = 0
                    promises.push(tx.store.put(item))
                }
                await Promise.all(promises)
                await tx.done
                count += items.length
            }
        }
        return count
    },

    /**
     * 仅推送
     */
    pushOnly: async () => {
        const user = await getCurrentUser()
        if (!user) return { success: false, error: '未登录' }
        return await SyncService.push(user.id)
    },

    /**
     * 仅拉取
     */
    pullOnly: async () => {
        const user = await getCurrentUser()
        if (!user) return { success: false, error: '未登录' }
        return await SyncService.pull(user.id)
    }
}

export default SyncService
