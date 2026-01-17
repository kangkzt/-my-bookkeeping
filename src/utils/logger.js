/**
 * logger.js - 统一日志工具
 * 
 * 功能:
 * 1. 开发环境打印详细日志
 * 2. 生产环境仅记录错误
 * 3. 统一日志格式，便于筛选
 */

const isDev = import.meta.env.DEV

// 日志前缀
const PREFIX = '[QB]'

/**
 * 日志工具对象
 */
export const logger = {
    /**
     * 普通日志 (仅开发环境)
     */
    log: (...args) => {
        if (isDev) {
            console.log(PREFIX, ...args)
        }
    },

    /**
     * 信息日志 (仅开发环境)
     */
    info: (...args) => {
        if (isDev) {
            console.info(`${PREFIX} ℹ️`, ...args)
        }
    },

    /**
     * 警告日志 (仅开发环境)
     */
    warn: (...args) => {
        if (isDev) {
            console.warn(`${PREFIX} ⚠️`, ...args)
        }
    },

    /**
     * 错误日志 (始终记录)
     */
    error: (...args) => {
        console.error(`${PREFIX} ❌`, ...args)
    },

    /**
     * 调试日志 (仅开发环境，带时间戳)
     */
    debug: (...args) => {
        if (isDev) {
            const timestamp = new Date().toISOString().slice(11, 23)
            console.log(`${PREFIX} [${timestamp}]`, ...args)
        }
    },

    /**
     * 性能计时开始
     * @param {string} label - 计时标签
     */
    time: (label) => {
        if (isDev) {
            console.time(`${PREFIX} ⏱️ ${label}`)
        }
    },

    /**
     * 性能计时结束
     * @param {string} label - 计时标签
     */
    timeEnd: (label) => {
        if (isDev) {
            console.timeEnd(`${PREFIX} ⏱️ ${label}`)
        }
    },

    /**
     * 分组日志开始
     * @param {string} label - 分组标签
     */
    group: (label) => {
        if (isDev) {
            console.group(`${PREFIX} 📁 ${label}`)
        }
    },

    /**
     * 分组日志结束
     */
    groupEnd: () => {
        if (isDev) {
            console.groupEnd()
        }
    },

    /**
     * 表格日志
     * @param {Array|Object} data - 要显示的数据
     */
    table: (data) => {
        if (isDev) {
            console.table(data)
        }
    }
}

export default logger
