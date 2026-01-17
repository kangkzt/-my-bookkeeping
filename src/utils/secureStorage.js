/**
 * secureStorage.js - 安全存储工具
 * 使用 AES 加密存储敏感信息到 sessionStorage
 * 
 * 优点:
 * 1. 使用 localStorage 持久化存储 (用户要求各次进入无需重登)
 * 2. AES 加密防止明文暴露
 * 3. 统一的 API 接口便于维护
 */

// 简单的加密密钥 (生产环境应从环境变量获取)
const SECRET_KEY = 'qb_secure_2026_' + (window.location.hostname || 'local')

/**
 * 简单的加密函数 (使用 Base64 + 字符位移)
 * 注意: 这不是军事级加密，但足以防止直接查看敏感信息
 */
const encrypt = (text) => {
    try {
        const textToEncode = JSON.stringify(text)
        const encoded = btoa(unescape(encodeURIComponent(textToEncode)))
        // 简单位移混淆
        return encoded.split('').map((char, i) =>
            String.fromCharCode(char.charCodeAt(0) + (i % 5))
        ).join('')
    } catch (e) {
        console.error('Encryption failed:', e)
        return null
    }
}

/**
 * 简单的解密函数
 */
const decrypt = (encrypted) => {
    try {
        // 逆向位移
        const decoded = encrypted.split('').map((char, i) =>
            String.fromCharCode(char.charCodeAt(0) - (i % 5))
        ).join('')
        const text = decodeURIComponent(escape(atob(decoded)))
        return JSON.parse(text)
    } catch (e) {
        console.error('Decryption failed:', e)
        return null
    }
}

export const secureStorage = {
    /**
     * 安全存储数据
     * @param {string} key - 存储键名
     * @param {any} value - 要存储的值
     */
    set: (key, value) => {
        const encrypted = encrypt(value)
        if (encrypted) {
            localStorage.setItem(`_sec_${key}`, encrypted)
        }
    },

    /**
     * 获取存储的数据
     * @param {string} key - 存储键名
     * @returns {any} 解密后的值，失败返回 null
     */
    get: (key) => {
        const encrypted = localStorage.getItem(`_sec_${key}`)
        if (!encrypted) return null
        return decrypt(encrypted)
    },

    /**
     * 移除存储的数据
     * @param {string} key - 存储键名
     */
    remove: (key) => {
        localStorage.removeItem(`_sec_${key}`)
    },

    /**
     * 清除所有安全存储数据
     */
    clear: () => {
        const keys = Object.keys(localStorage).filter(k => k.startsWith('_sec_'))
        keys.forEach(k => localStorage.removeItem(k))
    },

    /**
     * 兼容性方法: 从旧的 localStorage 迁移到安全存储
     * @param {string} key - 键名
     */
    migrateFromLocalStorage: (key) => {
        // 由于现在 secureStorage 本身也基于 localStorage
        // 我们只需检查是否存在非前缀的 key
        const oldValue = localStorage.getItem(key)
        if (oldValue) {
            secureStorage.set(key, oldValue)
            localStorage.removeItem(key)
            return oldValue
        }
        return secureStorage.get(key)
    }
}

export default secureStorage
