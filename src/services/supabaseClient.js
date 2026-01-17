/**
 * supabaseClient.js - Supabase 客户端初始化
 * 
 * 用于云端数据同步功能
 */

import { createClient } from '@supabase/supabase-js'
import { logger } from '../utils/logger'

// 从环境变量获取配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 检查配置是否存在
const isConfigured = supabaseUrl && supabaseKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    supabaseKey !== 'your-anon-key'

/**
 * Supabase 客户端实例
 * 如果未配置则为 null
 */
export const supabase = isConfigured
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
    : null

/**
 * 检查 Supabase 是否已配置
 */
export const isSupabaseConfigured = () => isConfigured

/**
 * 获取当前登录用户
 */
export const getCurrentUser = async () => {
    if (!supabase) return null
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

/**
 * 使用邮箱密码登录
 */
export const signInWithEmail = async (email, password) => {
    if (!supabase) throw new Error('Supabase 未配置')
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    if (error) throw error
    return data
}

/**
 * 使用邮箱密码注册
 */
export const signUpWithEmail = async (email, password) => {
    if (!supabase) throw new Error('Supabase 未配置')
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    if (error) throw error
    return data
}

/**
 * 登出
 */
export const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
}

/**
 * 监听认证状态变化
 */
export const onAuthStateChange = (callback) => {
    if (!supabase) return () => { }
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback)
    return () => subscription.unsubscribe()
}

/**
 * 测试 Supabase 连接
 */
export const testConnection = async () => {
    if (!supabase) return { success: false, error: 'Supabase 未配置' }

    try {
        // 尝试查询一个不存在的表来测试连接
        const { error } = await supabase.from('_test_connection').select('*').limit(1)
        // 如果是 "relation does not exist" 错误，说明连接成功
        if (error && error.code === '42P01') {
            return { success: true }
        }
        if (error) {
            return { success: false, error: error.message }
        }
        return { success: true }
    } catch (e) {
        logger.error('Supabase connection test failed:', e)
        return { success: false, error: e.message }
    }
}

export default supabase
