/**
 * database.js - IndexedDB 数据库初始化与管理
 * 
 * 版本历史:
 * ┌─────────┬──────────────────────────────────────────────────────────────┐
 * │ Version │ Changes                                                      │
 * ├─────────┼──────────────────────────────────────────────────────────────┤
 * │ V1      │ 初始版本 - transactions, categories, tags, persons, photos   │
 * │ V2      │ 添加 accounts, budgets, projects, merchants                  │
 * │ V3      │ 添加 recurring_rules (周期记账)                               │
 * │ V4      │ 添加 templates (模板)                                        │
 * │ V5      │ 添加 subCategories, transactions 增加 subCategoryId 索引     │
 * └─────────┴──────────────────────────────────────────────────────────────┘
 */

import { openDB } from 'idb'

const DEFAULT_DB_NAME = 'QuickBookDB'
const DB_VERSION = 8

let db = null
let currentDbName = null


/**
 * 初始化数据库
 * @param {string} dbName - 数据库名称 (用于多账本)
 */
export async function initDB(dbName = DEFAULT_DB_NAME) {
    if (db && currentDbName === dbName) return db

    if (db) {
        db.close()
        db = null
    }

    currentDbName = dbName
    db = await openDB(dbName, DB_VERSION, {
        upgrade(database, oldVersion, newVersion, transaction) {
            // V6 Migration: Add 'synced' index to all tables
            if (oldVersion < 6) {
                const stores = ['transactions', 'accounts', 'categories', 'tags', 'persons']
                for (const storeName of stores) {
                    if (database.objectStoreNames.contains(storeName)) {
                        const store = transaction.objectStore(storeName)
                        if (!store.indexNames.contains('synced')) {
                            store.createIndex('synced', 'synced')
                        }
                    }
                }
            }

            // 账目表
            if (!database.objectStoreNames.contains('transactions')) {
                const transactionStore = database.createObjectStore('transactions', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                transactionStore.createIndex('date', 'date')
                transactionStore.createIndex('type', 'type')
                transactionStore.createIndex('categoryId', 'categoryId')
                transactionStore.createIndex('personId', 'personId')
                transactionStore.createIndex('accountId', 'accountId')
                transactionStore.createIndex('projectId', 'projectId')
                transactionStore.createIndex('subCategoryId', 'subCategoryId')
                transactionStore.createIndex('synced', 'synced')
            }

            // 分类表
            if (!database.objectStoreNames.contains('categories')) {
                const categoryStore = database.createObjectStore('categories', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                categoryStore.createIndex('type', 'type')
                categoryStore.createIndex('synced', 'synced')

                // 添加默认分类（带分组）
                const defaultCategories = [
                    // 食品酒水
                    { name: '伙食费', icon: '🍜', color: '#FF6B6B', type: 'expense', group: 'food' },
                    { name: '水果', icon: '🍎', color: '#FFB6B9', type: 'expense', group: 'food' },
                    { name: '餐饮', icon: '🍔', color: '#FFE66D', type: 'expense', group: 'food' },
                    { name: '零食', icon: '🍪', color: '#95E1D3', type: 'expense', group: 'food' },
                    { name: '饮料酒水', icon: '🥤', color: '#4ECDC4', type: 'expense', group: 'food' },
                    { name: '买菜', icon: '🥬', color: '#A8D8EA', type: 'expense', group: 'food' },
                    { name: '外出美食', icon: '🍱', color: '#AA96DA', type: 'expense', group: 'food' },
                    { name: '早餐', icon: '🥐', color: '#FCBAD3', type: 'expense', group: 'food' },
                    { name: '中餐', icon: '🍚', color: '#F38181', type: 'expense', group: 'food' },
                    { name: '晚餐', icon: '🍲', color: '#FAE3D9', type: 'expense', group: 'food' },
                    // 居家生活
                    { name: '房租', icon: '🏠', color: '#F38181', type: 'expense', group: 'living' },
                    { name: '物业费', icon: '🏢', color: '#AA96DA', type: 'expense', group: 'living' },
                    { name: '水电燃气', icon: '💡', color: '#4ECDC4', type: 'expense', group: 'living' },
                    { name: '电视费', icon: '📺', color: '#FFE66D', type: 'expense', group: 'living' },
                    { name: '快递费', icon: '📦', color: '#95E1D3', type: 'expense', group: 'living' },
                    // 行车交通
                    { name: '地铁', icon: '🚇', color: '#4ECDC4', type: 'expense', group: 'transport' },
                    { name: '公交', icon: '🚌', color: '#95E1D3', type: 'expense', group: 'transport' },
                    { name: '打车', icon: '🚕', color: '#FFE66D', type: 'expense', group: 'transport' },
                    { name: '停车', icon: '🅿️', color: '#AA96DA', type: 'expense', group: 'transport' },
                    { name: '保险', icon: '🛡️', color: '#F38181', type: 'expense', group: 'transport' },
                    // 休闲娱乐
                    { name: '娱乐', icon: '🎮', color: '#95E1D3', type: 'expense', group: 'entertainment' },
                    { name: '购物', icon: '🛒', color: '#FFE66D', type: 'expense', group: 'entertainment' },
                    // 收入分类
                    { name: '工资收入', icon: '💰', color: '#4ECDC4', type: 'income', group: 'salary' },
                    { name: '奖金', icon: '💸', color: '#FFE66D', type: 'income', group: 'salary' },
                    { name: '兼职收入', icon: '💼', color: '#95E1D3', type: 'income', group: 'parttime' },
                    { name: '理财收益', icon: '📈', color: '#FF6B6B', type: 'income', group: 'invest' },
                    { name: '礼金收入', icon: '🧧', color: '#F38181', type: 'income', group: 'other' }
                ]

                defaultCategories.forEach(cat => {
                    transaction.objectStore('categories').add(cat)
                })
            }

            // 标签表
            if (!database.objectStoreNames.contains('tags')) {
                const tagStore = database.createObjectStore('tags', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                tagStore.createIndex('synced', 'synced')

                const defaultTags = [
                    { name: '日常', color: '#4ECDC4' },
                    { name: '必要', color: '#FF6B6B' },
                    { name: '节日', color: '#FFE66D' },
                    { name: '冲动消费', color: '#AA96DA' }
                ]

                defaultTags.forEach(tag => {
                    transaction.objectStore('tags').add(tag)
                })
            }

            // 人员/成员表
            if (!database.objectStoreNames.contains('persons')) {
                const personStore = database.createObjectStore('persons', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                personStore.createIndex('synced', 'synced')

                const defaultPersons = [
                    { name: '我', avatar: '👤' },
                    { name: '家人', avatar: '👨‍👩‍👧' }
                ]

                defaultPersons.forEach(person => {
                    transaction.objectStore('persons').add(person)
                })
            }

            // 照片表
            if (!database.objectStoreNames.contains('photos')) {
                const photoStore = database.createObjectStore('photos', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                photoStore.createIndex('transactionId', 'transactionId')
                photoStore.createIndex('synced', 'synced')
            }

            // Account Store (Added in V2)
            if (!database.objectStoreNames.contains('accounts')) {
                const accountStore = database.createObjectStore('accounts', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                accountStore.createIndex('synced', 'synced')

                const defaultAccounts = [
                    { name: '现金', icon: '💵', type: 'cash', balance: 0, color: '#4ECDC4' },
                    { name: '银行卡', icon: '💳', type: 'bank', balance: 0, color: '#5C7AEA' },
                    { name: '支付宝', icon: '📱', type: 'alipay', balance: 0, color: '#1677FF' },
                    { name: '微信', icon: '💬', type: 'wechat', balance: 0, color: '#07C160' }
                ]

                defaultAccounts.forEach(account => {
                    transaction.objectStore('accounts').add(account)
                })
            }

            // Budget Store (Added in V2)
            if (!database.objectStoreNames.contains('budgets')) {
                const budgetStore = database.createObjectStore('budgets', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                budgetStore.createIndex('categoryId', 'categoryId')
                budgetStore.createIndex('month', 'month')
                budgetStore.createIndex('synced', 'synced')
            }

            // Project Store (Added in V2)
            if (!database.objectStoreNames.contains('projects')) {
                const projectStore = database.createObjectStore('projects', {
                    keyPath: 'id',
                    autoIncrement: true
                })

                const defaultProjects = [
                    { name: '日常生活', icon: '🏠', color: '#4ECDC4', isDefault: true },
                    { name: '旅行', icon: '✈️', color: '#FFE66D', isDefault: false }
                ]

                defaultProjects.forEach(project => {
                    transaction.objectStore('projects').add(project)
                })
            }

            // Merchant Store (Added in V2)
            if (!database.objectStoreNames.contains('merchants')) {
                const merchantStore = database.createObjectStore('merchants', {
                    keyPath: 'id',
                    autoIncrement: true
                })
            }

            // Recurring Rules Store (Added in V3)
            if (!database.objectStoreNames.contains('recurring_rules')) {
                const recurringStore = database.createObjectStore('recurring_rules', {
                    keyPath: 'id',
                    autoIncrement: true
                })
            }

            // Templates Store (Added in V4)
            if (!database.objectStoreNames.contains('templates')) {
                const templateStore = database.createObjectStore('templates', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                templateStore.createIndex('type', 'type')
                templateStore.createIndex('synced', 'synced')

                // 添加默认模板 (空)
                const defaultTemplates = []

                defaultTemplates.forEach(t => {
                    transaction.objectStore('templates').add(t)
                })
            }

            // SubCategories Store (Added in V5)
            if (!database.objectStoreNames.contains('subCategories')) {
                const subStore = database.createObjectStore('subCategories', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                subStore.createIndex('categoryId', 'categoryId')
                subStore.createIndex('synced', 'synced')

                const defaultSubCats = [
                    // 餐饮类子分类样例
                    { categoryId: 1, name: '午餐' },
                    { categoryId: 1, name: '晚餐' },
                    { categoryId: 1, name: '外卖' },
                    { categoryId: 1, name: '零食' },
                    // 交通类子分类样例
                    { categoryId: 11, name: '地铁' },
                    { categoryId: 11, name: '打车' }
                ]
                defaultSubCats.forEach(s => subStore.add(s))
            }

            // V7 Migration: Add system_stats store (2026-01-17)
            if (!database.objectStoreNames.contains('system_stats')) {
                const statsStore = database.createObjectStore('system_stats', {
                    keyPath: 'key'
                })
                // Initialize global stats
                statsStore.add({ key: 'global', income: 0, expense: 0 })
            }

            // V8 Migration: Ensure 'date' index exists (Performance Fix)
            if (oldVersion < 8) {
                if (database.objectStoreNames.contains('transactions')) {
                    const txStore = transaction.objectStore('transactions')
                    if (!txStore.indexNames.contains('date')) {
                        txStore.createIndex('date', 'date')
                    }
                    if (!txStore.indexNames.contains('categoryId')) {
                        txStore.createIndex('categoryId', 'categoryId')
                    }
                    if (!txStore.indexNames.contains('type')) {
                        txStore.createIndex('type', 'type')
                    }
                }
            }
        }
    })
    return db
}

/**
 * 获取数据库实例
 */
/**
 * 关闭数据库连接
 */
export function closeDB() {
    if (db) {
        db.close()
        db = null
        currentDbName = null
    }
}

/**
 * 获取数据库实例
 */
export function getDB() {
    if (!db) {
        throw new Error('数据库未初始化')
    }
    return db
}

/**
 * 清空当前账本的主要数据 (保留配置)
 * 重置所有账户余额为0，并重置累计统计
 */
export async function clearCurrentBookData() {
    const db = getDB()
    const stores = ['transactions', 'photos', 'accounts']
    if (db.objectStoreNames.contains('system_stats')) {
        stores.push('system_stats')
    }

    const tx = db.transaction(stores, 'readwrite')

    // 1. 清空交易、照片
    await Promise.all([
        tx.objectStore('transactions').clear(),
        tx.objectStore('photos').clear()
    ])

    // 2. 重置账户余额
    const accountStore = tx.objectStore('accounts')
    const accounts = await accountStore.getAll()
    for (const account of accounts) {
        account.balance = 0
        await accountStore.put(account)
    }

    // 3. 重置累计统计 (Fix: 解决用户反馈的数据清空后累计还在的问题)
    if (db.objectStoreNames.contains('system_stats')) {
        const statsStore = tx.objectStore('system_stats')
        await statsStore.clear()
        await statsStore.put({ key: 'global', income: 0, expense: 0 })
    }

    await tx.done
}

export default { initDB, getDB, clearCurrentBookData }
