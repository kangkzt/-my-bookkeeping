import { useState, useEffect } from 'react'
import { ArrowLeft, ChevronDown, ChevronRight, Plus, X, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { getDB } from '../db/database'
import { getAllCategories, getTransactionsByMonth, getTransactionsByYear } from '../db/stores'

function Budget() {
  const navigate = useNavigate()
  const [budgets, setBudgets] = useState([])
  const [categories, setCategories] = useState([])
  const [categorySpending, setCategorySpending] = useState({})

  // 筛选条件
  const [filterType, setFilterType] = useState('expense') // expense / income
  const [filterYear, setFilterYear] = useState(new Date().getFullYear())

  // 总计
  const [totalStats, setTotalStats] = useState({
    budget: 0,
    used: 0,
    remaining: 0,
    balance: 0
  })

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formCategoryId, setFormCategoryId] = useState(null)
  const [formAmount, setFormAmount] = useState('')

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const monthKey = `${year}-${month.toString().padStart(2, '0')}`

  // 滑动切换年份
  const handlers = useSwipeable({
    onSwipedLeft: () => setFilterYear(prev => prev + 1),
    onSwipedRight: () => setFilterYear(prev => prev - 1),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  })

  useEffect(() => {
    loadData()
  }, [filterYear])

  const loadData = async () => {
    try {
      const db = getDB()
      const allBudgets = await db.getAll('budgets')
      const monthBudgets = allBudgets.filter(b => b.month === monthKey)
      setBudgets(monthBudgets)

      const allCategories = await getAllCategories()
      const expenseCats = allCategories.filter(c => c.type === filterType)
      setCategories(expenseCats)

      if (expenseCats.length > 0 && !formCategoryId) {
        setFormCategoryId(expenseCats[0].id)
      }

      // 获取每个分类的年度支出
      const yearTrans = await getTransactionsByYear(filterYear)
      const spending = {}
      let totalUsed = 0

      yearTrans.filter(t => t.type === filterType).forEach(t => {
        spending[t.categoryId] = (spending[t.categoryId] || 0) + Number(t.amount)
        totalUsed += Number(t.amount)
      })
      setCategorySpending(spending)

      // 计算总预算
      const totalBudget = monthBudgets.reduce((sum, b) => sum + Number(b.amount || 0), 0) * 12

      setTotalStats({
        budget: totalBudget,
        used: totalUsed,
        remaining: Math.max(0, totalBudget - totalUsed),
        balance: totalBudget - totalUsed
      })
    } catch (error) {
      console.error('加载预算失败:', error)
    }
  }

  const openAddModal = () => {
    setEditId(null)
    setFormAmount('')
    if (categories.length > 0) setFormCategoryId(categories[0].id)
    setShowModal(true)
  }

  const handleSave = async () => {
    const amount = parseFloat(formAmount)
    if (!formCategoryId || isNaN(amount) || amount <= 0) {
      alert('请选择分类并输入有效金额')
      return
    }

    try {
      const db = getDB()
      const payload = {
        categoryId: formCategoryId,
        amount,
        month: monthKey,
        spent: 0
      }

      if (editId) {
        await db.put('budgets', { ...payload, id: editId })
      } else {
        const existing = budgets.find(b => b.categoryId === formCategoryId)
        if (existing) {
          alert('该分类已有预算，请编辑现有预算')
          return
        }
        await db.add('budgets', payload)
      }

      setShowModal(false)
      loadData()
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  const formatAmount = (val) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val)
  }

  const getCategory = (id) => categories.find(c => c.id === id) || { name: '未知', icon: '❓', color: '#ccc' }

  // 所有分类的预算视图（包括没有设预算的）
  const allCategoryBudgets = categories.map(cat => {
    const budget = budgets.find(b => b.categoryId === cat.id)
    const spent = categorySpending[cat.id] || 0
    return {
      category: cat,
      budget: budget?.amount || 0,
      spent,
      remaining: (budget?.amount || 0) - spent
    }
  })

  return (
    <div className="page budget-page" {...handlers}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1>预算中心</h1>
        <button className="add-btn" onClick={openAddModal}>
          <Plus size={22} />
        </button>
      </div>

      {/* 筛选栏 */}
      <div className="filter-bar">
        <button className="filter-btn active">
          分类支出 <ChevronDown size={14} />
        </button>
        <button className="filter-btn">
          {filterYear}年 <ChevronDown size={14} />
        </button>
        <button className="filter-btn">
          日期 <ChevronDown size={14} />
        </button>
      </div>

      {/* 总览卡片 */}
      <div className="overview-card">
        <div className="overview-row">
          <div className="ov-item">
            <span className="ov-label">本年预算</span>
            <span className="ov-value">{formatAmount(totalStats.budget)}</span>
          </div>
          <div className="ov-divider" />
          <div className="ov-item">
            <span className="ov-label">已用</span>
            <span className="ov-value">{formatAmount(totalStats.used)}</span>
          </div>
          <div className="ov-divider" />
          <div className="ov-item">
            <span className="ov-label">剩余</span>
            <span className="ov-value">{formatAmount(totalStats.remaining)}</span>
          </div>
          <div className="ov-divider" />
          <div className="ov-item">
            <span className="ov-label">结存</span>
            <span className={`ov-value ${totalStats.balance < 0 ? 'negative' : ''}`}>
              {formatAmount(totalStats.balance)}
            </span>
          </div>
        </div>
      </div>

      {/* 分类预算列表 */}
      <div className="category-budget-list">
        {allCategoryBudgets.map((item, index) => (
          <div key={item.category.id} className="cat-budget-item">
            <div className="cat-icon" style={{ backgroundColor: item.category.color }}>
              {item.category.icon}
            </div>
            <div className="cat-info">
              <span className="cat-name">{item.category.name}</span>
              <div className="cat-amounts">
                <span className="spent">支出 {formatAmount(item.spent)}</span>
              </div>
            </div>
            <div className="cat-right">
              <span className={`remaining ${item.remaining < 0 ? 'negative' : ''}`}>
                {item.budget > 0 ? (item.remaining >= 0 ? `剩余 ${formatAmount(item.remaining)}` : `超支 ${formatAmount(-item.remaining)}`) : '未设预算'}
              </span>
              <ChevronRight size={16} color="#ccc" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑预算' : '添加预算'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>选择分类</label>
              <div className="cat-select">
                {categories.map(cat => (
                  <div
                    key={cat.id}
                    className={`cat-option ${formCategoryId === cat.id ? 'selected' : ''}`}
                    onClick={() => setFormCategoryId(cat.id)}
                  >
                    <span className="cat-icon-sm" style={{ backgroundColor: cat.color }}>{cat.icon}</span>
                    <span className="cat-name">{cat.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>月预算金额</label>
              <input
                type="number"
                value={formAmount}
                onChange={e => setFormAmount(e.target.value)}
                placeholder="请输入金额"
              />
            </div>

            <div className="modal-footer">
              <button className="btn-save" onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .budget-page {
          background: #f5f6f8;
          min-height: 100vh;
          padding-bottom: 100px;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }

        .page-header h1 { font-size: 18px; font-weight: 600; color: #333; }

        .back-btn, .add-btn {
          width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          background: none; border: none; color: #333;
        }

        /* 筛选栏 */
        .filter-bar {
          display: flex;
          gap: 12px;
          padding: 12px 16px;
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 6px 12px;
          background: #f5f5f5;
          border: none;
          border-radius: 16px;
          font-size: 13px;
          color: #666;
        }

        .filter-btn.active {
          background: #667eea;
          color: #fff;
        }

        /* 总览卡片 */
        .overview-card {
          margin: 16px;
          padding: 20px;
          background: #fff;
          border-radius: 12px;
        }

        .overview-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .ov-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          flex: 1;
        }

        .ov-label { font-size: 12px; color: #999; }
        .ov-value { font-size: 14px; font-weight: 600; color: #333; }
        .ov-value.negative { color: #ff4d4f; }

        .ov-divider {
          width: 1px;
          height: 30px;
          background: #f0f0f0;
        }

        /* 分类预算列表 */
        .category-budget-list {
          margin: 0 16px;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
        }

        .cat-budget-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
        }

        .cat-budget-item:last-child { border-bottom: none; }

        .cat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 14px;
        }

        .cat-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .cat-name { font-size: 15px; color: #333; font-weight: 500; }
        .cat-amounts { font-size: 12px; color: #999; }
        .spent { color: #999; }

        .cat-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .remaining { font-size: 13px; color: #4ECDC4; }
        .remaining.negative { color: #ff4d4f; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0; bottom: 0; left: 0; right: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
        }

        @media (min-width: 768px) {
          .modal-overlay {
            left: 50%; right: auto; width: 480px;
            transform: translateX(-50%);
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          max-width: 480px;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: calc(80px + var(--safe-area-bottom, 0px));
          max-height: 80vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 20px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
        }

        .cat-select {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          max-height: 200px;
          overflow-y: auto;
        }

        .cat-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          padding: 10px 6px;
          background: #f5f5f5;
          border-radius: 10px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .cat-option.selected {
          border-color: #667eea;
          background: #f0f4ff;
        }

        .cat-icon-sm {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
        }

        .cat-option .cat-name { font-size: 11px; color: #666; }

        .modal-footer { margin-top: 24px; }

        .btn-save {
          width: 100%;
          padding: 14px;
          background: #667eea;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 16px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default Budget
