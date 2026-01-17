import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import {
  MessageCircle, Wallet, Users, Store, FolderKanban, Target,
  Calendar, BarChart3, PieChart, Globe, ChevronRight, Eye, EyeOff,
  Utensils, Bus, ShoppingBag, Gamepad2, Home as HomeIcon, Smartphone, Pill, BookOpen,
  Banknote, Gift, TrendingUp, Briefcase, Stamp, LayoutGrid, RefreshCw, Cloud, CheckCircle
} from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { getMonthlyStats, getTransactionsByMonth, getAllCategories, getCategoryStats, getAllTransactions } from '../db/stores'
import { getDB } from '../db/database'
import { SyncService } from '../services/SyncService'
import { getCurrentUser, isSupabaseConfigured } from '../services/supabaseClient'
import { logger } from '../utils/logger'

ChartJS.register(ArcElement, Tooltip, Legend)

function Home() {
  const navigate = useNavigate()
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

  useEffect(() => { loadData() }, [year, month])

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
      // 需要获取全量/范围数据来计算
      // 优化：本年数据量可能大，应考虑索引或专门的 store 方法。暂用全量过滤。
      const allTrans = await getAllTransactions()

      const todayString = new Date().toDateString()
      const now = new Date()
      // Week calculation (ISO week or simple week starting Sunday/Monday?)
      // Let's use simple logic: current week from Sunday.
      const msPerDay = 86400 * 1000
      const currentDay = now.getDay() // 0=Sun
      const weekStart = new Date(now.getTime() - currentDay * msPerDay)
      weekStart.setHours(0, 0, 0, 0)

      let d_today = { inc: 0, exp: 0 }
      let d_week = { inc: 0, exp: 0 }
      let d_year = { inc: 0, exp: 0 }
      let d_all = { inc: 0, exp: 0 } // Add all-time accumulator

      for (const t of allTrans) {
        const tDate = new Date(t.date)
        const amt = Number(t.amount)

        // Year Stats (Match View Year)
        if (tDate.getFullYear() === year) {
          if (t.type === 'income') d_year.inc += amt
          if (t.type === 'expense') d_year.exp += amt
        }

        // Today & Week (Always relative to Real Time "Now", not selected month)
        // 用户通常希望首页的"今天"就是真的今天，而不是通过月份切换后的某一天。
        if (tDate.toDateString() === todayString) {
          if (t.type === 'income') d_today.inc += amt
          if (t.type === 'expense') d_today.exp += amt
        }

        if (tDate >= weekStart) {
          if (t.type === 'income') d_week.inc += amt
          if (t.type === 'expense') d_week.exp += amt
        }

        // All Time Stats
        if (t.type === 'income') d_all.inc += amt
        else if (t.type === 'expense') d_all.exp += amt
      }

      setStats({
        today: { income: d_today.inc, expense: d_today.exp },
        week: { income: d_week.inc, expense: d_week.exp },
        month: { income: monthStats.income, expense: monthStats.expense },
        year: { income: d_year.inc, expense: d_year.exp },
        allTime: { income: d_all.inc, expense: d_all.exp }
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
        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--expense)' }}>
          {formatAmount(data.expense)}
          <span style={{ fontSize: 9, color: '#999', marginLeft: 2 }}>支</span>
        </div>
        <div style={{ fontSize: 11, color: '#999', marginTop: 0, display: 'flex', alignItems: 'baseline' }}>
          <span style={{ color: 'var(--income)', fontSize: 14, fontWeight: 600, marginRight: 2 }}>{formatAmount(data.income)}</span> 收
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
                  width: 52, height: 52, borderRadius: 18, backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: action.iconColor
                }}>
                  <action.icon size={22} strokeWidth={2} />
                </div>
                <span style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>{action.label}</span>
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
                  <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--expense)' }}>
                    {formatAmount(stats.allTime?.expense || 0)}
                    <span style={{ fontSize: 9, color: '#999', marginLeft: 2 }}>总支</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#999', marginTop: 0 }}>
                    <span style={{ color: 'var(--income)', fontSize: 14, fontWeight: 600, marginRight: 2 }}>{formatAmount(stats.allTime?.income || 0)}</span> 总收
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 9, color: '#ccc' }}>结余</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: (stats.allTime?.income - stats.allTime?.expense) >= 0 ? 'var(--income)' : 'var(--expense)' }}>
                    {formatAmount((stats.allTime?.income || 0) - (stats.allTime?.expense || 0))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Top 5 */}
          {expenseStats.stats.length > 0 && (
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '16px 20px', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>本月分类支出</span>
                <span style={{ fontSize: 12, color: '#999' }}>TOP 5</span>
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
                        <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                          {item.category.name}
                          {item.category.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400 }}> · {item.category.subName}</span>}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'DIN Alternate' }}>¥{formatAmount(item.amount)}</span>
                      </div>
                      <div style={{ height: 4, background: '#F1F5F9', borderRadius: 2, overflow: 'hidden' }}>
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
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #f5f5f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>本月分类收入</span>
              <span style={{ fontSize: 12, color: '#999' }}>TOP 5</span>
            </div>
            <div>
              {incomeStats.stats.slice(0, 5).map((item, index) => (
                <div key={item.categoryId || index}
                  onClick={() => navigate(`/records?range=month&categoryId=${item.categoryId}&year=${year}&month=${month}${item.category.subName ? `&subCategory=${encodeURIComponent(item.category.subName)}` : ''}`)}
                  style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', borderBottom: index < 4 ? '1px solid #f9f9f9' : 'none', cursor: 'pointer' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10, background: '#FEE2E2', color: '#EF4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 14
                  }}>
                    {getIconComponent(item.category.name, 18)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>
                        {item.category.name}
                        {item.category.subName && <span style={{ fontSize: 11, color: '#999', fontWeight: 400 }}> · {item.category.subName}</span>}
                      </span>
                      <span style={{ fontSize: 14, fontWeight: 700, fontFamily: 'DIN Alternate', color: '#EF4444' }}>+¥{formatAmount(item.amount)}</span>
                    </div>
                    <div style={{ height: 4, background: '#F1F5F9', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${item.percentage}%`, background: '#EF4444', borderRadius: 2 }}></div>
                    </div>
                  </div>
                </div>
              ))}
              {incomeStats.stats.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#999', fontSize: 14 }}>本月暂无分类收入</div>}
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
                      <span style={{ fontSize: 12, color: '#333', fontWeight: 600 }}>{(item.percentage || 0).toFixed(1)}%</span>
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
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: ['#EF4444', '#F87171', '#FCA5A5', '#FECACA'][i] }}></div>
                      <span style={{ fontSize: 12, color: '#666', flex: 1 }}>
                        {item.category.name}
                        {item.category.subName && <span style={{ fontSize: 10, opacity: 0.6 }}> · {item.category.subName}</span>}
                      </span>
                      <span style={{ fontSize: 12, color: '#333', fontWeight: 600 }}>{(item.percentage || 0).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px 0', textAlign: 'center', color: '#999', fontSize: 14 }}>本月暂无收入数据</div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Home

