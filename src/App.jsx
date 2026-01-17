import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './pages/Home'
import Records from './pages/Records'
import Statistics from './pages/Statistics'
import Settings from './pages/Settings'
import AddTransaction from './pages/AddTransaction'
import Accounts from './pages/Accounts'
import Budget from './pages/Budget'
import Projects from './pages/Projects'
import CalendarView from './pages/CalendarView'
import Members from './pages/Members'
import CategoryTags from './pages/CategoryTags'
import CategoryManage from './pages/CategoryManage'
import Recurring from './pages/Recurring'
import Merchants from './pages/Merchants'
import Templates from './pages/Templates'
import ImportData from './pages/ImportData'
import BookkeepingSettings from './pages/BookkeepingSettings'
import BookList from './pages/BookList'
import Login from './pages/Login'
import Navigation from './components/Navigation'
import { initDB, getDB } from './db/database'
import { addTransaction } from './db/stores'
import { secureStorage } from './utils/secureStorage'
import { logger } from './utils/logger'

function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const [dbReady, setDbReady] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            // 优先从 secureStorage 获取，兼容从 localStorage 迁移
            const userId = secureStorage.get('user_id') || secureStorage.migrateFromLocalStorage('user_id')
            const dbName = secureStorage.get('current_db_name') || secureStorage.migrateFromLocalStorage('current_db_name')
            const isPublicRoute = ['/login'].includes(location.pathname)
            const isBookList = location.pathname === '/books'

            // 1. 未登录处理
            if (!userId) {
                if (isPublicRoute) {
                    // 在登录页，无需数据库
                    setDbReady(true)
                    setLoading(false)
                    return
                } else {
                    // 其他页面重定向到登录
                    // setLoading(false) // 保持 Loading 状态直到跳转完成
                    return navigate('/login')
                }
            }

            // 2. 已登录处理
            if (userId) {
                // 如果在账本列表页，无需初始化主数据库
                if (isBookList) {
                    setDbReady(true)
                    setLoading(false)
                    return
                }

                // 如果未选择账本，且不在账本页，强制跳转
                if (!dbName) {
                    // setLoading(false) // 保持 Loading 状态直到跳转完成
                    return navigate('/books')
                }

                // 初始化选定的账本数据库
                try {
                    await initDB(dbName)
                    setDbReady(true)
                    checkRecurringRules()
                } catch (error) {
                    logger.error('数据库初始化失败:', error)
                    // dbReady 保持 false，显示错误页
                } finally {
                    setLoading(false)
                }
            }
        }
        init()
    }, [navigate, location.pathname])

    // ... (rest of code)

    // 检查并执行周期记账规则
    const checkRecurringRules = async () => {
        try {
            const db = getDB()
            // 确保 recurring_rules store 存在 (兼容旧版本 DB)
            if (!db.objectStoreNames.contains('recurring_rules')) return

            const rules = await db.getAll('recurring_rules')
            const today = new Date()
            const currentMonthKey = `${today.getFullYear()}-${today.getMonth() + 1}`
            const currentDay = today.getDate()

            for (const rule of rules) {
                // 检查上次运行时间
                let alreadyRunThisMonth = false
                if (rule.lastRun) {
                    const lastDate = new Date(rule.lastRun)
                    const lastMonthKey = `${lastDate.getFullYear()}-${lastDate.getMonth() + 1}`
                    if (lastMonthKey === currentMonthKey) {
                        alreadyRunThisMonth = true
                    }
                }

                // 如果本月没运行，且今天 >= 设定日期
                if (!alreadyRunThisMonth && currentDay >= rule.day) {
                    console.log(`执行自动记账: ${rule.remark}`)

                    // 构建交易数据
                    const transaction = {
                        type: rule.type,
                        amount: rule.amount,
                        categoryId: rule.categoryId,
                        accountId: rule.accountId,
                        date: new Date().toISOString(), // 记录为当前时间
                        remark: rule.remark + ' (自动记账)',
                        fromAccountId: rule.fromAccountId,
                        toAccountId: rule.toAccountId
                    }

                    // 1. 添加交易
                    await addTransaction(transaction)

                    // 2. 更新规则的 lastRun
                    rule.lastRun = new Date().toISOString()
                    await db.put('recurring_rules', rule)
                }
            }
        } catch (error) {
            logger.error('周期记账检查失败:', error)
        }
    }

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loading-spinner"></div>
                <p>加载中...</p>
                <style>{`
          .loading-screen {
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 16px;
            color: #999;
            background: #f5f6fa;
          }
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 3px solid #eee;
            border-top-color: #FFB800;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
            </div>
        )
    }

    if (!dbReady) {
        return (
            <div className="error-screen">
                <p>数据库初始化失败，请刷新页面重试</p>
            </div>
        )
    }

    const showNav = ['/', '/records', '/statistics', '/calendar', '/settings'].includes(location.pathname)

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/records" element={<Records />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/bookkeeping" element={<BookkeepingSettings />} />
                <Route path="/recurring" element={<Recurring />} />
                <Route path="/add" element={<AddTransaction />} />
                <Route path="/add/:type" element={<AddTransaction />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/members" element={<Members />} />
                <Route path="/category-tags" element={<CategoryTags />} />
                <Route path="/category-manage" element={<CategoryManage />} />
                <Route path="/merchants" element={<Merchants />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/import" element={<ImportData />} />
                <Route path="/login" element={<Login />} />
                <Route path="/books" element={<BookList />} />
            </Routes>
            {showNav && <Navigation />}
        </div>
    )
}

export default App
