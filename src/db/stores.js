/**
 * stores.js - 数据存储操作 (IndexedDB 版本)
 * 提供对各种数据存储的 CRUD 操作
 */

import { getDB } from './database'
import { EventEmitter, EVENTS } from '../utils/events'

// ==================== Transactions ====================
export async function getAllTransactions() {
    const db = getDB()
    return await db.getAll('transactions')
}

/**
 * 按日期范围获取交易记录 (使用索引优化)
 * @param {string} start - 开始日期 ISO 字符串
 * @param {string} end - 结束日期 ISO 字符串
 * @returns {Promise<Array>} 交易记录数组
 */
export async function getTransactionsByDateRange(start, end) {
    const db = getDB()
    try {
        // 优先使用索引查询 (性能优化)
        const tx = db.transaction('transactions', 'readonly')
        const index = tx.store.index('date')
        const range = IDBKeyRange.bound(start, end)
        return await index.getAll(range)
    } catch (e) {
        // 索引不存在时回退到全量过滤
        const all = await db.getAll('transactions')
        return all.filter(t => t.date >= start && t.date <= end)
    }
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
    // Update Global Stats
    await updateGlobalStatsForTransaction({ ...data, id })
    // Update Merchant Stats
    await updateMerchantStatsForTransaction({ ...data, id })
    // Update Monthly Stats
    await updateMonthlyStatsForTransaction({ ...data, id })

    EventEmitter.dispatch(EVENTS.TRANSACTION_UPDATED)
    return { ...data, id }
}

export async function addTransactionsBatch(transactions) {
    const db = getDB()
    const tx = db.transaction(['transactions', 'accounts', 'system_stats'], 'readwrite')
    const store = tx.objectStore('transactions')
    const accStore = tx.objectStore('accounts')
    const statsStore = tx.objectStore('system_stats')

    // 1. Prepare Aggregators
    const accountUpdates = new Map() // accId -> amount (delta)
    const merchantUpdates = new Map() // merchantName -> {income, expense}
    const monthlyUpdates = new Map() // key(stats_YYYY_MM) -> {income, expense}
    const globalUpdates = { income: 0, expense: 0 }

    // Constants
    const now = Date.now()

    // 2. Process Insertions
    for (const t of transactions) {
        const data = {
            ...t,
            updatedAt: now,
            isDeleted: 0,
            synced: 0
        }
        await store.add(data)

        const amt = Number(data.amount || 0)

        // Account Delta
        if (data.type === 'expense' && data.accountId) {
            accountUpdates.set(data.accountId, (accountUpdates.get(data.accountId) || 0) - amt)
        } else if (data.type === 'income' && data.accountId) {
            accountUpdates.set(data.accountId, (accountUpdates.get(data.accountId) || 0) + amt)
        } else if (data.type === 'transfer' && data.accountId && data.toAccountId) {
            accountUpdates.set(data.accountId, (accountUpdates.get(data.accountId) || 0) - amt)
            accountUpdates.set(data.toAccountId, (accountUpdates.get(data.toAccountId) || 0) + amt)
        }

        // Global Stats
        if (data.type === 'income') globalUpdates.income += amt
        else if (data.type === 'expense') globalUpdates.expense += amt

        // Merchant Stats
        const mName = data.merchantName || data.merchant
        if (mName) {
            if (!merchantUpdates.has(mName)) merchantUpdates.set(mName, { income: 0, expense: 0 })
            const mStat = merchantUpdates.get(mName)
            if (data.type === 'income') mStat.income += amt
            else if (data.type === 'expense') mStat.expense += amt
        }

        // Monthly Stats
        if (data.date) {
            const d = new Date(data.date)
            const year = d.getFullYear()
            const month = String(d.getMonth() + 1).padStart(2, '0')
            const monthKey = `stats_${year}_${month}`
            if (!monthlyUpdates.has(monthKey)) monthlyUpdates.set(monthKey, { income: 0, expense: 0 })
            const monStat = monthlyUpdates.get(monthKey)
            if (data.type === 'income') monStat.income += amt
            else if (data.type === 'expense') monStat.expense += amt
        }
    }

    // 3. Apply Account Updates
    for (const [accId, delta] of accountUpdates.entries()) {
        const acc = await accStore.get(accId)
        if (acc) {
            acc.balance = (Number(acc.balance) || 0) + delta
            await accStore.put(acc)
        }
    }

    // 4. Apply Global Stats
    if (db.objectStoreNames.contains('system_stats')) {
        const globalStats = (await statsStore.get('global')) || { key: 'global', income: 0, expense: 0 }
        globalStats.income += globalUpdates.income
        globalStats.expense += globalUpdates.expense
        await statsStore.put(globalStats)

        // 5. Apply Merchant Stats
        for (const [name, delta] of merchantUpdates.entries()) {
            const key = `merchant_${name}`
            const stat = (await statsStore.get(key)) || { key, income: 0, expense: 0 }
            stat.income += delta.income
            stat.expense += delta.expense
            await statsStore.put(stat)
        }

        // 6. Apply Monthly Stats
        for (const [key, delta] of monthlyUpdates.entries()) {
            const stat = (await statsStore.get(key)) || { key, income: 0, expense: 0 }
            stat.income += delta.income
            stat.expense += delta.expense
            await statsStore.put(stat)
        }
    }

    await tx.done
    EventEmitter.dispatch(EVENTS.TRANSACTION_UPDATED)
    return transactions.length
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
        // Reverse old global stats
        await reverseGlobalStatsForTransaction(existing)
        // Reverse old merchant stats
        await reverseMerchantStatsForTransaction(existing)
        // Reverse old monthly stats
        await reverseMonthlyStatsForTransaction(existing)

        const updated = { ...existing, ...data, updatedAt: Date.now() }
        await db.put('transactions', updated)

        // Apply new balance effect
        await updateAccountBalanceForTransaction(updated)
        // Update Global Stats (Apply New)
        await updateGlobalStatsForTransaction(updated)
        // Update Merchant Stats (Apply New)
        await updateMerchantStatsForTransaction(updated)
        // Update Monthly Stats (Apply New)
        await updateMonthlyStatsForTransaction(updated)

        EventEmitter.dispatch(EVENTS.TRANSACTION_UPDATED)
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
        await reverseGlobalStatsForTransaction(existing)
        await reverseMerchantStatsForTransaction(existing)
        await reverseMonthlyStatsForTransaction(existing)
        await db.delete('transactions', id)
        EventEmitter.dispatch(EVENTS.TRANSACTION_UPDATED)
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
    try {
        return await db.getAllFromIndex('photos', 'transactionId', transactionId)
    } catch (e) {
        const all = await db.getAll('photos')
        return all.filter(p => p.transactionId === transactionId)
    }
}

// ==================== Statistics ====================
export async function getMonthlyStats(year, month) {
    const start = new Date(year, month - 1, 1).toISOString()
    const end = new Date(year, month, 0, 23, 59, 59, 999).toISOString()

    const filtered = await getTransactionsByDateRange(start, end)

    let income = 0, expense = 0
    filtered.forEach(t => {
        if (t.type === 'income') income += Number(t.amount || 0)
        else if (t.type === 'expense') expense += Number(t.amount || 0)
    })

    return { income, expense, balance: income - expense }
}

export async function getCategoryStats(year, month, type = 'expense') {
    const start = new Date(year, month - 1, 1).toISOString()
    const end = new Date(year, month, 0, 23, 59, 59, 999).toISOString()

    const [filteredAll, categories] = await Promise.all([
        getTransactionsByDateRange(start, end),
        getAllCategories()
    ])

    const categoryMap = new Map(categories.map(c => [c.id, c]))
    const filtered = filteredAll.filter(t => t.type === type)

    const stats = {}
    let total = 0
    filtered.forEach(t => {
        const catId = t.categoryId
        const subCat = t.subCategory || ''
        const key = `${catId}|${subCat}`

        if (!stats[key]) {
            const cat = categoryMap.get(catId) || { id: catId, name: '未知', icon: '❓', color: '#ccc' }
            stats[key] = {
                category: { ...cat, subName: subCat },
                amount: 0,
                count: 0
            }
        }
        const amt = Number(t.amount || 0)
        stats[key].amount += amt
        stats[key].count++
        total += amt
    })

    return {
        total,
        stats: Object.values(stats).sort((a, b) => b.amount - a.amount)
    }
}


// ==================== Projects & Merchants ====================
export async function getAllProjects() {
    const db = getDB()
    if (!db.objectStoreNames.contains('projects')) return []
    return await db.getAll('projects')
}

export async function getAllMerchants() {
    const db = getDB()
    if (!db.objectStoreNames.contains('merchants')) return []
    return await db.getAll('merchants')
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
    // Reset global stats
    const db2 = getDB()
    // V6->V7 Schema change needed for system_stats, assuming DB is migrated or handled.
    // If system_stats exists:
    if (db2.objectStoreNames.contains('system_stats')) {
        await db2.put('system_stats', { key: 'global', income: 0, expense: 0 })
    }

    EventEmitter.dispatch(EVENTS.DATA_IMPORTED)
    EventEmitter.dispatch(EVENTS.TRANSACTION_UPDATED)
}

// ==================== Global Stats Cache ====================
export async function getGlobalStats() {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) {
        // Fallback if V7 not applied yet or specific DB issue
        const all = await getAllTransactions() // Old slow way fallback
        let income = 0, expense = 0
        all.forEach(t => {
            if (t.type === 'income') income += Number(t.amount || 0)
            else if (t.type === 'expense') expense += Number(t.amount || 0)
        })
        return { income, expense }
    }

    let stats = await db.get('system_stats', 'global')
    if (!stats) {
        // If missing, recalculate
        return await recalculateGlobalStats()
    }
    return stats
}

async function updateGlobalStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return

    const stats = (await db.get('system_stats', 'global')) || { key: 'global', income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income += amt
    else if (t.type === 'expense') stats.expense += amt

    await db.put('system_stats', stats)
}

async function reverseGlobalStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return

    const stats = (await db.get('system_stats', 'global')) || { key: 'global', income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income -= amt
    else if (t.type === 'expense') stats.expense -= amt

    await db.put('system_stats', stats)
}

export async function recalculateGlobalStats() {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return { income: 0, expense: 0 }

    let income = 0
    let expense = 0
    // Use Cursor for memory efficiency
    let cursor = await db.transaction('transactions').store.openCursor()

    while (cursor) {
        const t = cursor.value
        const amt = Number(t.amount || 0)
        if (t.type === 'income') income += amt
        else if (t.type === 'expense') expense += amt
        cursor = await cursor.continue()
    }

    const stats = { key: 'global', income, expense }
    await db.put('system_stats', stats)
    return stats
}

// ==================== Merchant Stats Cache ====================
export async function getAllMerchantStats() {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return {}

    // Check if we have any merchant stats
    const count = await db.count('system_stats')
    // If only 'global' exists (count <= 1), we might need to recalculate
    // But 'global' might be missing too.
    if (count <= 1) {
        // Potential need for recalc. But hard to know if it's just fresh DB.
        // Let's rely on manual trigger or check if 'global' exists but no merchant stats?
        // Safe bet: just return what we have. If huge mismatch, we might add Recalculate Button in Settings.
        // Or, we can check a flag 'merchant_stats_synced'.
        // For now, let's just attempt to read.
    }

    const allStats = await db.getAll('system_stats')
    const merchantStats = {}

    for (const stat of allStats) {
        if (stat.key.startsWith('merchant_')) {
            const name = stat.key.replace('merchant_', '')
            merchantStats[name] = { income: stat.income, expense: stat.expense }
        }
    }

    // If empty keys but we have transactions, maybe we should init?
    // Let's be safe: if empty, run recalc once.
    if (Object.keys(merchantStats).length === 0) {
        const hasTrans = await db.count('transactions')
        if (hasTrans > 0) {
            return await recalculateMerchantStats()
        }
    }

    return merchantStats
}

async function updateMerchantStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return

    const name = t.merchantName || t.merchant // Support both fields
    if (!name) return

    const key = `merchant_${name}`
    const stats = (await db.get('system_stats', key)) || { key, income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income += amt
    else if (t.type === 'expense') stats.expense += amt

    await db.put('system_stats', stats)
}

async function reverseMerchantStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return

    const name = t.merchantName || t.merchant
    if (!name) return

    const key = `merchant_${name}`
    const stats = (await db.get('system_stats', key)) || { key, income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income -= amt
    else if (t.type === 'expense') stats.expense -= amt

    await db.put('system_stats', stats)
}

export async function recalculateMerchantStats() {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return {}

    const map = {}
    let cursor = await db.transaction('transactions').store.openCursor()

    while (cursor) {
        const t = cursor.value
        const name = t.merchantName || t.merchant
        if (name) {
            if (!map[name]) map[name] = { income: 0, expense: 0 }
            const amt = Number(t.amount || 0)
            if (t.type === 'income') map[name].income += amt
            else if (t.type === 'expense') map[name].expense += amt
        }
        cursor = await cursor.continue()
    }

    const tx = db.transaction('system_stats', 'readwrite')
    const results = {}
    for (const [name, val] of Object.entries(map)) {
        await tx.store.put({ key: `merchant_${name}`, ...val })
        results[name] = val
    }
    await tx.done
    return results
}

// ==================== Monthly Stats Cache ====================
export async function getYearlyStatsCached(year) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return null

    const months = []
    let totalIncome = 0
    let totalExpense = 0

    // Try to fetch all 12 months
    const tx = db.transaction('system_stats', 'readonly')
    const store = tx.store

    // Check if we need to recalucate for this year (heuristic: check Jan and Dec?)
    // Or just be lazy: if cache miss, calc that month? 
    // Better: If we return partial data, chart looks wrong.
    // Let's try to get all.

    for (let m = 1; m <= 12; m++) {
        const mm = String(m).padStart(2, '0')
        const key = `stats_${year}_${mm}`
        let dayStats = await store.get(key)

        if (!dayStats) {
            // Cache miss - on-the-fly calc for this year?
            // This might happen if user imports data but didn't trigger recalc.
            // Let's trigger a recalc for the whole YEAR if significant misses.
            // But we are inside a loop.
            // Let's complex logic: Return null to signal "Needs Calc"
            return await recalculateYearlyStats(year)
        }

        months.push({ m, inc: dayStats.income, exp: dayStats.expense })
        totalIncome += dayStats.income
        totalExpense += dayStats.expense
    }

    return {
        totalIncome,
        totalExpense,
        surplus: totalIncome - totalExpense,
        monthlyData: months
    }
}

async function updateMonthlyStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return
    if (!t.date) return

    const d = new Date(t.date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const key = `stats_${year}_${month}`

    const stats = (await db.get('system_stats', key)) || { key, income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income += amt
    else if (t.type === 'expense') stats.expense += amt

    await db.put('system_stats', stats)
}

async function reverseMonthlyStatsForTransaction(t) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return
    if (!t.date) return

    const d = new Date(t.date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const key = `stats_${year}_${month}`

    const stats = (await db.get('system_stats', key)) || { key, income: 0, expense: 0 }
    const amt = Number(t.amount || 0)

    if (t.type === 'income') stats.income -= amt
    else if (t.type === 'expense') stats.expense -= amt

    await db.put('system_stats', stats)
}

export async function recalculateYearlyStats(year) {
    const db = getDB()
    if (!db.objectStoreNames.contains('system_stats')) return null

    // Fetch all transactions for the year
    const trans = await getTransactionsByYear(year)

    // Group by month
    const map = {} // "01" -> {inc, exp}
    for (let i = 1; i <= 12; i++) {
        map[String(i).padStart(2, '0')] = { income: 0, expense: 0 }
    }

    trans.forEach(t => {
        const d = new Date(t.date)
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const amt = Number(t.amount || 0)
        if (t.type === 'income') map[m].income += amt
        else if (t.type === 'expense') map[m].expense += amt
    })

    const tx = db.transaction('system_stats', 'readwrite')
    const monthlyData = []
    let totalIncome = 0
    let totalExpense = 0

    for (const [mm, val] of Object.entries(map)) {
        await tx.store.put({ key: `stats_${year}_${mm}`, ...val })
        monthlyData.push({ m: Number(mm), inc: val.income, exp: val.expense })
        totalIncome += val.income
        totalExpense += val.expense
    }
    await tx.done

    return {
        totalIncome,
        totalExpense,
        surplus: totalIncome - totalExpense,
        monthlyData
    }
}
