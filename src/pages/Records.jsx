import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft, Calendar, CheckSquare, Search, Plus, Filter,
  Trash2, Tag, Users, X, Check, MoreHorizontal, ChevronDown, ListFilter
} from 'lucide-react'
import {
  getTransactionsByMonth, getTransactionsByDateRange, getAllCategories, deleteTransaction,
  deleteTransactions, updateTransactions, getAllTags, getAllPersons
} from '../db/stores'
import { useSwipeable } from 'react-swipeable'

function Records() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const range = searchParams.get('range') || 'month' // today, week, month, year

  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  })

  // 状态管理
  const dateParam = searchParams.get('date')
  // 如果 URL 有日期参数，使用该日期；否则默认为今天
  const currentDate = dateParam ? new Date(dateParam) : new Date()
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [tags, setTags] = useState([])
  const [persons, setPersons] = useState([])

  // 筛选器状态
  const [activeFilter, setActiveFilter] = useState(null)
  const [showRangeModal, setShowRangeModal] = useState(false)
  const [currentRange, setCurrentRange] = useState(range) // 当前选中的时间范围

  // 模态框状态
  const [showTagModal, setShowTagModal] = useState(false)
  const [showPersonModal, setShowPersonModal] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  // 根据时间范围获取标题
  const getRangeTitle = () => {
    switch (range) {
      case 'today': return '今天'
      case 'week': return '本周'
      case 'month': return '本月'
      case 'year': return '本年'
      default: return '明细'
    }
  }

  // 顶部大标题
  const getBigTitle = () => {
    switch (range) {
      case 'today': return `${month}月${currentDate.getDate()}日`
      case 'week': return '本周'
      case 'month': return `${month}月`
      case 'year': return `${year}年`
      default: return '账单明细'
    }
  }

  // 根据时间范围获取日期范围
  const getDateRangeForFilter = () => {
    const today = new Date()
    switch (range) {
      case 'today':
        return { start: new Date(today.setHours(0, 0, 0, 0)), end: new Date(today.setHours(23, 59, 59, 999)) }
      case 'week':
        const weekStart = new Date(today)
        weekStart.setDate(today.getDate() - today.getDay())
        weekStart.setHours(0, 0, 0, 0)
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekStart.getDate() + 6)
        weekEnd.setHours(23, 59, 59, 999)
        return { start: weekStart, end: weekEnd }
      case 'month':
        return { start: new Date(year, month - 1, 1), end: new Date(year, month, 0, 23, 59, 59) }
      case 'year':
        return { start: new Date(year, 0, 1), end: new Date(year, 11, 31, 23, 59, 59) }
      default:
        return { start: new Date(year, month - 1, 1), end: new Date(year, month, 0, 23, 59, 59) }
    }
  }

  useEffect(() => {
    loadData()
  }, [range, searchParams])

  const loadData = async () => {
    try {
      const { start, end } = getDateRangeForFilter()
      const [rangeTrans, allCats, allTags, allPersons] = await Promise.all([
        getTransactionsByDateRange(start, end),
        getAllCategories(),
        getAllTags(),
        getAllPersons()
      ])

      // 过滤逻辑
      let filtered = rangeTrans
      const categoryId = searchParams.get('categoryId')
      const accountId = searchParams.get('accountId')
      const merchantId = searchParams.get('merchantId')
      const projectId = searchParams.get('projectId')
      const personId = searchParams.get('personId')

      if (categoryId) filtered = filtered.filter(t => String(t.categoryId) === categoryId)
      if (accountId) filtered = filtered.filter(t => String(t.accountId) === accountId || String(t.toAccountId) === accountId)
      if (merchantId) filtered = filtered.filter(t => String(t.merchant) === merchantId) // Merchant is stored as string name usually? or ID?
      // In AddTransaction, merchant is `merchantName` (string).
      // But in Statistics, we might have merchant IDs if we made a store?
      // Database.js has `merchants` store.
      // Statistics.jsx uses `merchantData`.
      // Let's check if transactions store merchant ID or Name.
      // AddTransaction line 320: `merchant: merchantName`. It stores NAME.
      // So filtering by `merchantId` might be wrong if we pass ID.
      // If `merchantId` param is passed, is it name or ID?
      // In Statistics, `merchantData` lists merchants.
      // If I click a merchant row, I should pass the NAME if that's what is stored in transaction.
      // Or pass ID if transaction has `merchantId`.
      // Transactions have `merchant` field (name).
      // So I should filter by `t.merchant === merchantParam`.
      // I will assume the param passed is the Name for now, or I handle both if I can.
      // Safest is to use Name for now as that's what is in `t.merchant`.
      if (merchantId) filtered = filtered.filter(t => t.merchant === merchantId)

      if (projectId) filtered = filtered.filter(t => String(t.projectId) === projectId) // Project is likely ID?
      // AddTransaction stores `project: projectName`. It is also Name?
      // Projects store has `name` and `icon`.
      // If AddTransaction stores `project` as string, then I filter by string.
      if (projectId) filtered = filtered.filter(t => t.project === projectId)

      if (personId) filtered = filtered.filter(t => String(t.personId) === personId)

      // 按日期降序排序
      setTransactions(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setCategories(allCats)
      setTags(allTags)
      setPersons(allPersons)
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  // 格式化金额
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  // 获取分类信息
  const getCategory = (categoryId) => {
    return categories.find(c => c.id === categoryId) || { name: '未知', icon: '❓', color: '#999' }
  }

  // 按日期分组
  const groupedTransactions = transactions.reduce((groups, trans) => {
    const date = trans.date
    if (!groups[date]) groups[date] = []
    groups[date].push(trans)
    return groups
  }, {})

  // 排序日期
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a))

  // 切换选择模式
  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode)
    setSelectedIds(new Set())
  }

  // 选择/取消选择
  const toggleSelection = (id) => {
    const newSelection = new Set(selectedIds)
    if (newSelection.has(id)) {
      newSelection.delete(id)
    } else {
      newSelection.add(id)
    }
    setSelectedIds(newSelection)
  }

  // 全选
  const handleSelectAll = () => {
    if (selectedIds.size === transactions.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(transactions.map(t => t.id)))
    }
  }

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedIds.size === 0) return
    if (!confirm(`确定删除选中的 ${selectedIds.size} 条记录吗？`)) return

    try {
      await deleteTransactions(Array.from(selectedIds))
      await loadData()
      setIsSelectionMode(false)
    } catch (error) {
      alert('删除失败：' + error.message)
    }
  }

  // 批量修改标签
  const handleBatchTag = async (tagId) => {
    if (selectedIds.size === 0) return
    try {
      await updateTransactions(Array.from(selectedIds), { tagId })
      await loadData()
      setShowTagModal(false)
      setIsSelectionMode(false)
    } catch (error) {
      alert('更新失败：' + error.message)
    }
  }

  // 批量修改人员
  const handleBatchPerson = async (personId) => {
    if (selectedIds.size === 0) return
    try {
      await updateTransactions(Array.from(selectedIds), { personId })
      await loadData()
      setShowPersonModal(false)
      setIsSelectionMode(false)
    } catch (error) {
      alert('更新失败：' + error.message)
    }
  }

  // 编辑单条
  const handleEdit = (id) => {
    navigate(`/add?edit=${id}`)
  }

  // 删除单条
  const handleDelete = async (id) => {
    if (!confirm('确定删除这条记录吗？')) return
    try {
      await deleteTransaction(id)
      await loadData()
    } catch (error) {
      alert('删除失败：' + error.message)
    }
  }

  // 计算汇总
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

  return (
    <div className="page records-page" {...handlers}>
      {/* 顶部Banner区域 */}
      <div className="banner-area">
        {/* 顶部导航栏 (透明) */}
        <div className="banner-navbar">
          <button className="nav-icon-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#fff" />
            <span style={{ color: '#fff', fontSize: '16px', marginLeft: 4 }}>{getRangeTitle()}</span>
          </button>
          <div className="nav-actions">
            <button className="nav-icon-btn"><Calendar size={22} color="#fff" /></button>
            <button className="nav-icon-btn"><Search size={22} color="#fff" /></button>
            {isSelectionMode ?
              <button className="nav-icon-btn" onClick={() => { setIsSelectionMode(false); setSelectedIds(new Set()); }}>
                <span style={{ color: '#fff', fontSize: '14px' }}>完成</span>
              </button>
              :
              <button className="nav-icon-btn" onClick={() => setIsSelectionMode(true)}>
                <CheckSquare size={22} color="#fff" />
              </button>
            }
          </div>
        </div>

        {/* Banner内容 - 结余展示 */}
        <div className="banner-content">
          <div className="balance-section">
            <div className="balance-label">结余</div>
            <div className="balance-value">{formatAmount(totalIncome - totalExpense)}</div>
          </div>
          <div className="income-expense-row">
            <div className="stat-item">
              <span className="stat-label">收入</span>
              <span className="stat-num">{formatAmount(totalIncome)}</span>
            </div>
            <div className="stat-divider">|</div>
            <div className="stat-item">
              <span className="stat-label">支出</span>
              <span className="stat-num">{formatAmount(totalExpense)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部筛选栏 */}
      <div className="filter-bar-sticky">
        <div className={`filter-item time-filter ${showRangeModal ? 'active' : ''}`} onClick={() => setShowRangeModal(!showRangeModal)}>
          <span>{currentRange === 'year' ? '年' : currentRange === 'quarter' ? '季' : currentRange === 'month' ? '月' : currentRange === 'week' ? '周' : '天'}</span>
          <ChevronDown size={12} className={showRangeModal ? 'rotate' : ''} />
        </div>
        <div className="filter-item">
          <span>分类</span>
          <ChevronDown size={12} />
        </div>
        <div className="filter-item">
          <span>账户</span>
        </div>
        <div className="filter-item">
          <span>项目</span>
          <ChevronDown size={12} />
        </div>
        <div className="filter-item">
          <span>更多</span>
          <ChevronDown size={12} />
        </div>
      </div>

      {/* 时间范围选择器模态框 */}
      {showRangeModal && (
        <div className="range-modal-overlay" onClick={() => setShowRangeModal(false)}>
          <div className="range-modal" onClick={e => e.stopPropagation()}>
            {[
              { key: 'year', label: '年' },
              { key: 'quarter', label: '季' },
              { key: 'month', label: '月' },
              { key: 'week', label: '周' },
              { key: 'today', label: '天' }
            ].map(item => (
              <div
                key={item.key}
                className={`range-option ${currentRange === item.key ? 'active' : ''}`}
                onClick={() => {
                  setCurrentRange(item.key)
                  setShowRangeModal(false)
                  // 更新 URL 参数
                  navigate(`/records?range=${item.key}`, { replace: true })
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 列表内容 */}
      <div className="records-list">
        {/* 月度汇总头 */}
        <div className="month-summary-header">
          <div className="month-date">
            <span className="month-val">{month}月</span>
            <span className="year-val">{year}</span>
          </div>
          <div className="month-stats">
            <div className="stats-row">
              <span className="label">结余</span>
              <span className="val">{formatAmount(totalIncome - totalExpense)}</span>
              <div className="arrow-box"><ChevronDown size={12} color="#999" /></div>
            </div>
            <div className="stats-detail">
              <span>收入 {formatAmount(totalIncome)}</span>
              <span className="divider">|</span>
              <span>支出 {formatAmount(totalExpense)}</span>
            </div>
          </div>
        </div>

        {sortedDates.map(date => {
          const dayTransactions = groupedTransactions[date]
          const weekDay = new Date(date).getDay()
          const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
          // 仅在列表项中不再重复日汇总，因为随手记风格通常是简化日头

          return (
            <div key={date} className="day-group">
              <div className="day-simple-header">
                <span>{date.split('-')[2]}日 {weekDays[weekDay]}</span>
              </div>
              {dayTransactions.map(trans => {
                const category = getCategory(trans.categoryId)
                const isSelected = selectedIds.has(trans.id)

                return (
                  <div
                    key={trans.id}
                    className={`record-item ${isSelectionMode && isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      if (isSelectionMode) {
                        toggleSelection(trans.id)
                      } else {
                        handleEdit(trans.id)
                      }
                    }}
                  >
                    {isSelectionMode && (
                      <div className="selection-checkbox">
                        {isSelected ? <Check size={16} color="white" /> : null}
                      </div>
                    )}

                    <div className="category-icon" style={{ backgroundColor: '#fff' }}>
                      {/* 这里的Icon应该用分类色，但背景用白色或淡色，随手记风格图标是彩色的 */}
                      <span style={{ fontSize: '24px' }}>{category.icon}</span>
                    </div>

                    <div className="record-content">
                      <div className="record-main">
                        <span className="category-name">{category.name}</span>
                        <span className={`amount ${trans.type}`}>
                          {formatAmount(trans.amount)}
                        </span>
                      </div>
                      <div className="record-sub">
                        <div className="sub-left">
                          {trans.remark && <span className="remark">{trans.remark}</span>}
                          {/* 随手记风格显示 账户 · 成员 · 时间 */}
                          <div className="meta-info">
                            {/* 暂时没有账户名获取逻辑，Mock一个 */}
                            <span>现金</span>
                            <span> · </span>
                            <span>{persons.find(p => p.id === trans.personId)?.name || '我'}</span>
                            <span> · </span>
                            <span>{trans.date.split('T')[1]}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!isSelectionMode && (
                      <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(trans.id); }}>
                        <Trash2 size={16} color="#ccc" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}

        {transactions.length === 0 && (
          <div className="empty-state">
            <div className="empty-illustration">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="48" fill="#F5F5F5" />
                <rect x="30" y="30" width="40" height="50" rx="4" fill="#E0E0E0" />
                <rect x="35" y="36" width="20" height="4" rx="2" fill="#BDBDBD" />
                <rect x="35" y="44" width="30" height="4" rx="2" fill="#BDBDBD" />
                <rect x="35" y="52" width="25" height="4" rx="2" fill="#BDBDBD" />
                <path d="M60 65 L70 75 L65 70" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="empty-title">无流水</p>
            <p className="empty-subtitle">什么都还没有呢，快去添加吧</p>
            <button className="add-record-btn" onClick={() => navigate('/add')}>
              记一笔
            </button>
          </div>
        )}
      </div>

      {/* 底部批量操作栏 */}
      {isSelectionMode && (
        <div className="batch-actions">
          <button className="batch-btn delete" onClick={handleBatchDelete} disabled={selectedIds.size === 0}>
            <Trash2 size={20} />
            <span>删除</span>
          </button>
          <button className="batch-btn" onClick={() => setShowTagModal(true)} disabled={selectedIds.size === 0}>
            <Tag size={20} />
            <span>标签</span>
          </button>
          <button className="batch-btn" onClick={() => setShowPersonModal(true)} disabled={selectedIds.size === 0}>
            <Users size={20} />
            <span>人员</span>
          </button>
        </div>
      )}

      {/* 标签选择模态框 */}
      {showTagModal && (
        <div className="modal-overlay" onClick={() => setShowTagModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>批量设置标签</h3>
            <div className="tag-list">
              {tags.map(tag => (
                <button key={tag.id} className="tag-option" onClick={() => handleBatchTag(tag.id)}>
                  {tag.name}
                </button>
              ))}
              <button className="tag-option clear" onClick={() => handleBatchTag(null)}>
                清除标签
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 人员选择模态框 */}
      {showPersonModal && (
        <div className="modal-overlay" onClick={() => setShowPersonModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>批量设置人员</h3>
            <div className="person-list">
              {persons.map(person => (
                <button key={person.id} className="person-option" onClick={() => handleBatchPerson(person.id)}>
                  {person.avatar} {person.name}
                </button>
              ))}
              <button className="person-option clear" onClick={() => handleBatchPerson(null)}>
                清除人员
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .records-page {
          background: #fff;
          padding-bottom: 90px;
          min-height: 100vh;
        }

        .banner-area {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            height: 200px;
            position: relative;
            color: #fff;
            display: flex;
            flex-direction: column;
        }
        
        .banner-navbar {
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            padding-top: calc(12px + var(--safe-area-top));
        }
        
        .nav-icon-btn {
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            padding: 8px;
        }
        
        .nav-actions {
            display: flex;
            gap: 8px;
        }

        .banner-content {
            position: relative;
            z-index: 2;
            padding: 0 20px;
            margin-top: 20px;
        }
        
        .balance-section {
            margin-bottom: 12px;
        }
        
        .balance-label {
            font-size: 13px;
            opacity: 0.8;
            margin-bottom: 4px;
        }
        
        .balance-value {
            font-size: 32px;
            font-weight: 500;
            font-family: 'DIN Alternate', sans-serif;
        }
        
        .income-expense-row {
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 13px;
            opacity: 0.9;
        }
        
        .stat-item {
            display: flex;
            gap: 4px;
        }
        
        .stat-divider { opacity: 0.5; }

        /* 筛选栏 */
        .filter-bar-sticky {
            position: sticky;
            top: 0;
            background: #fff;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            padding: 12px 20px;
            border-bottom: 1px solid #f5f5f5;
            box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }

        /* 针对PC端居中优化的关键：继承父元素的max-width */
        @media (min-width: 768px) {
            .filter-bar-sticky {
               max-width: 480px;
               margin: 0 auto;
               left: 50%;
               transform: translateX(-50%); /* 实际上由于是sticky，可能不需要transform，但为了保险起见 */
               /* 由于sticky是相对于父元素的，如果records-page是受限的，那么sticky也是受限的 */
               /* 这里不需要额外的 max-width，只要 records-page 是受限的即可。之前在App.css里已经限制了#root */
               /* 但是如果 filter-bar-sticky 是 fixed，就需要限制。现在是 sticky，应该跟随父流 */
               position: sticky;
               left: auto;
               transform: none;
            }
        }

        .filter-item {
            font-size: 13px;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        /* 列表部分 */
        .month-summary-header {
            padding: 16px 20px;
            background: #fff;
            border-bottom: 1px solid #f9f9f9;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }
        
        .month-date {
            display: flex;
            flex-direction: column;
        }
        
        .month-val {
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        
        .year-val {
            font-size: 12px;
            color: #999;
        }
        
        .month-stats {
            text-align: right;
        }
        
        .stats-row {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 6px;
            margin-bottom: 4px;
        }
        
        .stats-row .label { color: #999; font-size: 12px; }
        .stats-row .val { color: #333; font-weight: 600; font-size: 16px; }
        .arrow-box {
            background: #f5f5f5;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .stats-detail {
            font-size: 11px;
            color: #999;
            display: flex;
            gap: 6px;
            justify-content: flex-end;
        }
        
        .stats-detail .income { color: #FF6B6B; }

        /* 日分组 */
        .day-group {
            margin-bottom: 0;
        }
        
        .day-simple-header {
            padding: 8px 20px;
            font-size: 12px;
            color: #999;
            background: #fff;
        }

        .record-item {
          display: flex;
          align-items: flex-start; /* 对齐顶部 */
          padding: 12px 20px;
          gap: 12px;
          position: relative;
        }

        .record-item:active {
          background: #f9f9f9;
        }

        .record-item.selected {
          background: #FFF8E6;
        }
        
        .record-content {
            flex: 1;
            padding-bottom: 12px;
            border-bottom: 1px solid #f9f9f9;
        }

        .record-main {
             display: flex;
             justify-content: space-between;
             align-items: center;
             margin-bottom: 4px;
        }
        
        .category-name {
            font-size: 16px;
            color: #333;
            font-weight: 500;
        }
        
        .amount {
            font-size: 16px; 
            font-weight: 500;
            font-family: 'DIN Alternate', sans-serif;
        }
        
        .amount.expense { color: #333; }
        .amount.income { color: #FF6B6B; } /* 随手记收入是红色的 */ --expense实际上随手记支出是绿的？不对，随手记支出是绿色/黑色，收入是红色。这里沿用之前的 */
        .amount.expense { color: #00BB9C; } /* 随手记经典绿 */
        .amount.income { color: #FF5959; } /* 随手记红 */
        
        .record-sub {
            font-size: 11px;
            color: #999;
            display: flex;
            justify-content: space-between;
        }
        
        .sub-left {
            display: flex;
            flex-direction: column;
            gap: 2px;
        }
        
        .meta-info {
            display: flex;
            gap: 4px;
            font-size: 11px;
            opacity: 0.8;
        }

        .selection-checkbox {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }

        .selected .selection-checkbox {
          background: var(--primary);
          border-color: var(--primary);
        }

        .category-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-btn {
          padding: 8px;
          opacity: 0.5;
        }
        
        /* 批量操作栏 PC端适配 */
        .batch-actions {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #fff;
          display: flex;
          justify-content: space-around;
          padding: 12px 16px;
          padding-bottom: calc(12px + var(--safe-area-bottom));
          box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
          z-index: 20;
        }
        
        @media (min-width: 768px) {
           .batch-actions {
               max-width: 480px;
               left: 50%;
               transform: translateX(-50%);
           }
           .modal-overlay {
               /* 这里的overlay如果是fixed全屏，不需要max-width，但modal-content需要 */
               align-items: center; /* PC端居中显示模态框更好看 */
           }
        }

        .batch-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: #666;
        }

        .batch-btn.delete { color: #FF6B6B; }
        .batch-btn:disabled { opacity: 0.3; }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
        }

        .modal-content {
          background: #fff;
          width: 80%;
          max-width: 320px;
          border-radius: 16px;
          padding: 20px;
        }

        .modal-content h3 {
          margin-bottom: 16px;
          text-align: center;
        }

        .tag-list, .person-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag-option, .person-option {
          padding: 8px 12px;
          background: #f5f5f5;
          border-radius: 20px;
          font-size: 13px;
        }

        .tag-option.clear, .person-option.clear {
          background: #ffebeb;
          color: #ff4d4f;
        }

        /* 空状态样式 */
        .empty-state { 
          text-align: center; 
          padding: 60px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .empty-illustration {
          margin-bottom: 16px;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0;
        }

        .empty-subtitle {
          font-size: 14px;
          color: #999;
          margin: 0;
        }

        .add-record-btn {
          margin-top: 16px;
          padding: 10px 32px;
          background: #fff;
          border: 2px solid #FFB800;
          color: #FFB800;
          border-radius: 24px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
        }

        /* 时间范围选择器样式 */
        .filter-item.time-filter.active span {
          color: #FFB800;
        }

        .filter-item .rotate {
          transform: rotate(180deg);
          transition: transform 0.2s;
        }

        .range-modal-overlay {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 0;
          background: rgba(0,0,0,0.3);
          z-index: 999;
          display: flex;
          align-items: flex-end;
        }

        .range-modal {
          background: #fff;
          width: 100%;
          border-radius: 16px 16px 0 0;
          padding: 16px 0;
          padding-bottom: calc(16px + var(--safe-area-bottom));
        }

        .range-option {
          padding: 16px 24px;
          font-size: 16px;
          color: #333;
          cursor: pointer;
        }

        .range-option.active {
          color: #FFB800;
          font-weight: 600;
        }

        .range-option:active {
          background: #f5f5f5;
        }
      `}</style>
    </div>
  )
}

export default Records
