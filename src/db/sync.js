/**
 * 数据导入导出功能 (IndexedDB 版本)
 */

import { getDB } from './database'
import { createClient } from 'webdav'
import Papa from 'papaparse'

/**
 * 导出所有数据为JSON
 */
export async function exportAllData() {
    const db = getDB()

    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        transactions: await db.getAll('transactions'),
        categories: await db.getAll('categories'),
        tags: await db.getAll('tags'),
        persons: await db.getAll('persons'),
        accounts: await db.getAll('accounts'),
        photos: await db.getAll('photos')
    }

    return data
}

/**
 * 导出为JSON文件并下载
 */
export async function downloadExportFile() {
    const data = await exportAllData()
    const jsonStr = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonStr], { type: 'application/json' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quickbook_backup_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

/**
 * 导出为CSV文件并下载
 */
export async function downloadExportCSV() {
    const db = getDB()
    const [transactions, categories, accounts, persons] = await Promise.all([
        db.getAll('transactions'),
        db.getAll('categories'),
        db.getAll('accounts'),
        db.getAll('persons')
    ])

    const catMap = new Map(categories.map(c => [c.id, c.name]))
    const accMap = new Map(accounts.map(a => [a.id, a.name]))
    const personMap = new Map(persons.map(p => [p.id, p.name]))

    const csvData = transactions.map(t => ({
        '日期': t.date ? t.date.replace('T', ' ').slice(0, 16) : '',
        '类型': t.type === 'expense' ? '支出' : t.type === 'income' ? '收入' : t.type === 'transfer' ? '转账' : t.type,
        '金额': Number(t.amount).toFixed(2),
        '分类': catMap.get(t.categoryId) || '',
        '账户': accMap.get(t.accountId) || '',
        '转入账户': t.toAccountId ? accMap.get(t.toAccountId) || '' : '',
        '成员': personMap.get(t.personId) || '',
        '商家': t.merchant || '',
        '项目': t.project || '',
        '备注': t.remark || ''
    }))

    const csv = Papa.unparse(csvData)
    const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quickbook_export_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

/**
 * 导入JSON数据
 */
export async function importData(jsonData) {
    const db = getDB()

    // 清空现有数据
    const tx = db.transaction(['transactions', 'categories', 'tags', 'persons', 'photos', 'accounts'], 'readwrite')

    await Promise.all([
        tx.objectStore('transactions').clear(),
        tx.objectStore('categories').clear(),
        tx.objectStore('tags').clear(),
        tx.objectStore('persons').clear(),
        tx.objectStore('photos').clear(),
        tx.objectStore('accounts').clear()
    ])

    // 导入新数据
    for (const item of jsonData.transactions || []) {
        await db.add('transactions', item)
    }

    for (const item of jsonData.categories || []) {
        await db.add('categories', item)
    }

    for (const item of jsonData.tags || []) {
        await db.add('tags', item)
    }

    for (const item of jsonData.persons || []) {
        await db.add('persons', item)
    }

    for (const item of jsonData.photos || []) {
        await db.add('photos', item)
    }

    for (const item of jsonData.accounts || []) {
        await db.add('accounts', item)
    }

    return true
}

/**
 * 从文件导入
 */
export function importFromFile() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.json'

        input.onchange = async (e) => {
            const file = e.target.files[0]
            if (!file) {
                reject(new Error('未选择文件'))
                return
            }

            try {
                const text = await file.text()
                const data = JSON.parse(text)
                await importData(data)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        }

        input.click()
    })
}

/**
 * 导入CSV数据 (支持随手记格式)
 */
export async function importCSVData(rows) {
    const db = getDB()
    let count = 0

    // 获取基础数据用于匹配
    let allCats = await db.getAll('categories')
    let allAccs = await db.getAll('accounts')
    let allMerchants = await db.getAll('merchants')
    let allPersons = await db.getAll('persons')

    // 建立名称映射 (Name -> ID)
    const catMap = new Map()
    allCats.forEach(c => catMap.set(c.name, c.id))

    const accMap = new Map()
    allAccs.forEach(a => accMap.set(a.name, a.id))

    const merchantMap = new Map()
    allMerchants.forEach(m => merchantMap.set(m.name, m.id))

    const personMap = new Map()
    allPersons.forEach(p => personMap.set(p.name, p.id))

    // 默认账户和分类 (如果没有匹配到)
    let defaultAccId = allAccs.length > 0 ? allAccs[0].id : null
    let defaultCatId = allCats.length > 0 ? allCats[0].id : null

    // 如果还没有必要的数据，先创建默认的
    if (!defaultAccId) {
        defaultAccId = await db.add('accounts', { name: '现金', type: 'cash', balance: 0 })
        accMap.set('现金', defaultAccId)
    }
    if (!defaultCatId) {
        defaultCatId = await db.add('categories', { name: '其他', type: 'expense', icon: '🏷️' })
        catMap.set('其他', defaultCatId)
    }

    const tx = db.transaction(['transactions', 'merchants', 'persons', 'accounts'], 'readwrite')
    const store = tx.objectStore('transactions')
    const merchantStore = tx.objectStore('merchants')
    const personStore = tx.objectStore('persons')
    const accountStore = tx.objectStore('accounts')

    // 辅助函数：获取或创建商家
    const getOrCreateMerchant = async (name) => {
        if (!name) return ''
        if (merchantMap.has(name)) return name
        if (!merchantMap.has(name)) {
            const newM = { name, icon: '🏪' }
            const id = await merchantStore.add(newM)
            merchantMap.set(name, id)
        }
        return name
    }

    // 辅助函数：获取或创建成员
    const getOrCreatePerson = async (name) => {
        if (!name) return null
        if (personMap.has(name)) return personMap.get(name)

        const newP = { name, avatar: '👤' }
        const id = await personStore.add(newP)
        personMap.set(name, id)
        return id
    }

    // 辅助函数：获取或创建账户
    const getOrCreateAccount = async (name) => {
        if (!name) return defaultAccId
        if (accMap.has(name)) return accMap.get(name)

        const newA = { name, type: 'asset', balance: 0, icon: '💳' }
        const id = await accountStore.add(newA)
        accMap.set(name, id)
        return id
    }

    for (const row of rows) {
        try {
            // 1. 日期处理
            let dateStr = row['交易时间'] || row['日期'] || row['Date']
            if (!dateStr) continue
            // 尝试标准化日期 (支持 YYYY.MM.DD, YYYY/MM/DD)
            dateStr = dateStr.replace(/\./g, '-').replace(/\//g, '-')
            const date = new Date(dateStr)
            if (isNaN(date.getTime())) continue
            const isoDate = date.toISOString()

            // 2. 类型处理
            const typeStr = row['交易类型'] || row['类型'] || row['Type'] || '支出'
            let type = 'expense'
            if (typeStr.includes('收入')) type = 'income'
            else if (typeStr.includes('转账')) type = 'transfer'
            else if (typeStr.includes('余额')) type = 'balance'

            // 3. 金额处理
            const amountStr = row['金额'] || row['金额(元)'] || row['Amount'] || '0'
            const amount = parseFloat(String(amountStr).replace(/[¥,]/g, ''))
            if (isNaN(amount)) continue // 允许金额为0

            // 4. 分类匹配 (优先用子类别)
            const catName = row['分类'] || row['类别'] || row['交易分类'] || row['Category']
            const subCatName = row['子分类'] || row['子类别']

            // 尝试查找分类
            let categoryId = defaultCatId
            if (subCatName && catMap.has(subCatName)) {
                categoryId = catMap.get(subCatName)
            } else if (catName && catMap.has(catName)) {
                categoryId = catMap.get(catName)
            }

            // 5. 账户匹配
            const accName = row['账户'] || row['账户1'] || row['Account']
            let accountId = await getOrCreateAccount(accName)

            let toAccountId = null
            if (type === 'transfer') {
                const toAccName = row['账户2'] || row['转入账户'] || row['目标账户']
                if (toAccName) {
                    toAccountId = await getOrCreateAccount(toAccName)
                }
            }

            // 6. 商家/备注/成员/项目
            const merchantNameRaw = row['商家'] || row['交易对象'] || row['Merchant']
            const merchant = await getOrCreateMerchant(merchantNameRaw)

            const personNameRaw = row['成员'] || row['Member']
            const personId = await getOrCreatePerson(personNameRaw)

            const remark = row['备注'] || row['Remark'] || ''
            const project = row['项目'] || ''

            const transaction = {
                date: isoDate,
                type,
                amount: Math.abs(amount),
                categoryId,
                accountId,
                toAccountId,
                merchant,
                personId,
                remark,
                project,
                created_at: new Date().toISOString()
            }

            await store.add(transaction)
            count++
        } catch (e) {
            console.warn('Import Skip:', row, e)
        }
    }

    return count
}

/**
 * WebDAV 同步功能
 */

export async function checkWebDAVConnection(url, username, password) {
    try {
        const client = createClient(url, {
            username,
            password
        })
        await client.getDirectoryContents('/')
        return true
    } catch (error) {
        console.error('WebDAV Connection Failed:', error)
        throw new Error('连接失败，请检查配置')
    }
}

export async function uploadToWebDAV(config, data) {
    const { davUrl, davUser, davPassword } = config
    const fileName = `quickbook_backup_${new Date().toISOString().split('T')[0]}.json`
    const client = createClient(davUrl, { username: davUser, password: davPassword })

    const jsonStr = JSON.stringify(data, null, 2)
    await client.putFileContents(`/${fileName}`, jsonStr)
}

export async function downloadFromWebDAV(config) {
    const { davUrl, davUser, davPassword } = config
    const client = createClient(davUrl, { username: davUser, password: davPassword })

    // 获取最新的备份文件
    const items = await client.getDirectoryContents('/')
    const backupFiles = items
        .filter(i => i.filename.startsWith('quickbook_backup_') && i.filename.endsWith('.json'))
        .sort((a, b) => b.lastmod.localeCompare(a.lastmod)) // 按时间降序

    if (backupFiles.length === 0) {
        throw new Error('未找到备份文件')
    }

    const latestFile = backupFiles[0]
    const content = await client.getFileContents(latestFile.filename, { format: 'text' })
    return JSON.parse(content)
}
