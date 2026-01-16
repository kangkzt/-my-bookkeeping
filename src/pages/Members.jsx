import { useState, useEffect } from 'react'
import { ArrowLeft, Users, Plus, X, Trash2, Edit3 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getAllPersons, getTransactionsByMonth } from '../db/stores'
import { getDB } from '../db/database'
import { useSwipeable } from 'react-swipeable'

import man from '../assets/avatars/man.png'
import woman from '../assets/avatars/woman.png'
import boy from '../assets/avatars/boy.png'
import girl from '../assets/avatars/girl.png'
import seniorMan from '../assets/avatars/senior_man.png'
import seniorWoman from '../assets/avatars/senior_woman.png'
import cat from '../assets/avatars/cat.png'
import dog from '../assets/avatars/dog.png'

// 默认头像选项
const AVATARS = [
  man, woman, boy, girl,
  seniorMan, seniorWoman, cat, dog,
  '👤', '❤️', '⭐', '💎'
]

function Members() {
  const navigate = useNavigate()
  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true
  })
  const [persons, setPersons] = useState([])
  const [memberStats, setMemberStats] = useState({})

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formName, setFormName] = useState('')
  const [formAvatar, setFormAvatar] = useState(AVATARS[0])

  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const allPersons = await getAllPersons()
      setPersons(allPersons)

      const transactions = await getTransactionsByMonth(year, month)
      const stats = {}

      allPersons.forEach(person => {
        const personTrans = transactions.filter(t => t.personId === person.id)
        stats[person.id] = {
          income: personTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0),
          expense: personTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0),
          count: personTrans.length
        }
      })

      const unassigned = transactions.filter(t => !t.personId)
      stats['unassigned'] = {
        income: unassigned.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0),
        expense: unassigned.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0),
        count: unassigned.length
      }

      setMemberStats(stats)
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  // 打开添加Modal
  const openAddModal = () => {
    setEditId(null)
    setFormName('')
    setFormAvatar(AVATARS[0])
    setShowModal(true)
  }

  // 打开编辑Modal
  const openEditModal = (person) => {
    setEditId(person.id)
    setFormName(person.name)
    setFormAvatar(person.avatar || AVATARS[0])
    setShowModal(true)
  }

  // 保存成员
  const handleSave = async () => {
    if (!formName.trim()) {
      alert('请输入成员名称')
      return
    }

    try {
      const db = getDB()
      const payload = {
        name: formName.trim(),
        avatar: formAvatar
      }

      if (editId) {
        await db.put('persons', { ...payload, id: editId })
      } else {
        await db.add('persons', payload)
      }

      setShowModal(false)
      loadData()
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  // 删除成员
  const handleDelete = async () => {
    if (!editId) return
    if (!confirm('确定要删除该成员吗？删除后无法恢复。')) return

    try {
      const db = getDB()
      await db.delete('persons', editId)
      setShowModal(false)
      loadData()
    } catch (error) {
      alert('删除失败: ' + error.message)
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)
  }

  const gradients = [
    'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)',
    'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
  ]

  const totalExpense = Object.values(memberStats).reduce((s, curr) => s + curr.expense, 0)
  const totalIncome = Object.values(memberStats).reduce((s, curr) => s + curr.income, 0)

  return (
    <div className="page members-page" {...handlers}>
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1>成员管理</h1>
        <button className="add-btn" onClick={openAddModal}>
          <Plus size={22} />
        </button>
      </div>

      <div className="members-content">
        {/* 月度统计卡片 */}
        <div className="summary-card">
          <div className="summary-title">{month}月总支出</div>
          <div className="summary-amount">
            <span className="currency">¥</span>
            {formatAmount(totalExpense)}
          </div>
          <div className="summary-row">
            <span>总收入 ¥{formatAmount(totalIncome)}</span>
            <span>{persons.length} 位成员</span>
          </div>
        </div>

        {/* 成员列表 */}
        <div className="member-list">
          {persons.map((person, index) => {
            const stats = memberStats[person.id] || { income: 0, expense: 0, count: 0 }
            return (
              <div key={person.id} className="member-item" onClick={() => openEditModal(person)}>
                <div className="member-avatar" style={{ background: gradients[index % gradients.length], overflow: 'hidden' }}>
                  {person.avatar && person.avatar.length > 5 ? (
                    <img src={person.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    person.avatar || person.name?.[0] || <Users size={18} color="#fff" />
                  )}
                </div>
                <div className="member-info">
                  <span className="member-name">{person.name}</span>
                  <span className="trans-count">{stats.count} 笔交易</span>
                </div>
                <div className="member-stats">
                  <div className="amount expense">-{formatAmount(stats.expense)}</div>
                  <div className="amount income">+{formatAmount(stats.income)}</div>
                </div>
                <Edit3 size={16} color="#ccc" />
              </div>
            )
          })}

          {/* 未分配 */}
          {memberStats['unassigned'] && memberStats['unassigned'].count > 0 && (
            <div className="member-item unassigned">
              <div className="member-avatar" style={{ background: '#eee' }}>
                <Users size={18} color="#999" />
              </div>
              <div className="member-info">
                <span className="member-name">未分配</span>
                <span className="trans-count">{memberStats['unassigned'].count} 笔交易</span>
              </div>
              <div className="member-stats">
                <div className="amount expense">-{formatAmount(memberStats['unassigned'].expense)}</div>
                <div className="amount income">+{formatAmount(memberStats['unassigned'].income)}</div>
              </div>
            </div>
          )}

          {persons.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <p>暂无成员</p>
              <button className="add-member-btn" onClick={openAddModal}>
                <Plus size={16} />
                <span>添加成员</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 添加/编辑 Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑成员' : '添加成员'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>成员名称</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="如：老公、老婆、孩子"
                maxLength={10}
              />
            </div>

            <div className="form-group">
              <label>选择头像</label>
              <div className="avatar-grid">
                {AVATARS.map((av, idx) => (
                  <div
                    key={idx}
                    className={`avatar-opt ${formAvatar === av ? 'selected' : ''}`}
                    onClick={() => setFormAvatar(av)}
                    style={{ overflow: 'hidden' }}
                  >
                    {av.length > 5 ? (
                      <img src={av} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : av}
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
        .members-page {
          background: #f5f6f8;
          min-height: 100vh;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
          border-bottom: 1px solid #f0f0f0;
        }

        .page-header h1 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .back-btn, .add-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .members-content { padding: 16px; }

        .summary-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 20px;
          text-align: center;
          color: #fff;
        }

        .summary-title { font-size: 14px; opacity: 0.9; margin-bottom: 8px; }
        .summary-amount { font-size: 32px; font-weight: 700; margin-bottom: 12px; }
        .summary-amount .currency { font-size: 18px; margin-right: 2px; }
        .summary-row { display: flex; justify-content: center; gap: 20px; font-size: 13px; opacity: 0.9; }

        .member-list {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
        }

        .member-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
        }

        .member-item:last-child { border-bottom: none; }
        .member-item:active { background: #fafafa; }
        .member-item.unassigned { cursor: default; }

        .member-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #fff;
          margin-right: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .member-info { flex: 1; }
        .member-name { font-size: 15px; font-weight: 500; color: #333; display: block; }
        .trans-count { font-size: 12px; color: #999; }

        .member-stats { text-align: right; margin-right: 8px; }
        .amount { font-size: 14px; font-weight: 500; }
        .amount.income { color: #ff6b6b; font-size: 12px; }
        .amount.expense { color: #333; }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        .empty-icon { font-size: 48px; margin-bottom: 12px; }
        .empty-state p { color: #999; margin-bottom: 16px; }

        .add-member-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 20px;
          background: #FFB800;
          color: #fff;
          border: none;
          border-radius: 20px;
          font-size: 14px;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
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
             width: 480px;
             max-width: 90%;
             border-radius: 20px;
          }
        }

        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          padding-bottom: 40px;
          animation: slideUp 0.3s ease;
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
          outline: none;
        }

        .avatar-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .avatar-opt {
          width: 48px;
          height: 48px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 3px solid transparent;
          cursor: pointer;
        }

        .avatar-opt.selected {
          border-color: #FFB800;
          background: #FFF9E6;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .btn-delete {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px 20px;
          background: #fff1f0;
          color: #ff4d4f;
          border: none;
          border-radius: 10px;
          font-size: 15px;
        }

        .btn-save {
          flex: 1;
          padding: 14px;
          background: #FFB800;
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

export default Members
