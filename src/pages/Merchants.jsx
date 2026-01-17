import { useState, useEffect } from 'react'
import { ChevronLeft, MoreHorizontal, ChevronRight, Plus, X, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getDB } from '../db/database'
import { getAllMerchantStats, getGlobalStats } from '../db/stores'

// 默认商家图标
const ICONS = [
  '🛒', '🏪', '🏬', '🏦', '🍽️', '🚌', '⛽', '🏥', '🎬', '✈️',
  '🏨', '📱', '💻', '🎮', '📚', '☕', '🍕', '🛍️', '🎁', '💼'
]

function Merchants() {
  const navigate = useNavigate()
  const [merchants, setMerchants] = useState([])
  const [merchantStats, setMerchantStats] = useState({})
  const [totalStats, setTotalStats] = useState({ income: 0, expense: 0, balance: 0 })

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formName, setFormName] = useState('')
  const [formIcon, setFormIcon] = useState('🛒')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const db = getDB()
      let allMerchants = await db.getAll('merchants')

      // 如果没有商家，初始化默认商家
      if (!allMerchants || allMerchants.length === 0) {
        const defaultMerchants = [
          { name: '其他', icon: '🛒' },
          { name: '饭堂', icon: '🍱' },
          { name: '银行', icon: '🏦' },
          { name: '商场', icon: '🛍️' },
          { name: '超市', icon: '🏪' },
          { name: '公交', icon: '🚌' }
        ]
        for (const m of defaultMerchants) {
          await db.add('merchants', m)
        }
        allMerchants = await db.getAll('merchants')
      }

      setMerchants(allMerchants)

      setMerchants(allMerchants)

      // 使用缓存的统计数据 (高性能)
      // Use cached stats (High Performance)
      const [globalStats, mStats] = await Promise.all([
        getGlobalStats(),
        getAllMerchantStats()
      ])

      setMerchantStats(mStats)
      setTotalStats({
        income: globalStats.income,
        expense: globalStats.expense,
        balance: globalStats.income - globalStats.expense
      })

      // 按结余绝对值排序
      const sortedMerchants = allMerchants.sort((a, b) => {
        const balanceA = Math.abs((mStats[a.name]?.income || 0) - (mStats[a.name]?.expense || 0))
        const balanceB = Math.abs((mStats[b.name]?.income || 0) - (mStats[b.name]?.expense || 0))
        return balanceB - balanceA
      })
      setMerchants(sortedMerchants)
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  const openAddModal = () => {
    setEditId(null)
    setFormName('')
    setFormIcon(ICONS[0])
    setShowModal(true)
  }

  const openEditModal = (merchant) => {
    setEditId(merchant.id)
    setFormName(merchant.name)
    setFormIcon(merchant.icon || '🛒')
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!formName.trim()) {
      alert('请输入商家名称')
      return
    }

    try {
      const db = getDB()
      const payload = { name: formName.trim(), icon: formIcon }

      if (editId) {
        await db.put('merchants', { ...payload, id: editId })
      } else {
        await db.add('merchants', payload)
      }

      setShowModal(false)
      loadData()
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  const handleDelete = async () => {
    if (!editId) return
    if (!confirm('确定要删除该商家吗？')) return

    try {
      const db = getDB()
      await db.delete('merchants', editId)
      setShowModal(false)
      loadData()
    } catch (error) {
      alert('删除失败: ' + error.message)
    }
  }

  const formatAmount = (val) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val)
  }

  return (
    <div className="page merchants-page">
      {/* Banner区域 */}
      <div className="banner-area">
        <div className="banner-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} color="#fff" />
            <span>商家</span>
          </button>
          <button className="more-btn">
            <MoreHorizontal size={24} color="#fff" />
          </button>
        </div>

        <div className="banner-stats">
          <div className="balance-row">
            <span className="balance-value">{formatAmount(totalStats.balance)}</span>
            <span className="balance-label">结余</span>
          </div>
          <div className="stats-row">
            <span>收入 {formatAmount(totalStats.income)}</span>
            <span className="divider">|</span>
            <span>支出 {formatAmount(totalStats.expense)}</span>
          </div>
        </div>
      </div>

      {/* 商家列表 */}
      <div className="merchant-list">
        {merchants.map(merchant => {
          const stats = merchantStats[merchant.name] || { income: 0, expense: 0 }
          const balance = stats.income - stats.expense

          return (
            <div
              key={merchant.id}
              className="merchant-item"
              onClick={() => openEditModal(merchant)}
            >
              <div className="merchant-icon">{merchant.icon || '🛒'}</div>
              <span className="merchant-name">{merchant.name}</span>
              <span className="merchant-amount">{formatAmount(balance)}</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          )
        })}
      </div>

      {/* FAB */}
      <button className="fab-btn" onClick={openAddModal}>
        <Plus size={24} />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑商家' : '添加商家'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>商家名称</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="如：超市、餐厅"
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label>选择图标</label>
              <div className="icon-grid">
                {ICONS.map(ic => (
                  <div
                    key={ic}
                    className={`icon-opt ${formIcon === ic ? 'selected' : ''}`}
                    onClick={() => setFormIcon(ic)}
                  >
                    {ic}
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-footer">
              {editId && (
                <button className="btn-delete" onClick={handleDelete}>
                  <Trash2 size={18} />
                  <span>删除</span>
                </button>
              )}
              <button className="btn-save" onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .merchants-page {
          background: #f5f6f8;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .banner-area {
          /* 使用渐变模拟天空/建筑的冷色调 */
          background: linear-gradient(160deg, #A1C4FD 0%, #C2E9FB 100%);
          position: relative;
          padding-top: var(--safe-area-top);
          padding-bottom: 70px;
          color: #fff;
        }

        .banner-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          color: #fff;
          font-size: 18px;
          padding: 8px 0;
        }

        .more-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .banner-stats {
          padding: 24px 24px;
        }

        .balance-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 8px;
        }

        .balance-value {
          font-size: 42px;
          font-weight: 500;
          font-family: 'DIN Alternate', sans-serif;
          letter-spacing: 0.5px;
        }

        .balance-label {
          font-size: 15px;
          opacity: 0.9;
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          opacity: 0.9;
        }

        .divider { opacity: 0.6; font-size: 10px; margin: 0 2px; }

        .merchant-list {
          background: #fff;
          border-radius: 20px 20px 0 0;
          margin-top: -40px;
          position: relative;
          z-index: 10;
          padding: 12px 0;
          min-height: calc(100vh - 200px);
          box-shadow: 0 -4px 16px rgba(0,0,0,0.03);
        }

        .merchant-item {
          display: flex;
          align-items: center;
          padding: 18px 24px;
          border-bottom: 1px solid #f9f9f9;
          cursor: pointer;
        }

        .merchant-item:active { background: #f9f9f9; }

        .merchant-icon {
          width: 24px;
          font-size: 24px;
          margin-right: 16px;
          text-align: center;
        }

        .merchant-name {
          flex: 1;
          font-size: 16px;
          color: #333;
        }

        .merchant-amount {
          font-size: 16px;
          color: #333;
          margin-right: 8px;
          font-family: 'DIN Alternate', sans-serif;
        }

        .fab-btn {
          position: fixed;
          bottom: 40px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff;
          border: none;
          box-shadow: 0 8px 20px rgba(255, 149, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
        }
        
        .fab-btn:active { transform: scale(0.95); }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end;
          z-index: 1000;
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 24px 24px 0 0;
          padding: 24px;
          padding-bottom: calc(40px + var(--safe-area-bottom, 0px));
          animation: slideUp 0.3s ease-out;
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
        .modal-header button { background: none; border: none; color: #999; }

        .form-group { margin-bottom: 24px; }
        .form-group label {
          display: block;
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
        }

        .form-group input {
          width: 100%;
          padding: 16px;
          background: #f7f8fa;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          color: #333;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .icon-opt {
          aspect-ratio: 1;
          background: #f7f8fa;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .icon-opt.selected {
          border-color: #FFB800;
          background: #FFF9E6;
        }

        .modal-footer {
          display: flex;
          gap: 16px;
          margin-top: 32px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 16px 24px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 12px;
          font-weight: 500;
        }

        .btn-save {
          flex: 1;
          padding: 16px;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
        }

        @media (min-width: 768px) {
          .modal-overlay {
            align-items: center;
            justify-content: center;
          }
          .modal-content {
            width: 450px;
            border-radius: 24px;
            max-height: 80vh;
            overflow-y: auto;
          }
        }
      `}</style>
    </div>
  )
}

export default Merchants
