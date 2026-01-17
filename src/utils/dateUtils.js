/**
 * dateUtils.js - 日期格式化工具
 * 统一全应用的日期处理逻辑
 */

/**
 * 格式化日期为中文格式 (年月日)
 * @param {string|Date} dateInput - ISO 日期字符串或 Date 对象
 * @returns {string} 格式化后的日期，如 "2026年1月16日"
 */
export const formatDateCN = (dateInput) => {
    if (!dateInput) return ''
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return ''
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

/**
 * 格式化日期时间为中文格式
 * @param {string|Date} dateInput - ISO 日期字符串或 Date 对象
 * @returns {string} 格式化后的日期时间，如 "2026年1月16日 14:30"
 */
export const formatDateTimeCN = (dateInput) => {
    if (!dateInput) return ''
    const d = new Date(dateInput)
    if (isNaN(d.getTime())) return ''
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${hours}:${minutes}`
}

/**
 * 格式化金额为中文货币格式
 * @param {number} amount - 金额
 * @returns {string} 格式化后的金额，如 "1,234.56"
 */
export const formatAmount = (amount) => {
    if (typeof amount !== 'number' || isNaN(amount)) return '0.00'
    return new Intl.NumberFormat('zh-CN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount)
}

/**
 * 获取月份键值
 * @param {Date} date - 日期对象
 * @returns {string} 月份键值，如 "2026-01"
 */
export const getMonthKey = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date()
    }
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

/**
 * 获取日期键值
 * @param {Date} date - 日期对象
 * @returns {string} 日期键值，如 "2026-01-16"
 */
export const getDateKey = (date) => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date()
    }
    return date.toISOString().split('T')[0]
}

/**
 * 获取相对日期描述
 * @param {string|Date} dateInput - 日期
 * @returns {string} 相对描述，如 "今天"、"昨天"、"3天前"
 */
export const getRelativeDate = (dateInput) => {
    const d = new Date(dateInput)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    d.setHours(0, 0, 0, 0)

    const diffDays = Math.floor((today - d) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return '今天'
    if (diffDays === 1) return '昨天'
    if (diffDays === 2) return '前天'
    if (diffDays < 7) return `${diffDays}天前`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
    return formatDateCN(dateInput)
}

/**
 * 获取星期几
 * @param {string|Date} dateInput - 日期
 * @returns {string} 星期描述，如 "周一"
 */
export const getWeekday = (dateInput) => {
    const d = new Date(dateInput)
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return weekdays[d.getDay()]
}

/**
 * 解析各种格式的日期字符串
 * @param {string} dateStr - 日期字符串
 * @returns {Date|null} Date 对象或 null
 */
export const parseDate = (dateStr) => {
    if (!dateStr) return null

    // 处理中文格式: 2026年1月16日
    const cnMatch = dateStr.match(/(\d{4})年(\d{1,2})月(\d{1,2})日?/)
    if (cnMatch) {
        return new Date(cnMatch[1], cnMatch[2] - 1, cnMatch[3])
    }

    // 处理斜杠格式: 2026/01/16
    const normalized = dateStr.replace(/\//g, '-')
    const date = new Date(normalized)

    return isNaN(date.getTime()) ? null : date
}
