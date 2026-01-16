/**
 * stores.js - 数据存储操作 (IndexedDB 版本)
 * 提供对各种数据存储的 CRUD 操作
 */

import { getDB } from './database'

// ==================== Transactions ====================
export async function getAllTransactions() {
    const db = getDB()
    return await db.getAll('transactions')
}

export async function getTransactionsByDateRange(start, end) {
    const db = getDB()
    const all = await db.getAll('transactions')
    return all.filter(t => t.date >= start && t.date <= end)
}

export async function getTransactionsByMonth(year, month) {
    const start = new Date(year, month - 1, 1).toISOString()
    const end = new Date(year, month, 0, 23, 59, 59).toISOString()
    return getTransactionsByDateRange(start, end)
}

export async function addTransaction(transaction) {
    const db = getDB()
    const data = {
        ...transaction,
        updatedAt: Date.now(),
        isDeleted: 0,
        synced: 0
    }
    const id = await db.add('transactions', data)

    // Update Account Balance
    await updateAccountBalanceForTransaction({ ...data, id })

    return { ...data, id }
}

async function updateAccountBalanceForTransaction(transaction) {
    const db = getDB()
    const { type, amount, accountId, toAccountId } = transaction

    if (type === 'expense' && accountId) {
        const account = await db.get('accounts', accountId)
        if (account) {
            account.balance = (account.balance || 0) - amount
            await db.put('accounts', account)
        }
    } else if (type === 'income' && accountId) {
        const account = await db.get('accounts', accountId)
        if (account) {
            account.balance = (account.balance || 0) + amount
            await db.put('accounts', account)
        }
    } else if (type === 'transfer' && accountId && toAccountId) {
        const fromAcc = await db.get('accounts', accountId)
        const toAcc = await db.get('accounts', toAccountId)
        if (fromAcc) {
            fromAcc.balance = (fromAcc.balance || 0) - amount
            await db.put('accounts', fromAcc)
        }
        if (toAcc) {
            toAcc.balance = (toAcc.balance || 0) + amount
            await db.put('accounts', toAcc)
        }
    }
}

export async function updateTransaction(id, data) {
    const db = getDB()
    const existing = await db.get('transactions', id)
    if (existing) {
        // Reverse old balance effect
        await reverseAccountBalanceForTransaction(existing)

        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('transactions', updated)

        // Apply new balance effect
        await updateAccountBalanceForTransaction(updated)
        return updated
    }
}

async function reverseAccountBalanceForTransaction(transaction) {
    const db = getDB()
    const { type, amount, accountId, toAccountId } = transaction

    if (type === 'expense' && accountId) {
        const account = await db.get('accounts', accountId)
        if (account) {
            account.balance = (account.balance || 0) + amount
            await db.put('accounts', account)
        }
    } else if (type === 'income' && accountId) {
        const account = await db.get('accounts', accountId)
        if (account) {
            account.balance = (account.balance || 0) - amount
            await db.put('accounts', account)
        }
    } else if (type === 'transfer' && accountId && toAccountId) {
        const fromAcc = await db.get('accounts', accountId)
        const toAcc = await db.get('accounts', toAccountId)
        if (fromAcc) {
            fromAcc.balance = (fromAcc.balance || 0) + amount
            await db.put('accounts', fromAcc)
        }
        if (toAcc) {
            toAcc.balance = (toAcc.balance || 0) - amount
            await db.put('accounts', toAcc)
        }
    }
}

export async function deleteTransaction(id) {
    const db = getDB()
    const existing = await db.get('transactions', id)
    if (existing) {
        await reverseAccountBalanceForTransaction(existing)
        await db.delete('transactions', id)
    }
}

export async function deleteTransactions(ids) {
    for (const id of ids) {
        await deleteTransaction(id)
    }
}

export async function updateTransactions(ids, updates) {
    const db = getDB()
    for (const id of ids) {
        const existing = await db.get('transactions', id)
        if (existing) {
            await db.put('transactions', { ...existing, ...updates, updatedAt: Date.now() })
        }
    }
}

export async function getTransactionById(id) {
    const db = getDB()
    return await db.get('transactions', id)
}

export async function getTransactionsByYear(year) {
    const start = new Date(year, 0, 1).toISOString()
    const end = new Date(year, 11, 31, 23, 59, 59).toISOString()
    return getTransactionsByDateRange(start, end)
}

// ==================== Accounts ====================
export async function getAllAccounts() {
    const db = getDB()
    return await db.getAll('accounts')
}

export async function addAccount(account) {
    const db = getDB()
    const data = { ...account, updatedAt: Date.now(), isDeleted: 0 }
    const id = await db.add('accounts', data)
    return { ...data, id }
}

export async function updateAccount(id, data) {
    const db = getDB()
    const existing = await db.get('accounts', id)
    if (existing) {
        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('accounts', updated)
        return updated
    }
}

export async function deleteAccount(id) {
    const db = getDB()
    await db.delete('accounts', id)
}

// ==================== Categories ====================
export async function getAllCategories() {
    const db = getDB()
    return await db.getAll('categories')
}

export async function addCategory(category) {
    const db = getDB()
    const data = { ...category, updatedAt: Date.now(), isDeleted: 0 }
    const id = await db.add('categories', data)
    return { ...data, id }
}

export async function updateCategory(id, data) {
    const db = getDB()
    const existing = await db.get('categories', id)
    if (existing) {
        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('categories', updated)
        return updated
    }
}

export async function deleteCategory(id) {
    const db = getDB()
    await db.delete('categories', id)
}

// ==================== Tags ====================
export async function getAllTags() {
    const db = getDB()
    return await db.getAll('tags')
}

export async function addTag(tag) {
    const db = getDB()
    const data = { ...tag, updatedAt: Date.now(), isDeleted: 0 }
    const id = await db.add('tags', data)
    return { ...data, id }
}

export async function updateTag(id, data) {
    const db = getDB()
    const existing = await db.get('tags', id)
    if (existing) {
        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('tags', updated)
        return updated
    }
}

export async function deleteTag(id) {
    const db = getDB()
    await db.delete('tags', id)
}

// ==================== Persons ====================
export async function getAllPersons() {
    const db = getDB()
    return await db.getAll('persons')
}

export async function addPerson(person) {
    const db = getDB()
    const data = { ...person, updatedAt: Date.now(), isDeleted: 0 }
    const id = await db.add('persons', data)
    return { ...data, id }
}

export async function updatePerson(id, data) {
    const db = getDB()
    const existing = await db.get('persons', id)
    if (existing) {
        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('persons', updated)
        return updated
    }
}

export async function deletePerson(id) {
    const db = getDB()
    await db.delete('persons', id)
}

// ==================== Photos ====================
export async function addPhoto(photo) {
    const db = getDB()
    const data = { ...photo, updatedAt: Date.now(), isDeleted: 0 }
    const id = await db.add('photos', data)
    return { ...data, id }
}

export async function deletePhoto(id) {
    const db = getDB()
    await db.delete('photos', id)
}

export async function getPhotosByTransactionId(transactionId) {
    const db = getDB()
    const all = await db.getAll('photos')
    return all.filter(p => p.transactionId === transactionId)
}

// ==================== Statistics ====================
export async function getMonthlyStats(year, month) {
    const db = getDB()
    const startDate = new Date(year, month - 1, 1).toISOString()
    const endDate = new Date(year, month, 0, 23, 59, 59).toISOString()

    const transactions = await db.getAll('transactions')
    const filtered = transactions.filter(t => t.date >= startDate && t.date <= endDate)

    let income = 0, expense = 0
    filtered.forEach(t => {
        if (t.type === 'income') income += t.amount
        else if (t.type === 'expense') expense += t.amount
    })

    return { income, expense, balance: income - expense }
}

export async function getCategoryStats(year, month, type = 'expense') {
    const db = getDB()
    const startDate = new Date(year, month - 1, 1).toISOString()
    const endDate = new Date(year, month, 0, 23, 59, 59).toISOString()

    const transactions = await db.getAll('transactions')
    const categories = await db.getAll('categories')

    const categoryMap = new Map(categories.map(c => [c.id, c]))

    const filtered = transactions.filter(t =>
        t.date >= startDate && t.date <= endDate && t.type === type
    )

    const stats = {}
    let total = 0
    filtered.forEach(t => {
        const catId = t.categoryId
        if (!stats[catId]) {
            const cat = categoryMap.get(catId) || { id: catId, name: '未知', icon: '❓', color: '#ccc' }
            stats[catId] = { category: cat, amount: 0, count: 0 }
        }
        stats[catId].amount += t.amount
        stats[catId].count++
        total += t.amount
    })

    return {
        total,
        stats: Object.values(stats).sort((a, b) => b.amount - a.amount)
    }
}

// ==================== Clear ====================
export async function clearAllData() {
    const db = getDB()
    const tx = db.transaction(['transactions', 'photos', 'accounts', 'categories', 'tags', 'persons'], 'readwrite')
    await Promise.all([
        tx.objectStore('transactions').clear(),
        tx.objectStore('photos').clear(),
        tx.objectStore('accounts').clear(),
        tx.objectStore('categories').clear(),
        tx.objectStore('tags').clear(),
        tx.objectStore('persons').clear()
    ])
    await tx.done
}
