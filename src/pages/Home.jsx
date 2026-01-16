import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable' // Import
import {
  MessageCircle, Wallet, Users, Store, FolderKanban, Target,
  Calendar, BarChart3, PieChart, Globe, ChevronRight, Eye, EyeOff,
  Utensils, Bus, ShoppingBag, Gamepad2, Home as HomeIcon, Smartphone, Pill, BookOpen,
  Banknote, Gift, TrendingUp, Briefcase, Stamp, LayoutGrid
} from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getMonthlyStats, getTransactionsByMonth, getAllCategories, getCategoryStats } from '../db/stores'
import { getDB } from '../db/database'

ChartJS.register(ArcElement, Tooltip, Legend)

function Home() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    today: { income: 0, expense: 0 },
    week: { income: 0, expense: 0 },
    month: { income: 0, expense: 0 },
    year: { income: 0, expense: 0 }
  })
  const [expenseStats, setExpenseStats] = useState({ total: 0, stats: [] })
  const [incomeStats, setIncomeStats] = useState({ total: 0, stats: [] })
  const [budgetData, setBudgetData] = useState({ total: 0, used: 0, percent: 0 })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [netAssets, setNetAssets] = useState(0)
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)
  const [hideAmounts, setHideAmounts] = useState(false) // 隐藏金额

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const monthKey = `${year}-${month.toString().padStart(2, '0')}`

  // Swipe Logic
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextMonth(),
    onSwipedRight: () => handlePrevMonth(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  })

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  useEffect(() => {
    loadData()
  }, [year, month])

  const loadData = async () => {
    try {
      const monthStats = await getMonthlyStats(year, month)

      const db = getDB()
      const allAccounts = await db.getAll('accounts')

      // 分别计算总资产（正数）和总负债（负数账户余额取绝对值）
      let assets = 0
      let liabilities = 0
      allAccounts.forEach(acc => {
        const balance = Number(acc.balance || 0)
        if (balance >= 0) {
          assets += balance
        } else {
          liabilities += Math.abs(balance)
        }
      })

      setTotalAssets(assets)
      setTotalLiabilities(liabilities)
      setNetAssets(assets - liabilities)

      // 获取分类统计
      const expenseCatStats = await getCategoryStats(year, month, 'expense')
      const incomeCatStats = await getCategoryStats(year, month, 'income')
      setExpenseStats(expenseCatStats)
      setIncomeStats(incomeCatStats)

      // 获取预算数据
      const allBudgets = await db.getAll('budgets')
      const monthBudgets = allBudgets.filter(b => b.month === monthKey)
      const totalBudget = monthBudgets.reduce((sum, b) => sum + Number(b.amount || 0), 0)
      const usedBudget = monthStats.expense
      // 如果没有预算，默认1 (避免除0)，或者处理为0
      const budgetPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0

      setBudgetData({
        total: totalBudget,
        used: usedBudget,
        percent: budgetPercent
      })

      // 计算各时间维度统计
      const today = new Date()
      const transactions = await getTransactionsByMonth(year, month)

      // 今日统计
      const todayTrans = transactions.filter(t =>
        new Date(t.date).toDateString() === today.toDateString()
      )
      const todayIncome = todayTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
      const todayExpense = todayTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

      // 本周统计
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const weekTrans = transactions.filter(t => new Date(t.date) >= weekStart)
      const weekIncome = weekTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
      const weekExpense = weekTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

      setStats({
        today: { income: todayIncome, expense: todayExpense },
        week: { income: weekIncome, expense: weekExpense },
        month: { income: monthStats.income, expense: monthStats.expense },
        year: { income: monthStats.income, expense: monthStats.expense }
      })
    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const getDateRange = (type) => {
    const today = new Date()
    switch (type) {
      case 'today':
        return `${year}.${month}.${today.getDate()}`
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay() + 1)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        return `${weekStart.getMonth() + 1}.${weekStart.getDate()}-${weekEnd.getMonth() + 1}.${weekEnd.getDate()}`
      case 'month':
        return `${month}.1-${month}.${new Date(year, month, 0).getDate()}`
      case 'year':
        return `${year}`
      default:
        return ''
    }
  }

  // 图标映射助手
  const getIconComponent = (iconName, size = 20) => {
    const iconMap = {
      'Card': Wallet,
      'Users': Users,
      'Store': Store,
      'Folder': FolderKanban,
      'Target': Target,
      'Calendar': Calendar,
      'BarChart': BarChart3,
      'PieChart': PieChart,
      'Globe': Globe,
      // 分类图标映射
      '🍜': Utensils, '餐饮': Utensils,
      '🚌': Bus, '交通': Bus,
      '🛒': ShoppingBag, '购物': ShoppingBag,
      '🎮': Gamepad2, '娱乐': Gamepad2,
      '🏠': HomeIcon, '居住': HomeIcon,
      '📱': Smartphone, '通讯': Smartphone,
      '💊': Pill, '医疗': Pill,
      '📚': BookOpen, '教育': BookOpen,
      '🍎': Utensils, '食品酒水': Utensils,
      '🧴': ShoppingBag, '日用品': ShoppingBag,
      '💰': Banknote, '工资': Banknote,
      '🎁': Gift, '奖金': Gift,
      '📈': TrendingUp, '理财': TrendingUp,
      '💼': Briefcase, '兼职': Briefcase,
      '🧧': Gift, '红包': Gift,
      '💵': Banknote, '其他收入': Banknote,
    }
    const Icon = iconMap[iconName] || LayoutGrid
    return <Icon size={size} strokeWidth={1.5} />
  }

  const quickActions = [
    { icon: Wallet, label: '账户', color: '#FFF8E6', iconColor: '#FFB800', path: '/accounts' },
    { icon: Users, label: '成员统计', color: '#E8F4FD', iconColor: '#4A90E2', path: '/members' },
    { icon: Store, label: '商家', color: '#FFF0F6', iconColor: '#FF6B6B', path: '/statistics?tab=merchant' },
    { icon: FolderKanban, label: '项目', color: '#E6F9F1', iconColor: '#4ECDC4', path: '/projects' },
    { icon: Target, label: '预算', color: '#F3E5F5', iconColor: '#9B59B6', path: '/budget' }
  ]

  const timeStats = [
    { key: 'today', icon: Calendar, label: '今天', dateRange: getDateRange('today'), color: '#FFB800' },
    { key: 'week', icon: BarChart3, label: '本周', dateRange: getDateRange('week'), color: '#4A90E2' },
    { key: 'month', icon: PieChart, label: '本月', dateRange: getDateRange('month'), color: '#FF6B6B' },
    { key: 'year', icon: Globe, label: '本年', dateRange: getDateRange('year'), color: '#4ECDC4' }
  ]

  // 饼图数据
  const chartData = expenseStats.stats.length > 0 ? {
    labels: expenseStats.stats.map(s => s.category.name),
    datasets: [{
      data: expenseStats.stats.map(s => s.amount),
      backgroundColor: expenseStats.stats.map(s => s.category.color),
      borderWidth: 0,
      cutout: '70%'
    }]
  } : null

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  }

  return (
    <div className="page home-page" {...handlers}>
      {/* 顶部标题栏 */}
      <div className="top-bar">
        <div className="book-info">
          <h1 className="book-title">我的账本 ({year}年{month}月)</h1>
          <span className="book-subtitle">← 左右滑动切换月份 →</span>
        </div>
        <button className="msg-btn">
          <MessageCircle size={22} />
        </button>
      </div>

      {/* 快捷入口 */}
      <div className="quick-entries-container">
        <div className="quick-entries">
          {quickActions.map((action, index) => (
            <button key={index} className="quick-entry" onClick={() => navigate(action.path)}>
              <div className="entry-icon-wrapper" style={{ backgroundColor: action.color }}>
                <action.icon size={22} color={action.iconColor} />
              </div>
              <span className="entry-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 账户统计卡片 */}
      <div className="stats-card-container">
        <div className="stats-card">
          <div className="stats-header">
            <div className="stats-left">
              <span className="stats-title">账户统计</span>
              <span className="stats-label">净资产</span>
            </div>
            <button className="hide-toggle" onClick={(e) => { e.stopPropagation(); setHideAmounts(!hideAmounts) }}>
              {hideAmounts ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="stats-amount-box" onClick={() => navigate('/accounts')}>
            <span className="amount">
              {hideAmounts ? '****' : formatAmount(netAssets)}
            </span>
          </div>
          <div className="stats-bottom">
            <span className="sub-stat">总资产 {hideAmounts ? '****' : formatAmount(totalAssets)}</span>
            <span className="sub-stat">总负债 {hideAmounts ? '****' : formatAmount(totalLiabilities)}</span>
          </div>
          <div className="stats-decoration"></div>
        </div>

        {/* 预算仪表盘 (New Feature) */}
        {budgetData.total > 0 && (
          <div className="budget-dashboard" onClick={() => navigate('/budget')}>
            <div className="budget-dash-top">
              <span className="b-label">本月预算进度</span>
              <span className="b-remain">剩余 ¥{formatAmount(Math.max(0, budgetData.total - budgetData.used))}</span>
            </div>
            <div className="budget-dash-bar">
              <div
                className="budget-dash-fill"
                style={{
                  width: `${Math.min(budgetData.percent, 100)}%`,
                  backgroundColor: budgetData.percent > 90 ? '#FF5252' : budgetData.percent > 70 ? '#FFC107' : '#4CAF50'
                }}
              ></div>
            </div>
            <div className="budget-dash-bottom">
              <span className="b-used">已用 {budgetData.percent.toFixed(0)}%</span>
              <span className="b-total">总预算 ¥{formatAmount(budgetData.total)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="page-content">
        {/* 时间维度统计 */}
        <div className="card-section time-stats">
          {timeStats.map((item) => (
            <div
              key={item.key}
              className="time-stat-item clickable"
              onClick={() => navigate(`/records?range=${item.key}`)}
            >
              <div className="time-stat-left">
                <div className="time-icon-box" style={{ color: item.color, backgroundColor: `${item.color}15` }}>
                  <item.icon size={20} strokeWidth={2} />
                </div>
                <div className="time-info">
                  <span className="time-label">{item.label}</span>
                  <span className="time-range">{item.dateRange}</span>
                </div>
              </div>
              <div className="time-stat-right">
                <div className="stat-row">
                  <span className="stat-type">总收入</span>
                  <span className="stat-value income">{formatAmount(stats[item.key]?.income || 0)}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-type">总支出</span>
                  <span className="stat-value expense">{formatAmount(stats[item.key]?.expense || 0)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 本月分类支出 */}
        <div className="card-section">
          <div className="card-header">
            <span className="card-title">{month}月分类支出</span>
            <div className="card-summary">
              <span>{expenseStats.stats.length}笔</span>
              <span className="total-expense">¥ {formatAmount(expenseStats.total)}</span>
            </div>
          </div>

          <div className="list-container">
            {expenseStats.stats.slice(0, 5).map((item, index) => (
              <div key={item.categoryId} className="list-item">
                <span className="rank-num">{index + 1}</span>
                <div
                  className="category-icon-box"
                  style={{ backgroundColor: `${item.category.color}20`, color: item.category.color }}
                >
                  {getIconComponent(item.category.name, 18)}
                </div>
                <div className="item-content">
                  <div className="item-row">
                    <span className="item-name">{item.category.name}</span>
                    <span className="item-percent">{item.percentage}%</span>
                    <span className="item-amount">¥{formatAmount(item.amount)}</span>
                  </div>
                  <div className="progress-bg">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: item.category.color
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            {expenseStats.stats.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">📝</span>
                <p>本月暂无支出，快去记一笔吧</p>
              </div>
            )}
          </div>
        </div>

        {/* 本月支出分布 */}
        {expenseStats.stats.length > 0 && (
          <div className="card-section">
            <div className="card-header">
              <span className="card-title">本月支出分布</span>
            </div>

            <div className="chart-container">
              <div className="doughnut-wrapper">
                <Doughnut data={chartData} options={chartOptions} />
                <div className="chart-center-text">
                  <span className="chart-label">总支出</span>
                  <span className="chart-value">{formatAmount(expenseStats.total)}</span>
                </div>
              </div>
              <div className="chart-legend-grid">
                {expenseStats.stats.slice(0, 4).map((item) => (
                  <div key={item.categoryId} className="legend-grid-item">
                    <span
                      className="legend-dot"
                      style={{ backgroundColor: item.category.color }}
                    ></span>
                    <span className="legend-text">{item.category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        :root {
          --primary-brand: #FFB800; /* 随手记黄 */
          --bg-gray: #F5F6F8;
        }

        .home-page {
          padding-bottom: 90px;
          background: var(--bg-gray);
          min-height: 100vh;
        }

        /* 顶部栏 */
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .back-btn, .msg-btn {
          color: #333;
          padding: 8px;
          background: none;
          border: none;
        }

        .book-info {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .book-title {
          font-size: 17px;
          font-weight: 600;
          color: #333;
        }

        .book-subtitle {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }

        /* 快捷入口 */
        .quick-entries-container {
          background: #fff;
          padding-bottom: 20px;
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          margin-bottom: 16px;
        }

        .quick-entries {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          padding: 24px 16px 12px;
        }

        .quick-entry {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .entry-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }
        
        .quick-entry:active .entry-icon-wrapper {
          transform: scale(0.95);
        }

        .entry-label {
          font-size: 12px;
          color: #666;
          font-weight: 500;
        }

        /* 统计卡片 */
        .stats-card-container {
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .stats-card {
          background: linear-gradient(135deg, #3ECFC5 0%, #5AB9D6 100%);
          background-image: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop');
          background-size: cover;
          background-position: right center;
          color: #fff;
          padding: 16px 20px;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0,0,0,0.15);
          min-height: 130px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .stats-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(62, 207, 197, 0.8) 0%, rgba(90, 185, 214, 0.6) 100%);
          z-index: 1;
        }

        .stats-header {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stats-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stats-title {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
        }
        
        .stats-label {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
        }
        
        .stats-amount-box {
          text-align: right;
        }

        .stats-amount-box .currency {
          font-size: 16px;
          margin-right: 4px;
          font-weight: 500;
          opacity: 0.8;
          color: #F1D4A3;
        }

        .stats-amount-box .amount {
          font-size: 24px;
          font-weight: 700;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
          color: #F1D4A3;
        }

        .stats-decoration {
          position: absolute;
          right: -20px;
          bottom: -40px;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(241, 212, 163, 0.1) 0%, transparent 70%);
          z-index: 1;
        }

        .hide-toggle {
          background: rgba(255,255,255,0.2);
          border: none;
          color: rgba(255,255,255,0.8);
          padding: 6px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          z-index: 2;
        }

        .stats-amount-box {
          position: relative;
          z-index: 2;
          cursor: pointer;
          padding: 8px 0;
        }

        .stats-amount-box .amount {
          font-size: 32px;
          font-weight: 700;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
          color: #F1D4A3;
        }

        .stats-bottom {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 16px;
        }

        .sub-stat {
          font-size: 12px;
          color: rgba(255,255,255,0.7);
        }
        
        /* 预算仪表盘样式 */
        .budget-dashboard {
            background: #fff;
            border-radius: 12px;
            padding: 12px 16px;
            margin-top: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .budget-dash-top {
            display: flex;
            justify-content: space-between;
            font-size: 13px;
            font-weight: 500;
            color: #333;
        }
        
        .b-remain {
            color: var(--primary-brand);
        }
        
        .budget-dash-bar {
            height: 6px;
            background: #F0F0F0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .budget-dash-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        
        .budget-dash-bottom {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #999;
        }

        /* 页面内容区 */
        .page-content {
          padding: 0 16px;
        }

        .card-section {
          background: #fff;
          border-radius: 16px;
          padding: 6px 0;
          margin-bottom: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        
        .card-header {
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f9f9f9;
        }
        
        .card-title {
          font-size: 15px;
          font-weight: 600;
          color: #333;
          position: relative;
          padding-left: 10px;
        }
        
        .card-title::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background: var(--primary-brand);
          border-radius: 2px;
        }
        
        .card-summary {
          font-size: 12px;
          color: #999;
          display: flex;
          gap: 8px;
        }
        
        .total-expense {
          color: #333;
          font-weight: 500;
        }

        /* 时间统计列表 */
        .time-stat-item {
          display: flex;
          align-items: center;
          padding: 16px;
          position: relative;
        }
        
        .time-stat-item:not(:last-child)::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 56px;
          right: 0;
          height: 1px;
          background: #f9f9f9;
        }

        .time-stat-left {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }
        
        .time-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .time-info {
          display: flex;
          flex-direction: column;
        }
        
.time-label {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .time-range {
          font-size: 11px;
          color: #999;
          margin-top: 2px;
        }
        
        .time-stat-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .stat-row {
          font-size: 11px;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 6px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          font-family: 'DIN Alternate', sans-serif;
          min-width: 60px;
          text-align: right;
        }
        
        .stat-value.income { color: #FF6B6B; }
        .stat-value.expense { color: #00BFA5; }
        
        /* 分类列表 */
        .list-container {
          padding: 8px 0;
        }
        
        .list-item {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          gap: 12px;
        }
        
        .rank-num {
          font-size: 14px;
          color: #ccc;
          font-weight: 500;
          width: 16px;
          text-align: center;
        }
        
        .category-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .item-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        
        .item-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .item-name {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }
        
        .item-percent {
          font-size: 12px;
          color: #999;
          margin-left: auto;
          margin-right: 12px;
        }
        
        .item-amount {
          font-size: 14px;
          color: #333;
          font-weight: 600;
          width: 70px;
          text-align: right;
        }
        
        .progress-bg {
          height: 4px;
          background: #f0f0f0;
          border-radius: 2px;
          overflow: hidden;
          width: 100%;
        }
        
        .progress-fill {
          height: 100%;
          border-radius: 2px;
        }
        
        .empty-state {
          text-align: center;
          padding: 30px;
          color: #999;
          font-size: 13px;
        }
        
        .empty-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 8px;
        }

        /* 图表区域 */
        .chart-container {
          padding: 20px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .doughnut-wrapper {
          width: 120px;
          height: 120px;
          position: relative;
        }
        
        .chart-center-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .chart-label {
          font-size: 10px;
          color: #999;
        }
        
        .chart-value {
          font-size: 12px;
          font-weight: 600;
          color: #333;
        }
        
        .chart-legend-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          padding-left: 24px;
        }
        
        .legend-grid-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .legend-dot {
          width: 8px;
          height: 8px;
          border-radius: 2px;
        }
        
        .legend-text {
          font-size: 12px;
          color: #666;
        }
      `}</style>
    </div>
  )
}

export default Home
