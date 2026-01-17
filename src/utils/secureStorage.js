/**
 * secureStorage.js - 安全存储工具
 * 使用 Web Crypto API (AES-GCM) 加密存储敏感信息到 localStorage
 * 
 * 优点:
 * 1. 使用 localStorage 持久化存储 (用户要求各次进入无需重登)
 * 2. AES-GCM 256位加密，安全级别高
 * 3. 统一的 API 接口便于维护
 */

// 加密配置
const ALGORITHM = 'AES-GCM'
const KEY_LENGTH = 256
const IV_LENGTH = 12 // GCM 推荐 12 bytes

/**
 * 从密码派生加密密钥
 */
const deriveKey = async () => {
    const baseKey = 'qb_secure_2026_' + (window.location.hostname || 'local')
    const encoder = new TextEncoder()
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(baseKey),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    )

    return await crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: encoder.encode('qb_salt_v2'),
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: ALGORITHM, length: KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
    )
}

// 缓存密钥以避免重复派生
let cachedKey = null
const getKey = async () => {
    if (!cachedKey) {
        cachedKey = await deriveKey()
    }
    return cachedKey
}

/**
 * AES-GCM 加密
 */
const encrypt = async (text) => {
    try {
        const key = await getKey()
        const encoder = new TextEncoder()
        const data = encoder.encode(JSON.stringify(text))

        // 生成随机 IV
        const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))

        // 加密
        const encrypted = await crypto.subtle.encrypt(
            { name: ALGORITHM, iv },
            key,
            data
        )

        // 组合 IV + 密文为单个字符串
        const combined = new Uint8Array(iv.length + encrypted.byteLength)
        combined.set(iv)
        combined.set(new Uint8Array(encrypted), iv.length)

        // Base64 编码
        return btoa(String.fromCharCode(...combined))
    } catch (e) {
        console.error('Encryption failed:', e)
        return null
    }
}

/**
 * AES-GCM 解密
 */
const decrypt = async (encryptedBase64) => {
    try {
        const key = await getKey()

        // Base64 解码
        const combined = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0))

        // 分离 IV 和密文
        const iv = combined.slice(0, IV_LENGTH)
        const encrypted = combined.slice(IV_LENGTH)

        // 解密
        const decrypted = await crypto.subtle.decrypt(
            { name: ALGORITHM, iv },
            key,
            encrypted
        )

        const decoder = new TextDecoder()
        return JSON.parse(decoder.decode(decrypted))
    } catch (e) {
        console.error('Decryption failed:', e)
        return null
    }
}

/**
 * 兼容旧版数据的解密 (Base64 + 位移)
 */
const decryptLegacy = (encrypted) => {
    try {
        const decoded = encrypted.split('').map((char, i) =>
            String.fromCharCode(char.charCodeAt(0) - (i % 5))
        ).join('')
        const text = decodeURIComponent(escape(atob(decoded)))
        return JSON.parse(text)
    } catch (e) {
        return null
    }
}

export const secureStorage = {
    /**
     * 安全存储数据 (异步)
     * @param {string} key - 存储键名
     * @param {any} value - 要存储的值
     */
    set: async (key, value) => {
        const encrypted = await encrypt(value)
        if (encrypted) {
            localStorage.setItem(`_sec_v2_${key}`, encrypted)
            // 删除旧版数据
            localStorage.removeItem(`_sec_${key}`)
        }
    },

    /**
     * 获取存储的数据 (异步)
     * @param {string} key - 存储键名
     * @returns {Promise<any>} 解密后的值，失败返回 null
     */
    get: async (key) => {
        // 优先尝试新版加密
        const encryptedV2 = localStorage.getItem(`_sec_v2_${key}`)
        if (encryptedV2) {
            return await decrypt(encryptedV2)
        }

        // 回退到旧版加密 (兼容)
        const encryptedV1 = localStorage.getItem(`_sec_${key}`)
        if (encryptedV1) {
            const value = decryptLegacy(encryptedV1)
            if (value !== null) {
                // 迁移到新版加密
                await secureStorage.set(key, value)
                return value
            }
        }

        return null
    },

    /**
     * 移除存储的数据
     * @param {string} key - 存储键名
     */
    remove: (key) => {
        localStorage.removeItem(`_sec_v2_${key}`)
        localStorage.removeItem(`_sec_${key}`)
    },

    /**
     * 清除所有安全存储数据
     */
    clear: () => {
        const keys = Object.keys(localStorage).filter(k =>
            k.startsWith('_sec_v2_') || k.startsWith('_sec_')
        )
        keys.forEach(k => localStorage.removeItem(k))
    },

    /**
     * 同步版本的 get (用于初始化时无法 await 的场景)
     * 只尝试读取旧版数据，新版需要异步
     */
    getSync: (key) => {
        const encryptedV1 = localStorage.getItem(`_sec_${key}`)
        if (encryptedV1) {
            return decryptLegacy(encryptedV1)
        }
        return null
    }
}

export default secureStorage
