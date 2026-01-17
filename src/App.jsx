import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect, lazy, Suspense } from 'react'
import Home from './pages/Home'
import Navigation from './components/Navigation'
import { initDB, getDB } from './db/database'
import { addTransaction } from './db/stores'
import { secureStorage } from './utils/secureStorage'
import { logger } from './utils/logger'

// Lazy load larger pages for code splitting
const Records = lazy(() => import('./pages/Records'))
const Statistics = lazy(() => import('./pages/Statistics'))
const Settings = lazy(() => import('./pages/Settings'))
const AddTransaction = lazy(() => import('./pages/AddTransaction'))
const Accounts = lazy(() => import('./pages/Accounts'))
const Budget = lazy(() => import('./pages/Budget'))
const Projects = lazy(() => import('./pages/Projects'))
const CalendarView = lazy(() => import('./pages/CalendarView'))
const Members = lazy(() => import('./pages/Members'))
const CategoryTags = lazy(() => import('./pages/CategoryTags'))
const CategoryManage = lazy(() => import('./pages/CategoryManage'))
const Recurring = lazy(() => import('./pages/Recurring'))
const Merchants = lazy(() => import('./pages/Merchants'))
const Templates = lazy(() => import('./pages/Templates'))
const ImportData = lazy(() => import('./pages/ImportData'))
const BookkeepingSettings = lazy(() => import('./pages/BookkeepingSettings'))
const BookList = lazy(() => import('./pages/BookList'))
const Login = lazy(() => import('./pages/Login'))

// Loading fallback component
const PageLoader = () => (
    <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f6fa'
    }}>
        <div style={{
            width: 32,
            height: 32,
            border: '3px solid #eee',
            borderTopColor: '#FFB800',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }} />
    </div>
)

function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const [dbReady, setDbReady] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const init = async () => {
            // 优先从 secureStorage 获取 (异步API)
            const userId = await secureStorage.get('user_id')
            const dbName = await secureStorage.get('current_db_name')
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

    const showNav = ['/records', '/statistics', '/calendar', '/settings'].includes(location.pathname)

    return (
        <div className="app">
            <Suspense fallback={<PageLoader />}>
                <Routes>
                    <Route path="/" element={<Records />} />
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
            </Suspense>
            {showNav && <Navigation />}
        </div>
    )
}

export default App
