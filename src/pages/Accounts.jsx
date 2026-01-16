import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Edit3, Wallet, CreditCard, PiggyBank, Landmark, TrendingUp, ChevronRight, ChevronDown, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { getDB } from '../db/database'
import { getAllTransactions } from '../db/stores'

// 账户分组定义
const ACCOUNT_GROUPS = [
  { key: 'cash', title: '现金账户', icon: Wallet, types: ['cash', 'bank', 'other'] },
  { key: 'virtual', title: '虚拟账户', icon: CreditCard, types: ['alipay', 'wechat', 'virtual'] },
  { key: 'investment', title: '投资账户', icon: TrendingUp, types: ['stock', 'fund', 'investment'] },
  { key: 'receivable', title: '债权账户', icon: PiggyBank, types: ['receivable'] },
  { key: 'credit', title: '信用账户', icon: Landmark, types: ['credit_card', 'loan'] }
]

// 账户类型选项
const ACCOUNT_TYPES = [
  { value: 'cash', label: '现金', icon: '💵' },
  { value: 'bank', label: '银行卡', icon: '🏦' },
  { value: 'alipay', label: '支付宝', icon: '💙' },
  { value: 'wechat', label: '微信', icon: '💚' },
  { value: 'credit_card', label: '信用卡', icon: '💳' },
  { value: 'investment', label: '投资', icon: '📈' },
  { value: 'other', label: '其他', icon: '📦' }
]

function Accounts() {
  const navigate = useNavigate()
  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true
  })
  const [accounts, setAccounts] = useState([])
  const [totalAssets, setTotalAssets] = useState(0)
  const [totalLiabilities, setTotalLiabilities] = useState(0)
  const [netAssets, setNetAssets] = useState(0)
  const [expandedGroups, setExpandedGroups] = useState({
    cash: true, virtual: true, investment: true, receivable: true, credit: true
  })

  // 添加/编辑账户Modal
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formName, setFormName] = useState('')
  const [formBalance, setFormBalance] = useState('')
  const [formType, setFormType] = useState('bank')
  const [formIcon, setFormIcon] = useState('🏦')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const db = getDB()
      const [allAccounts, allTrans] = await Promise.all([
        db.getAll('accounts'),
        getAllTransactions()
      ])

      // 计算动态余额
      const calcAccounts = allAccounts.map(acc => {
        let currentBal = Number(acc.balance || 0)
        allTrans.forEach(t => {
          const amt = Number(t.amount)
          if (t.accountId === acc.id) {
            if (t.type === 'expense') currentBal -= amt
            if (t.type === 'income') currentBal += amt
            if (t.type === 'transfer') currentBal -= amt
          }
          if (t.toAccountId === acc.id && t.type === 'transfer') {
            currentBal += amt
          }
        })
        return { ...acc, _currentBalance: currentBal }
      })

      setAccounts(calcAccounts)
      calculateTotals(calcAccounts)
    } catch (error) {
      console.error('加载账户失败:', error)
    }
  }

  const calculateTotals = (allAccounts) => {
    let groupAssets = 0
    let groupLiabilities = 0

    allAccounts.forEach(acc => {
      const type = acc.type || 'other'
      const amount = acc._currentBalance

      if (['credit_card', 'loan'].includes(type)) {
        if (amount < 0) groupLiabilities += Math.abs(amount)
        else groupAssets += amount
      } else {
        if (amount >= 0) groupAssets += amount
        else groupLiabilities += Math.abs(amount)
      }
    })

    setTotalAssets(groupAssets)
    setTotalLiabilities(groupLiabilities)
    setNetAssets(groupAssets - groupLiabilities)
  }

  const toggleGroup = (key) => {
    setExpandedGroups(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const getGroupAccounts = (groupTypes) => {
    return accounts.filter(acc => groupTypes.includes(acc.type || 'other'))
  }

  const formatAmount = (val) => {
    return new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val)
  }

  // 打开添加Modal
  const openAddModal = () => {
    setEditId(null)
    setFormName('')
    setFormBalance('')
    setFormType('bank')
    setFormIcon('🏦')
    setShowModal(true)
  }

  // 打开编辑Modal
  const openEditModal = (acc) => {
    setEditId(acc.id)
    setFormName(acc.name)
    setFormBalance(String(acc.balance || 0))
    setFormType(acc.type || 'bank')
    setFormIcon(acc.icon || '🏦')
    setShowModal(true)
  }

  // 保存账户
  const handleSave = async () => {
    if (!formName.trim()) {
      alert('请输入账户名称')
      return
    }

    try {
      const db = getDB()
      const payload = {
        name: formName.trim(),
        balance: parseFloat(formBalance) || 0,
        type: formType,
        icon: formIcon,
        color: '#5C7AEA'
      }

      if (editId) {
        await db.put('accounts', { ...payload, id: editId })
      } else {
        await db.add('accounts', payload)
      }

      setShowModal(false)
      loadData()
    } catch (e) {
      alert('保存失败: ' + e.message)
    }
  }

  // 删除账户
  const handleDelete = async () => {
    if (!editId) return
    if (!confirm('确定要删除该账户吗？删除后无法恢复。')) return

    try {
      const db = getDB()
      await db.delete('accounts', editId)
      setShowModal(false)
      loadData()
    } catch (e) {
      alert('删除失败: ' + e.message)
    }
  }

  return (
    <div className="page accounts-page" {...handlers}>
      {/* 顶部Header - 固定白色背景 */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1>账户</h1>
        <button className="edit-btn" onClick={openAddModal}>
          <Plus size={22} />
        </button>
      </div>

      {/* 资产卡片 */}
      <div className="asset-card" onClick={() => navigate('/records')}>
        <div className="asset-main">
          <span className="net-label">净资产</span>
          <span className="net-amount">¥ {formatAmount(netAssets)}</span>
        </div>
        <div className="asset-details">
          <div className="detail-item">
            <span className="label">总资产</span>
            <span className="value">¥ {formatAmount(totalAssets)}</span>
          </div>
          <div className="detail-item">
            <span className="label">总负债</span>
            <span className="value">¥ {formatAmount(totalLiabilities)}</span>
          </div>
        </div>
      </div>

      {/* 账户分组列表 */}
      <div className="account-groups">
        {ACCOUNT_GROUPS.map(group => {
          const groupAccounts = getGroupAccounts(group.types)
          const groupTotal = groupAccounts.reduce((sum, acc) => sum + acc._currentBalance, 0)
          const isExpanded = expandedGroups[group.key]
          const GroupIcon = group.icon

          return (
            <div key={group.key} className="group-section">
              <div className="group-header" onClick={() => toggleGroup(group.key)}>
                <div className="group-title">
                  <GroupIcon size={16} strokeWidth={1.5} />
                  <span>{group.title}</span>
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
                <span className="group-total">{formatAmount(groupTotal)}</span>
              </div>

              {isExpanded && (
                <div className="group-list">
                  {groupAccounts.map(acc => (
                    <div key={acc.id} className="account-item" onClick={() => navigate(`/records?accountId=${acc.id}`)}>
                      <div className="account-icon">{acc.icon || '💰'}</div>
                      <div className="account-info">
                        <span className="account-name">{acc.name}</span>
                      </div>
                      <div className="account-amount">
                        <span className={acc._currentBalance < 0 ? 'negative' : ''}>
                          {formatAmount(acc._currentBalance)}
                        </span>
                        <ChevronRight size={16} color="#ccc" />
                      </div>
                      <button className="item-edit-btn" onClick={(e) => { e.stopPropagation(); openEditModal(acc); }}>
                        <Edit3 size={16} color="#999" />
                      </button>
                    </div>
                  ))}
                  {groupAccounts.length === 0 && (
                    <div className="empty-group">暂无账户</div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* 添加/编辑Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑账户' : '添加账户'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>账户名称</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="如：工商银行储蓄卡"
              />
            </div>

            <div className="form-group">
              <label>初始余额</label>
              <input
                type="number"
                value={formBalance}
                onChange={e => setFormBalance(e.target.value)}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>账户类型</label>
              <div className="type-grid">
                {ACCOUNT_TYPES.map(t => (
                  <div
                    key={t.value}
                    className={`type-option ${formType === t.value ? 'active' : ''}`}
                    onClick={() => { setFormType(t.value); setFormIcon(t.icon) }}
                  >
                    <span className="type-icon">{t.icon}</span>
                    <span className="type-label">{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              {editId && (
                <button className="btn-delete" onClick={handleDelete}>删除</button>
              )}
              <button className="btn-save" onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .accounts-page {
          background: #f5f6fa;
          min-height: 100vh;
          padding-bottom: 40px;
        }

        /* Fixed Header */
        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .page-header h1 {
          font-size: 17px;
          font-weight: 600;
          color: #333;
        }

        .back-btn, .edit-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.03);
          border: none;
          border-radius: 50%;
          color: #333;
          transition: background 0.2s;
        }
        .back-btn:active, .edit-btn:active {
          background: rgba(0,0,0,0.08);
        }

        /* Asset Card */
        .asset-card {
          margin: 16px;
          padding: 24px;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          background-image: url('https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop');
          background-size: cover;
          background-position: center;
          border-radius: 20px;
          color: #fff;
          box-shadow: 0 10px 30px rgba(132, 250, 176, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .asset-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, rgba(46, 139, 87, 0.85) 0%, rgba(32, 178, 170, 0.85) 100%);
          z-index: 1;
        }
        
        .asset-main, .asset-details {
          position: relative;
          z-index: 2;
        }

        .asset-main { margin-bottom: 24px; text-align: center; }
        .net-label { font-size: 13px; opacity: 0.9; display: block; margin-bottom: 4px; font-weight: 500;}
        .net-amount { font-size: 36px; font-weight: 700; font-family: 'DIN Alternate', sans-serif; letter-spacing: 0.5px; }

        .asset-details { 
            display: flex; 
            justify-content: space-around; 
            background: rgba(255,255,255,0.1); 
            padding: 12px; 
            border-radius: 12px; 
            backdrop-filter: blur(5px);
        }
        .detail-item { display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .detail-item .label { font-size: 11px; opacity: 0.8; }
        .detail-item .value { font-size: 15px; font-weight: 600; font-family: 'DIN Alternate', sans-serif; }

        /* Account Groups */
        .account-groups { padding: 0 16px; display: flex; flex-direction: column; gap: 16px; }

        .group-section {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .group-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          cursor: pointer;
          background: #fff;
          border-bottom: 1px solid transparent;
        }
        .group-header:active { background: #f9f9f9; }

        .group-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          color: #333;
          font-weight: 500;
        }
        .group-title svg { color: #8fd3f4; fill: #8fd3f4; fill-opacity: 0.2; }

        .group-total { font-size: 14px; color: #999; font-weight: 500; font-family: 'DIN Alternate', sans-serif; }

        .group-list {
            background: #fbfbfd;
        }

        .account-item {
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-top: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background 0.2s;
        }
        .account-item:active { background: #f0f0f0; }

        .account-icon {
          width: 42px;
          height: 42px;
          background: #fff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          margin-right: 14px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          border: 1px solid #f5f5f5;
        }

        .account-info { flex: 1; }
        .account-name { font-size: 15px; color: #333; font-weight: 500; }

        .account-amount {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 15px;
          color: #333;
          font-weight: 600;
          font-family: 'DIN Alternate', sans-serif;
        }
        .account-amount .negative { color: #ff5252; }

        .item-edit-btn {
          width: 32px;
          height: 32px;
          margin-left: 4px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
        }
        .item-edit-btn:active {
           background: rgba(0,0,0,0.05);
        }

        .empty-group { padding: 24px; text-align: center; color: #ccc; font-size: 13px; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (min-width: 768px) {
          .modal-overlay { align-items: center; }
          .modal-content { width: 420px !important; border-radius: 20px !important; }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 24px 24px 0 0;
          padding: 24px;
          animation: slideUp 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -10px 40px rgba(0,0,0,0.1);
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .modal-header h3 { font-size: 18px; margin: 0; font-weight: 600; }
        .modal-header button { background: #f5f5f5; border: none; color: #666; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }

        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 8px; font-weight: 500; }
        .form-group input {
          width: 100%;
          padding: 16px;
          background: #f7f8fa;
          border: 1px solid transparent;
          border-radius: 12px;
          font-size: 16px;
          outline: none;
          transition: all 0.2s;
          color: #333;
        }
        .form-group input:focus {
           background: #fff;
           border-color: #8fd3f4;
           box-shadow: 0 0 0 4px rgba(143, 211, 244, 0.1);
        }

        .type-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .type-option {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 6px;
          background: #f7f8fa;
          border-radius: 14px;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.2s;
        }

        .type-option.active {
          border-color: #8fd3f4;
          background: #e6f7ff;
        }

        .type-icon { font-size: 24px; }
        .type-label { font-size: 12px; color: #555; }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        .btn-delete {
          padding: 16px 24px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
        }

        .btn-save {
          flex: 1;
          padding: 16px;
          background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(132, 250, 176, 0.3);
        }
        .btn-save:active { opacity: 0.9; transform: scale(0.98); }
      `}</style>
    </div>
  )
}

export default Accounts
