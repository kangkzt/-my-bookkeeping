import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, MoreHorizontal, X, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getDB } from '../db/database'
import { getAllCategories, getAllAccounts } from '../db/stores'

function Templates() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([])
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])

  // Modal
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense',
    amount: '',
    categoryId: null,
    accountId: null,
    remark: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const db = getDB()

      // 确保templates store存在
      if (!db.objectStoreNames.contains('templates')) {
        // 初始化默认模板
        const defaultTemplates = [
          { name: '早午晚餐', type: 'expense', amount: 12, remark: '示例模板', icon: '🍎' },
          { name: '打出租车', type: 'expense', amount: 20, remark: '示例模板', icon: '🚗' },
          { name: '早午晚步', type: 'expense', amount: 0, remark: '', icon: '🥗' },
          { name: '发薪水噢', type: 'income', amount: 10000, remark: '示例模板', icon: '💰' },
          { name: '投资收入', type: 'income', amount: 284, remark: '小店分红', icon: '📈' }
        ]
        setTemplates(defaultTemplates)
      } else {
        const allTemplates = await db.getAll('templates')
        setTemplates(allTemplates)
      }

      const [allCats, allAccounts] = await Promise.all([
        getAllCategories(),
        getAllAccounts()
      ])
      setCategories(allCats)
      setAccounts(allAccounts)
    } catch (error) {
      console.error('加载模板失败:', error)
    }
  }

  const openAddModal = () => {
    setEditId(null)
    setFormData({
      name: '',
      type: 'expense',
      amount: '',
      categoryId: categories.find(c => c.type === 'expense')?.id || null,
      accountId: accounts[0]?.id || null,
      remark: ''
    })
    setShowModal(true)
  }

  const openEditModal = (template) => {
    setEditId(template.id)
    setFormData({
      name: template.name,
      type: template.type,
      amount: String(template.amount || ''),
      categoryId: template.categoryId,
      accountId: template.accountId,
      remark: template.remark || ''
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('请输入模板名称')
      return
    }

    try {
      const db = getDB()
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount) || 0
      }

      if (editId) {
        await db.put('templates', { ...payload, id: editId })
      } else {
        await db.add('templates', payload)
      }

      setShowModal(false)
      loadData()
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  const handleDelete = async () => {
    if (!confirm('确定删除此模板?')) return
    try {
      const db = getDB()
      await db.delete('templates', editId)
      setShowModal(false)
      loadData()
    } catch (error) {
      alert('删除失败: ' + error.message)
    }
  }

  const useTemplate = (template) => {
    navigate(`/add?templateId=${template.id}`)
  }

  const expenseTemplates = templates.filter(t => t.type === 'expense')
  const incomeTemplates = templates.filter(t => t.type === 'income')

  const formatAmount = (val) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(val || 0)
  }

  const getCategory = (id) => categories.find(c => c.id === id)
  const getAccount = (id) => accounts.find(a => a.id === id)

  return (
    <div className="page templates-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
          <span>记一笔</span>
        </button>
        <span className="header-action">☆自定义</span>
      </div>

      {/* Tab */}
      <div className="tab-bar">
        <button className="tab-item active">模板</button>
        <button className="tab-item" onClick={() => navigate('/add')}>支出</button>
        <button className="tab-item" onClick={() => navigate('/add')}>收入</button>
        <button className="tab-item" onClick={() => navigate('/add')}>转账</button>
        <button className="tab-item">余额</button>
        <button className="tab-item">借贷</button>
      </div>

      {/* 模板列表 */}
      <div className="template-list">
        {/* 支出模板 */}
        <div className="template-section">
          <h3 className="section-title">支出模板</h3>
          {expenseTemplates.map(template => (
            <div key={template.id || template.name} className="template-item" onClick={() => openEditModal(template)}>
              <div className="template-icon">{template.icon || '📝'}</div>
              <div className="template-info">
                <div className="template-name">
                  {template.name}
                  <span className="template-amount expense">{formatAmount(template.amount)}</span>
                </div>
                <div className="template-meta">
                  {template.remark && <span>{template.remark}</span>}
                  <span>{getAccount(template.accountId)?.name || '现金'}</span>
                </div>
              </div>
              <button className="use-btn" onClick={(e) => { e.stopPropagation(); useTemplate(template) }}>
                记一笔
              </button>
            </div>
          ))}
        </div>

        {/* 收入模板 */}
        <div className="template-section">
          <h3 className="section-title">收入模板</h3>
          {incomeTemplates.map(template => (
            <div key={template.id || template.name} className="template-item" onClick={() => openEditModal(template)}>
              <div className="template-icon">{template.icon || '💰'}</div>
              <div className="template-info">
                <div className="template-name">
                  {template.name}
                  <span className="template-amount income">{formatAmount(template.amount)}</span>
                </div>
                <div className="template-meta">
                  {template.remark && <span>{template.remark}</span>}
                  <span>{getAccount(template.accountId)?.name || '现金'}</span>
                </div>
              </div>
              <button className="use-btn" onClick={(e) => { e.stopPropagation(); useTemplate(template) }}>
                记一笔
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 底部操作栏 */}
      <div className="bottom-bar">
        <button className="bar-btn">
          <span>≡</span>
          <span>批量操作</span>
          <small>排序、删除</small>
        </button>
        <div className="bar-divider" />
        <button className="bar-btn" onClick={openAddModal}>
          <Plus size={18} />
          <span>添加模板</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑模板' : '添加模板'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>模板名称</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="请输入模板名称"
              />
            </div>

            <div className="form-group">
              <label>类型</label>
              <div className="type-selector">
                <button
                  className={formData.type === 'expense' ? 'active' : ''}
                  onClick={() => setFormData({ ...formData, type: 'expense' })}
                >支出</button>
                <button
                  className={formData.type === 'income' ? 'active' : ''}
                  onClick={() => setFormData({ ...formData, type: 'income' })}
                >收入</button>
              </div>
            </div>

            <div className="form-group">
              <label>金额</label>
              <input
                type="number"
                value={formData.amount}
                onChange={e => setFormData({ ...formData, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label>备注</label>
              <input
                type="text"
                value={formData.remark}
                onChange={e => setFormData({ ...formData, remark: e.target.value })}
                placeholder="可选备注"
              />
            </div>

            <div className="modal-footer">
              {editId && (
                <button className="btn-delete" onClick={handleDelete}>
                  <Trash2 size={16} /> 删除
                </button>
              )}
              <button className="btn-save" onClick={handleSave}>保存</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .templates-page {
          background: #fff;
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          font-size: 16px;
          color: #333;
        }

        .header-action {
          color: #FFB800;
          font-size: 14px;
        }

        .tab-bar {
          display: flex;
          padding: 0 16px;
          border-bottom: 1px solid #f5f5f5;
          overflow-x: auto;
        }

        .tab-item {
          padding: 12px 16px;
          background: none;
          border: none;
          font-size: 15px;
          color: #999;
          white-space: nowrap;
          position: relative;
        }

        .tab-item.active {
          color: #333;
          font-weight: 600;
        }

        .tab-item.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: #FFB800;
          border-radius: 2px;
        }

        .template-list {
          padding: 16px;
        }

        .template-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 13px;
          color: #999;
          margin-bottom: 12px;
          font-weight: normal;
        }

        .template-item {
          display: flex;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #f9f9f9;
        }

        .template-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #FFF5E6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 12px;
        }

        .template-info {
          flex: 1;
        }

        .template-name {
          font-size: 15px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .template-amount {
          font-size: 15px;
          font-weight: 500;
        }

        .template-amount.expense { color: #FFB800; }
        .template-amount.income { color: #4ECDC4; }

        .template-meta {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
          display: flex;
          gap: 8px;
        }

        .use-btn {
          padding: 8px 16px;
          background: none;
          border: 1px solid #FFB800;
          border-radius: 16px;
          color: #FFB800;
          font-size: 13px;
        }

        /* 底部操作栏 */
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          max-width: 480px;
          margin: 0 auto;
          display: flex;
          background: #fff;
          border-top: 1px solid #f0f0f0;
          padding: 12px 24px;
          padding-bottom: calc(12px + var(--safe-area-bottom, 0px));
        }

        .bar-btn {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          background: none;
          border: none;
          color: #666;
          font-size: 13px;
        }

        .bar-btn small { font-size: 11px; color: #999; }

        .bar-divider {
          width: 1px;
          background: #f0f0f0;
          margin: 0 16px;
        }

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
            align-items: center;
          }
          .modal-content {
            border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          max-width: 480px;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: calc(80px + var(--safe-area-bottom, 0px));
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
          margin-bottom: 8px;
        }

        .form-group input {
          width: 100%;
          padding: 14px;
          background: #f5f5f5;
          border: none;
          border-radius: 10px;
          font-size: 16px;
        }

        .type-selector {
          display: flex;
          gap: 12px;
        }

        .type-selector button {
          flex: 1;
          padding: 12px;
          background: #f5f5f5;
          border: 2px solid transparent;
          border-radius: 10px;
          font-size: 14px;
          color: #666;
        }

        .type-selector button.active {
          border-color: #FFB800;
          background: #FFF9E6;
          color: #FFB800;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          flex: 1;
          padding: 14px;
          background: #fff;
          border: 1px solid #ff4d4f;
          border-radius: 10px;
          color: #ff4d4f;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-save {
          flex: 2;
          padding: 14px;
          background: #FFB800;
          border: none;
          border-radius: 10px;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

export default Templates
