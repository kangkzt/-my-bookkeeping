import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ChevronLeft, Filter, X, Calendar, BarChart2 } from 'lucide-react'
import { Chart, Doughnut, Line, Bar } from 'react-chartjs-2'
import { useSwipeable } from 'react-swipeable' // Import
import { getDB } from '../db/database'
import { getAllTransactions, getYearlyStatsCached, getTransactionsByDateRange, getTransactionsByYear } from '../db/stores'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler, BarController, LineController } from 'chart.js'
import DatePickerModal from '../components/DatePickerModal'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler, BarController, LineController)

const TABS = [
    { key: 'basic', label: '基础统计' },
    { key: 'category', label: '分类' },
    { key: 'merchant', label: '商家' },
    { key: 'project', label: '项目' },
    { key: 'member', label: '成员' },
    { key: 'account', label: '账户' }
]

function Statistics() {
    const navigate = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const initialTab = queryParams.get('tab') || 'basic'
    const [activeTab, setActiveTab] = useState(initialTab)

    // Swipe Logic
    const handlers = useSwipeable({
        onSwipedLeft: () => switchTab('next'),
        onSwipedRight: () => switchTab('prev'),
        preventScrollOnSwipe: true,
        trackMouse: true,
        delta: 50,
        swipeDuration: 500,
        touchEventOptions: { passive: false }
    })

    const switchTab = (direction) => {
        const currentIndex = TABS.findIndex(t => t.key === activeTab)
        let newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
        if (newIndex < 0) newIndex = TABS.length - 1
        if (newIndex >= TABS.length) newIndex = 0
        setActiveTab(TABS[newIndex].key)
    }

    const [transactions, setTransactions] = useState([])
    const [accounts, setAccounts] = useState([])
    const [categories, setCategories] = useState([])

    // Date Init Logic
    const yearParam = queryParams.get('year')
    const monthParam = queryParams.get('month')
    const rangeParam = queryParams.get('range')

    const [currentDate, setCurrentDate] = useState(() => {
        if (yearParam && monthParam) return new Date(Number(yearParam), Number(monthParam) - 1, 1)
        if (yearParam) return new Date(Number(yearParam), 0, 1) // If only year is passed
        const now = new Date()
        return new Date(now.getFullYear(), now.getMonth(), 1) // Default to 1st of month
    })

    const [dateMode, setDateMode] = useState(rangeParam === 'year' ? 'year' : rangeParam === 'custom' ? 'custom' : 'month')
    const [customStart, setCustomStart] = useState(queryParams.get('start') || new Date().toISOString().slice(0, 10))
    const [customEnd, setCustomEnd] = useState(queryParams.get('end') || new Date().toISOString().slice(0, 10))
    // Custom Calendar Modal State
    const [calendarOpen, setCalendarOpen] = useState(false)
    const [calendarTarget, setCalendarTarget] = useState('start') // 'start' or 'end'

    const [timeView, setTimeView] = useState('monthly') // visual style: 'monthly' (trend), 'weekly' (bar)
    const [showDatePicker, setShowDatePicker] = useState(false)

    // Synchronize state with URL parameters
    useEffect(() => {
        const y = queryParams.get('year')
        const m = queryParams.get('month')
        const r = queryParams.get('range')
        if (y && m) setCurrentDate(new Date(Number(y), Number(m) - 1, 1))
        else if (y) setCurrentDate(new Date(Number(y), 0, 1))

        if (r === 'year') setDateMode('year')
        else if (r === 'custom') setDateMode('custom')
        else if (r === 'month') setDateMode('month')
    }, [location.search])

    // Helper to format date range display
    // Helper to format date range display
    const getDateDisplay = () => {
        if (dateMode === 'custom') return `${customStart} ~ ${customEnd}`
        const y = currentDate.getFullYear()
        if (dateMode === 'year') return `${y}年`
        const m = currentDate.getMonth() + 1
        return `${y}年${m}月`
    }

    const changeDate = (delta) => {
        if (dateMode === 'custom') return
        const newDate = new Date(currentDate)
        if (dateMode === 'year') {
            newDate.setFullYear(newDate.getFullYear() + delta)
        } else {
            // Fix Month Overflow Bug (Jan 31 -> Feb 28/Mar 3)
            newDate.setDate(1)
            newDate.setMonth(newDate.getMonth() + delta)
        }
        setCurrentDate(newDate)
    }

    const toggleDateMode = () => {
        setDateMode(prev => prev === 'year' ? 'month' : 'year')
    }

    // I need to see loadData first.
    const [catType, setCatType] = useState('expense') // For Category Tab

    // ... (previous code)

    // Data States
    const [basicData, setBasicData] = useState(null)
    const [weeklyData, setWeeklyData] = useState(null)
    const [projectData, setProjectData] = useState(null)
    const [showAllIncome, setShowAllIncome] = useState(false)
    const [showAllExpense, setShowAllExpense] = useState(false)
    const [memberData, setMemberData] = useState(null)
    const [accountData, setAccountData] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const [showAllCatExpense, setShowAllCatExpense] = useState(false)
    const [showAllCatIncome, setShowAllCatIncome] = useState(false)
    const [showAllAssets, setShowAllAssets] = useState(false)
    const [merchantData, setMerchantData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadData()
    }, [activeTab, timeView, currentDate, dateMode, customStart, customEnd])

    const getDateRangeForBasic = () => {
        if (dateMode === 'custom') return { start: `${customStart}T00:00:00`, end: `${customEnd}T23:59:59` }
        const y = currentDate.getFullYear()
        if (dateMode === 'year') return { start: `${y}-01-01T00:00:00`, end: `${y}-12-31T23:59:59` }
        const m = String(currentDate.getMonth() + 1).padStart(2, '0')
        const lastDay = new Date(y, currentDate.getMonth() + 1, 0).getDate()
        return { start: `${y}-${m}-01T00:00:00`, end: `${y}-${m}-${lastDay}T23:59:59` }
    }

    const loadData = async () => {
        setLoading(true)
        const db = getDB()
        try {
            // ... (keep existing code hidden here)
            // But I can't keep hidden code in replace_file_content if I span multiple lines.
            // I should target specific blocks.
            const { start, end } = getDateRangeForBasic()
            const y = currentDate.getFullYear()
            const m = currentDate.getMonth() + 1

            // Optimization: Load Cached Stats First for Instant Feedback (Both Year and Month modes)
            if (activeTab === 'basic') {
                const cached = await getYearlyStatsCached(y)
                if (cached) {
                    let totalIncome = 0
                    let totalExpense = 0
                    let surplus = 0
                    let monthlyData = cached.monthlyData || []

                    if (dateMode === 'year') {
                        totalIncome = cached.totalIncome
                        totalExpense = cached.totalExpense
                        surplus = cached.surplus
                    } else {
                        // Month Mode: Extract specific month stats
                        const targetMonth = dateMode === 'custom' ? -1 : m
                        const mStat = monthlyData.find(d => d.m === targetMonth)
                        if (mStat) {
                            totalIncome = mStat.inc
                            totalExpense = mStat.exp
                            surplus = totalIncome - totalExpense
                        }
                    }

                    // Only render partial if we valid data (for month mode, might be 0 if empty, which is fine)
                    // For custom range, we skip cache optimization as it's complex
                    if (dateMode !== 'custom') {
                        const isCurrentYear = new Date().getFullYear() === y
                        let currentDays = 1
                        if (dateMode === 'year') {
                            currentDays = isCurrentYear ? Math.ceil((new Date() - new Date(y, 0, 1)) / (86400000)) : (y % 4 === 0 ? 366 : 365)
                        } else {
                            const daysInMonth = new Date(y, m, 0).getDate()
                            const isCurrentMonth = new Date().getFullYear() === y && (new Date().getMonth() + 1) === m
                            currentDays = isCurrentMonth ? new Date().getDate() : daysInMonth
                        }

                        const avgDaily = currentDays > 0 ? totalExpense / currentDays : 0
                        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

                        setBasicData({
                            surplus, totalIncome, totalExpense, count: 0,
                            avgDaily, savingsRate, budgetAmount: 0, budgetUsage: 0,
                            topIncome: [], topExpense: [],
                            monthlyData: monthlyData, // Always show full year trend
                            assets: [], liabilities: [],
                            assetsTotal: 0, liabilitiesTotal: 0,
                            dynAccs: []
                        })
                    }
                }
            }

            const [filteredTrans, allAccs, allCats, allProjects, allPersons, allBudgets] = await Promise.all([
                getTransactionsByDateRange(start, end),
                db.getAll('accounts'),
                db.getAll('categories'),
                db.objectStoreNames.contains('projects') ? db.getAll('projects') : [],
                db.getAll('persons'),
                db.objectStoreNames.contains('budgets') ? db.getAll('budgets') : []
            ])

            setCategories(allCats)


            // Re-render with full data (overwrites partial data)
            if (activeTab === 'basic') {
                processBasicData(filteredTrans, allCats, allAccs, allBudgets, y, m)
                processWeeklyData(filteredTrans)
            }
            else if (activeTab === 'project') {
                processProjectData(filteredTrans, allProjects)
            } else if (activeTab === 'member') {
                processMemberData(filteredTrans, allPersons)
            } else if (activeTab === 'account') {
                const yearTrans = await getTransactionsByYear(y)
                processAccountData(allAccs, yearTrans)
            } else if (activeTab === 'category') {
                processCategoryData(filteredTrans, allCats)
            } else if (activeTab === 'merchant') {
                processMerchantData(filteredTrans)
            }
            setLoading(false)
        } catch (error) {
            console.error('Load Error:', error)
            setLoading(false)
        }
    }

    // New: Process Weekly Data
    const processWeeklyData = (trans) => {
        // Simple strategy: Group by "Week of Year" for the current year (assume 2026 based on demo state, or just all data)
        // For better visualization, let's take the last 8 weeks or just group all by week key "YYYY-WW"

        const weekMap = {}

        trans.forEach(t => {
            const date = new Date(t.date)
            // Get week number
            const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
            const dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum);
            const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
            const key = `${d.getUTCFullYear()}-W${weekNo}`

            if (!weekMap[key]) weekMap[key] = { key, income: 0, expense: 0, label: `${weekNo}周` }

            if (t.type === 'income') weekMap[key].income += Number(t.amount)
            if (t.type === 'expense') weekMap[key].expense += Number(t.amount)
        })

        const sortedWeeks = Object.values(weekMap).sort((a, b) => a.key.localeCompare(b.key))
        // Take last 12 weeks for the chart
        const recentWeeks = sortedWeeks.slice(-12)

        setWeeklyData({
            weeks: recentWeeks,
            totalIncome: recentWeeks.reduce((s, w) => s + w.income, 0),
            totalExpense: recentWeeks.reduce((s, w) => s + w.expense, 0)
        })
    }

    const processBasicData = (trans, cats, accs, budgets, y, m) => {
        // 1. Overview
        const totalIncome = trans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount || 0), 0)
        const totalExpense = trans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount || 0), 0)
        const surplus = totalIncome - totalExpense
        const count = trans.length

        // New Metrics
        let currentDays = 1
        if (dateMode === 'year') {
            const isCurrentYear = new Date().getFullYear() === y
            if (isCurrentYear) {
                const now = new Date()
                const startOfYear = new Date(y, 0, 1)
                currentDays = Math.ceil((now - startOfYear) / (1000 * 60 * 60 * 24))
            } else {
                currentDays = (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) ? 366 : 365
            }
        } else {
            const daysInMonth = new Date(y, m, 0).getDate()
            const isCurrentMonth = new Date().getFullYear() === y && (new Date().getMonth() + 1) === m
            currentDays = isCurrentMonth ? new Date().getDate() : daysInMonth
        }

        const avgDaily = totalExpense / currentDays
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0

        // Budget usage
        const currentBudget = budgets?.find(b => b.year === y && b.month === m) || budgets?.find(b => b.isDefault)
        const budgetAmount = currentBudget ? (dateMode === 'year' ? Number(currentBudget.amount || 0) * 12 : Number(currentBudget.amount || 0)) : 0
        const budgetUsage = budgetAmount > 0 ? (totalExpense / budgetAmount) * 100 : 0

        // 2. Income Sources (Top 3)
        const incCats = {}
        trans.filter(t => t.type === 'income').forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            incCats[key] = (incCats[key] || 0) + Number(t.amount)
        })
        let topIncome = Object.keys(incCats).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', id: Number(cid) }
            return { name: cat.name, subName, icon: cat.icon, amount: incCats[key], id: cat.id }
        }).sort((a, b) => b.amount - a.amount).slice(0, 3)

        // 3. Expense Distribution (Top 5 for carousel)
        const expCats = {}
        trans.filter(t => t.type === 'expense').forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            expCats[key] = (expCats[key] || 0) + Number(t.amount)
        })
        let topExpense = Object.keys(expCats).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', id: Number(cid) }
            return { name: cat.name, subName, icon: cat.icon, amount: expCats[key], id: cat.id, color: cat.color }
        }).sort((a, b) => b.amount - a.amount).slice(0, 5)

        // 4. Monthly Trend
        const months = Array.from({ length: 12 }, (_, i) => i + 1)
        const monthlyData = months.map(monthNum => {
            const mTrans = trans.filter(t => new Date(t.date).getMonth() + 1 === monthNum)
            const inc = mTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = mTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            return { m: monthNum, inc, exp }
        })

        // 5. Account Stats
        const dynAccs = accs.map(acc => {
            let bal = Number(acc.balance || 0)
            trans.forEach(t => {
                const amt = Number(t.amount)
                if (t.accountId === acc.id) {
                    if (t.type === 'expense') bal -= amt
                    if (t.type === 'income') bal += amt
                    if (t.type === 'transfer') bal -= amt
                }
                if (t.toAccountId === acc.id && t.type === 'transfer') bal += amt
            })
            return { ...acc, _bal: bal }
        })

        const assets = dynAccs.filter(a => !['credit_card', 'loan'].includes(a.type))
        const liabilities = dynAccs.filter(a => ['credit_card', 'loan'].includes(a.type))
        const assetsTotal = assets.reduce((s, a) => s + a._bal, 0)
        const liabilitiesTotal = Math.abs(liabilities.reduce((s, a) => s + a._bal, 0))

        setBasicData({
            surplus, totalIncome, totalExpense, count,
            avgDaily, savingsRate, budgetAmount, budgetUsage,
            topIncome, topExpense,
            monthlyData,
            assets, liabilities,
            assetsTotal, liabilitiesTotal,
            dynAccs
        })
    }

    // ... (rest of process functions unchanged)
    const processProjectData = (trans, projects) => {
        const totalIncome = trans.filter(t => t.type === 'income' && t.projectId).reduce((s, t) => s + Number(t.amount), 0)
        const totalExpense = trans.filter(t => t.type === 'expense' && t.projectId).reduce((s, t) => s + Number(t.amount), 0)
        const totalSurplus = totalIncome - totalExpense
        const totalCount = trans.filter(t => t.projectId).length

        const list = projects.map(p => {
            const pTrans = trans.filter(t => t.projectId === p.id)
            const inc = pTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = pTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            return {
                id: p.id,
                name: p.name,
                icon: p.icon,
                inc,
                exp,
                surplus: inc - exp,
                count: pTrans.length
            }
        })

        setProjectData({
            totalSurplus, totalIncome, totalExpense, totalCount,
            list,
            surplusList: [...list].sort((a, b) => b.surplus - a.surplus),
            incomeList: list.filter(p => p.inc > 0).sort((a, b) => b.inc - a.inc),
            expenseList: list.filter(p => p.exp > 0).sort((a, b) => b.exp - a.exp)
        })
    }

    const processMemberData = (trans, persons) => {
        const list = persons.map(p => {
            const pTrans = trans.filter(t => t.personId === p.id)
            const inc = pTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = pTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            return {
                id: p.id,
                name: p.name,
                icon: p.avatar,
                inc,
                exp,
                balance: inc - exp,
                count: pTrans.length
            }
        })

        const totalIncome = trans.filter(t => t.type === 'income' && t.personId).reduce((s, t) => s + Number(t.amount), 0)
        const totalExpense = trans.filter(t => t.type === 'expense' && t.personId).reduce((s, t) => s + Number(t.amount), 0)
        const totalCount = trans.filter(t => t.personId).length

        setMemberData({
            list,
            totalIncome, totalExpense, totalCount,
            incomeList: list.filter(p => p.inc > 0).sort((a, b) => b.inc - a.inc),
            expenseList: list.filter(p => p.exp > 0).sort((a, b) => b.exp - a.exp)
        })
    }

    const processAccountData = (accs, trans) => {
        // 1. Calculate Current Balances for all accounts
        // Note: 'trans' here should efficiently be ALL transactions to be accurate, 
        // but typically we only have filteredTrans. 
        // IF we assume acc.balance is the INITIAL balance when account was created, 
        // then Current Balance = Initial + Sum(All History).
        // IF 'acc.balance' in DB is updated real-time, then it IS the Current Balance.
        // Let's assume acc.balance from DB is the current live balance (Best Practice).

        const dynAccs = accs.map(acc => ({ ...acc, _bal: Number(acc.balance || 0) }))

        // 2. Split Assets and Liabilities
        // Typically: Credit Card, Loan -> Liability. Others -> Asset.
        const assetsList = dynAccs.filter(a => !['credit_card', 'loan'].includes(a.type) && a._bal >= 0).sort((a, b) => b._bal - a._bal)
        const liabilitiesList = dynAccs.filter(a => ['credit_card', 'loan'].includes(a.type) || a._bal < 0).sort((a, b) => a._bal - b._bal) // Sort liabilities (usually negative)

        const assetsTotal = assetsList.reduce((s, a) => s + a._bal, 0)
        const liabilitiesTotal = Math.abs(liabilitiesList.reduce((s, a) => s + a._bal, 0))
        const netAssets = assetsTotal - liabilitiesTotal

        // 3. Calculate Trend (Back-calculation method)
        // We start with Current Net Assets and work backwards month by month.
        // Needed: Transactions for the current year (or the selected range). 
        // If 'trans' passed in is already filtered by date range, we can use it.
        // Assuming 'trans' contains the relevant year's data.

        const trend = []
        let currentNet = netAssets

        // We need 12 data points for the year.
        // If we are in the middle of the year, future months should match current net (flat line) or be null?
        // Design shows 01-12 months.

        const now = new Date()
        const currentYear = currentDate.getFullYear()

        // Buckets for monthly net flow
        const monthlyFlow = Array(13).fill(0) // Index 1-12

        trans.forEach(t => {
            const d = new Date(t.date)
            if (d.getFullYear() === currentYear) {
                const m = d.getMonth() + 1
                const amt = Number(t.amount)
                if (t.type === 'income') monthlyFlow[m] += amt
                if (t.type === 'expense') monthlyFlow[m] -= amt
                // Transfers between asset/liability affect net worth? 
                // Asset -> Liability (Pay off card) : Net Worth unchanged (Asset down, Liability down/up)
                // Actually strictly: Net Worth = Assets - Liabilities.
                // Income increases Net Worth. Expense decreases it.
                // Transfers do not change Net Worth.
            }
        })

        // Reconstruct trend
        // Month X Balance = Month (X-1) Balance + Month X Flow
        // Or: Month 12 Balance = Current
        // Month 11 Balance = Month 12 Balance - Month 12 Flow

        const monthlyBalances = Array(13).fill(0)
        // We know the End of Year Balance (Projected) = Current Net (Approximation)
        // Actually, Current Net is "Now".
        // Let's assume flow is correct.

        // Forward calculation from an unknown start? No.
        // Backward calculation from Current.

        let runningBal = currentNet
        // If current date is inside the year, 'currentNet' is the balance at 'now'.
        // Future flows are 0 (unless planned).
        // Past flows are in 'trans'.

        // Fill backwards from Current Month
        const currentMonth = now.getFullYear() === currentYear ? now.getMonth() + 1 : 12

        monthlyBalances[currentMonth] = currentNet

        for (let m = currentMonth; m > 1; m--) {
            // Bal(m-1) = Bal(m) - Flow(m)
            monthlyBalances[m - 1] = monthlyBalances[m] - monthlyFlow[m]
        }

        // Fill forward (projection)
        for (let m = currentMonth + 1; m <= 12; m++) {
            monthlyBalances[m] = monthlyBalances[m - 1] // Flat line
        }

        setAccountData({
            assetsList,
            liabilitiesList,
            assetsTotal,
            liabilitiesTotal,
            netAssets,
            trend: monthlyBalances.slice(1) // 0-index is empty
        })
    }

    const processCategoryData = (trans, cats, type) => {
        // 处理支出数据
        const expenseFiltered = trans.filter(t => t.type === 'expense')
        const expenseTotal = expenseFiltered.reduce((s, t) => s + Number(t.amount), 0)
        const expenseCount = expenseFiltered.length
        const expenseMap = {}
        expenseFiltered.forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            expenseMap[key] = (expenseMap[key] || 0) + Number(t.amount)
        })
        const expenseList = Object.keys(expenseMap).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', color: '#ccc' }
            return {
                id: Number(cid),
                name: cat.name,
                subName,
                icon: cat.icon,
                color: cat.color || '#FF9500',
                amount: expenseMap[key],
                percent: expenseTotal > 0 ? (expenseMap[key] / expenseTotal) : 0
            }
        }).sort((a, b) => b.amount - a.amount)

        // 处理收入数据
        const incomeFiltered = trans.filter(t => t.type === 'income')
        const incomeTotal = incomeFiltered.reduce((s, t) => s + Number(t.amount), 0)
        const incomeCount = incomeFiltered.length
        const incomeMap = {}
        incomeFiltered.forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            incomeMap[key] = (incomeMap[key] || 0) + Number(t.amount)
        })
        const incomeList = Object.keys(incomeMap).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', color: '#ccc' }
            return {
                id: Number(cid),
                name: cat.name,
                subName,
                icon: cat.icon,
                color: cat.color || '#4ECDC4',
                amount: incomeMap[key],
                percent: incomeTotal > 0 ? (incomeMap[key] / incomeTotal) : 0
            }
        }).sort((a, b) => b.amount - a.amount)

        setCategoryData({
            expense: { total: expenseTotal, count: expenseCount, list: expenseList },
            income: { total: incomeTotal, count: incomeCount, list: incomeList }
        })
    }

    const processMerchantData = (trans) => {
        const merchants = {}
        let totalIncome = 0
        let totalExpense = 0
        let totalCount = 0

        trans.forEach(t => {
            if (!t.merchantName) return
            const key = t.merchantName
            if (!merchants[key]) merchants[key] = { name: key, inc: 0, exp: 0, count: 0 }

            const amt = Number(t.amount)
            if (t.type === 'income') {
                merchants[key].inc += amt
                totalIncome += amt
            } else if (t.type === 'expense') {
                merchants[key].exp += amt
                totalExpense += amt
            }
            merchants[key].count++
            totalCount++
        })

        const list = Object.values(merchants)

        setMerchantData({
            list,
            totalIncome, totalExpense, totalCount,
            incomeList: list.filter(m => m.inc > 0).sort((a, b) => b.inc - a.inc),
            expenseList: list.filter(m => m.exp > 0).sort((a, b) => b.exp - a.exp)
        })
    }

    const formatAmount = (val) => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)

    const getLink = (params) => {
        let url = `/records?range=${dateMode}`
        if (dateMode === 'custom') {
            url += `&start=${customStart}&end=${customEnd}`
        } else {
            const y = currentDate.getFullYear()
            const m = String(currentDate.getMonth() + 1).padStart(2, '0')
            url += `&date=${y}-${m}-01`
        }
        Object.keys(params).forEach(k => {
            if (params[k]) url += `&${k}=${params[k]}`
        })
        return url
    }

    return (
        <div className="page statistics-page" {...handlers}>
            <div className="page-header" style={{ display: 'flex', alignItems: 'center', paddingBottom: 0 }}>
                <button className="back-btn" onClick={() => navigate(-1)} style={{ zIndex: 10, paddingLeft: 16, paddingRight: 4 }}><ArrowLeft size={22} /></button>
                <div className="tabs-scroll" style={{ flex: 1, paddingLeft: 0 }}>
                    {TABS.map(tab => (
                        <div key={tab.key} className={`tab-item ${activeTab === tab.key ? 'active' : ''}`} onClick={() => setActiveTab(tab.key)}>
                            {tab.label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="date-filter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '12px 0' }}>
                {dateMode !== 'custom' && (
                    <button className="nav-arrow" onClick={() => changeDate(-1)} style={{ background: 'var(--bg-card)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: 'var(--text-secondary)' }}>
                        <ChevronLeft size={18} />
                    </button>
                )}
                <div className="date-display-wrapper" onClick={() => setShowDatePicker(true)}
                    style={{
                        background: 'var(--bg-card)',
                        padding: '8px 20px',
                        borderRadius: 24,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0,0,0,0.02)'
                    }}>
                    <span className="date-display" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                        <Calendar size={16} color="#FFB800" /> {getDateDisplay()}
                    </span>
                    <span className="mode-hint" style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
                        {dateMode === 'custom' ? '自定义范围' : dateMode === 'year' ? '(按年统计)' : '(按月统计)'}
                    </span>
                </div>
                {dateMode !== 'custom' && (
                    <button className="nav-arrow" onClick={() => changeDate(1)} style={{ background: 'var(--bg-card)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: 'var(--text-secondary)' }}>
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            <div className="content-scroll" style={{ position: 'relative' }}>
                {loading && (
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                        background: 'rgba(255,255,255,0.7)', zIndex: 50,
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        backdropFilter: 'blur(2px)'
                    }}>
                        <div style={{
                            width: 32, height: 32,
                            border: '3px solid rgba(78, 205, 196, 0.2)',
                            borderTop: '3px solid #4ECDC4',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
                        <div style={{ marginTop: 12, fontSize: 13, color: '#666', fontWeight: 500 }}>数据加载中...</div>
                    </div>
                )}

                {/* --- BASIC TAB --- */}
                {activeTab === 'basic' && (
                    <>
                        {!basicData ? (
                            <div className="empty-row" style={{ marginTop: 50 }}>
                                <div className="loading-spinner"></div>
                                <div style={{ marginTop: 10 }}>数据加载中...</div>
                            </div>
                        ) : (
                            <>
                                {timeView === 'monthly' ? (
                                    <>
                                        {/* KPI Grid */}
                                        {/* New Banner Design */}
                                        <div className="stats-banner" style={{
                                            position: 'relative',
                                            padding: '24px 20px',
                                            borderRadius: 20,
                                            marginBottom: 16,
                                            color: '#fff',
                                            background: 'linear-gradient(135deg, #304352 0%, #d7d2cc 100%)', // Fallback
                                            backgroundImage: 'url("https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop")', // Scenic background
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                                            overflow: 'hidden'
                                        }}>
                                            {/* Overlay for readability */}
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1 }}></div>

                                            <div style={{ position: 'relative', zIndex: 2 }}>
                                                <div style={{ fontSize: 13, opacity: 0.9, marginBottom: 8 }}>账本流水统计</div>
                                                <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 20, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                                                    {formatAmount(basicData.surplus)}
                                                </div>
                                                <div style={{ display: 'flex', gap: 24 }}>
                                                    <div>
                                                        <div style={{ fontSize: 11, opacity: 0.8 }}>总收入</div>
                                                        <div style={{ fontSize: 15, fontWeight: 600 }}>{formatAmount(basicData.totalIncome)}</div>
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: 11, opacity: 0.8 }}>总支出</div>
                                                        <div style={{ fontSize: 15, fontWeight: 600 }}>{formatAmount(basicData.totalExpense)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Milestone Row */}
                                        <div className="card" style={{
                                            padding: '16px 20px',
                                            marginBottom: 20,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            background: '#fff',
                                            borderRadius: 16,
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                                            cursor: 'pointer'
                                        }} onClick={() => navigate('/records?range=all')}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <div style={{
                                                    width: 32, height: 32, borderRadius: 8,
                                                    background: '#E3F2FD', color: '#2196F3',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <BarChart2 size={18} />
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>记账里程碑</span>
                                            </div>
                                            <div style={{ fontSize: 13, color: '#666', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                已记笔数 <span style={{ fontWeight: 600, color: '#333' }}>{basicData.count}</span> <ChevronRight size={14} color="#ccc" />
                                            </div>
                                        </div>

                                        {/* Wealth Overview Card */}
                                        <div className="card" style={{ padding: 16, marginBottom: 16, cursor: 'pointer' }} onClick={() => navigate(getLink({}))}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                                <span style={{ fontSize: 14, fontWeight: 600 }}>净资产概览</span>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary)' }}>¥{formatAmount(basicData.assetsTotal - basicData.liabilitiesTotal)}</span>
                                            </div>
                                            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', background: 'rgba(0,0,0,0.05)' }}>
                                                <div style={{
                                                    width: `${(basicData.assetsTotal / (basicData.assetsTotal + basicData.liabilitiesTotal || 1)) * 100}%`,
                                                    background: 'var(--income)'
                                                }} />
                                                <div style={{
                                                    width: `${(basicData.liabilitiesTotal / (basicData.assetsTotal + basicData.liabilitiesTotal || 1)) * 100}%`,
                                                    background: 'var(--expense)'
                                                }} />
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
                                                <span>资产: ¥{formatAmount(basicData.assetsTotal)}</span>
                                                <span>负债: ¥{formatAmount(basicData.liabilitiesTotal)}</span>
                                            </div>
                                        </div>

                                        {/* Income Sources (Redesigned) */}
                                        <div className="section-card" style={{ padding: '20px 16px' }}>
                                            <h3 style={{ marginBottom: 16, fontSize: 15 }}>收入来源</h3>
                                            {basicData.topIncome.slice(0, showAllIncome ? undefined : 5).map((item, i) => {
                                                const totalInc = basicData.totalIncome || 1
                                                const percent = (item.amount / totalInc) * 100
                                                const rankColor = i === 0 ? '#FFD700' : i === 1 ? '#9CA3AF' : i === 2 ? '#B45309' : '#999'
                                                const rankWeight = i < 3 ? 700 : 400

                                                return (
                                                    <div key={i} style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => navigate(getLink({ categoryId: item.id }))}>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                                                            <span style={{ width: 20, fontSize: 14, color: rankColor, fontWeight: rankWeight }}>{i + 1}</span>
                                                            <span className="row-icon" style={{
                                                                width: 32, height: 32, borderRadius: 10, marginRight: 10,
                                                                background: '#FFF3E0', color: '#FF9800',
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                                                            }}>{item.icon}</span>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                                                                    <div style={{ textAlign: 'right' }}>
                                                                        <span style={{ fontSize: 12, color: '#999', marginRight: 8 }}>{percent.toFixed(2)}%</span>
                                                                        <span style={{ fontSize: 14, fontWeight: 600 }}>{formatAmount(item.amount)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Progress Bar - Uniform Cyan */}
                                                        <div style={{ height: 4, background: '#f5f5f5', borderRadius: 2, marginLeft: 30 }}>
                                                            <div style={{
                                                                width: `${percent}%`, height: '100%', borderRadius: 2,
                                                                background: '#26C6DA'
                                                            }} />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {basicData.topIncome.length === 0 && <div className="empty-row">暂无收入</div>}

                                            {basicData.topIncome.length > 5 && (
                                                <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 12, color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                                                    onClick={() => setShowAllIncome(!showAllIncome)}>
                                                    {showAllIncome ? '收起' : '点击展开更多'} <ChevronRight size={12} style={{ transform: showAllIncome ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Expense Distribution (Redesigned) */}
                                        <div className="section-card" style={{ padding: '20px 16px' }}>
                                            <h3 style={{ marginBottom: 16, fontSize: 15 }}>支出分布</h3>
                                            {/* Show Top 5 + Expand */}
                                            {basicData.topExpense.slice(0, showAllExpense ? undefined : 5).map((item, i) => {
                                                const totalExp = basicData.totalExpense || 1
                                                const percent = (item.amount / totalExp) * 100
                                                const rankColor = i === 0 ? '#FFD700' : i === 1 ? '#9CA3AF' : i === 2 ? '#B45309' : '#999'
                                                const rankWeight = i < 3 ? 700 : 400

                                                return (
                                                    <div key={i} style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => navigate(getLink({ categoryId: item.id }))}>
                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                                                            <span style={{ width: 20, fontSize: 14, color: rankColor, fontWeight: rankWeight }}>{i + 1}</span>
                                                            <span className="row-icon" style={{
                                                                width: 32, height: 32, borderRadius: 10, marginRight: 10,
                                                                background: `${item.color}15`, color: item.color,
                                                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                                                            }}>{item.icon}</span>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                    <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                                                                    <div style={{ textAlign: 'right' }}>
                                                                        <span style={{ fontSize: 12, color: '#999', marginRight: 8 }}>{percent.toFixed(2)}%</span>
                                                                        <span style={{ fontSize: 14, fontWeight: 600 }}>{formatAmount(item.amount)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Progress Bar - Uniform Cyan */}
                                                        <div style={{ height: 4, background: '#f5f5f5', borderRadius: 2, marginLeft: 30 }}>
                                                            <div style={{
                                                                width: `${percent}%`, height: '100%', borderRadius: 2,
                                                                background: '#26C6DA'
                                                            }} />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                            {basicData.topExpense.length === 0 && (
                                                <div style={{ width: '100%', padding: 20, textAlign: 'center', color: 'var(--text-muted)' }}>暂无支出数据</div>
                                            )}

                                            {basicData.topExpense.length > 5 && (
                                                <div style={{ textAlign: 'center', padding: '10px 0', fontSize: 12, color: '#999', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                                                    onClick={() => setShowAllExpense(!showAllExpense)}>
                                                    {showAllExpense ? '收起' : '点击展开更多'} <ChevronRight size={12} style={{ transform: showAllExpense ? 'rotate(-90deg)' : 'rotate(90deg)' }} />
                                                </div>
                                            )}
                                        </div>


                                        {/* Monthly Trend Mixed Chart */}
                                        <div className="section-card" style={{ padding: '20px 16px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                                <h3 style={{ fontSize: 15, margin: 0 }}>月度收支趋势</h3>
                                            </div>

                                            <div className="chart-legend-custom" style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                                                <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                                                    <span className="dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444' }}></span>
                                                    <span>收入 {formatAmount(basicData.totalIncome)}</span>
                                                </div>
                                                <div className="legend-item" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
                                                    <span className="dot" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }}></span>
                                                    <span>支出 {formatAmount(basicData.totalExpense)}</span>
                                                </div>
                                            </div>

                                            <div style={{ height: 220 }}>
                                                {basicData && basicData.monthlyData && (
                                                    <Chart type='line' data={{
                                                        labels: (basicData?.monthlyData || []).map(d => (d.m || '') + '月'),
                                                        datasets: [
                                                            {
                                                                label: '收入',
                                                                data: (basicData?.monthlyData || []).map(d => d.inc || 0),
                                                                borderColor: '#EF4444',
                                                                backgroundColor: 'rgba(239, 68, 68, 0.05)',
                                                                borderWidth: 2,
                                                                pointRadius: 3,
                                                                tension: 0.4,
                                                                fill: true,
                                                            },
                                                            {
                                                                label: '支出',
                                                                data: (basicData?.monthlyData || []).map(d => d.exp || 0),
                                                                borderColor: '#10B981',
                                                                backgroundColor: 'rgba(16, 185, 129, 0.05)',
                                                                borderWidth: 2,
                                                                pointRadius: 3,
                                                                tension: 0.4,
                                                                fill: true,
                                                            }
                                                        ]
                                                    }} options={{
                                                        maintainAspectRatio: false,
                                                        interaction: {
                                                            mode: 'index',
                                                            intersect: false,
                                                        },
                                                        plugins: {
                                                            legend: { display: false },
                                                            tooltip: {
                                                                backgroundColor: 'rgba(0,0,0,0.8)',
                                                                padding: 10,
                                                                titleColor: '#fff',
                                                                bodyColor: '#fff',
                                                                cornerRadius: 8,
                                                                displayColors: true
                                                            }
                                                        },
                                                        scales: {
                                                            x: { grid: { display: false, drawBorder: false }, ticks: { color: '#999', font: { size: 10 } } },
                                                            y: { display: false, beginAtZero: true }
                                                        }
                                                    }} />
                                                )}
                                            </div>
                                        </div>

                                        {/* Assets */}
                                        <div className="section-card" style={{ padding: '20px 16px', position: 'relative' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                                <h3 style={{ fontSize: 15, margin: 0 }}>资产类账户统计</h3>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>资产 {formatAmount(basicData.assets.reduce((s, a) => s + a._bal, 0))}</span>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ width: 180, height: 180, position: 'relative' }}>
                                                    {basicData && basicData.assets && (
                                                        <Doughnut data={{
                                                            labels: (basicData?.assets || []).map(a => a.name || ''),
                                                            datasets: [{
                                                                data: (basicData?.assets || []).map(a => a._bal || 0),
                                                                backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#FFB800', '#6C5CE7', '#A8E6CF'],
                                                                borderWidth: 0,
                                                                cutout: '65%'
                                                            }]
                                                        }} options={{ plugins: { legend: { display: false } } }} />
                                                    )}
                                                    {/* Center text */}
                                                    <div style={{
                                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{ fontSize: 12, color: '#999' }}>总资产</div>
                                                        <div style={{ fontSize: 14, fontWeight: 700 }}>{formatAmount(basicData.assetsTotal)}</div>
                                                    </div>
                                                </div>

                                                {/* Asset List Legend */}
                                                <div style={{ width: '100%', marginTop: 24 }}>
                                                    {basicData.assets.map((a, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 13 }}
                                                            onClick={() => navigate(`/records?accountId=${a.id}&range=all`)}>
                                                            <div style={{ display: 'flex', items: 'center', gap: 8 }}>
                                                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#FFB800', '#6C5CE7', '#A8E6CF'][i % 6] }}></span>
                                                                <span>{a.name}</span>
                                                            </div>
                                                            <div style={{ fontWeight: 600 }}>{formatAmount(a._bal)}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section-card" style={{ padding: '20px 16px', position: 'relative' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                                <h3 style={{ fontSize: 15, margin: 0 }}>负债类账户统计</h3>
                                                <span style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>负债 {formatAmount(basicData.liabilities.reduce((s, a) => s + Math.abs(a._bal), 0))}</span>
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <div style={{ width: 180, height: 180, position: 'relative' }}>
                                                    {basicData && basicData.liabilities && (
                                                        <Doughnut data={{
                                                            labels: (basicData?.liabilities || []).map(a => a.name || ''),
                                                            datasets: [{
                                                                data: (basicData?.liabilities || []).map(a => Math.abs(a._bal || 0)),
                                                                backgroundColor: ['#FF7675', '#FAB1A0', '#FD79A8'],
                                                                borderWidth: 0,
                                                                cutout: '65%'
                                                            }]
                                                        }} options={{ plugins: { legend: { display: false } } }} />
                                                    )}
                                                    <div style={{
                                                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{ fontSize: 12, color: '#999' }}>总负债</div>
                                                        <div style={{ fontSize: 14, fontWeight: 700 }}>{formatAmount(basicData.liabilitiesTotal)}</div>
                                                    </div>
                                                </div>

                                                <div style={{ width: '100%', marginTop: 24 }}>
                                                    {basicData.liabilities.map((a, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, fontSize: 13 }}
                                                            onClick={() => navigate(`/records?accountId=${a.id}&range=all`)}>
                                                            <div style={{ display: 'flex', items: 'center', gap: 8 }}>
                                                                <span style={{ width: 10, height: 10, borderRadius: '50%', background: ['#FF7675', '#FAB1A0', '#FD79A8'][i % 3] }}></span>
                                                                <span>{a.name}</span>
                                                            </div>
                                                            <div style={{ fontWeight: 600 }}>{formatAmount(Math.abs(a._bal))}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {weeklyData && (
                                            <>
                                                <div className="stat-card gradient-orange">
                                                    <div className="card-content">
                                                        <span className="label">近12周流水</span>
                                                        <div className="main-value">
                                                            <span className="unit">总支出</span>
                                                            <span className="amount">{formatAmount(weeklyData.totalExpense)}</span>
                                                        </div>
                                                        <div className="sub-values">
                                                            <span>总收入 {formatAmount(weeklyData.totalIncome)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="section-card">
                                                    <h3>周趋势</h3>
                                                    <div style={{ height: 150 }}>
                                                        {weeklyData && weeklyData.weeks && (
                                                            <Bar data={{
                                                                labels: (weeklyData?.weeks || []).map(d => d.label || ''),
                                                                datasets: [
                                                                    { label: '支出', data: (weeklyData?.weeks || []).map(d => d.expense || 0), backgroundColor: '#10B981', borderRadius: 4 },
                                                                    { label: '收入', data: (weeklyData?.weeks || []).map(d => d.income || 0), backgroundColor: '#EF4444', borderRadius: 4 },
                                                                ]
                                                            }} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false } } }} />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="section-card">
                                                    <h3>周明细</h3>
                                                    {weeklyData.weeks.slice().reverse().map((w, i) => (
                                                        <div key={i} className="list-row">
                                                            <span className="row-name">{w.key} ({w.label})</span>
                                                            <div className="row-right" style={{ textAlign: 'right' }}>
                                                                <div className="row-amount" style={{ color: '#10B981' }}>-{formatAmount(w.expense)}</div>
                                                                <div className="row-amount" style={{ color: '#EF4444', fontSize: 12 }}>+{formatAmount(w.income)}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {/* End Weekly Data */}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )
                }





                {/* --- CATEGORY TAB --- */}
                {
                    activeTab === 'category' && categoryData && (
                        <>
                            {/* 支出分类统计 */}
                            <div className="section-card" style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>支出分类统计</h3>
                                    <div style={{ fontSize: 12, color: '#666' }}>
                                        <span>总支出 <b style={{ color: '#333' }}>{formatAmount(categoryData.expense?.total || 0)}</b></span>
                                        <span style={{ marginLeft: 12 }}>支出笔数 <b style={{ color: '#333' }}>{categoryData.expense?.count || 0}</b></span>
                                    </div>
                                </div>

                                {/* 支出圆环图 */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 200, height: 200, position: 'relative' }}>
                                        {categoryData.expense?.list?.length > 0 && (
                                            <Doughnut data={{
                                                labels: (categoryData.expense?.list || []).map(c => c.name),
                                                datasets: [{
                                                    data: (categoryData.expense?.list || []).map(c => c.amount),
                                                    backgroundColor: ['#FF9500', '#4ECDC4', '#FF6B6B', '#FFE66D', '#6C5CE7', '#A8E6CF', '#FAB1A0', '#74B9FF'],
                                                    borderWidth: 0,
                                                    cutout: '55%'
                                                }]
                                            }} options={{
                                                plugins: {
                                                    legend: { display: false },
                                                    tooltip: { enabled: true }
                                                }
                                            }} />
                                        )}
                                    </div>
                                </div>

                                {/* 支出分类列表 */}
                                {(categoryData.expense?.list || []).slice(0, showAllCatExpense ? undefined : 5).map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}
                                        onClick={() => navigate(getLink({ categoryId: c.id, type: 'expense' }))}>
                                        <span style={{ width: 20, fontSize: 14, fontWeight: 600, color: i === 0 ? '#FFB800' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#999' }}>{i + 1}</span>
                                        <span style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginRight: 12 }}>{c.icon}</span>
                                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                                        <span style={{ fontSize: 13, color: '#999', marginRight: 12 }}>{(c.percent * 100).toFixed(2)}%</span>
                                        <span style={{ fontSize: 14, fontWeight: 600 }}>{formatAmount(c.amount)}</span>
                                    </div>
                                ))}

                                {/* 展开/收起按钮 */}
                                {(categoryData.expense?.list?.length || 0) > 5 && (
                                    <div style={{ textAlign: 'center', padding: '12px 0', color: '#999', fontSize: 13, cursor: 'pointer' }}
                                        onClick={() => setShowAllCatExpense(!showAllCatExpense)}>
                                        {showAllCatExpense ? '收起 ∧' : '点击展开 ∨'}
                                    </div>
                                )}
                                {(categoryData.expense?.list?.length || 0) === 0 && <div className="empty-row">暂无支出数据</div>}
                            </div>

                            {/* 收入分类统计 */}
                            <div className="section-card" style={{ marginBottom: 16 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>收入分类统计</h3>
                                    <div style={{ fontSize: 12, color: '#666' }}>
                                        <span>总收入 <b style={{ color: '#333' }}>{formatAmount(categoryData.income?.total || 0)}</b></span>
                                        <span style={{ marginLeft: 12 }}>收入笔数 <b style={{ color: '#333' }}>{categoryData.income?.count || 0}</b></span>
                                    </div>
                                </div>

                                {/* 收入圆环图 */}
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 200, height: 200, position: 'relative' }}>
                                        {categoryData.income?.list?.length > 0 && (
                                            <Doughnut data={{
                                                labels: (categoryData.income?.list || []).map(c => c.name),
                                                datasets: [{
                                                    data: (categoryData.income?.list || []).map(c => c.amount),
                                                    backgroundColor: ['#4ECDC4', '#6C5CE7', '#FFE66D', '#FF6B6B', '#74B9FF', '#A8E6CF', '#FAB1A0', '#FF9500'],
                                                    borderWidth: 0,
                                                    cutout: '55%'
                                                }]
                                            }} options={{
                                                plugins: {
                                                    legend: { display: false },
                                                    tooltip: { enabled: true }
                                                }
                                            }} />
                                        )}
                                    </div>
                                </div>

                                {/* 收入分类列表 */}
                                {(categoryData.income?.list || []).slice(0, showAllCatIncome ? undefined : 5).map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer' }}
                                        onClick={() => navigate(getLink({ categoryId: c.id, type: 'income' }))}>
                                        <span style={{ width: 20, fontSize: 14, fontWeight: 600, color: i === 0 ? '#FFB800' : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : '#999' }}>{i + 1}</span>
                                        <span style={{ width: 32, height: 32, borderRadius: 8, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, marginRight: 12 }}>{c.icon}</span>
                                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{c.name}</span>
                                        <span style={{ fontSize: 13, color: '#999', marginRight: 12 }}>{(c.percent * 100).toFixed(2)}%</span>
                                        <span style={{ fontSize: 14, fontWeight: 600 }}>{formatAmount(c.amount)}</span>
                                    </div>
                                ))}

                                {/* 展开/收起按钮 */}
                                {(categoryData.income?.list?.length || 0) > 5 && (
                                    <div style={{ textAlign: 'center', padding: '12px 0', color: '#999', fontSize: 13, cursor: 'pointer' }}
                                        onClick={() => setShowAllCatIncome(!showAllCatIncome)}>
                                        {showAllCatIncome ? '收起 ∧' : '点击展开 ∨'}
                                    </div>
                                )}
                                {(categoryData.income?.list?.length || 0) === 0 && <div className="empty-row">暂无收入数据</div>}
                            </div>
                        </>
                    )
                }

                {/* --- MERCHANT TAB --- */}
                {
                    activeTab === 'merchant' && merchantData && (
                        <>
                            {/* 商家收支统计 */}
                            <div className="section-card">
                                <h3>商家收支统计</h3>
                                {(merchantData.list || []).slice(0, 5).map((m, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }} onClick={() => navigate(getLink({ merchantId: m.name }))}>
                                        <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#FFF9C4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🏪</div>
                                        <div style={{ flex: 1, marginLeft: 12 }}>
                                            <div style={{ fontSize: 15, fontWeight: 500 }}>{m.name}</div>
                                            <div style={{ fontSize: 12, color: '#999' }}>商家名称</div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontSize: 12, color: '#EF4444' }}>总收入 {formatAmount(m.inc)}</div>
                                            <div style={{ fontSize: 12, color: '#10B981', marginTop: 2 }}>总支出 {formatAmount(m.exp)}</div>
                                        </div>
                                    </div>
                                ))}
                                {merchantData.list.length === 0 && <div className="empty-row">暂无数据</div>}
                            </div>

                            {/* 商家收入分布 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>商家收入分布</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>总收入 {formatAmount(merchantData.totalIncome)} 收入笔数 {merchantData.list.filter(m => m.inc > 0).reduce((s, m) => s + m.count, 0)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 160, height: 160 }}>
                                        {merchantData.incomeList?.length > 0 ? (
                                            <Doughnut data={{
                                                labels: merchantData.incomeList.map(m => m.name),
                                                datasets: [{
                                                    data: merchantData.incomeList.map(m => m.inc),
                                                    backgroundColor: ['#FF9500', '#4ECDC4', '#FF6B6B', '#6C5CE7'],
                                                    borderWidth: 0,
                                                    cutout: '60%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', border: '1px dashed #eee', borderRadius: '50%' }}>暂无数据</div>}
                                    </div>
                                </div>
                                {merchantData.incomeList.slice(0, 5).map((m, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ merchantId: m.name }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-name" style={{ flex: 1 }}>{m.name}</span>
                                            <span className="row-amount">{formatAmount(m.inc)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 商家支出分布 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>商家支出分布</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>总支出 {formatAmount(merchantData.totalExpense)} 记账笔数 {merchantData.list.filter(m => m.exp > 0).reduce((s, m) => s + m.count, 0)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 160, height: 160 }}>
                                        {merchantData.expenseList?.length > 0 ? (
                                            <Doughnut data={{
                                                labels: merchantData.expenseList.map(m => m.name),
                                                datasets: [{
                                                    data: merchantData.expenseList.map(m => m.exp),
                                                    backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#FF9500'],
                                                    borderWidth: 0,
                                                    cutout: '60%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', border: '1px dashed #eee', borderRadius: '50%' }}>暂无数据</div>}
                                    </div>
                                </div>
                                {merchantData.expenseList.slice(0, 5).map((m, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ merchantId: m.name }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-name" style={{ flex: 1 }}>{m.name}</span>
                                            <span className="row-percent" style={{ marginRight: 10 }}>{(m.exp / merchantData.totalExpense * 100).toFixed(2)}%</span>
                                            <span className="row-amount">{formatAmount(m.exp)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="fill" style={{ width: `${(m.exp / merchantData.totalExpense * 100)}%`, background: '#4ECDC4' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }

                {/* --- PROJECT TAB --- */}
                {
                    activeTab === 'project' && projectData && (
                        <>
                            {/* 总结余 Card */}
                            <div className="section-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#F3E5F5', color: '#7B1FA2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📚</div>
                                    <div style={{ marginLeft: 16, fontSize: 16, fontWeight: 600 }}>总结余</div>
                                </div>
                                <div style={{ fontSize: 16, fontWeight: 500, color: '#666' }}>
                                    结余 <span style={{ color: projectData.totalSurplus >= 0 ? '#333' : '#EF4444', fontWeight: 600 }}>{formatAmount(projectData.totalSurplus)}</span>
                                </div>
                            </div>

                            {/* 项目结余（毛利）统计 */}
                            <div className="section-card">
                                <h3 style={{ marginBottom: 20 }}>项目结余（毛利）统计</h3>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
                                    <div style={{ width: 180, height: 180 }}>
                                        {projectData.surplusList.filter(p => p.surplus > 0).length > 0 ? (
                                            <Doughnut data={{
                                                labels: projectData.surplusList.filter(p => p.surplus > 0).map(p => p.name),
                                                datasets: [{
                                                    data: projectData.surplusList.filter(p => p.surplus > 0).map(p => p.surplus),
                                                    backgroundColor: ['#BA68C8', '#4DB6AC', '#FFD54F', '#FF8A65', '#90A4AE'],
                                                    borderWidth: 0,
                                                    cutout: '55%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 12 }}>
                                                暂无正向结余
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {(projectData.list || []).map((p, i) => (
                                    <div key={i} className="list-row-bar" style={{ padding: '12px 0', cursor: 'pointer' }} onClick={() => navigate(getLink({ projectId: p.id }))}>
                                        <div className="row-header">
                                            <span className="row-rank" style={{ color: p.surplus >= 0 ? '#FAB1A0' : '#ccc' }}>{i + 1}</span>
                                            <span className="row-icon">{p.icon}</span>
                                            <span className="row-name">{p.name}</span>
                                            <span className="row-amount" style={{ color: p.surplus >= 0 ? '#333' : '#EF4444' }}>{formatAmount(p.surplus)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 项目收入统计 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>项目收入统计</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>
                                        总收入 <span style={{ color: '#EF4444' }}>{formatAmount(projectData.totalIncome)}</span> 收入笔数 {projectData.incomeList.reduce((s, p) => s + p.count, 0)}
                                    </div>
                                </div>
                                {projectData.incomeList.map((p, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ projectId: p.id }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-icon">{p.icon}</span>
                                            <span className="row-name">{p.name}</span>
                                            <span className="row-amount">{formatAmount(p.inc)}</span>
                                        </div>
                                    </div>
                                ))}
                                {projectData.incomeList.length === 0 && <div className="empty-row">暂无项目收入</div>}
                            </div>

                            {/* 项目支出统计 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>项目支出统计</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>
                                        总支出 <span style={{ color: '#10B981' }}>{formatAmount(projectData.totalExpense)}</span> 记账笔数 {projectData.expenseList.reduce((s, p) => s + p.count, 0)}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 160, height: 160 }}>
                                        {projectData.expenseList.length > 0 ? (
                                            <Doughnut data={{
                                                labels: projectData.expenseList.map(p => p.name),
                                                datasets: [{
                                                    data: projectData.expenseList.map(p => p.exp),
                                                    backgroundColor: ['#4DB6AC', '#FF8A65', '#BA68C8'],
                                                    borderWidth: 0,
                                                    cutout: '60%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 12 }}>暂无数据</div>}
                                    </div>
                                </div>
                                {projectData.expenseList.map((p, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ projectId: p.id }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-icon">{p.icon}</span>
                                            <span className="row-name">{p.name}</span>
                                            <span className="row-percent" style={{ marginRight: 10 }}>{(p.exp / projectData.totalExpense * 100).toFixed(2)}%</span>
                                            <span className="row-amount">{formatAmount(p.exp)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="fill" style={{ width: `${(p.exp / projectData.totalExpense * 100)}%`, background: '#4DB6AC' }}></div>
                                        </div>
                                    </div>
                                ))}
                                {projectData.expenseList.length === 0 && <div className="empty-row">暂无项目支出</div>}
                            </div>
                        </>
                    )
                }

                {/* --- MEMBER TAB --- */}
                {
                    activeTab === 'member' && memberData && (
                        <>
                            {/* 成员记账数据 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                                    <h3>成员记账数据</h3>
                                    <span style={{ fontSize: 12, color: '#999' }}>记账笔数 {memberData.totalCount}</span>
                                </div>
                                <div style={{ height: 180 }}>
                                    <Bar data={{
                                        labels: memberData.list.map(m => m.name),
                                        datasets: [{
                                            label: '笔数',
                                            data: memberData.list.map(m => m.count),
                                            backgroundColor: '#9FA8DA',
                                            borderRadius: 4,
                                            barThickness: 16
                                        }]
                                    }} options={{
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                        scales: {
                                            x: { grid: { display: false }, ticks: { font: { size: 11 } } },
                                            y: { grid: { borderDash: [4, 4], color: '#f0f0f0' }, ticks: { maxTicksLimit: 5 } }
                                        }
                                    }} />
                                </div>
                            </div>

                            {/* 成员收支对比 */}
                            <div className="section-card">
                                <h3 style={{ marginBottom: 20 }}>成员收支对比</h3>
                                {memberData.list.map((m, i) => (
                                    <div key={i} style={{ marginBottom: 24, cursor: 'pointer' }} onClick={() => navigate(getLink({ personId: m.id }))}>
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                                            <span className="row-icon" style={{ width: 32, height: 32, fontSize: 18 }}>{m.icon}</span>
                                            <span style={{ fontSize: 15, fontWeight: 500, marginLeft: 8 }}>{m.name}</span>
                                        </div>
                                        <div style={{ paddingLeft: 40 }}>
                                            {/* 支出条 */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginBottom: 4 }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', marginRight: 4 }}></span>
                                                    支出 {formatAmount(m.exp)}
                                                </div>
                                            </div>
                                            <div style={{ height: 4, background: '#f5f5f5', borderRadius: 2, marginBottom: 8, overflow: 'hidden' }}>
                                                <div style={{ width: `${memberData.totalExpense > 0 ? Math.min((m.exp / memberData.totalExpense * 100), 100) : 0}%`, height: '100%', background: '#EF4444', borderRadius: 2 }}></div>
                                            </div>

                                            {/* 收入条 */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#666', marginBottom: 4 }}>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', marginRight: 4 }}></span>
                                                    收入 {formatAmount(m.inc)}
                                                </div>
                                            </div>
                                            <div style={{ height: 4, background: '#f5f5f5', borderRadius: 2, overflow: 'hidden' }}>
                                                <div style={{ width: `${memberData.totalIncome > 0 ? Math.min((m.inc / memberData.totalIncome * 100), 100) : 0}%`, height: '100%', background: '#10B981', borderRadius: 2 }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 成员支出统计 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>成员支出统计</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>总支出 {formatAmount(memberData.totalExpense)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 160, height: 160 }}>
                                        {memberData.expenseList?.length > 0 ? (
                                            <Doughnut data={{
                                                labels: memberData.expenseList.map(m => m.name),
                                                datasets: [{
                                                    data: memberData.expenseList.map(m => m.exp),
                                                    backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D'],
                                                    borderWidth: 0,
                                                    cutout: '60%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 12 }}>暂无数据</div>}
                                    </div>
                                </div>
                                {memberData.expenseList.map((m, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ personId: m.id }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-icon">{m.icon}</span>
                                            <span className="row-name">{m.name}</span>
                                            <span className="row-percent" style={{ marginRight: 10 }}>{(m.exp / memberData.totalExpense * 100).toFixed(2)}%</span>
                                            <span className="row-amount">{formatAmount(m.exp)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="fill" style={{ width: `${(m.exp / memberData.totalExpense * 100)}%`, background: '#4ECDC4' }}></div>
                                        </div>
                                    </div>
                                ))}
                                {memberData.expenseList.length === 0 && <div className="empty-row">暂无支出数据</div>}
                            </div>

                            {/* 成员收入统计 */}
                            <div className="section-card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                                    <h3 style={{ margin: 0 }}>成员收入统计</h3>
                                    <div style={{ fontSize: 12, color: '#999' }}>总收入 {formatAmount(memberData.totalIncome)}</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
                                    <div style={{ width: 160, height: 160 }}>
                                        {memberData.incomeList?.length > 0 ? (
                                            <Doughnut data={{
                                                labels: memberData.incomeList.map(m => m.name),
                                                datasets: [{
                                                    data: memberData.incomeList.map(m => m.inc),
                                                    backgroundColor: ['#6C5CE7', '#A8E6CF', '#FAB1A0'],
                                                    borderWidth: 0,
                                                    cutout: '60%'
                                                }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        ) : <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: '8px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', fontSize: 12 }}>暂无数据</div>}
                                    </div>
                                </div>
                                {memberData.incomeList.map((m, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ personId: m.id }))}>
                                        <div className="row-header">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-icon">{m.icon}</span>
                                            <span className="row-name">{m.name}</span>
                                            <span className="row-percent" style={{ marginRight: 10 }}>{(m.inc / memberData.totalIncome * 100).toFixed(2)}%</span>
                                            <span className="row-amount">{formatAmount(m.inc)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="fill" style={{ width: `${(m.inc / memberData.totalIncome * 100)}%`, background: '#6C5CE7' }}></div>
                                        </div>
                                    </div>
                                ))}
                                {memberData.incomeList.length === 0 && <div className="empty-row">暂无收入数据</div>}
                            </div>
                        </>
                    )
                }

                {/* --- ACCOUNT TAB --- */}
                {
                    activeTab === 'account' && accountData && (
                        <>
                            {/* 账户统计卡片 */}
                            <div className="stat-card" style={{ padding: 0, overflow: 'hidden', background: '#fff', marginBottom: 16, borderRadius: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}>
                                {/* 橙色头部 */}
                                <div style={{
                                    background: 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)',
                                    padding: '24px 20px',
                                    color: '#fff',
                                    position: 'relative'
                                }}>
                                    <div style={{ fontSize: 13, opacity: 0.9, fontWeight: 500 }}>账户统计</div>
                                    <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>净资产</div>
                                    <div style={{ fontSize: 32, fontWeight: 700, margin: '4px 0 8px' }}>
                                        {formatAmount(accountData.netAssets)}
                                    </div>
                                    <div style={{ display: 'flex', fontSize: 12, opacity: 0.9, gap: 12 }}>
                                        <span>资产 {formatAmount(accountData.assetsTotal)}</span>
                                        <span style={{ opacity: 0.5 }}>|</span>
                                        <span>负债 {formatAmount(accountData.liabilitiesTotal)}</span>
                                    </div>

                                    {/* 装饰云纹 (可选，用CSS简单模拟圆圈) */}
                                    <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                    <div style={{ position: 'absolute', right: 20, top: 40, width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                                </div>

                                {/* 趋势图表区 */}
                                <div style={{ padding: '20px 16px', height: 220 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, fontSize: 12, color: '#666', background: '#f5f5f5', padding: '4px 10px', borderRadius: 12, width: 'fit-content' }}>
                                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#9CA3AF', marginRight: 6 }}></span>
                                        净资产 {formatAmount(accountData.netAssets)}
                                    </div>
                                    <div style={{ height: 160 }}>
                                        {accountData.trend?.length > 0 && (
                                            <Line data={{
                                                labels: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
                                                datasets: [{
                                                    label: '净资产',
                                                    data: (accountData.trend || []),
                                                    borderColor: '#9CA3AF', // 灰色线条
                                                    borderWidth: 2,
                                                    pointBackgroundColor: '#fff',
                                                    pointBorderColor: '#9CA3AF',
                                                    pointRadius: 3,
                                                    tension: 0.1, // 直线略带圆角
                                                    fill: false
                                                }]
                                            }} options={{
                                                maintainAspectRatio: false,
                                                plugins: { legend: { display: false }, tooltip: { displayColors: false } },
                                                scales: {
                                                    x: { grid: { display: false }, ticks: { color: '#bbb', font: { size: 10 } } },
                                                    y: { grid: { color: '#f0f0f0', borderDash: [4, 4] }, ticks: { color: '#bbb', font: { size: 10 }, maxTicksLimit: 5 } }
                                                }
                                            }} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* 资产明细 */}
                            <div className="section-card">
                                <h3>资产明细</h3>
                                {(accountData.assetsList || []).slice(0, showAllAssets ? undefined : 5).map((a, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ accountId: a.id }))}>
                                        <div className="row-header">
                                            <span style={{ width: 20, fontSize: 14, fontWeight: 600, color: '#999' }}>{i + 1}</span>
                                            <span className="row-icon">{a.icon}</span>
                                            <span className="row-name">{a.name}</span>
                                            <span className="row-percent">{(accountData.assetsTotal > 0 ? (a._bal / accountData.assetsTotal) * 100 : 0).toFixed(2)}%</span>
                                            <span className="row-amount">{formatAmount(a._bal)}</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="fill" style={{ width: `${(accountData.assetsTotal > 0 ? (a._bal / accountData.assetsTotal) * 100 : 0)}%`, background: '#4ECDC4' }}></div>
                                        </div>
                                    </div>
                                ))}

                                {/* 展开/收起按钮 */}
                                {(accountData.assetsList?.length || 0) > 5 && (
                                    <div style={{ textAlign: 'center', padding: '12px 0', color: '#999', fontSize: 13, cursor: 'pointer' }}
                                        onClick={() => setShowAllAssets(!showAllAssets)}>
                                        {showAllAssets ? '收起 ∧' : '点击展开 ∨'}
                                    </div>
                                )}
                                {(accountData.assetsList?.length || 0) === 0 && <div className="empty-row">暂无资产</div>}
                            </div>

                            {/* 负债明细 */}
                            <div className="section-card">
                                <h3>负债明细</h3>
                                {(accountData.liabilitiesList || []).map((a, i) => (
                                    <div key={i} className="list-row-bar" style={{ cursor: 'pointer' }} onClick={() => navigate(getLink({ accountId: a.id }))}>
                                        <div className="row-header">
                                            <span style={{ width: 20, fontSize: 14, fontWeight: 600, color: '#999' }}>{i + 1}</span>
                                            <span className="row-icon">{a.icon}</span>
                                            <span className="row-name">{a.name}</span>
                                            <span className="row-amount" style={{ color: '#333' }}>{formatAmount(Math.abs(a._bal))}</span>
                                        </div>
                                        {/* 负债不需要进度条或者显示相对于总负债的比例 */}
                                    </div>
                                ))}
                                {(accountData.liabilitiesList?.length || 0) === 0 && <div className="empty-row">暂无负债</div>}
                            </div>
                        </>
                    )
                }

            </div >

            <style>{`
                .statistics-page { background: var(--bg-app); min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 20px; }
                .page-header { background: var(--bg-card); padding-top: calc(10px + var(--safe-area-top)); position: sticky; top: 0; z-index: 10; }
                .back-btn { padding: 10px; border: none; background: none; }
                .page-header h1 { text-align: center; font-size: 17px; font-weight: 600; margin-top: -36px; margin-bottom: 10px; pointer-events: none; }
                
                .tabs-scroll { 
                    display: flex; overflow-x: auto; padding: 0 4px; border-bottom: none; background: var(--bg-card); 
                    scrollbar-width: none; -ms-overflow-style: none;
                }
                .tabs-scroll::-webkit-scrollbar { display: none; }

                .tab-item { 
                    padding: 12px 16px; font-size: 15px; color: var(--text-secondary); white-space: nowrap; transition: all 0.2s; 
                    position: relative;
                }
                .tab-item.active { 
                    color: var(--text-primary); font-weight: 600; font-size: 16px; 
                }
                .tab-item.active::after {
                    content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
                    width: 20px; height: 3px; background: #FFB800; border-radius: 2px;
                }
                
                .date-filter { 
                    background: var(--bg-card); padding: 10px 0; margin-top: 1px; margin-bottom: 12px;
                    display: flex; align-items: center; justify-content: center; gap: 20px;
                }
                .nav-arrow { 
                    background: rgba(0,0,0,0.05); border: none; padding: 0; 
                    width: 32px; height: 32px; border-radius: 50%;
                    color: var(--text-secondary); display: flex; align-items: center; justify-content: center; 
                }
                .date-display-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
                .date-display { font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 6px; color: var(--text-primary); }
                .view-switch-btn { 
                    margin-left: 10px; font-size: 12px; color: #4ECDC4; 
                    border: 1px solid #4ECDC4; padding: 2px 8px; 
                    background: none; border-radius: 4px; 
                }

                .content-scroll { padding: 0 16px; flex: 1; overflow-y: auto; }
                
                /* Top Card - Mixed Theme */
                .stat-card {
                    border-radius: 16px; padding: 20px; margin-bottom: 12px; position: relative; overflow: hidden; color: #fff;
                    min-height: 160px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .stat-card.mixed-theme {
                    background-image: url('https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=1000&auto=format&fit=crop'); 
                    background-size: cover;
                    background-position: center;
                }
                .card-overlay {
                    position: absolute; top:0; left:0; right:0; bottom:0;
                    background: rgba(0,0,0,0.2); 
                    z-index: 1;
                }
                .card-content { position: relative; z-index: 2; height: 100%; display: flex; flex-direction: column; justify-content: space-between; gap: 10px; }
                
                .card-top-row { font-size: 13px; opacity: 0.95; }
                .main-value-group { margin: 10px 0; }
                .currency-symbol { font-size: 14px; opacity: 0.9; margin-right: 6px; }
                .main-amount { font-size: 36px; font-weight: 700; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0,0,0,0.1); }
                .eye-icon { font-size: 14px; margin-left: 10px; opacity: 0.8; }
                
                .card-bottom-row { 
                    display: flex; align-items: center; font-size: 12px; opacity: 0.95; 
                    background: rgba(0,0,0,0.2); padding: 6px 12px; border-radius: 20px; align-self: flex-start;
                    backdrop-filter: blur(4px);
                }
                .sub-stat { margin: 0 4px; font-weight: 500; }
                .divider { opacity: 0.5; margin: 0 4px; }

                /* Milestone Card */
                .milestone-card {
                    background: var(--bg-card); border-radius: 12px; padding: 16px; margin-bottom: 16px;
                    display: flex; align-items: center; justify-content: space-between;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                }
                .milestone-left { display: flex; align-items: center; gap: 8px; }
                .milestone-icon { font-size: 18px; }
                .milestone-title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
                .milestone-right { font-size: 12px; color: #999; }
                .milestone-num { color: var(--text-primary); font-weight: 600; margin-left: 4px; }

                /* Section Cards */
                .section-card { background: var(--bg-card); border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
                .section-card h3 { font-size: 14px; color: var(--text-primary); margin-bottom: 12px; font-weight: 600; }
                
                .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .card-header-row h3 { margin-bottom: 0; }
                .header-value { font-size: 12px; color: #999; }

                /* List Item Styles */
                .list-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05); cursor: pointer; }
                .list-row:last-child { border-bottom: none; }
                .row-rank { width: 20px; color: #ccc; font-size: 12px; font-weight: 500; }
                .row-icon { margin-right: 12px; font-size: 20px; width: 32px; height: 32px; background: #f8f8f8; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
                .row-name { flex: 1; font-size: 14px; color: var(--text-primary); font-weight: 500; }
                .row-amount { font-size: 14px; color: var(--text-primary); font-weight: 500; }
                
                /* Bar Item Styles */
                .list-row-bar { margin-bottom: 16px; cursor: pointer; }
                .row-header { display: flex; align-items: center; margin-bottom: 8px; }
                .row-percent { color: #999; font-size: 12px; margin-right: 8px; min-width: 45px; text-align: right; }
                .progress-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
                .fill { height: 100%; background: #4ECDC4; border-radius: 3px; }
                
                /* Chart Legend */
                .chart-legend-custom { display: flex; gap: 16px; margin-bottom: 10px; }
                .legend-item { font-size: 11px; color: var(--text-secondary); display: flex; align-items: center; gap: 4px; background: rgba(0,0,0,0.05); padding: 4px 8px; border-radius: 4px; }
                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.income { background: #FFB800; }
                .dot.expense { background: #4ECDC4; }

                .pie-wrapper { display: flex; justify-content: center; padding: 10px 0; }
                .empty-row { text-align: center; color: #ccc; padding: 20px; font-size: 12px; }
                
                .type-switch { display: flex; justify-content: center; margin-bottom: 20px; }
                .switch-btn { padding: 8px 24px; background: var(--bg-card); border: 1px solid #ddd; font-size: 14px; color: var(--text-secondary); }
                .switch-btn:first-child { border-radius: 20px 0 0 20px; border-right: none; }
                .switch-btn:last-child { border-radius: 0 20px 20px 0; border-left: none; }
                .switch-btn.active { background: #FFB800; color: #fff; border-color: #FFB800; }
                
                .stat-card.gradient-orange { background: linear-gradient(135deg, #FF9966 0%, #FF5E62 100%); }
                .stat-card.white { background: var(--bg-card); color: var(--text-primary); text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .main-value-dark { font-size: 30px; font-weight: bold; color: var(--text-primary); }
                .sub-values { font-size: 12px; opacity: 0.9; display: flex; gap: 10px; }
                .row-right { margin-left: auto; }

                /* 时间选择器模态框样式 */
                .date-picker-overlay {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    top: 0;
                    background: rgba(0,0,0,0.5);
                    z-index: 999;
                    display: flex;
                    align-items: flex-end;
                }
                .date-picker-modal {
                    background: var(--bg-card);
                    width: 100%;
                    border-radius: 20px 20px 0 0;
                    padding: 20px 0;
                    padding-bottom: calc(20px + var(--safe-area-bottom));
                    animation: slideUp 0.3s ease;
                }
                .modal-header {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    padding: 0 16px 16px;
                    border-bottom: 1px solid #f0f0f0;
                }
                .modal-title { font-size: 18px; font-weight: 600; }
                .close-btn { position: absolute; right: 16px; background: none; border: none; font-size: 24px; color: var(--text-muted); }
                .picker-tabs {
                    display: flex;
                    justify-content: center;
                    padding: 16px 0;
                    gap: 20px;
                }
                .picker-tab { /* 模仿图片中的月/年切换按钮 */
                    padding: 8px 30px;
                    background: rgba(0,0,0,0.05);
                    border-radius: 4px;
                    color: var(--text-secondary);
                    font-size: 15px;
                }
                .picker-tab.active {
                    background: #fff5e6; /* 浅橙色 */
                    color: #FFB800;
                    font-weight: 500;
                }
                .year-range-display {
                    text-align: center;
                    font-size: 16px;
                    font-weight: 500;
                    margin: 10px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 10px;
                }
                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 15px;
                    padding: 0 20px;
                    margin-top: 10px;
                }
                .grid-item {
                    padding: 10px 0;
                    text-align: center;
                    border-radius: 8px;
                    background: var(--bg-card);
                    border: 1px solid #f0f0f0;
                    font-size: 14px;
                }
                .grid-item.active {
                    background: #FFB800; /* 选中色 橙色 */
                    color: white;
                    border-color: #FFB800;
                    box-shadow: 0 4px 10px rgba(255, 184, 0, 0.3);
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>

            {/* 日期选择器模态框 */}
            {
                showDatePicker && (
                    <div className="date-picker-overlay" onClick={() => setShowDatePicker(false)}>
                        <div className="date-picker-modal" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <span className="modal-title">选择时间</span>
                                <button className="close-btn" onClick={() => setShowDatePicker(false)}><X size={24} /></button>
                            </div>

                            <div className="picker-tabs">
                                <button
                                    className={`picker-tab ${dateMode === 'month' ? 'active' : ''}`}
                                    onClick={() => setDateMode('month')}
                                >
                                    月
                                </button>
                                <button
                                    className={`picker-tab ${dateMode === 'year' ? 'active' : ''}`}
                                    onClick={() => setDateMode('year')}
                                >
                                    年
                                </button>
                                <button
                                    className={`picker-tab ${dateMode === 'custom' ? 'active' : ''}`}
                                    onClick={() => setDateMode('custom')}
                                >
                                    自定义
                                </button>
                            </div>

                            {dateMode === 'year' && (
                                <>
                                    <div className="year-range-display">
                                        <ChevronLeft size={20} color="#666" />
                                        <span>2020-2029年</span>
                                        <ChevronRight size={20} color="#666" />
                                    </div>
                                    <div className="grid-container">
                                        {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029].map(y => (
                                            <div
                                                key={y}
                                                className={`grid-item ${currentDate.getFullYear() === y ? 'active' : ''}`}
                                                onClick={() => {
                                                    const newDate = new Date(currentDate)
                                                    newDate.setFullYear(y)
                                                    setCurrentDate(newDate)
                                                    if (dateMode === 'year') setShowDatePicker(false)
                                                }}
                                            >
                                                {y}年
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {dateMode === 'month' && (
                                <>
                                    <div className="year-range-display">
                                        <ChevronLeft onClick={() => {
                                            const d = new Date(currentDate)
                                            d.setFullYear(d.getFullYear() - 1)
                                            setCurrentDate(d)
                                        }} size={20} color="#666" style={{ cursor: 'pointer' }} />
                                        <span>{currentDate.getFullYear()}年</span>
                                        <ChevronRight onClick={() => {
                                            const d = new Date(currentDate)
                                            d.setFullYear(d.getFullYear() + 1)
                                            setCurrentDate(d)
                                        }} size={20} color="#666" style={{ cursor: 'pointer' }} />
                                    </div>
                                    <div className="grid-container">
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(m => (
                                            <div
                                                key={m}
                                                className={`grid-item ${currentDate.getMonth() + 1 === m ? 'active' : ''}`}
                                                onClick={() => {
                                                    const newDate = new Date(currentDate)
                                                    newDate.setDate(1) // Safety
                                                    newDate.setMonth(m - 1)
                                                    setCurrentDate(newDate)
                                                    setShowDatePicker(false)
                                                }}
                                            >
                                                {m}月
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}

                            {dateMode === 'custom' && (
                                <div style={{ padding: '0 20px', animation: 'fadeIn 0.3s' }}>
                                    {/* Quick Shortcuts */}
                                    <div style={{ display: 'flex', gap: 10, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
                                        <button onClick={() => {
                                            const d = new Date(); d.setDate(d.getDate() - 6);
                                            setCustomStart(d.toISOString().slice(0, 10));
                                            setCustomEnd(new Date().toISOString().slice(0, 10));
                                        }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: 'var(--bg-card)', fontSize: 12 }}>近7天</button>
                                        <button onClick={() => {
                                            const d = new Date(); d.setDate(d.getDate() - 29);
                                            setCustomStart(d.toISOString().slice(0, 10));
                                            setCustomEnd(new Date().toISOString().slice(0, 10));
                                        }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: 'var(--bg-card)', fontSize: 12 }}>近30天</button>
                                        <button onClick={() => {
                                            const now = new Date();
                                            const start = new Date(now.getFullYear(), now.getMonth(), 1);
                                            const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                                            setCustomStart(start.toISOString().slice(0, 10));
                                            setCustomEnd(end.toISOString().slice(0, 10));
                                        }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: 'var(--bg-card)', fontSize: 12 }}>本月</button>
                                        <button onClick={() => {
                                            const now = new Date();
                                            const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                                            const end = new Date(now.getFullYear(), now.getMonth(), 0);
                                            setCustomStart(start.toISOString().slice(0, 10));
                                            setCustomEnd(end.toISOString().slice(0, 10));
                                        }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: 'var(--bg-card)', fontSize: 12 }}>上月</button>
                                    </div>

                                    <div style={{ background: '#f8f8f8', borderRadius: 12, padding: '0 16px', marginBottom: 20 }}>
                                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                                            onClick={() => { setCalendarTarget('start'); setCalendarOpen(true); }}>
                                            <span style={{ fontSize: 15 }}>开始日期</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
                                                {customStart} <ChevronRight size={16} color="#ccc" />
                                            </div>
                                        </div>
                                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer' }}
                                            onClick={() => { setCalendarTarget('end'); setCalendarOpen(true); }}>
                                            <span style={{ fontSize: 15 }}>结束日期</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-primary)' }}>
                                                {customEnd} <ChevronRight size={16} color="#ccc" />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center' }}>
                                        <button onClick={() => {
                                            const p = new URLSearchParams(window.location.search)
                                            p.set('range', 'custom')
                                            p.set('start', customStart)
                                            p.set('end', customEnd)
                                            navigate(`${location.pathname}?${p.toString()}`, { replace: true })
                                            setShowDatePicker(false)
                                        }} style={{ width: '100%', background: '#FFB800', color: '#fff', padding: '12px', borderRadius: 12, border: 'none', fontWeight: '600', fontSize: 15 }}>
                                            确认
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Custom Calendar Modal */}
                            <DatePickerModal
                                isOpen={calendarOpen}
                                onClose={() => setCalendarOpen(false)}
                                title={calendarTarget === 'start' ? "选择开始日期" : "选择结束日期"}
                                initialDate={calendarTarget === 'start' ? customStart : customEnd}
                                onSelect={(date) => {
                                    if (calendarTarget === 'start') setCustomStart(date)
                                    else setCustomEnd(date)
                                }}
                            />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Statistics
