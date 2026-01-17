import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import {
  MessageCircle, Wallet, Users, Store, FolderKanban, Target,
  Calendar, BarChart3, PieChart, Globe, ChevronRight, Eye, EyeOff,
  Utensils, Bus, ShoppingBag, Gamepad2, Home as HomeIcon, Smartphone, Pill, BookOpen,
  Banknote, Gift, TrendingUp, Briefcase, Stamp, LayoutGrid, RefreshCw, Cloud, CheckCircle
} from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getMonthlyStats, getTransactionsByMonth, getAllCategories, getCategoryStats, getTransactionsByDateRange, getGlobalStats } from '../db/stores'
import { getDB } from '../db/database'
import { SyncService } from '../services/SyncService'
import { getCurrentUser, isSupabaseConfigured } from '../services/supabaseClient'
import { logger } from '../utils/logger'
import { EventEmitter, EVENTS } from '../utils/events'

ChartJS.register(ArcElement, Tooltip, Legend)

function Home() {
  const navigate = useNavigate()
  const location = useLocation()
  const [stats, setStats] = useState({
    today: { income: 0, expense: 0 },
    week: { income: 0, expense: 0 },
    month: { income: 0, expense: 0 },
    year: { income: 0, expense: 0 },
    allTime: { income: 0, expense: 0 }
  })
  const [expenseStats, setExpenseStats] = useState({ total: 0, stats: [] })
  const [incomeStats, setIncomeStats] = useState({ total: 0, stats: [] })
  const [budgetData, setBudgetData] = useState({ total: 0, used: 0, percent: 0 })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [netAssets, setNetAssets] = useState(0)
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)
  const [hideAmounts, setHideAmounts] = useState(false)

  // Pull-to-refresh sync state
  const [pullDistance, setPullDistance] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState(null)
  const [canSync, setCanSync] = useState(false)
  const pullThreshold = 80
  const containerRef = useRef(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const monthKey = `${year}-${month.toString().padStart(2, '0')}`

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

  // Check if sync is available
  useEffect(() => {
    const checkSync = async () => {
      if (isSupabaseConfigured()) {
        const user = await getCurrentUser()
        setCanSync(!!user)
      }
    }
    checkSync()
  }, [])

  // Handle pull-to-refresh
  const handleTouchStart = (e) => {
    if (containerRef.current?.scrollTop === 0) {
      containerRef.current._startY = e.touches[0].clientY
    }
  }

  const handleTouchMove = (e) => {
    if (!containerRef.current?._startY) return
    if (containerRef.current?.scrollTop > 0) return
    if (isSyncing) return

    const currentY = e.touches[0].clientY
    const diff = currentY - containerRef.current._startY

    if (diff > 0) {
      e.preventDefault()
      setPullDistance(Math.min(diff * 0.5, 120))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance >= pullThreshold && canSync && !isSyncing) {
      setIsSyncing(true)
      setSyncResult(null)

      try {
        const result = await SyncService.sync()
        if (result.success) {
          setSyncResult({ success: true, pushed: result.pushed, pulled: result.pulled })
          // Reload data after sync
          await loadData()
        } else {
          setSyncResult({ success: false, error: result.error })
        }
      } catch (e) {
        logger.error('Sync failed:', e)
        setSyncResult({ success: false, error: e.message })
      } finally {
        setIsSyncing(false)
        // Hide result after 2 seconds
        setTimeout(() => setSyncResult(null), 2000)
      }
    }

    setPullDistance(0)
    if (containerRef.current) {
      containerRef.current._startY = null
    }
  }

  useEffect(() => {
    loadData()
    return EventEmitter.subscribe(EVENTS.TRANSACTION_UPDATED, loadData)
  }, [year, month])

  const loadData = async () => {
    try {
      const db = getDB()

      // 1. 基础月度统计 (Cached or DB)
      const monthStats = await getMonthlyStats(year, month)

      // 2. 资产统计 (Snapshot, not filtered by date)
      const allAccounts = await db.getAll('accounts')
      let assets = 0
      let liabilities = 0
      allAccounts.forEach(acc => {
        const balance = Number(acc.balance || 0)
        if (balance >= 0) assets += balance
        else liabilities += Math.abs(balance)
      })
      setTotalAssets(assets)
      setTotalLiabilities(liabilities)
      setNetAssets(assets - liabilities)

      // 3. 分类排行 (按当前月)
      const expenseCatStats = await getCategoryStats(year, month, 'expense')
      expenseCatStats.stats = expenseCatStats.stats.map(s => ({
        ...s,
        percentage: expenseCatStats.total > 0 ? (s.amount / expenseCatStats.total) * 100 : 0
      }))

      const incomeCatStats = await getCategoryStats(year, month, 'income')
      incomeCatStats.stats = incomeCatStats.stats.map(s => ({
        ...s,
        percentage: incomeCatStats.total > 0 ? (s.amount / incomeCatStats.total) * 100 : 0
      }))

      setExpenseStats(expenseCatStats)
      setIncomeStats(incomeCatStats)

      // 4. 预算 (按当前月)
      const allBudgets = await db.getAll('budgets')
      const monthBudgets = allBudgets.filter(b => b.month === monthKey)
      const totalBudget = monthBudgets.reduce((sum, b) => sum + Number(b.amount || 0), 0)
      const usedBudget = monthStats.expense
      const budgetPercent = totalBudget > 0 ? (usedBudget / totalBudget) * 100 : 0
      setBudgetData({ total: totalBudget, used: usedBudget, percent: budgetPercent })

      // 5. 时间维度统计 (今日、本周、本年)
      const now = new Date()
      const todayISO = now.toISOString().slice(0, 10)

      const msPerDay = 86400 * 1000
      const currentDay = now.getDay() // 0=Sun
      const weekStart = new Date(now.getTime() - currentDay * msPerDay)
      weekStart.setHours(0, 0, 0, 0)
      const weekStartISO = weekStart.toISOString()

      const yearStartISO = `${year}-01-01T00:00:00`
      const yearEndISO = `${year}-12-31T23:59:59`

      // 并行获取多个维度的数据 (利用索引)
      const [todayTrans, weekTrans, yearTrans] = await Promise.all([
        getTransactionsByDateRange(`${todayISO}T00:00:00`, `${todayISO}T23:59:59`),
        getTransactionsByDateRange(weekStartISO, now.toISOString()),
        getTransactionsByDateRange(yearStartISO, yearEndISO)
      ])

      const sum = (list) => list.reduce((acc, t) => {
        const amt = Number(t.amount || 0)
        if (t.type === 'income') acc.inc += amt
        else if (t.type === 'expense') acc.exp += amt
        return acc
      }, { inc: 0, exp: 0 })

      const d_today = sum(todayTrans)
      const d_week = sum(weekTrans)
      const d_year = sum(yearTrans)

      // 6. 累计数据 (All Time) - 使用缓存的全局统计 (高性能)
      const d_all = await getGlobalStats()

      setStats({
        today: { income: d_today.inc, expense: d_today.exp },
        week: { income: d_week.inc, expense: d_week.exp },
        month: { income: monthStats.income, expense: monthStats.expense },
        year: { income: d_year.inc, expense: d_year.exp },
        allTime: { income: d_all.income, expense: d_all.expense }
      })

    } catch (error) {
      console.error('加载数据失败:', error)
    }
  }

  const formatAmount = (amount) => new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)

  const getIconComponent = (iconName, size = 20) => {
    const iconMap = {
      'Card': Wallet, 'Users': Users, 'Store': Store, 'Folder': FolderKanban, 'Target': Target,
      'Calendar': Calendar, 'BarChart': BarChart3, 'PieChart': PieChart, 'Globe': Globe,
      '🍜': Utensils, '餐饮': Utensils, 'bus': Bus, '交通': Bus,
      '🛒': ShoppingBag, '购物': ShoppingBag, '🎮': Gamepad2, '娱乐': Gamepad2,
      '🏠': HomeIcon, '居住': HomeIcon, '📱': Smartphone, '通讯': Smartphone,
      '💊': Pill, '医疗': Pill, '📚': BookOpen, '教育': BookOpen,
      '💰': Banknote, '工资': Banknote, '🎁': Gift, '奖金': Gift,
      '📈': TrendingUp, '理财': TrendingUp, 'Briefcase': Briefcase, '红包': Gift, '利息': TrendingUp
    }
    const Icon = iconMap[iconName] || LayoutGrid
    return <Icon size={size} strokeWidth={1.5} />
  }

  const quickActions = [
    { icon: Wallet, label: '账户', color: '#FFF8E6', iconColor: '#FFB800', path: '/accounts' },
    { icon: Users, label: '成员', color: '#E8F4FD', iconColor: '#4A90E2', path: '/members' },
    { icon: Store, label: '商家', color: '#FFF0F6', iconColor: '#FF6B6B', path: `/statistics?tab=merchant&year=${year}&month=${month}` },
    { icon: FolderKanban, label: '项目', color: '#E6F9F1', iconColor: '#4ECDC4', path: '/projects' },
    { icon: Target, label: '预算', color: '#F3E5F5', iconColor: '#9B59B6', path: '/budget' }
  ]

  // Time Cards Config
  const renderTimeCard = (key, label, data, icon, path) => (
    <div key={key} className="card" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }} onClick={() => navigate(path)}>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {label}
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 13, color: 'var(--income)', fontWeight: 700, fontFamily: 'DIN Alternate, sans-serif', display: 'flex', alignItems: 'baseline', gap: 2 }}>
          {formatAmount(data.income)}
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 400 }}>收</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--expense)', fontWeight: 600, fontFamily: 'DIN Alternate, sans-serif', marginTop: 2, display: 'flex', alignItems: 'baseline', gap: 2 }}>
          {formatAmount(data.expense)}
          <span style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 400 }}>支</span>
        </div>
      </div>
    </div>
  )

  return (
    <div
      className="page"
      {...handlers}
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ position: 'relative', overflow: 'auto' }}
    >
      {/* Pull-to-refresh indicator */}
      {(pullDistance > 0 || isSyncing || syncResult) && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: pullDistance > 0 ? pullDistance : 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, rgba(24,144,255,0.1) 0%, transparent 100%)',
          transition: pullDistance > 0 ? 'none' : 'height 0.3s ease',
          zIndex: 100
        }}>
          {isSyncing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1890ff' }}>
              <RefreshCw size={20} className="animate-spin" />
              <span>同步中...</span>
            </div>
          ) : syncResult ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: syncResult.success ? '#52c41a' : '#ff4d4f'
            }}>
              {syncResult.success ? (
                <>
                  <CheckCircle size={20} />
                  <span>同步完成 ↑{syncResult.pushed} ↓{syncResult.pulled}</span>
                </>
              ) : (
                <span>同步失败</span>
              )}
            </div>
          ) : (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: pullDistance >= pullThreshold ? '#1890ff' : '#999',
              transform: `rotate(${Math.min(pullDistance / pullThreshold * 180, 180)}deg)`,
              transition: 'transform 0.1s'
            }}>
              <Cloud size={20} />
              <span style={{ transform: `rotate(-${Math.min(pullDistance / pullThreshold * 180, 180)}deg)` }}>
                {canSync
                  ? (pullDistance >= pullThreshold ? '松开同步' : '下拉同步')
                  : '请先登录云端'}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content with offset when pulling */}
      <div style={{
        transform: pullDistance > 0 ? `translateY(${pullDistance}px)` : 'none',
        transition: pullDistance > 0 ? 'none' : 'transform 0.3s ease'
      }}>
        <div className="page-header" style={{ background: 'transparent' }}>
          <div>
            <h1 className="page-title" style={{ fontSize: 20 }}>我的账本</h1>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>{year}年{month}月</span>
              <span style={{ fontSize: 10, background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: 4 }}>滑动切换</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-ghost" style={{ padding: 8 }} onClick={() => navigate('/settings')}><Users size={20} /></button>
            <button className="btn-ghost" style={{ padding: 8 }}><MessageCircle size={20} /></button>
          </div>
        </div>

        <div className="page-content" style={{ paddingTop: 0 }}>
          {/* Assets Card (Updated to show Cumulative Stats as requested) */}
          <div className="card" style={{
            background: 'var(--primary-gradient)', color: 'white', border: 'none', padding: 24, marginBottom: 24,
            position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px -10px rgba(52, 211, 153, 0.6)'
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, border: '40px solid rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 140, height: 140, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 13, opacity: 0.9, fontWeight: 500 }}>累计结余 (历史汇总)</span>
                <button onClick={(e) => { e.stopPropagation(); setHideAmounts(!hideAmounts) }}
                  style={{
                    color: 'white', opacity: 0.9,
                    background: 'transparent',
                    border: 'none',
                    padding: 4,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                  {hideAmounts ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div onClick={() => navigate('/accounts')} style={{
                fontSize: 36, fontWeight: 700, marginBottom: 24, fontFamily: 'DIN Alternate, sans-serif', letterSpacing: 1
              }}>
                {hideAmounts ? '****' : formatAmount((stats.allTime?.income || 0) - (stats.allTime?.expense || 0))}
              </div>
              <div style={{ display: 'flex', gap: 32 }}>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>累计收入</div>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'DIN Alternate, sans-serif' }}>
                    {hideAmounts ? '****' : formatAmount(stats.allTime?.income || 0)}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>累计支出</div>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: 'DIN Alternate, sans-serif' }}>
                    {hideAmounts ? '****' : formatAmount(stats.allTime?.expense || 0)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24, padding: '0 4px' }}>
            {quickActions.map((action, index) => (
              <div key={index} onClick={() => navigate(action.path)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 18, backgroundColor: 'var(--bg-card)', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.iconColor
                }}>
                  <action.icon size={22} strokeWidth={2} />
                </div>
                <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>{action.label}</span>
              </div>
            ))}
          </div>

          {/* Time Stats Grid (2x2 + All Time) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
            {renderTimeCard('today', '今天', stats.today, <Calendar size={14} />, `/records?range=today`)}
            {renderTimeCard('week', '本周', stats.week, <BarChart3 size={14} />, `/records?range=week`)}
            {renderTimeCard('month', '本月', stats.month, <PieChart size={14} />, `/records?range=month&year=${year}&month=${month}`)}
            {renderTimeCard('year', '本年', stats.year, <Globe size={14} />, `/records?range=year&year=${year}`)}

            {/* All Time Card (Full Width) */}
            <div className="card" style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 6, gridColumn: 'span 2' }} onClick={() => navigate('/records?range=all')}>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                历史累计
                <TrendingUp size={14} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--income)', fontFamily: 'DIN Alternate, sans-serif' }}>
                    {formatAmount(stats.allTime?.income || 0)}
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', marginLeft: 4, fontWeight: 400 }}>总收</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--expense)', fontWeight: 600, marginTop: 4, fontFamily: 'DIN Alternate, sans-serif' }}>
                    {formatAmount(stats.allTime?.expense || 0)}
                    <span style={{ fontSize: 9, color: 'var(--text-muted)', marginLeft: 4, fontWeight: 400 }}>总支</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 2 }}>累计结余</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: (stats.allTime?.income - stats.allTime?.expense) >= 0 ? 'var(--income)' : 'var(--expense)', fontFamily: 'DIN Alternate, sans-serif' }}>
                    {formatAmount((stats.allTime?.income || 0) - (stats.allTime?.expense || 0))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Top 5 */}
          {expenseStats.stats.length > 0 && (
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>本月分类支出</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>TOP 5</span>
              </div>
              <div>
                {expenseStats.stats.slice(0, 5).map((item, index) => (
                  <div key={item.categoryId || index}
                    onClick={() => navigate(`/records?range=month&categoryId=${item.categoryId}&year=${year}&month=${month}${item.category.subName ? `&subCategory=${encodeURIComponent(item.category.subName)}` : ''}`)}
                    style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: index < 4 ? '1px solid #f9f9f9' : 'none', cursor: 'pointer' }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10, background: `${item.category.color}15`, color: item.category.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14
                    }}>
                      {getIconComponent(item.category.name, 18)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                          {item.category.name}
                          {item.category.subName && <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}> · {item.category.subName}</span>}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'DIN Alternate' }}>¥{formatAmount(item.amount)}</span>
                      </div>
                      <div style={{ height: 4, background: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${item.percentage}%`, background: 'var(--expense)', borderRadius: 2 }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Income Top 5 */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>本月分类收入</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>TOP 5</span>
            </div>
            <div>
              {incomeStats.stats.slice(0, 5).map((item, index) => (
                <div key={item.categoryId || index}
                  onClick={() => navigate(`/records?range=month&categoryId=${item.categoryId}&year=${year}&month=${month}${item.category.subName ? `&subCategory=${encodeURIComponent(item.category.subName)}` : ''}`)}
                  style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: index < 4 ? '1px solid #f9f9f9' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: '#FEE2E2', color: 'var(--income)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14
                  }}>
                    {getIconComponent(item.category.name, 18)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.category.name}
                        {item.category.subName && <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 400 }}> · {item.category.subName}</span>}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'DIN Alternate', color: 'var(--income)' }}>+¥{formatAmount(item.amount)}</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.percentage}%`, background: 'var(--income)', borderRadius: 2 }}></div>
                    </div>
                  </div>
                </div>
              ))}
              {incomeStats.stats.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>本月暂无分类收入</div>}
            </div>
          </div>


          {/* Expense Distribution Pie Chart */}
          {expenseStats.stats.length > 0 && (
            <div className="card" style={{ padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>本月支出分布</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 140, height: 140 }}>
                  <Doughnut
                    data={{
                      labels: expenseStats.stats.slice(0, 6).map(i => i.category.name),
                      datasets: [{
                        data: expenseStats.stats.slice(0, 6).map(i => i.amount),
                        backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181', '#AA96DA'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      cutout: '65%',
                      plugins: { legend: { display: false } }
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {expenseStats.stats.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3'][i] }}></div>
                      <span style={{ fontSize: 12, color: '#666', flex: 1 }}>
                        {item.category.name}
                        {item.category.subName && <span style={{ fontSize: 10, opacity: 0.6 }}> · {item.category.subName}</span>}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>{(item.percentage || 0).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Income Distribution Pie Chart */}
          <div className="card" style={{ padding: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>本月收入分布</div>
            {incomeStats.stats.length > 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <div style={{ width: 140, height: 140 }}>
                  <Doughnut
                    data={{
                      labels: incomeStats.stats.slice(0, 6).map(i => i.category.name),
                      datasets: [{
                        data: incomeStats.stats.slice(0, 6).map(i => i.amount),
                        backgroundColor: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA', '#FEE2E2', '#FFF1F1'],
                        borderWidth: 0
                      }]
                    }}
                    options={{
                      cutout: '65%',
                      plugins: { legend: { display: false } }
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  {incomeStats.stats.slice(0, 4).map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: ['var(--income)', '#F87171', '#FCA5A5', '#FECACA'][i] }}></div>
                      <span style={{ fontSize: 12, color: '#666', flex: 1 }}>
                        {item.category.name}
                        {item.category.subName && <span style={{ fontSize: 10, opacity: 0.6 }}> · {item.category.subName}</span>}
                      </span>
                      <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>{(item.percentage || 0).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>本月暂无收入数据</div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

