import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ChevronLeft, Filter, X, Calendar } from 'lucide-react'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import { useSwipeable } from 'react-swipeable' // Import
import { getDB } from '../db/database'
import { getAllTransactions } from '../db/stores'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler } from 'chart.js'
import DatePickerModal from '../components/DatePickerModal'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Filler)

const TABS = [
    { key: 'basic', label: '收支' },
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
    const [weeklyData, setWeeklyData] = useState(null) // New State
    const [projectData, setProjectData] = useState(null)
    const [memberData, setMemberData] = useState(null)
    const [accountData, setAccountData] = useState(null)
    const [categoryData, setCategoryData] = useState(null)
    const [merchantData, setMerchantData] = useState(null)

    useEffect(() => {
        loadData()
    }, [activeTab, catType, timeView, currentDate, dateMode, customStart, customEnd])

    const loadData = async () => {
        // ... (same as before)
        const db = getDB()
        const [allTrans, allAccs, allCats, allProjects, allPersons] = await Promise.all([
            getAllTransactions(),
            db.getAll('accounts'),
            db.getAll('categories'),
            db.getAll('projects'),
            db.getAll('persons')
        ])

        setCategories(allCats)

        // Filter Transactions by Date
        const y = currentDate.getFullYear()
        const m = currentDate.getMonth() + 1

        const filteredTrans = allTrans.filter(t => {
            if (dateMode === 'custom') {
                const dStr = t.date.slice(0, 10)
                return dStr >= customStart && dStr <= customEnd
            }
            const d = new Date(t.date)
            if (dateMode === 'year') {
                return d.getFullYear() === y
            } else {
                return d.getFullYear() === y && (d.getMonth() + 1) === m
            }
        })

        if (activeTab === 'basic') {
            processBasicData(filteredTrans, allCats, allAccs)
            processWeeklyData(filteredTrans)
        }
        // ... (other tabs)
        else if (activeTab === 'project') {
            processProjectData(allTrans, allProjects)
        } else if (activeTab === 'member') {
            processMemberData(allTrans, allPersons)
        } else if (activeTab === 'account') {
            processAccountData(allAccs, allTrans)
        } else if (activeTab === 'category') {
            processCategoryData(filteredTrans, allCats, catType)
        } else if (activeTab === 'merchant') {
            processMerchantData(allTrans)
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

    const processBasicData = (trans, cats, accs) => {
        // ... (existing logic)
        // 1. Overview
        const totalIncome = trans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
        const totalExpense = trans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
        const surplus = totalIncome - totalExpense
        const count = trans.length

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

        // Default if empty
        if (topIncome.length === 0) {
            topIncome = cats.filter(c => c.type === 'income').slice(0, 3).map(c => ({
                name: c.name, icon: c.icon, amount: 0, id: c.id
            }))
        }

        // 3. Expense Distribution (Top 1)
        const expCats = {}
        trans.filter(t => t.type === 'expense').forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            expCats[key] = (expCats[key] || 0) + Number(t.amount)
        })
        let topExpense = Object.keys(expCats).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', id: Number(cid) }
            return { name: cat.name, subName, icon: cat.icon, amount: expCats[key], id: cat.id }
        }).sort((a, b) => b.amount - a.amount).slice(0, 1)

        // Default if empty
        if (topExpense.length === 0) {
            topExpense = cats.filter(c => c.type === 'expense').slice(0, 1).map(c => ({
                name: c.name, icon: c.icon, amount: 0, id: c.id
            }))
        }

        // 4. Monthly Trend
        const months = Array.from({ length: 12 }, (_, i) => i + 1)
        const monthlyData = months.map(m => {
            const mTrans = trans.filter(t => new Date(t.date).getMonth() + 1 === m)
            const inc = mTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = mTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            return { m, inc, exp }
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

        setBasicData({
            surplus, totalIncome, totalExpense, count,
            topIncome, topExpense,
            monthlyData,
            assets, liabilities,
            dynAccs
        })
    }

    // ... (rest of process functions unchanged)
    const processProjectData = (trans, projects) => {
        let totalSurplus = 0
        let totalIncome = 0
        let totalExpense = 0

        const list = projects.map(p => {
            const pTrans = trans.filter(t => t.projectId === p.id)
            const inc = pTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = pTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            const bal = inc - exp

            totalSurplus += bal
            totalIncome += inc
            totalExpense += exp

            return { id: p.id, name: p.name, icon: p.icon, inc, exp, bal }
        }).sort((a, b) => a.bal - b.bal)

        setProjectData({
            totalSurplus, totalIncome, totalExpense, list
        })
    }

    const processMemberData = (trans, persons) => {
        const list = persons.map(p => {
            const pTrans = trans.filter(t => t.personId === p.id)
            const inc = pTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const exp = pTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            return { id: p.id, name: p.name, icon: p.avatar, inc, exp }
        })
        setMemberData({ list })
    }

    const processAccountData = (accs, trans) => {
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
        }).sort((a, b) => b._bal - a._bal)

        const currentTotal = dynAccs.reduce((s, a) => s + a._bal, 0)
        const trend = Array(12).fill(currentTotal)

        setAccountData({ list: dynAccs, trend })
    }

    const processCategoryData = (trans, cats, type) => {
        const filtered = trans.filter(t => t.type === type)
        const total = filtered.reduce((s, t) => s + Number(t.amount), 0)

        const map = {}
        filtered.forEach(t => {
            const key = `${t.categoryId}|${t.subCategory || ''}`
            map[key] = (map[key] || 0) + Number(t.amount)
        })

        const list = Object.keys(map).map(key => {
            const [cid, subName] = key.split('|')
            const cat = cats.find(c => c.id === Number(cid)) || { name: '未知', icon: '❓', color: '#ccc' }
            return {
                id: Number(cid),
                name: cat.name,
                subName,
                icon: cat.icon,
                color: cat.color,
                amount: map[key],
                percent: total > 0 ? (map[key] / total) : 0
            }
        }).sort((a, b) => b.amount - a.amount)

        setCategoryData({ total, list })
    }

    const processMerchantData = (trans) => {
        let total = 0
        const map = {}
        const filtered = trans.filter(t => t.merchantName && t.type === 'expense')

        filtered.forEach(t => {
            const mName = t.merchantName
            map[mName] = (map[mName] || 0) + Number(t.amount)
            total += Number(t.amount)
        })

        const list = Object.entries(map).map(([name, amount]) => ({
            name,
            amount,
            count: filtered.filter(t => t.merchantName === name).length
        })).sort((a, b) => b.amount - a.amount)

        setMerchantData({ total, list })
    }

    const formatAmount = (val) => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)

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
                    <button className="nav-arrow" onClick={() => changeDate(-1)} style={{ background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: '#666' }}>
                        <ChevronLeft size={18} />
                    </button>
                )}
                <div className="date-display-wrapper" onClick={() => setShowDatePicker(true)}
                    style={{
                        background: 'white',
                        padding: '8px 20px',
                        borderRadius: 24,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(0,0,0,0.02)'
                    }}>
                    <span className="date-display" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 16, fontWeight: 600, color: '#333' }}>
                        <Calendar size={16} color="#FFB800" /> {getDateDisplay()}
                    </span>
                    <span className="mode-hint" style={{ fontSize: 11, color: '#999', marginTop: 2 }}>
                        {dateMode === 'custom' ? '自定义范围' : dateMode === 'year' ? '(按年统计)' : '(按月统计)'}
                    </span>
                </div>
                {dateMode !== 'custom' && (
                    <button className="nav-arrow" onClick={() => changeDate(1)} style={{ background: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', color: '#666' }}>
                        <ChevronRight size={18} />
                    </button>
                )}
            </div>

            <div className="content-scroll">

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
                                        {/* Top Card */}
                                        <div className="stat-card mixed-theme">
                                            <div className="card-overlay"></div>
                                            <div className="card-content">
                                                <div className="card-top-row">
                                                    <span className="card-title-small">账本流水统计</span>
                                                </div>
                                                <div className="main-value-group">
                                                    <span className="currency-symbol">结余</span>
                                                    <span className="main-amount">{formatAmount(basicData.surplus)}</span>
                                                    <span className="eye-icon">👁</span>
                                                </div>
                                                <div className="card-bottom-row">
                                                    <span className="sub-stat">总收入 {formatAmount(basicData.totalIncome)}</span>
                                                    <span className="divider">|</span>
                                                    <span className="sub-stat">总支出 {formatAmount(basicData.totalExpense)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Milestone Card */}
                                        <div className="milestone-card">
                                            <div className="milestone-left">
                                                <span className="milestone-icon">📊</span>
                                                <span className="milestone-title">记账里程碑</span>
                                            </div>
                                            <div className="milestone-right">
                                                <span>记账笔数 <span className="milestone-num">{basicData.count}</span></span>
                                            </div>
                                        </div>

                                        {/* Income Sources */}
                                        <div className="section-card">
                                            <h3>收入来源</h3>
                                            {basicData.topIncome.map((item, i) => (
                                                <div key={i} className="list-row" onClick={() => navigate(`/records?categoryId=${item.id || ''}&range=${dateMode}&date=${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`)}>
                                                    <span className="row-rank">{i + 1}</span>
                                                    <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(255,152,0,0.2)' }}>{item.icon}</span>
                                                    <span className="row-name">
                                                        {item.name}
                                                        {item.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>· {item.subName}</span>}
                                                    </span>
                                                    <span className="row-amount">{formatAmount(item.amount)}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Expense Distribution */}
                                        <div className="section-card">
                                            <h3>支出分布</h3>
                                            {basicData.topExpense.map((item, i) => (
                                                <div key={i} className="list-row-bar" onClick={() => navigate(`/records?categoryId=${item.id || ''}&range=${dateMode}&date=${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01`)}>
                                                    <div className="row-header">
                                                        <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(244,67,54,0.15)' }}>{item.icon}</span>
                                                        <span className="row-name">
                                                            {item.name}
                                                            {item.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>· {item.subName}</span>}
                                                        </span>
                                                        <span className="row-percent">
                                                            {basicData.totalExpense > 0 ? ((item.amount / basicData.totalExpense) * 100).toFixed(2) : '0.00'}%
                                                        </span>
                                                        <span className="row-amount">{formatAmount(item.amount)}</span>
                                                    </div>
                                                    <div className="progress-bar">
                                                        <div className="fill" style={{
                                                            width: basicData.totalExpense > 0 ? `${(item.amount / basicData.totalExpense) * 100}%` : '0%'
                                                        }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Monthly Trend */}
                                        <div className="section-card">
                                            <h3>月度收支趋势</h3>
                                            <div className="chart-legend-custom">
                                                <span className="legend-item"><span className="dot income"></span>收入 {formatAmount(basicData.totalIncome)}</span>
                                                <span className="legend-item"><span className="dot expense"></span>支出 {formatAmount(basicData.totalExpense)}</span>
                                            </div>
                                            <div style={{ height: 180 }}>
                                                <Line data={{
                                                    labels: basicData.monthlyData.map(d => d.m + '月'),
                                                    datasets: [
                                                        { label: '支出', data: basicData.monthlyData.map(d => (d.exp)), borderColor: '#10B981', backgroundColor: '#10B981', pointRadius: 2, tension: 0.4 },
                                                        { label: '收入', data: basicData.monthlyData.map(d => (d.inc)), borderColor: '#EF4444', backgroundColor: '#EF4444', pointRadius: 2, tension: 0.4 },
                                                    ]
                                                }} options={{
                                                    maintainAspectRatio: false,
                                                    plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
                                                    scales: { x: { grid: { display: false } }, y: { display: false, min: 0 } }
                                                }} />
                                            </div>
                                        </div>

                                        {/* Assets */}
                                        <div className="section-card">
                                            <div className="card-header-row">
                                                <h3>资产类账户统计</h3>
                                                <span className="header-value">资产 {formatAmount(basicData.assets.reduce((s, a) => s + a._bal, 0))}</span>
                                            </div>
                                            <div className="pie-wrapper">
                                                <div style={{ width: 160, height: 160 }}>
                                                    <Doughnut data={{
                                                        labels: basicData.assets.map(a => a.name),
                                                        datasets: [{
                                                            data: basicData.assets.map(a => a._bal),
                                                            backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D', '#FFB800', '#6C5CE7', '#A8E6CF'],
                                                            borderWidth: 0
                                                        }]
                                                    }} options={{ plugins: { legend: { display: false } }, cutout: '60%' }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section-card">
                                            <div className="card-header-row">
                                                <h3>负债类账户统计</h3>
                                                <span className="header-value">负债 {formatAmount(basicData.liabilities.reduce((s, a) => s + Math.abs(a._bal), 0))}</span>
                                            </div>
                                            <div className="pie-wrapper">
                                                <div style={{ width: 160, height: 160 }}>
                                                    <Doughnut data={{
                                                        labels: basicData.liabilities.map(a => a.name),
                                                        datasets: [{
                                                            data: basicData.liabilities.map(a => Math.abs(a._bal)),
                                                            backgroundColor: ['#FF7675', '#FAB1A0', '#FD79A8'],
                                                            borderWidth: 0
                                                        }]
                                                    }} options={{ plugins: { legend: { display: false } }, cutout: '60%' }} />
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
                                                        <Bar data={{
                                                            labels: weeklyData.weeks.map(d => d.label),
                                                            datasets: [
                                                                { label: '支出', data: weeklyData.weeks.map(d => (d.expense)), backgroundColor: '#10B981', borderRadius: 4 },
                                                                { label: '收入', data: weeklyData.weeks.map(d => (d.income)), backgroundColor: '#EF4444', borderRadius: 4 },
                                                            ]
                                                        }} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { display: false } } }} />
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
                                            </>
                                        )}
                                    </>
                                )}


                                <div className="section-card">
                                    <h3>收入来源 (Top 3)</h3>
                                    {basicData.topIncome.map((item, i) => (
                                        <div key={i} className="list-row">
                                            <span className="row-rank">{i + 1}</span>
                                            <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(255,152,0,0.2)' }}>{item.icon}</span>
                                            <span className="row-name">
                                                {item.name}
                                                {item.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>· {item.subName}</span>}
                                            </span>
                                            <span className="row-amount">{formatAmount(item.amount)}</span>
                                        </div>
                                    ))}
                                    {basicData.topIncome.length === 0 && <div className="empty-row">暂无收入</div>}
                                </div>

                                <div className="section-card">
                                    <h3>支出分布 (Top 1)</h3>
                                    {basicData.topExpense.map((item, i) => (
                                        <div key={i} className="list-row-bar">
                                            <div className="row-header">
                                                <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(244,67,54,0.15)' }}>{item.icon}</span>
                                                <span className="row-name">
                                                    {item.name}
                                                    {item.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>· {item.subName}</span>}
                                                </span>
                                                <span className="row-percent">100.00%</span>
                                                <span className="row-amount">{formatAmount(item.amount)}</span>
                                            </div>
                                            <div className="progress-bar"><div className="fill" style={{ width: '100%' }}></div></div>
                                        </div>
                                    ))}
                                    {basicData.topExpense.length === 0 && <div className="empty-row">暂无支出</div>}
                                </div>

                                <div className="section-card">
                                    <h3>资产类账户统计</h3>
                                    <div className="pie-wrapper">
                                        <div style={{ width: 150, height: 150 }}>
                                            <Doughnut data={{
                                                labels: basicData.assets.map(a => a.name),
                                                datasets: [{ data: basicData.assets.map(a => a._bal), backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D'] }]
                                            }} options={{ plugins: { legend: { display: false } } }} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}

                {/* ... (rest of tabs) */}


                {/* --- CATEGORY TAB --- */}
                {activeTab === 'category' && categoryData && (
                    <>
                        {/* Type Switcher */}
                        <div className="type-switch">
                            <button className={`switch-btn ${catType === 'expense' ? 'active' : ''}`} onClick={() => setCatType('expense')}>支出</button>
                            <button className={`switch-btn ${catType === 'income' ? 'active' : ''}`} onClick={() => setCatType('income')}>收入</button>
                        </div>

                        {/* Chart */}
                        <div className="section-card">
                            <h3 style={{ textAlign: 'center' }}>{catType === 'expense' ? '支出' : '收入'}概况 ¥{formatAmount(categoryData.total)}</h3>
                            <div className="pie-wrapper">
                                <div style={{ width: 150, height: 150 }}>
                                    <Doughnut data={{
                                        labels: categoryData.list.map(c => c.name),
                                        datasets: [{
                                            data: categoryData.list.map(c => c.amount),
                                            backgroundColor: categoryData.list.map(c => c.color || '#ccc')
                                        }]
                                    }} options={{ plugins: { legend: { display: false } } }} />
                                </div>
                            </div>
                        </div>

                        {/* List */}
                        <div className="section-card">
                            {categoryData.list.map((c, i) => (
                                <div key={i} className="list-row-bar" onClick={() => navigate(`/records?categoryId=${c.id}&range=${dateMode}&date=${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-01${c.subName ? `&subCategory=${encodeURIComponent(c.subName)}` : ''}`)}>
                                    <div className="row-header">
                                        <span className="row-icon">{c.icon}</span>
                                        <span className="row-name">
                                            {c.name}
                                            {c.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400, marginLeft: 4 }}>· {c.subName}</span>}
                                        </span>
                                        <span className="row-percent">{(c.percent * 100).toFixed(1)}%</span>
                                        <span className="row-amount">{formatAmount(c.amount)}</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="fill" style={{ width: `${c.percent * 100}%`, background: c.color || '#4ECDC4' }}></div>
                                    </div>
                                </div>
                            ))}
                            {categoryData.list.length === 0 && <div className="empty-row">暂无数据</div>}
                        </div>
                    </>
                )}

                {/* --- MERCHANT TAB --- */}
                {activeTab === 'merchant' && merchantData && (
                    <>
                        <div className="stat-card white">
                            <div className="card-content centered">
                                <span className="label-icon" style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏪</span>
                                <span className="label">商家总支出</span>
                                <div className="main-value-dark">
                                    <span className="amount">¥{formatAmount(merchantData.total)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="section-card">
                            <h3>商家排行榜</h3>
                            {merchantData.list.map((m, i) => (
                                <div key={i} className="list-row" onClick={() => navigate(`/records?merchantId=${m.name}&range=${dateMode}&date=${currentDate.year}-${String(currentDate.month).padStart(2, '0')}-01`)}>
                                    <span className="row-rank">{i + 1}</span>
                                    <span className="row-name" style={{ marginLeft: 8 }}>{m.name}</span>
                                    <div className="row-right" style={{ textAlign: 'right' }}>
                                        <div className="row-amount">{formatAmount(m.amount)}</div>
                                        <div style={{ fontSize: 11, color: '#999' }}>{m.count}笔</div>
                                    </div>
                                </div>
                            ))}
                            {merchantData.list.length === 0 && <div className="empty-row">暂无商家数据</div>}
                        </div>
                    </>
                )}

                {/* --- PROJECT TAB --- */}
                {activeTab === 'project' && projectData && (
                    <>
                        <div className="stat-card white">
                            <div className="card-content centered">
                                <span className="label-icon" style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>📊</span>
                                <span className="label">总结余</span>
                                <div className="main-value-dark">
                                    <span className="unit">结余</span>
                                    <span className="amount">{formatAmount(projectData.totalSurplus)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="section-card">
                            <h3>项目收入统计</h3>
                            {projectData.list.map((p, i) => (
                                <div key={i} className="list-row" onClick={() => navigate(`/records?projectId=${p.id}&range=${dateMode}&date=${currentDate.year}-${String(currentDate.month).padStart(2, '0')}-01`)}>
                                    <span className="row-rank">{i + 1}</span>
                                    <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(76,175,80,0.2)' }}>{p.icon}</span>
                                    <span className="row-name">{p.name}</span>
                                    <span className="row-amount">{formatAmount(p.inc)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="section-card">
                            <h3>项目支出统计</h3>
                            {projectData.list.map((p, i) => (
                                <div key={i} className="list-row" onClick={() => navigate(`/records?projectId=${p.id}&range=${dateMode}&date=${currentDate.year}-${String(currentDate.month).padStart(2, '0')}-01`)}>
                                    <span className="row-rank">{i + 1}</span>
                                    <span className="row-icon" style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, boxShadow: '0 2px 8px rgba(244,67,54,0.15)' }}>{p.icon}</span>
                                    <span className="row-name">{p.name}</span>
                                    <span className="row-amount">{formatAmount(p.exp)}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* --- MEMBER TAB --- */}
                {activeTab === 'member' && memberData && (
                    <>
                        <div className="section-card">
                            <h3>成员支出统计</h3>
                            <div className="pie-wrapper">
                                <div style={{ width: 150, height: 150 }}>
                                    <Doughnut data={{
                                        labels: memberData.list.map(a => a.name),
                                        datasets: [{ data: memberData.list.map(a => a.exp), backgroundColor: ['#4ECDC4', '#FF6B6B', '#FFE66D'] }]
                                    }} options={{ plugins: { legend: { display: false } } }} />
                                </div>
                            </div>
                        </div>
                        <div className="section-card">
                            <h3>成员收入统计</h3>
                            {memberData.list.map((p, i) => (
                                <div key={i} className="list-row">
                                    <span className="row-rank">{i + 1}</span>
                                    <span className="row-icon">{p.icon}</span>
                                    <span className="row-name">{p.name}</span>
                                    <span className="row-amount">{formatAmount(p.inc)}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* --- ACCOUNT TAB --- */}
                {activeTab === 'account' && accountData && (
                    <>
                        <div className="stat-card gradient-orange">
                            <span className="label">净资产</span>
                            <div className="main-value">
                                <span className="amount">{formatAmount(accountData.list.reduce((s, a) => s + a._bal, 0))}</span>
                            </div>
                            <div style={{ height: 100, marginTop: 20 }}>
                                <Line data={{
                                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                                    datasets: [{ data: accountData.trend, borderColor: '#fff', tension: 0.4 }]
                                }} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }} />
                            </div>
                        </div>
                        <div className="section-card">
                            <h3>资产明细</h3>
                            {accountData.list.map((a, i) => (
                                <div key={i} className="list-row">
                                    <span className="row-rank">{i + 1}</span>
                                    <span className="row-icon">{a.icon}</span>
                                    <span className="row-name">{a.name}</span>
                                    <span className="row-amount">{formatAmount(a._bal)}</span>
                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>

            <style>{`
                .statistics-page { background: #f5f6fa; min-height: 100vh; display: flex; flex-direction: column; padding-bottom: 20px; }
                .page-header { background: #fff; padding-top: calc(10px + var(--safe-area-top)); position: sticky; top: 0; z-index: 10; }
                .back-btn { padding: 10px; border: none; background: none; }
                .page-header h1 { text-align: center; font-size: 17px; font-weight: 600; margin-top: -36px; margin-bottom: 10px; pointer-events: none; }
                
                .tabs-scroll { 
                    display: flex; overflow-x: auto; padding: 0 4px; border-bottom: none; background: #fff; 
                    scrollbar-width: none; -ms-overflow-style: none;
                }
                .tabs-scroll::-webkit-scrollbar { display: none; }

                .tab-item { 
                    padding: 12px 16px; font-size: 15px; color: #666; white-space: nowrap; transition: all 0.2s; 
                    position: relative;
                }
                .tab-item.active { 
                    color: #333; font-weight: 600; font-size: 16px; 
                }
                .tab-item.active::after {
                    content: ''; position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
                    width: 20px; height: 3px; background: #FFB800; border-radius: 2px;
                }
                
                .date-filter { 
                    background: #fff; padding: 10px 0; margin-top: 1px; margin-bottom: 12px;
                    display: flex; align-items: center; justify-content: center; gap: 20px;
                }
                .nav-arrow { 
                    background: #f5f5f5; border: none; padding: 0; 
                    width: 32px; height: 32px; border-radius: 50%;
                    color: #666; display: flex; align-items: center; justify-content: center; 
                }
                .date-display-wrapper { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
                .date-display { font-weight: 600; font-size: 16px; display: flex; align-items: center; gap: 6px; color: #333; }
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
                    background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px;
                    display: flex; align-items: center; justify-content: space-between;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
                }
                .milestone-left { display: flex; align-items: center; gap: 8px; }
                .milestone-icon { font-size: 18px; }
                .milestone-title { font-size: 14px; font-weight: 600; color: #333; }
                .milestone-right { font-size: 12px; color: #999; }
                .milestone-num { color: #333; font-weight: 600; margin-left: 4px; }

                /* Section Cards */
                .section-card { background: #fff; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02); }
                .section-card h3 { font-size: 14px; color: #333; margin-bottom: 12px; font-weight: 600; }
                
                .card-header-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
                .card-header-row h3 { margin-bottom: 0; }
                .header-value { font-size: 12px; color: #999; }

                /* List Item Styles */
                .list-row { display: flex; align-items: center; padding: 12px 0; border-bottom: 1px solid #f9f9f9; cursor: pointer; }
                .list-row:last-child { border-bottom: none; }
                .row-rank { width: 20px; color: #ccc; font-size: 12px; font-weight: 500; }
                .row-icon { margin-right: 12px; font-size: 20px; width: 32px; height: 32px; background: #f8f8f8; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
                .row-name { flex: 1; font-size: 14px; color: #333; font-weight: 500; }
                .row-amount { font-size: 14px; color: #333; font-weight: 500; }
                
                /* Bar Item Styles */
                .list-row-bar { margin-bottom: 16px; cursor: pointer; }
                .row-header { display: flex; align-items: center; margin-bottom: 8px; }
                .row-percent { color: #999; font-size: 12px; margin-right: 8px; min-width: 45px; text-align: right; }
                .progress-bar { height: 6px; background: #f0f0f0; border-radius: 3px; overflow: hidden; }
                .fill { height: 100%; background: #4ECDC4; border-radius: 3px; }
                
                /* Chart Legend */
                .chart-legend-custom { display: flex; gap: 16px; margin-bottom: 10px; }
                .legend-item { font-size: 11px; color: #666; display: flex; align-items: center; gap: 4px; background: #f5f5f5; padding: 4px 8px; border-radius: 4px; }
                .dot { width: 6px; height: 6px; border-radius: 50%; }
                .dot.income { background: #FFB800; }
                .dot.expense { background: #4ECDC4; }

                .pie-wrapper { display: flex; justify-content: center; padding: 10px 0; }
                .empty-row { text-align: center; color: #ccc; padding: 20px; font-size: 12px; }
                
                .type-switch { display: flex; justify-content: center; margin-bottom: 20px; }
                .switch-btn { padding: 8px 24px; background: #fff; border: 1px solid #ddd; font-size: 14px; color: #666; }
                .switch-btn:first-child { border-radius: 20px 0 0 20px; border-right: none; }
                .switch-btn:last-child { border-radius: 0 20px 20px 0; border-left: none; }
                .switch-btn.active { background: #FFB800; color: #fff; border-color: #FFB800; }
                
                .stat-card.gradient-orange { background: linear-gradient(135deg, #FF9966 0%, #FF5E62 100%); }
                .stat-card.white { background: #fff; color: #333; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                .main-value-dark { font-size: 30px; font-weight: bold; color: #333; }
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
                    background: #fff;
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
                .close-btn { position: absolute; right: 16px; background: none; border: none; font-size: 24px; color: #999; }
                .picker-tabs {
                    display: flex;
                    justify-content: center;
                    padding: 16px 0;
                    gap: 20px;
                }
                .picker-tab { /* 模仿图片中的月/年切换按钮 */
                    padding: 8px 30px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    color: #666;
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
                    background: #fff;
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
            {showDatePicker && (
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
                                    }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: '#fff', fontSize: 12 }}>近7天</button>
                                    <button onClick={() => {
                                        const d = new Date(); d.setDate(d.getDate() - 29);
                                        setCustomStart(d.toISOString().slice(0, 10));
                                        setCustomEnd(new Date().toISOString().slice(0, 10));
                                    }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: '#fff', fontSize: 12 }}>近30天</button>
                                    <button onClick={() => {
                                        const now = new Date();
                                        const start = new Date(now.getFullYear(), now.getMonth(), 1);
                                        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
                                        setCustomStart(start.toISOString().slice(0, 10));
                                        setCustomEnd(end.toISOString().slice(0, 10));
                                    }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: '#fff', fontSize: 12 }}>本月</button>
                                    <button onClick={() => {
                                        const now = new Date();
                                        const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
                                        const end = new Date(now.getFullYear(), now.getMonth(), 0);
                                        setCustomStart(start.toISOString().slice(0, 10));
                                        setCustomEnd(end.toISOString().slice(0, 10));
                                    }} style={{ padding: '6px 12px', borderRadius: 20, border: '1px solid #eee', background: '#fff', fontSize: 12 }}>上月</button>
                                </div>

                                <div style={{ background: '#f8f8f8', borderRadius: 12, padding: '0 16px', marginBottom: 20 }}>
                                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                                        onClick={() => { setCalendarTarget('start'); setCalendarOpen(true); }}>
                                        <span style={{ fontSize: 15 }}>开始日期</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#333' }}>
                                            {customStart} <ChevronRight size={16} color="#ccc" />
                                        </div>
                                    </div>
                                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer' }}
                                        onClick={() => { setCalendarTarget('end'); setCalendarOpen(true); }}>
                                        <span style={{ fontSize: 15 }}>结束日期</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#333' }}>
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
            )}
        </div >
    )
}

export default Statistics
