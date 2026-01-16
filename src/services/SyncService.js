/**
 * SyncService.js
 * 负责处理本地 IndexedDB 和云端 Supabase 之间的数据同步
 * 
 * 核心逻辑：
 * 1. Push: 查找本地未同步 (synced=0) 的数据 -> 上传 -> 标记为已同步
 * 2. Pull: 查找云端 > last_pulled_at 的数据 -> 下载 -> 合并到本地 -> 更新 last_pulled_at
 */

import { getDB } from '../db/database'
import {
    getAllTransactions, updateTransaction,
    getAllAccounts, updateAccount,
    getAllCategories, updateCategory,
    getAllTags, updateTag,
    getAllPersons, updatePerson
} from '../db/stores'

// 模拟 Supabase 客户端 (因为没有实际 Key)
const mockSupabase = {
    from: (table) => ({
        upsert: async (data, options) => {
            // console.log(`[MockSupabase] Upserting to ${table}:`, data.length)
            await new Promise(r => setTimeout(r, 500))
            return { error: null }
        },
        select: (query) => ({
            gt: (field, value) => ({
                order: (field, direction) => {
                    // console.log(`[MockSupabase] Selecting from ${table} where ${field} > ${value}`)
                    return Promise.resolve({ data: [], error: null }) // 模拟暂无云端更新
                }
            })
        })
    })
}

const supabase = mockSupabase // 替换为真实 supabase 客户端

// 表映射
const TABLES = [
    { name: 'transactions', store: 'transactions' },
    { name: 'accounts', store: 'accounts' },
    { name: 'categories', store: 'categories' },
    { name: 'tags', store: 'tags' },
    { name: 'persons', store: 'persons' }
]

export const SyncService = {
    // 执行全量同步
    sync: async () => {
        try {
            console.log('[Sync] Starting sync...')
            await SyncService.push()
            await SyncService.pull()
            console.log('[Sync] Sync completed.')
            return { success: true }
        } catch (e) {
            console.error('[Sync] Error:', e)
            return { success: false, error: e.message }
        }
    },

    // 推送本地变更到云端
    push: async () => {
        const db = getDB()
        for (const table of TABLES) {
            // 1. 获取未同步数据
            // 注意：store.getAll 是获取所有，我们需要过滤 synced=0
            // 性能优化：应该在 DB 建索引，但这里简单起见遍历过滤
            const allItems = await db.getAll(table.store)
            const dirtyItems = allItems.filter(item => item.synced === 0)

            if (dirtyItems.length === 0) continue

            console.log(`[Sync] Pushing ${dirtyItems.length} items to ${table.name}`)

            // 2. 批量上传
            const { error } = await supabase
                .from(table.name)
                .upsert(dirtyItems.map(item => ({
                    ...item,
                    updated_at: new Date(item.updatedAt).toISOString() // 转换格式适配 SQL
                })), { onConflict: 'id' })

            if (error) throw new Error(`Push failed for ${table.name}: ${error.message}`)

            // 3. 标记本地为已同步
            // 注意：由于没有批量更新状态的接口，只能循环 update
            // 但这里我们要小心，不要修改 updatedAt 否则会再次触发 push
            // 直接操作底层的 put (绕过 store 的 update逻辑以避免更改 updatedAt)
            const tx = db.transaction(table.store, 'readwrite')
            for (const item of dirtyItems) {
                // 读取最新状态 (防止并发修改)
                const current = await tx.store.get(item.id)
                if (current) {
                    await tx.store.put({ ...current, synced: 1 })
                }
            }
            await tx.done
        }
    },

    // 拉取云端变更到本地
    pull: async () => {
        const lastPulledAt = localStorage.getItem('last_pulled_at') || '1970-01-01T00:00:00.000Z'
        const now = new Date().toISOString()

        for (const table of TABLES) {
            // 1. 获取云端更新
            const { data, error } = await supabase
                .from(table.name)
                .select('*')
                .gt('updated_at', lastPulledAt)

            if (error) throw new Error(`Pull failed for ${table.name}: ${error.message}`)
            if (!data || data.length === 0) continue

            console.log(`[Sync] Pulled ${data.length} items for ${table.name}`)

            // 2. 合并到本地
            const db = getDB()
            const tx = db.transaction(table.store, 'readwrite')
            for (const remoteItem of data) {
                // 转换 remote 格式回 local
                const localItem = {
                    ...remoteItem,
                    synced: 1 // 来自云端的数据当然是已同步的
                }

                // 冲突解决：Last Write Wins based on updatedAt
                const current = await tx.store.get(localItem.id)
                if (current && current.updatedAt > new Date(remoteItem.updated_at).getTime()) {
                    // 本地更新，忽略云端 (或者应该保留本地 dirty?)
                    continue
                }

                await tx.store.put(localItem)
            }
            await tx.done
        }

        // 更新同步时间
        localStorage.setItem('last_pulled_at', now)
    }
}
