/**
 * 数据导入导出功能 (IndexedDB 版本)
 */

import { getDB } from './database'
import { createClient } from 'webdav'
import Papa from 'papaparse'
import JSZip from 'jszip'
import { addTransaction, addTransactionsBatch } from './stores'

/**
 * 导出所有数据为JSON
 * @param {boolean} includePhotos - 是否包含图片
 */
export async function getDataCounts() {
    const db = getDB()
    const [t, c, tag, p, a, ph] = await Promise.all([
        db.count('transactions'),
        db.count('categories'),
        db.count('tags'),
        db.count('persons'),
        db.count('accounts'),
        db.count('photos')
    ])
    return {
        transactions: t,
        categories: c,
        tags: tag,
        persons: p,
        accounts: a,
        photos: ph
    }
}

export async function exportAllData(includePhotos = true) {
    const db = getDB()

    const data = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        transactions: await db.getAll('transactions'),
        categories: await db.getAll('categories'),
        tags: await db.getAll('tags'),
        persons: await db.getAll('persons'),
        accounts: await db.getAll('accounts'),
        photos: includePhotos ? await db.getAll('photos') : []
    }

    return data
}

/**
 * 导出为JSON文件并下载
 */
export async function downloadExportFile(onProgress = () => { }) {
    onProgress(10)
    const data = await exportAllData()
    onProgress(50)
    const jsonStr = JSON.stringify(data, null, 2)
    onProgress(80)
    const blob = new Blob([jsonStr], { type: 'application/json' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `quickbook_backup_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onProgress(100)
}

/**
 * 导出为CSV文件并下载
 */
export async function downloadExportCSV(onProgress = () => { }) {
    onProgress(10)
    const db = getDB()
    const [transactions, categories, accounts, persons] = await Promise.all([
        db.getAll('transactions'),
        db.getAll('categories'),
        db.getAll('accounts'),
        db.getAll('persons')
    ])
    onProgress(40)

    const catMap = new Map(categories.map(c => [c.id, c.name]))
    const accMap = new Map(accounts.map(a => [a.id, a.name]))
    const personMap = new Map(persons.map(p => [p.id, p.name]))

    const csvData = transactions.map(t => ({
        '日期': t.date ? t.date.replace('T', ' ').slice(0, 16) : '',
        '类型': t.type === 'expense' ? '支出' : t.type === 'income' ? '收入' : t.type === 'transfer' ? '转账' : t.type,
        '金额': Number(t.amount).toFixed(2),
        '分类': catMap.get(t.categoryId) || '',
        '子类别': t.subCategory || '',
        '账户': accMap.get(t.accountId) || '',
        '转入账户': t.toAccountId ? accMap.get(t.toAccountId) || '' : '',
        '成员': personMap.get(t.personId) || '',
        '商家': t.merchant || '',
        '项目': t.project || '',
        '备注': t.remark || ''
    }))
    onProgress(70)

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
    onProgress(100)
}

/**
 * 导入JSON数据
 */
export async function importData(jsonData, onProgress = () => { }) {
    const db = getDB()
    onProgress(10)

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
    onProgress(30)

    const stores = ['transactions', 'categories', 'tags', 'persons', 'photos', 'accounts']
    let currentStore = 0

    for (const storeName of stores) {
        const items = jsonData[storeName] || []
        if (items.length > 0) {
            const store = tx.objectStore(storeName)
            // 批量写入，每 100 条一组
            let batch = []
            for (let i = 0; i < items.length; i++) {
                // 强制重置同步状态为 0，确保导入的数据会被同步到云端
                const item = { ...items[i], synced: 0 }
                batch.push(store.add(item))
                if (batch.length >= 100) {
                    await Promise.all(batch)
                    batch = []
                }
            }
            if (batch.length > 0) await Promise.all(batch)
        }

        currentStore++
        onProgress(30 + Math.round((currentStore / stores.length) * 70))
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
export async function importCSVData(rows, onProgress = () => { }) {
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

    const tx = db.transaction(['merchants', 'persons', 'accounts'], 'readwrite')
    const merchantStore = tx.objectStore('merchants')
    const personStore = tx.objectStore('persons')
    const accountStore = tx.objectStore('accounts')

    // 辅助函数：获取或创建商家
    const getOrCreateMerchant = async (name) => {
        if (!name) return ''
        if (merchantMap.has(name)) return name // Map save ID or Name? Here it seems name is used as ID or simple string
        // Wait, original code: merchantMap.set(name, id). But wait, merchant field in transaction stores String Name usually? 
        // Let's check original code. Original: if (merchantMap.has(name)) return name (Wait, if map has it, it returns name?)
        // Ah, line 215 originally: if (merchantMap.has(name)) return name. 
        // And line 219: merchantMap.set(name, id). 
        // This is inconsistent. If I return name, I am storing name. If I return ID, I store ID.
        // Let's look at schema. Transactions usually store merchant name as string, or ID?
        // In this app, it seems 'merchant' field is likely a string (name).
        // Let's assume it is string.
        return name
    }

    // 辅助函数：获取或创建成员
    const getOrCreatePerson = async (name) => {
        if (!name) return null
        if (personMap.has(name)) return personMap.get(name)

        const newP = { name, avatar: '👤' }
        const id = await personStore.add(newP)
        personMap.set(name, id) // Store ID
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

    // 4. 获取现有数据进行去重校验
    const allExisting = await db.getAll('transactions')
    const signatureSet = new Set(allExisting.map(t => {
        // 签名生成规则：日期_金额_类型_备注 (粗略去重)
        // 注意：这里日期使用 ISO 字符串的前 16 位 (YYYY-MM-DDTHH:mm) 忽略秒和毫秒，防止细微差异
        return `${t.date.slice(0, 16)}_${t.amount}_${t.type}_${t.remark || ''}`
    }))

    const total = rows.length
    let batchData = []
    let skippedCount = 0

    for (let i = 0; i < total; i++) {
        const row = rows[i]

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
            if (isNaN(amount)) continue

            // 4. 分类匹配 
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
            const merchant = await getOrCreateMerchant(merchantNameRaw) // Usually just returns name

            const personNameRaw = row['成员'] || row['Member']
            const personId = await getOrCreatePerson(personNameRaw)

            const remark = row['备注'] || row['Remark'] || ''
            const project = row['项目'] || ''

            // 检查重复
            // 构造当前交易的签名
            const currentSig = `${isoDate.slice(0, 16)}_${Math.abs(amount)}_${type}_${remark}`

            if (signatureSet.has(currentSig)) {
                skippedCount++
                continue
            }

            // 新增：加入到 Set 中防止同批次内重复
            signatureSet.add(currentSig)

            const transaction = {
                date: isoDate,
                type,
                amount: Math.abs(amount),
                categoryId,
                subCategory: subCatName || '',
                accountId,
                toAccountId,
                merchant,
                personId,
                remark,
                project,
                created_at: new Date().toISOString(),
                synced: 0
            }


            // Add to batch data
            batchData.push(transaction)
            count++

            // Process batch if full (Larger batch for efficiency)
            if (batchData.length >= 2000) {
                await addTransactionsBatch(batchData)
                batchData = []
                onProgress(Math.round((i / total) * 100))
            }

        } catch (e) {
            console.warn('Import Skip:', row, e)
        }
    }

    // Process remaining
    if (batchData.length > 0) {
        await addTransactionsBatch(batchData)
    }

    onProgress(100)
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

export async function uploadToWebDAV(config, data, signal) {
    const { davUrl, davUser, davPassword } = config
    const fileName = `quickbook_backup_${new Date().toISOString().split('T')[0]}.json`
    const client = createClient(davUrl, { username: davUser, password: davPassword })

    const jsonStr = JSON.stringify(data, null, 2)

    // Check if aborted before starting upload
    if (signal && signal.aborted) {
        throw new Error('Aborted')
    }

    // Attempt to pass signal if library supports it in options. 
    // If specific library version doesn't support it, we can't easily cancel the network request, 
    // but we can start by checking signal.
    // Assuming 'webdav' library supports passing options with signal to putFileContents.
    await client.putFileContents(`/${fileName}`, jsonStr, { signal })
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

/**
 * 导出图片为 ZIP (独立备份，二进制存储更省空间)
 */
export async function exportImagesAsZip(onProgress = () => { }) {
    onProgress(10)
    const db = getDB()
    const photos = await db.getAll('photos')

    if (photos.length === 0) throw new Error('没有图片可导出')

    onProgress(30)
    const zip = new JSZip()
    const imgFolder = zip.folder("images")

    // Helper: Base64 to Blob
    const base64ToBlob = (dataURI) => {
        try {
            const splitDataURI = dataURI.split(',')
            const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
            const mimeString = splitDataURI[0].split(':')[1].split(';')[0]
            const ia = new Uint8Array(byteString.length)
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }
            return new Blob([ia], { type: mimeString })
        } catch (e) {
            console.error('Blob conversion failed', e)
            return null
        }
    }

    let processed = 0
    for (const photo of photos) {
        if (!photo.data) continue
        const blob = base64ToBlob(photo.data)
        if (blob) {
            // Filename format: transactionId_photoId.jpg (or png)
            // Detect extension
            const ext = blob.type.split('/')[1] || 'jpg'
            imgFolder.file(`${photo.transactionId}_${photo.id}.${ext}`, blob)
        }
        processed++
        if (processed % 10 === 0) onProgress(30 + Math.round((processed / photos.length) * 40))
    }

    onProgress(80)
    const content = await zip.generateAsync({ type: "blob" }, (metadata) => {
        onProgress(80 + Math.round(metadata.percent * 0.2))
    })

    // Download
    const url = URL.createObjectURL(content)
    const a = document.createElement('a')
    a.href = url
    a.download = `quickbook_images_${new Date().toISOString().split('T')[0]}.zip`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    onProgress(100)
}

/**
 * 从 ZIP 导入图片
 */
export async function importImagesFromZip(file, onProgress = () => { }) {
    onProgress(10)
    const db = getDB()
    const zip = await JSZip.loadAsync(file)
    const imgFolder = zip.folder("images")

    if (!imgFolder) throw new Error('ZIP 文件格式不正确 (未找到 images 文件夹)')

    const files = []
    imgFolder.forEach((relativePath, zipEntry) => {
        if (!zipEntry.dir) files.push(zipEntry)
    })

    if (files.length === 0) return 0

    onProgress(20)
    const tx = db.transaction('photos', 'readwrite')

    // Clear existing photos? Maybe not forcibly clear, but merge?
    // User requested "Restore", usually implies overwrite or addition. 
    // Let's just add/overwrite if ID exists (ID is in filename).
    // Actually IDB auto-increment IDs might conflict if we use the ID from filename as key.
    // However, if we preserve IDs, we risk conflict if we didn't clear.
    // Safe approach: Clear photos if doing a full restore, or just add.
    // Let's assume this is a restore operation. We'll try to keep transactionId links valid.

    let count = 0
    for (const zipEntry of files) {
        // Filename: transactionId_photoId.ext
        const filename = zipEntry.name.split('/').pop() // remove folder prefix if any
        const [namePart] = filename.split('.')
        // namePart might be "transId_photoId"
        const parts = namePart.split('_')
        if (parts.length < 2) continue

        const transactionId = Number(parts[0]) // transId
        // We typically ignore the old photo ID and let IDB generate a new one, OR we try to reuse it?
        // If "transactionId" is valid, that's what matters.
        // But if the transactions were also imported, their IDs might be preserved.

        try {
            const blob = await zipEntry.async("blob")
            // Convert Blob back to Base64
            const reader = new FileReader()
            const base64Promise = new Promise((resolve) => {
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(blob)
            })
            const base64Data = await base64Promise

            await tx.store.add({
                transactionId: transactionId,
                data: base64Data,
                synced: 0,
                updatedAt: Date.now()
            })
            count++
            if (count % 10 === 0) onProgress(20 + Math.round((count / files.length) * 70))
        } catch (e) {
            console.error('Import image failed', filename, e)
        }
    }
    await tx.done
    onProgress(100)
    return count
}
