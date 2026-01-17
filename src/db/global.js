/**
 * 全局数据库 (GlobalDB)
 * 存储用户、账本列表等元数据
 * 对应 Phase 8 规划
 */

import { openDB, deleteDB } from 'idb'

// ... (existing code)

export async function deleteBook(id) {
    const db = await initGlobalDB()
    const book = await db.get('books', id)
    if (book) {
        // Warning: deleteDB is destructive.
        // It returns a promise that resolves when deleted.
        // We delete the specific book's DB.
        try {
            await deleteDB(book.dbName)
        } catch (e) {
            console.error('Failed to delete physical DB', e)
        }
        await db.delete('books', id)
    }
}

const DB_NAME = 'GlobalDB'
const DB_VERSION = 1

let db = null

export async function initGlobalDB() {
    if (db) return db

    db = await openDB(DB_NAME, DB_VERSION, {
        upgrade(database) {
            // 用户表
            if (!database.objectStoreNames.contains('users')) {
                const userStore = database.createObjectStore('users', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                userStore.createIndex('username', 'username', { unique: true })
            }

            // 账本表
            if (!database.objectStoreNames.contains('books')) {
                const bookStore = database.createObjectStore('books', {
                    keyPath: 'id',
                    autoIncrement: true
                })
                bookStore.createIndex('ownerId', 'ownerId')
            }
        }
    })

    return db
}

export function getGlobalDB() {
    if (!db) throw new Error('GlobalDB not initialized')
    return db
}

// 密码哈希工具函数 (使用 Web Crypto API)
async function hashPassword(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// User Actions
// User Actions
export async function registerUser(username, password, avatar = null) {
    const db = await initGlobalDB()

    // 1. 先进行密码哈希（耗时操作，必须在数据库操作前完成）
    const hashedPassword = await hashPassword(password)

    // 2. 检查用户是否存在 (原子操作)
    const existing = await db.getFromIndex('users', 'username', username)
    if (existing) throw new Error('用户名已存在')

    // 3. 创建用户 (原子操作)
    const user = {
        username,
        password: hashedPassword,
        avatar: avatar || null,
        created_at: new Date().toISOString()
    }
    const id = await db.add('users', user)

    // 4. 为用户创建默认账本 (独立操作)
    // createBook 内部会自己处理事务
    const bookId = await createBook(id, '默认账本')

    // 5. 更新用户关联的账本ID (原子操作)
    const userWithBook = { ...user, id, currentBookId: bookId }
    await db.put('users', userWithBook)

    return userWithBook
}

export async function loginUser(username, password) {
    const db = await initGlobalDB()
    const user = await db.getFromIndex('users', 'username', username)
    const hashedPassword = await hashPassword(password)
    if (!user || user.password !== hashedPassword) {
        throw new Error('用户名或密码错误')
    }
    return user
}

// Book Actions
export async function createBook(userId, name, dbName = null) {
    const db = await initGlobalDB()
    const book = {
        ownerId: userId,
        name,
        created_at: new Date().toISOString(),
        cover: '📘', // Default cover
        dbName: dbName || `QuickBook_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
    }
    return await db.add('books', book)
}

export async function getUserBooks(userId) {
    const db = await initGlobalDB()
    return await db.getAllFromIndex('books', 'ownerId', userId)
}
