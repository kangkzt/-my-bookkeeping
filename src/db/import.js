/**
 * 第三方账本导入
 * 支持随手记CSV、微信账单、支付宝账单
 */

import Papa from 'papaparse'
import { addTransaction, getAllCategories, addCategory } from './stores'
import { logger } from '../utils/logger'

/**
 * 解析CSV文件
 */
function parseCSV(text) {
    return new Promise((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
            error: (error) => reject(error)
        })
    })
}

/**
 * 自动匹配或创建分类
 */
async function getOrCreateCategory(name, type) {
    const categories = await getAllCategories()

    // 尝试模糊匹配
    let matched = categories.find(c =>
        c.type === type && (
            c.name === name ||
            c.name.includes(name) ||
            name.includes(c.name)
        )
    )

    if (matched) return matched.id

    // 常见分类映射
    const categoryMap = {
        expense: {
            '餐饮': ['餐饮', '吃饭', '外卖', '美食', '食品'],
            '交通': ['交通', '打车', '公交', '地铁', '滴滴', '出行'],
            '购物': ['购物', '淘宝', '京东', '网购', '商场'],
            '娱乐': ['娱乐', '游戏', '电影', '旅游', '休闲'],
            '居住': ['居住', '房租', '水电', '物业', '住房'],
            '通讯': ['通讯', '话费', '流量', '网费'],
            '医疗': ['医疗', '看病', '药品', '医院'],
            '教育': ['教育', '学习', '培训', '书籍']
        },
        income: {
            '工资': ['工资', '薪资', '月薪'],
            '奖金': ['奖金', '提成', '绩效'],
            '理财': ['理财', '利息', '收益', '投资'],
            '兼职': ['兼职', '副业', '外快'],
            '红包': ['红包', '转账']
        }
    }

    const map = categoryMap[type] || {}
    for (const [catName, keywords] of Object.entries(map)) {
        if (keywords.some(k => name.includes(k))) {
            const cat = categories.find(c => c.name === catName && c.type === type)
            if (cat) return cat.id
        }
    }

    // 创建新分类
    const newCategory = await addCategory({
        name: name.slice(0, 10), // 限制长度
        icon: type === 'expense' ? '💸' : '💵',
        color: type === 'expense' ? '#FF6B6B' : '#4ECDC4',
        type
    })

    return newCategory.id
}

/**
 * 导入随手记CSV
 * 随手记CSV格式: 交易类型,分类,子分类,账户,金额,货币,日期,备注,标签
 */
export async function importSuishouji(file) {
    const text = await file.text()
    const rows = await parseCSV(text)

    let imported = 0
    let failed = 0
    const errors = []

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        try {
            const type = row['交易类型'] === '支出' ? 'expense' : 'income'
            const categoryName = row['分类'] || row['子分类'] || '其他'
            const amount = Math.abs(parseFloat(row['金额'] || row['金额(元)'] || 0))
            const date = row['日期'] || new Date().toISOString().split('T')[0]
            const note = row['备注'] || ''

            if (amount <= 0) continue

            const categoryId = await getOrCreateCategory(categoryName, type)

            await addTransaction({
                amount,
                type,
                categoryId,
                tagIds: [],
                personId: null,
                date: formatDate(date),
                note
            })

            imported++
        } catch (error) {
            logger.error('导入行失败:', row, error)
            failed++
            errors.push({ row: i + 1, message: error.message, data: row })
        }
    }

    return { imported, failed, errors }
}

/**
 * 导入微信账单CSV
 * 微信账单格式: 交易时间,交易类型,交易对方,商品,收/支,金额(元),支付方式,当前状态,交易单号,商户单号,备注
 */
export async function importWechat(file) {
    const text = await file.text()
    const lines = text.split('\n')
    const dataStart = lines.findIndex(line => line.includes('交易时间'))
    if (dataStart === -1) {
        throw new Error('不是有效的微信账单文件')
    }

    const csvText = lines.slice(dataStart).join('\n')
    const rows = await parseCSV(csvText)

    let imported = 0
    let failed = 0
    const errors = []

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        try {
            const incomeOrExpense = row['收/支'] || ''
            if (!incomeOrExpense || incomeOrExpense === '/' || incomeOrExpense === '不计收支') continue

            const type = incomeOrExpense === '支出' ? 'expense' : 'income'
            const categoryName = row['交易类型'] || row['商品'] || '其他'
            const amountStr = (row['金额(元)'] || row['金额'] || '0').replace('¥', '').replace(',', '')
            const amount = Math.abs(parseFloat(amountStr))
            const dateStr = row['交易时间'] || ''
            const note = row['商品'] || row['交易对方'] || ''

            if (amount <= 0) continue

            const categoryId = await getOrCreateCategory(categoryName, type)

            await addTransaction({
                amount,
                type,
                categoryId,
                tagIds: [],
                personId: null,
                date: formatDate(dateStr),
                note
            })

            imported++
        } catch (error) {
            logger.error('导入行失败:', row, error)
            failed++
            errors.push({ row: i + 1, message: error.message, data: row })
        }
    }

    return { imported, failed, errors }
}

/**
 * 导入支付宝账单CSV
 * 支付宝账单格式: 交易时间,交易分类,交易对方,对方账号,商品说明,收/支,金额,收/付款方式,交易状态,交易订单号,商户订单号,备注
 */
export async function importAlipay(file) {
    const text = await file.text()
    const lines = text.split('\n')
    const dataStart = lines.findIndex(line => line.includes('交易时间'))
    if (dataStart === -1) {
        throw new Error('不是有效的支付宝账单文件')
    }

    const csvText = lines.slice(dataStart).join('\n')
    const rows = await parseCSV(csvText)

    let imported = 0
    let failed = 0
    const errors = []

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        try {
            const incomeOrExpense = row['收/支'] || ''
            if (!incomeOrExpense || incomeOrExpense === '不计收支') continue

            const type = incomeOrExpense === '支出' ? 'expense' : 'income'
            const categoryName = row['交易分类'] || row['商品说明'] || '其他'
            const amountStr = (row['金额'] || '0').replace(',', '')
            const amount = Math.abs(parseFloat(amountStr))
            const dateStr = row['交易时间'] || ''
            const note = row['商品说明'] || row['交易对方'] || ''

            if (amount <= 0) continue

            const categoryId = await getOrCreateCategory(categoryName, type)

            await addTransaction({
                amount,
                type,
                categoryId,
                tagIds: [],
                personId: null,
                date: formatDate(dateStr),
                note
            })

            imported++
        } catch (error) {
            logger.error('导入行失败:', row, error)
            failed++
            errors.push({ row: i + 1, message: error.message, data: row })
        }
    }

    return { imported, failed, errors }
}

/**
 * 格式化日期
 */
function formatDate(dateStr) {
    if (!dateStr) return new Date().toISOString().split('T')[0]

    // 处理各种日期格式
    const date = new Date(dateStr.replace(/\//g, '-').replace(/年|月/g, '-').replace(/日/g, ''))
    if (isNaN(date.getTime())) {
        return new Date().toISOString().split('T')[0]
    }

    return date.toISOString().split('T')[0]
}

/**
 * 自动检测账单类型并导入
 */
export async function autoImportCSV(file) {
    const text = await file.text()

    if (text.includes('交易类型,分类') || text.includes('交易类型,子分类')) {
        // 随手记格式
        return { source: '随手记', result: await importSuishouji(file) }
    } else if (text.includes('微信') || text.includes('商户单号')) {
        // 微信格式
        return { source: '微信', result: await importWechat(file) }
    } else if (text.includes('支付宝') || text.includes('对方账号')) {
        // 支付宝格式
        return { source: '支付宝', result: await importAlipay(file) }
    } else {
        throw new Error('无法识别的账单格式，请确保是随手记、微信或支付宝导出的CSV文件')
    }
}

/**
 * 从文件选择器导入第三方账单
 */
export function importThirdPartyBill() {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.csv'

        input.onchange = async (e) => {
            const file = e.target.files[0]
            if (!file) {
                reject(new Error('未选择文件'))
                return
            }

            try {
                const result = await autoImportCSV(file)
                resolve(result)
            } catch (error) {
                reject(error)
            }
        }

        input.click()
    })
}
