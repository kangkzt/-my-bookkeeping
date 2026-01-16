import { useState, useEffect } from 'react'
import { ArrowLeft, Check, Plus, Trash2, X, GripVertical } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getDB } from '../db/database'
import { getAllCategories } from '../db/stores'

// 默认图标选项
const ICONS = [
    '🍜', '🍱', '🍔', '☕', '🛒', '🥬', '🚌', '🚗', '🚕', '✈️',
    '🏠', '🏥', '📱', '💊', '🎮', '🎬', '👗', '💄', '🎓', '📚',
    '🎁', '💰', '💵', '🧧', '💼', '📈', '🏦', '💳', '🐱', '🐕'
]

// 默认颜色选项
const COLORS = [
    '#FF6B6B', '#4ECDC4', '#FFB800', '#667EEA', '#FF9999',
    '#99CCFF', '#CC99FF', '#FFCC99', '#99FF99', '#F38181'
]

// 默认分类数据（用于初始化）
const DEFAULT_CATEGORIES = [
    { name: '餐饮', icon: '🍜', color: '#FF6B6B', type: 'expense' },
    { name: '交通', icon: '🚌', color: '#4ECDC4', type: 'expense' },
    { name: '购物', icon: '🛒', color: '#FFE66D', type: 'expense' },
    { name: '娱乐', icon: '🎮', color: '#95E1D3', type: 'expense' },
    { name: '居住', icon: '🏠', color: '#F38181', type: 'expense' },
    { name: '通讯', icon: '📱', color: '#AA96DA', type: 'expense' },
    { name: '医疗', icon: '💊', color: '#FCBAD3', type: 'expense' },
    { name: '教育', icon: '📚', color: '#A8D8EA', type: 'expense' },
    { name: '工资', icon: '💰', color: '#4ECDC4', type: 'income' },
    { name: '奖金', icon: '🎁', color: '#FFE66D', type: 'income' },
    { name: '理财', icon: '📈', color: '#95E1D3', type: 'income' },
    { name: '兼职', icon: '💼', color: '#AA96DA', type: 'income' },
    { name: '红包', icon: '🧧', color: '#F38181', type: 'income' },
    { name: '其他', icon: '💵', color: '#A8D8EA', type: 'income' }
]

function CategoryManage() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const initialType = searchParams.get('type') || 'expense'

    const [activeTab, setActiveTab] = useState(initialType)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)

    // Modal State
    const [showModal, setShowModal] = useState(false)
    const [editId, setEditId] = useState(null)
    const [formName, setFormName] = useState('')
    const [formIcon, setFormIcon] = useState('🍜')
    const [formColor, setFormColor] = useState(COLORS[0])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const db = getDB()
            let cats = await db.getAll('categories')

            // 如果没有分类数据，初始化默认分类
            if (!cats || cats.length === 0) {
                console.log('初始化默认分类...')
                for (const cat of DEFAULT_CATEGORIES) {
                    await db.add('categories', cat)
                }
                cats = await db.getAll('categories')
            }

            setCategories(cats || [])
        } catch (error) {
            console.error('加载分类失败:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        if (!formName.trim()) {
            alert('请输入分类名称')
            return
        }

        try {
            const db = getDB()
            const payload = {
                name: formName.trim(),
                type: activeTab,
                icon: formIcon,
                color: formColor
            }

            if (editId) {
                await db.put('categories', { ...payload, id: editId })
            } else {
                await db.add('categories', payload)
            }

            setShowModal(false)
            loadData()
        } catch (error) {
            alert('保存失败: ' + error.message)
        }
    }

    const handleDelete = async () => {
        if (!editId) return
        if (!confirm('确定删除该分类？删除后无法恢复。')) return

        try {
            const db = getDB()
            await db.delete('categories', editId)
            setShowModal(false)
            loadData()
        } catch (error) {
            alert('删除失败: ' + error.message)
        }
    }

    const openAdd = () => {
        setEditId(null)
        setFormName('')
        setFormIcon(ICONS[0])
        setFormColor(COLORS[Math.floor(Math.random() * COLORS.length)])
        setShowModal(true)
    }

    const openEdit = (cat) => {
        setEditId(cat.id)
        setFormName(cat.name)
        setFormIcon(cat.icon || '📦')
        setFormColor(cat.color || COLORS[0])
        setShowModal(true)
    }

    const displayedCats = categories.filter(c => c.type === activeTab)

    if (loading) {
        return (
            <div className="page cat-manage-page">
                <div className="loading-state">加载中...</div>
            </div>
        )
    }

    return (
        <div className="page cat-manage-page">
            {/* Header */}
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={22} />
                </button>
                <h1>分类管理</h1>
                <button className="add-btn" onClick={openAdd}>
                    <Plus size={22} />
                </button>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <div
                    className={`tab ${activeTab === 'expense' ? 'active' : ''}`}
                    onClick={() => setActiveTab('expense')}
                >
                    支出
                </div>
                <div
                    className={`tab ${activeTab === 'income' ? 'active' : ''}`}
                    onClick={() => setActiveTab('income')}
                >
                    收入
                </div>
            </div>

            {/* Category Grid */}
            <div className="cat-grid">
                {displayedCats.map(cat => (
                    <div key={cat.id} className="cat-item" onClick={() => openEdit(cat)}>
                        <div className="cat-icon" style={{ background: cat.color || '#ccc' }}>
                            {cat.icon || '📦'}
                        </div>
                        <span className="cat-name">{cat.name}</span>
                    </div>
                ))}

                {/* Add Button in Grid */}
                <div className="cat-item add-item" onClick={openAdd}>
                    <div className="cat-icon add-icon">
                        <Plus size={24} />
                    </div>
                    <span className="cat-name">添加</span>
                </div>
            </div>

            {displayedCats.length === 0 && (
                <div className="empty-tip">暂无{activeTab === 'expense' ? '支出' : '收入'}分类</div>
            )}

            {/* Edit/Add Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{editId ? '编辑分类' : '添加分类'}</h3>
                            <button onClick={() => setShowModal(false)}><X size={20} /></button>
                        </div>

                        <div className="form-group">
                            <label>分类名称</label>
                            <input
                                type="text"
                                value={formName}
                                onChange={e => setFormName(e.target.value)}
                                placeholder="如：餐饮、交通"
                                maxLength={8}
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

                        <div className="form-group">
                            <label>选择颜色</label>
                            <div className="color-grid">
                                {COLORS.map(c => (
                                    <div
                                        key={c}
                                        className={`color-opt ${formColor === c ? 'selected' : ''}`}
                                        style={{ background: c }}
                                        onClick={() => setFormColor(c)}
                                    >
                                        {formColor === c && <Check size={14} color="#fff" />}
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
        .cat-manage-page {
          background: #f5f6f8;
          min-height: 100vh;
        }

        .loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: #999;
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

        .page-header h1 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }

        .tabs {
          display: flex;
          background: #fff;
          padding: 0 16px;
        }

        .tab {
          flex: 1;
          text-align: center;
          padding: 14px 0;
          font-size: 15px;
          color: #999;
          border-bottom: 2px solid transparent;
          cursor: pointer;
        }

        .tab.active {
          color: #333;
          font-weight: 600;
          border-bottom-color: #FFB800;
        }

        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          padding: 20px 16px;
        }

        .cat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .cat-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #fff;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .cat-icon.add-icon {
          background: #fff;
          color: #999;
          border: 2px dashed #ddd;
          box-shadow: none;
        }

        .cat-name {
          font-size: 12px;
          color: #666;
          text-align: center;
          max-width: 60px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .add-item .cat-name { color: #999; }

        .empty-tip {
          text-align: center;
          color: #ccc;
          padding: 40px;
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

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
        }

        .icon-opt {
          width: 44px;
          height: 44px;
          background: #f5f5f5;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .icon-opt.selected {
          border-color: #FFB800;
          background: #FFFAF0;
        }

        .color-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-opt {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-opt.selected {
          border-color: #333;
          transform: scale(1.1);
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

export default CategoryManage
