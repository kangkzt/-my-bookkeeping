import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  ChevronLeft, Calendar, CheckSquare, Search, Plus, Filter,
  Trash2, Tag, Users, X, Check, MoreHorizontal, ChevronDown, ListFilter, ChevronRight
} from 'lucide-react'
import {
  getTransactionsByMonth, getTransactionsByDateRange, getAllCategories, deleteTransaction,
  deleteTransactions, updateTransactions, getAllTags, getAllPersons, getAllAccounts, getPhotosByTransactionId,
  getAllProjects, getAllMerchants
} from '../db/stores'
import { useSwipeable } from 'react-swipeable'
import DatePickerModal from '../components/DatePickerModal'

function Records() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
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
  const yearParam = searchParams.get('year')
  const monthParam = searchParams.get('month')

  // 如果 URL 有 year/month 参数，优先使用；否则检查 date 参数；否则默认为今天
  // 如果 URL 有 year/month 参数，优先使用；如果只有 year，则设为该年1月1日；否则检查 date 参数；否则默认为今天
  const currentDate = (yearParam && monthParam)
    ? new Date(Number(yearParam), Number(monthParam) - 1, 1)
    : (yearParam ? new Date(Number(yearParam), 0, 1) : (dateParam ? new Date(dateParam) : new Date()))
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [tags, setTags] = useState([])
  const [persons, setPersons] = useState([])
  const [accounts, setAccounts] = useState([])
  const [projects, setProjects] = useState([])
  const [merchants, setMerchants] = useState([])

  // 筛选器状态
  const [activeFilter, setActiveFilter] = useState(null)
  const [showRangeModal, setShowRangeModal] = useState(false)
  const [currentRange, setCurrentRange] = useState(range) // 当前选中的时间范围

  // 模态框状态
  const [showTagModal, setShowTagModal] = useState(false)
  const [showPersonModal, setShowPersonModal] = useState(false)

  // Filter Modals
  const [showCategoryFilter, setShowCategoryFilter] = useState(false)
  const [showAccountFilter, setShowAccountFilter] = useState(false)
  const [showProjectFilter, setShowProjectFilter] = useState(false)
  const [showMoreFilter, setShowMoreFilter] = useState(false)
  const [showMerchantFilter, setShowMerchantFilter] = useState(false)
  const [showPersonFilter, setShowPersonFilter] = useState(false)
  const startRef = useRef(null)
  const endRef = useRef(null)

  // Custom Date Range State
  const [isCustomMode, setIsCustomMode] = useState(false)
  const [customStart, setCustomStart] = useState(new Date().toISOString().slice(0, 10))
  const [customEnd, setCustomEnd] = useState(new Date().toISOString().slice(0, 10))

  // Calendar Jump State
  const [showCalendarJump, setShowCalendarJump] = useState(false)

  // Search State
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')

  // Swipe Delete State
  const [swipedItemId, setSwipedItemId] = useState(null)

  // Collapse State
  const [isCollapsed, setIsCollapsed] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  // 切换筛选状态的辅助函数
  const toggleFilter = (key, value) => {
    const current = searchParams.get(key)
    let items = current ? current.split(',') : []
    const strVal = String(value)
    if (items.includes(strVal)) {
      items = items.filter(i => i !== strVal)
    } else {
      items.push(strVal)
    }
    const p = new URLSearchParams(searchParams)
    if (items.length > 0) p.set(key, items.join(','))
    else p.delete(key)
    setSearchParams(p)
  }

  // 根据时间范围及筛选状态获取标题
  const getRangeTitle = () => {
    let title = ''
    switch (range) {
      case 'today': title = '今天'; break;
      case 'week': title = '本周'; break;
      case 'month': title = '本月'; break;
      case 'year': title = '本年'; break;
      case 'all': title = '全部'; break;
      case 'custom':
        const s = searchParams.get('start')
        const e = searchParams.get('end')
        title = (s && e) ? `${s} ~ ${e}` : '自定义';
        break;
      default: title = '明细'; break;
    }

    const filters = []

    // 筛选条件处理 (支持多选)
    const getNames = (key, list) => {
      const val = searchParams.get(key)
      if (!val) return []
      const ids = val.split(',')
      return ids.map(id => list.find(it => String(it.id) === id)?.name).filter(Boolean)
    }

    filters.push(...getNames('projectId', projects))
    filters.push(...getNames('categoryId', categories))
    filters.push(...getNames('accountId', accounts))

    const merch = searchParams.get('merchantId')
    if (merch) filters.push(...merch.split(','))

    filters.push(...getNames('personId', persons))

    if (filters.length > 0) {
      return `${title} · ${filters.join(' & ')}`
    }
    return title
  }

  // 顶部大标题
  const getBigTitle = () => {
    switch (range) {
      case 'today': return `${month}月${currentDate.getDate()}日`
      case 'week': return '本周'
      case 'month': return `${month}月`
      case 'year': return `${year}年`
      case 'all': return '全部交易'
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
      case 'all':
        return { start: new Date(0), end: new Date(2099, 11, 31) }
      case 'custom':
        const s = searchParams.get('start')
        const e = searchParams.get('end')
        if (s && e) return { start: new Date(`${s}T00:00:00`), end: new Date(`${e}T23:59:59`) }
        return { start: new Date(), end: new Date() }
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
      // Convert to Local ISO String to match DB format (YYYY-MM-DDTHH:mm:ss)
      const toLocalISO = (d) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString()

      const [rangeTrans, allCats, allTags, allPersons, allAccounts, allProjects, allMerchants] = await Promise.all([
        getTransactionsByDateRange(toLocalISO(start), toLocalISO(end)),
        getAllCategories(),
        getAllTags(),
        getAllPersons(),
        getAllAccounts(),
        getAllProjects(),
        getAllMerchants()
      ])

      // Load Photos for transactions
      const transWithPhotos = await Promise.all(rangeTrans.map(async t => {
        const photos = await getPhotosByTransactionId(t.id)
        return { ...t, photos: photos || [] }
      }))

      // 过滤逻辑
      let filtered = transWithPhotos
      const categoryId = searchParams.get('categoryId')
      const accountId = searchParams.get('accountId')
      const merchantId = searchParams.get('merchantId')
      const projectId = searchParams.get('projectId')
      const personId = searchParams.get('personId')
      const subCategory = searchParams.get('subCategory')

      if (categoryId) { const ids = categoryId.split(','); filtered = filtered.filter(t => ids.includes(String(t.categoryId))) }
      if (accountId) { const ids = accountId.split(','); filtered = filtered.filter(t => ids.includes(String(t.accountId)) || ids.includes(String(t.toAccountId))) }
      if (merchantId) { const ids = merchantId.split(','); filtered = filtered.filter(t => ids.includes(t.merchantName || t.merchant)) }
      if (projectId) { const ids = projectId.split(','); filtered = filtered.filter(t => ids.includes(String(t.projectId)) || ids.includes(String(t.project))) }
      if (personId) { const ids = personId.split(','); filtered = filtered.filter(t => ids.includes(String(t.personId))) }
      if (subCategory) { filtered = filtered.filter(t => t.subCategory === subCategory) }

      // 按日期降序排序
      setTransactions(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setCategories(allCats)
      setTags(allTags)
      setPersons(allPersons)
      setTransactions(filtered.sort((a, b) => new Date(b.date) - new Date(a.date)))
      setCategories(allCats)
      setTags(allTags)
      setPersons(allPersons)
      setAccounts(allAccounts)
      setProjects(allProjects)
      setMerchants(allMerchants)
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
    const date = trans.date ? trans.date.split('T')[0] : 'Unknown'
    if (!groups[date]) groups[date] = []
    groups[date].push(trans)
    return groups
  }, {})

  // 排序日期
  const sortedDates = Object.keys(groupedTransactions).sort((a, b) => new Date(b) - new Date(a))

  // 按月份分组 (用于年度视图)
  const groupedByMonth = transactions.reduce((groups, trans) => {
    const date = trans.date ? trans.date.slice(0, 7) : 'Unknown' // YYYY-MM
    if (!groups[date]) groups[date] = []
    groups[date].push(trans)
    return groups
  }, {})

  // 排序月份
  const sortedMonths = Object.keys(groupedByMonth).sort((a, b) => new Date(b) - new Date(a))

  // 折叠状态 (按月份)
  const [collapsedMonths, setCollapsedMonths] = useState({})
  const toggleMonthCollapse = (monthKey) => {
    setCollapsedMonths(prev => ({ ...prev, [monthKey]: !prev[monthKey] }))
  }

  // 获取季度 (1-4)
  const getQuarter = (month) => Math.ceil(month / 3)
  const getQuarterMonths = (quarter) => {
    const startMonth = (quarter - 1) * 3 + 1
    return [startMonth, startMonth + 1, startMonth + 2]
  }

  // 按季度分组
  const groupedByQuarter = transactions.reduce((groups, trans) => {
    if (!trans.date) return groups
    const month = parseInt(trans.date.slice(5, 7))
    const y = trans.date.slice(0, 4)
    const q = getQuarter(month)
    const key = `${y}-Q${q}`
    if (!groups[key]) groups[key] = []
    groups[key].push(trans)
    return groups
  }, {})

  // 排序季度
  const sortedQuarters = Object.keys(groupedByQuarter).sort((a, b) => {
    const [yA, qA] = a.split('-Q')
    const [yB, qB] = b.split('-Q')
    return yB - yA || qB - qA
  })

  // 折叠状态 (按季度)
  const [collapsedQuarters, setCollapsedQuarters] = useState({})
  const toggleQuarterCollapse = (quarterKey) => {
    setCollapsedQuarters(prev => ({ ...prev, [quarterKey]: !prev[quarterKey] }))
  }

  // Search Filtering
  const filterByKeyword = (trans) => {
    if (!searchKeyword.trim()) return true
    const kw = searchKeyword.toLowerCase()
    const cat = getCategory(trans.categoryId)
    return (
      (cat.name && cat.name.toLowerCase().includes(kw)) ||
      (trans.remark && trans.remark.toLowerCase().includes(kw)) ||
      (trans.merchantName && trans.merchantName.toLowerCase().includes(kw))
    )
  }

  // Filtered Dates for Search
  const displayDates = sortedDates.filter(date =>
    groupedTransactions[date].some(filterByKeyword)
  )

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

  // 渲染单条交易
  const renderTransactionItem = (trans) => {
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
          <span style={{ fontSize: '24px' }}>{category.icon}</span>
        </div>

        <div className="record-content">
          <div className="record-main">
            <span className="category-name">
              {category.name}
              {trans.subCategory && <span style={{ color: '#999', fontWeight: 400 }}> · {trans.subCategory}</span>}
            </span>
            <span className={`amount ${trans.type}`}>
              {formatAmount(trans.amount)}
            </span>
          </div>
          <div className="record-sub">
            <div className="sub-left">
              {trans.remark && <span className="remark">{trans.remark}</span>}

              {trans.photos && trans.photos.length > 0 && (
                <div className="record-photos" style={{ display: 'flex', gap: 4, margin: '4px 0', overflowX: 'auto' }}>
                  {trans.photos.map(p => (
                    <img key={p.id} src={p.data} alt="img" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' }} />
                  ))}
                </div>
              )}

              <div className="meta-info">
                <span>{accounts.find(a => a.id === trans.accountId)?.name || '现金'}</span>
                <span> · </span>
                <span>{persons.find(p => p.id === trans.personId)?.name || '我'}</span>
                <span> · </span>
                <span>{trans.date.split('T')[1]}</span>
              </div>
            </div>
          </div>
        </div>

        {!isSelectionMode && (
          <button
            className="delete-btn"
            onClick={(e) => { e.stopPropagation(); handleDelete(trans.id); }}
            style={{
              background: '#ff4d4f',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <Trash2 size={16} color="#fff" />
          </button>
        )}
      </div>
    )
  }

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
            <button className="nav-icon-btn" onClick={() => setShowCalendarJump(true)}><Calendar size={22} color="#fff" /></button>
            <button className="nav-icon-btn" onClick={() => setIsSearchMode(!isSearchMode)}><Search size={22} color={isSearchMode ? '#FFB800' : '#fff'} /></button>
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

      {/* Search Bar */}
      {isSearchMode && (
        <div className="search-bar" style={{
          padding: '12px 16px',
          background: '#fff',
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            background: '#f5f5f5',
            borderRadius: 20,
            padding: '8px 16px'
          }}>
            <Search size={18} color="#999" />
            <input
              type="text"
              placeholder="搜索分类、备注、商家..."
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'transparent',
                outline: 'none',
                marginLeft: 8,
                fontSize: 14
              }}
              autoFocus
            />
            {searchKeyword && (
              <button onClick={() => setSearchKeyword('')} style={{ background: 'none', border: 'none', padding: 4 }}>
                <X size={16} color="#999" />
              </button>
            )}
          </div>
          <button onClick={() => { setIsSearchMode(false); setSearchKeyword(''); }} style={{ color: '#666', background: 'none', border: 'none', fontSize: 14 }}>取消</button>
        </div>
      )}

      {/* 底部筛选栏 */}
      <div className="filter-bar-sticky">
        <div className={`filter-item time-filter ${showRangeModal ? 'active' : ''}`} onClick={() => setShowRangeModal(!showRangeModal)}>
          <span>{currentRange === 'year' ? '年' : currentRange === 'quarter' ? '季' : currentRange === 'month' ? '月' : currentRange === 'week' ? '周' : '天'}</span>
          <ChevronDown size={12} className={showRangeModal ? 'rotate' : ''} />
        </div>
        <div className={`filter-item ${searchParams.get('categoryId') ? 'active' : ''}`} onClick={() => setShowCategoryFilter(true)}>
          <span>分类</span>
          <ChevronDown size={12} />
        </div>
        <div className={`filter-item ${searchParams.get('accountId') ? 'active' : ''}`} onClick={() => setShowAccountFilter(true)}>
          <span>账户</span>
          <ChevronDown size={12} />
        </div>
        <div className={`filter-item ${searchParams.get('projectId') ? 'active' : ''}`} onClick={() => setShowProjectFilter(true)}>
          <span>项目</span>
          <ChevronDown size={12} />
        </div>
        <div className={`filter-item ${searchParams.get('merchantId') || searchParams.get('personId') ? 'active' : ''}`} onClick={() => setShowMoreFilter(true)}>
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

            {/* Custom Date Option */}
            <div className={`range-option ${currentRange === 'custom' ? 'active' : ''}`}
              onClick={() => setIsCustomMode(!isCustomMode)}>
              <span style={{ flex: 1 }}>自定义日期</span>
              {currentRange === 'custom' && <Check size={16} color="#FFB800" style={{ marginRight: 8 }} />}
              <ChevronDown size={14} style={{ transform: isCustomMode ? 'rotate(180deg)' : 'rotate(0)', transition: 'all 0.2s' }} />
            </div>

            {isCustomMode && (
              <div style={{ padding: '0 16px 16px', animation: 'fadeIn 0.3s' }}>
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
                </div>

                <div style={{ background: '#f8f8f8', borderRadius: 12, padding: '0 16px', marginBottom: 16 }}>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #eee', cursor: 'pointer' }}
                    onClick={() => startRef.current && startRef.current.showPicker()}>
                    <span style={{ fontSize: 15 }}>开始日期</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#333' }}>
                      {customStart} <ChevronRight size={16} color="#ccc" />
                    </div>
                    <input ref={startRef} type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                      style={{ position: 'absolute', left: 0, bottom: 0, width: 1, height: 1, opacity: 0, zIndex: -1 }} />
                  </div>
                  <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', cursor: 'pointer' }}
                    onClick={() => endRef.current && endRef.current.showPicker()}>
                    <span style={{ fontSize: 15 }}>结束日期</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#333' }}>
                      {customEnd} <ChevronRight size={16} color="#ccc" />
                    </div>
                    <input ref={endRef} type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                      style={{ position: 'absolute', left: 0, bottom: 0, width: 1, height: 1, opacity: 0, zIndex: -1 }} />
                  </div>
                </div>
                <button onClick={() => {
                  setCurrentRange('custom')
                  setShowRangeModal(false)
                  navigate(`/records?range=custom&start=${customStart}&end=${customEnd}`, { replace: true })
                }} style={{ width: '100%', background: '#FFB800', color: '#fff', padding: 12, borderRadius: 12, border: 'none', fontWeight: '600', fontSize: 16 }}>确定</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      {showCategoryFilter && (
        <div className="range-modal-overlay" onClick={() => setShowCategoryFilter(false)}>
          <div className="range-modal" onClick={e => e.stopPropagation()} style={{ height: '60vh', overflowY: 'auto' }}>
            <div className="modal-title" style={{ padding: '10px', textAlign: 'center', fontWeight: '600' }}>选择分类 (可多选)</div>
            <div className="range-option" onClick={() => { const p = new URLSearchParams(searchParams); p.delete('categoryId'); setSearchParams(p); }}>
              <span style={{ flex: 1 }}>全部分类</span>
              {!searchParams.get('categoryId') && <Check size={16} color="#FFB800" />}
            </div>
            {categories.map(c => (
              <div key={c.id} className={`range-option ${searchParams.get('categoryId')?.split(',').includes(String(c.id)) ? 'active' : ''}`}
                onClick={() => toggleFilter('categoryId', c.id)}>
                <span style={{ marginRight: 8 }}>{c.icon}</span>
                <span style={{ flex: 1 }}>{c.name}</span>
                {searchParams.get('categoryId')?.split(',').includes(String(c.id)) && <Check size={16} color="#FFB800" />}
              </div>
            ))}
            <div style={{ padding: '20px', textAlign: 'center', position: 'sticky', bottom: 0, background: '#fff', borderTop: '1px solid #f0f0f0' }}>
              <button onClick={() => setShowCategoryFilter(false)} style={{ background: '#FFB800', color: '#fff', border: 'none', padding: '10px 40px', borderRadius: '20px' }}>完成</button>
            </div>
          </div>
        </div>
      )}

      {/* Account Filter */}
      {showAccountFilter && (
        <div className="range-modal-overlay" onClick={() => setShowAccountFilter(false)}>
          <div className="range-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title" style={{ padding: '10px', textAlign: 'center', fontWeight: '600' }}>选择账户 (可多选)</div>
            <div className="range-option" onClick={() => { const p = new URLSearchParams(searchParams); p.delete('accountId'); setSearchParams(p); }}>
              <span style={{ flex: 1 }}>全部账户</span>
              {!searchParams.get('accountId') && <Check size={16} color="#FFB800" />}
            </div>
            {accounts.map(a => (
              <div key={a.id} className={`range-option ${searchParams.get('accountId')?.split(',').includes(String(a.id)) ? 'active' : ''}`}
                onClick={() => toggleFilter('accountId', a.id)}>
                <span style={{ flex: 1 }}>{a.name}</span>
                {searchParams.get('accountId')?.split(',').includes(String(a.id)) && <Check size={16} color="#FFB800" />}
              </div>
            ))}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button onClick={() => setShowAccountFilter(false)} style={{ background: '#FFB800', color: '#fff', border: 'none', padding: '10px 40px', borderRadius: '20px' }}>完成</button>
            </div>
          </div>
        </div>
      )}

      {/* Project Filter */}
      {showProjectFilter && (
        <div className="range-modal-overlay" onClick={() => setShowProjectFilter(false)}>
          <div className="range-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-title" style={{ padding: '10px', textAlign: 'center', fontWeight: '600' }}>选择项目 (可多选)</div>
            <div className="range-option" onClick={() => { const p = new URLSearchParams(searchParams); p.delete('projectId'); setSearchParams(p); }}>
              <span style={{ flex: 1 }}>全部项目</span>
              {!searchParams.get('projectId') && <Check size={16} color="#FFB800" />}
            </div>
            {projects.map(p => (
              <div key={p.id} className={`range-option ${searchParams.get('projectId')?.split(',').includes(String(p.id)) ? 'active' : ''}`}
                onClick={() => toggleFilter('projectId', p.id)}>
                <span style={{ flex: 1 }}>{p.name}</span>
                {searchParams.get('projectId')?.split(',').includes(String(p.id)) && <Check size={16} color="#FFB800" />}
              </div>
            ))}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button onClick={() => setShowProjectFilter(false)} style={{ background: '#FFB800', color: '#fff', border: 'none', padding: '10px 40px', borderRadius: '20px' }}>完成</button>
            </div>
          </div>
        </div>
      )}

      {/* More Filter (Merchants, Persons) */}
      {showMoreFilter && (
        <div className="range-modal-overlay" onClick={() => setShowMoreFilter(false)}>
          <div className="range-modal" onClick={e => e.stopPropagation()} style={{ height: '50vh', overflowY: 'auto' }}>
            <div style={{ padding: '12px', textAlign: 'center', fontWeight: '600' }}>更多筛选</div>

            <div style={{ padding: '8px 16px', background: '#f9f9f9', fontWeight: '500' }}>商家</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '8px' }}>
              <div style={{ padding: '6px 12px', margin: '4px', background: !searchParams.get('merchantId') ? '#FFB800' : '#f0f0f0', borderRadius: '12px', color: !searchParams.get('merchantId') ? '#fff' : '#666', fontSize: 13 }}
                onClick={() => { const p = new URLSearchParams(searchParams); p.delete('merchantId'); setSearchParams(p); }}>全部</div>
              {merchants.map(m => (
                <div key={m.id} style={{ padding: '6px 12px', margin: '4px', background: searchParams.get('merchantId')?.split(',').includes(m.name) ? '#FFB800' : '#f0f0f0', borderRadius: '12px', color: searchParams.get('merchantId')?.split(',').includes(m.name) ? '#fff' : '#666', fontSize: 13 }}
                  onClick={() => toggleFilter('merchantId', m.name)}>
                  {m.name}
                </div>
              ))}
            </div>

            <div style={{ padding: '8px 16px', background: '#f9f9f9', fontWeight: '500' }}>成员</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', padding: '8px' }}>
              <div style={{ padding: '6px 12px', margin: '4px', background: !searchParams.get('personId') ? '#FFB800' : '#f0f0f0', borderRadius: '12px', color: !searchParams.get('personId') ? '#fff' : '#666', fontSize: 13 }}
                onClick={() => { const p = new URLSearchParams(searchParams); p.delete('personId'); setSearchParams(p); }}>全部</div>
              {persons.map(ps => (
                <div key={ps.id} style={{ padding: '6px 12px', margin: '4px', background: searchParams.get('personId')?.split(',').includes(String(ps.id)) ? '#FFB800' : '#f0f0f0', borderRadius: '12px', color: searchParams.get('personId')?.split(',').includes(String(ps.id)) ? '#fff' : '#666', fontSize: 13 }}
                  onClick={() => toggleFilter('personId', ps.id)}>
                  {ps.name}
                </div>
              ))}
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
              <button onClick={() => setShowMoreFilter(false)} style={{ background: '#FFB800', color: '#fff', border: 'none', padding: '10px 40px', borderRadius: '20px' }}>完成</button>
            </div>
          </div>
        </div>
      )}

      {/* 列表内容 */}
      <div className="records-list">
        {/* 年度视图: 按月分组 */}
        {range === 'year' ? (
          sortedMonths.map(monthKey => {
            const monthTrans = groupedByMonth[monthKey]
            const [y, m] = monthKey.split('-')
            const monthIncome = monthTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const monthExpense = monthTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            const isMonthCollapsed = collapsedMonths[monthKey]

            // 该月的日期分组
            const monthDates = Object.keys(groupedTransactions)
              .filter(d => d.startsWith(monthKey))
              .sort((a, b) => new Date(b) - new Date(a))

            return (
              <div key={monthKey} className="month-section">
                {/* 月度汇总头 */}
                <div className="month-summary-header" onClick={() => toggleMonthCollapse(monthKey)} style={{ cursor: 'pointer' }}>
                  <div className="month-date">
                    <span className="month-val">{parseInt(m)}月</span>
                    <span className="year-val">{y}</span>
                  </div>
                  <div className="month-stats">
                    <div className="stats-row">
                      <span className="label">结余</span>
                      <span className="val">{formatAmount(monthIncome - monthExpense)}</span>
                      <div className="arrow-box" style={{ transform: isMonthCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <ChevronDown size={12} color="#999" />
                      </div>
                    </div>
                    <div className="stats-detail">
                      <span>收入 {formatAmount(monthIncome)}</span>
                      <span className="divider">|</span>
                      <span>支出 {formatAmount(monthExpense)}</span>
                    </div>
                  </div>
                </div>

                {/* 月内日期列表 */}
                {!isMonthCollapsed && monthDates.map(date => {
                  const dayTransactions = groupedTransactions[date].filter(filterByKeyword)
                  if (dayTransactions.length === 0) return null
                  const weekDay = new Date(date).getDay()
                  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

                  return (
                    <div key={date} className="day-group">
                      <div className="day-simple-header">
                        <span>{date.split('-')[1]}月{date.split('-')[2]}日 {weekDays[weekDay]}</span>
                      </div>
                      {dayTransactions.map(trans => renderTransactionItem(trans))}
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : range === 'quarter' ? (
          /* 季度视图: 按季度分组，内含月份 */
          sortedQuarters.map(quarterKey => {
            const quarterTrans = groupedByQuarter[quarterKey]
            const [y, q] = quarterKey.split('-Q')
            const quarterIncome = quarterTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
            const quarterExpense = quarterTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
            const isQuarterCollapsed = collapsedQuarters[quarterKey]
            const quarterLabel = ['', '一', '二', '三', '四'][parseInt(q)]

            // 该季度包含的月份
            const quarterMonthKeys = sortedMonths.filter(mk => {
              const [my, mm] = mk.split('-')
              return my === y && getQuarter(parseInt(mm)) === parseInt(q)
            })

            return (
              <div key={quarterKey} className="quarter-section">
                {/* 季度汇总头 */}
                <div className="month-summary-header" onClick={() => toggleQuarterCollapse(quarterKey)} style={{ cursor: 'pointer', background: '#e8f4ff' }}>
                  <div className="month-date">
                    <span className="month-val">第{quarterLabel}季度</span>
                    <span className="year-val">{y}</span>
                  </div>
                  <div className="month-stats">
                    <div className="stats-row">
                      <span className="label">结余</span>
                      <span className="val">{formatAmount(quarterIncome - quarterExpense)}</span>
                      <div className="arrow-box" style={{ transform: isQuarterCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                        <ChevronDown size={12} color="#999" />
                      </div>
                    </div>
                    <div className="stats-detail">
                      <span>收入 {formatAmount(quarterIncome)}</span>
                      <span className="divider">|</span>
                      <span>支出 {formatAmount(quarterExpense)}</span>
                    </div>
                  </div>
                </div>

                {/* 季度内月份列表 */}
                {!isQuarterCollapsed && quarterMonthKeys.map(monthKey => {
                  const monthTrans = groupedByMonth[monthKey] || []
                  const [, m] = monthKey.split('-')
                  const monthIncome = monthTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
                  const monthExpense = monthTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)
                  const isMonthCollapsed = collapsedMonths[monthKey]

                  const monthDates = Object.keys(groupedTransactions)
                    .filter(d => d.startsWith(monthKey))
                    .sort((a, b) => new Date(b) - new Date(a))

                  return (
                    <div key={monthKey} className="month-section" style={{ marginLeft: 8, borderLeft: '2px solid #ddd' }}>
                      <div className="month-summary-header" onClick={() => toggleMonthCollapse(monthKey)} style={{ cursor: 'pointer', paddingLeft: 16 }}>
                        <div className="month-date">
                          <span className="month-val">{parseInt(m)}月</span>
                        </div>
                        <div className="month-stats">
                          <div className="stats-row">
                            <span className="val" style={{ fontSize: 14 }}>{formatAmount(monthIncome - monthExpense)}</span>
                            <div className="arrow-box" style={{ transform: isMonthCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                              <ChevronDown size={12} color="#999" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {!isMonthCollapsed && monthDates.map(date => {
                        const dayTransactions = groupedTransactions[date].filter(filterByKeyword)
                        if (dayTransactions.length === 0) return null
                        const weekDay = new Date(date).getDay()
                        const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

                        return (
                          <div key={date} className="day-group">
                            <div className="day-simple-header">
                              <span>{date.split('-')[1]}月{date.split('-')[2]}日 {weekDays[weekDay]}</span>
                            </div>
                            {dayTransactions.map(trans => renderTransactionItem(trans))}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })
        ) : (
          /* 非年度视图: 保持原有逻辑 */
          <>
            {/* 单月汇总头 */}
            <div className="month-summary-header" onClick={() => setIsCollapsed(!isCollapsed)} style={{ cursor: 'pointer' }}>
              <div className="month-date">
                <span className="month-val">{month}月</span>
                <span className="year-val">{year}</span>
              </div>
              <div className="month-stats">
                <div className="stats-row">
                  <span className="label">结余</span>
                  <span className="val">{formatAmount(totalIncome - totalExpense)}</span>
                  <div className="arrow-box" style={{ transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                    <ChevronDown size={12} color="#999" />
                  </div>
                </div>
                <div className="stats-detail">
                  <span>收入 {formatAmount(totalIncome)}</span>
                  <span className="divider">|</span>
                  <span>支出 {formatAmount(totalExpense)}</span>
                </div>
              </div>
            </div>

            {!isCollapsed && displayDates.map(date => {
              const dayTransactions = groupedTransactions[date].filter(filterByKeyword)
              const weekDay = new Date(date).getDay()
              const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

              return (
                <div key={date} className="day-group">
                  <div className="day-simple-header">
                    <span>{date.split('-')[1]}月{date.split('-')[2]}日 {weekDays[weekDay]}</span>
                  </div>
                  {dayTransactions.map(trans => renderTransactionItem(trans))}
                </div>
              )
            })}
          </>
        )}

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
      {
        isSelectionMode && (
          <div className="batch-actions" style={{
            position: 'fixed',
            bottom: 70, // Above the navigation bar
            left: 0,
            right: 0,
            background: '#fff',
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-around',
            boxShadow: '0 -4px 12px rgba(0,0,0,0.1)',
            zIndex: 1000,
            borderTop: '1px solid #eee'
          }}>
            <div style={{ textAlign: 'center', fontSize: 12, color: '#666', marginBottom: 8, width: '100%', position: 'absolute', top: -24, left: 0, background: '#fff', padding: '4px 0' }}>
              已选择 {selectedIds.size} 项
            </div>
            <button
              onClick={handleBatchDelete}
              disabled={selectedIds.size === 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: selectedIds.size > 0 ? '#ff4d4f' : '#ccc',
                fontSize: 12
              }}
            >
              <Trash2 size={22} />
              <span>删除</span>
            </button>
            <button
              onClick={() => setShowTagModal(true)}
              disabled={selectedIds.size === 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: selectedIds.size > 0 ? '#333' : '#ccc',
                fontSize: 12
              }}
            >
              <Tag size={22} />
              <span>标签</span>
            </button>
            <button
              onClick={() => setShowPersonModal(true)}
              disabled={selectedIds.size === 0}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                color: selectedIds.size > 0 ? '#333' : '#ccc',
                fontSize: 12
              }}
            >
              <Users size={22} />
              <span>人员</span>
            </button>
          </div>
        )
      }

      {/* 标签选择模态框 */}
      {
        showTagModal && (
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
        )
      }

      {/* 人员选择模态框 */}
      {
        showPersonModal && (
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
        )
      }

      {/* Calendar Jump Modal */}
      <DatePickerModal
        isOpen={showCalendarJump}
        onClose={() => setShowCalendarJump(false)}
        title="跳转到日期"
        initialDate={currentDate.toISOString().slice(0, 10)}
        onSelect={(date) => {
          const d = new Date(date)
          navigate(`/records?range=month&year=${d.getFullYear()}&month=${d.getMonth() + 1}`, { replace: true })
          setShowCalendarJump(false)
        }}
      />

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
        .filter-item.active {
            color: #FFB800;
            font-weight: 500;
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
        
        .amount.expense { color: var(--expense); }
        .amount.income { color: var(--income); }
        
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
    </div >
  )
}

export default Records
