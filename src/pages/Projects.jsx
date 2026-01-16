import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, X, Trash2, Edit3, FolderKanban } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getDB } from '../db/database'

// 默认图标选项
const ICONS = ['📁', '✈️', '🏠', '🎓', '💒', '🏥', '🚗', '🎉', '🎁', '💼', '📱', '🛍️', '🏖️', '🎯', '📊']
const COLORS = ['#4ECDC4', '#FF6B6B', '#FFB800', '#667EEA', '#AA96DA', '#95E1D3', '#F38181', '#6C5CE7']

function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])

  // Modal State
  const [showModal, setShowModal] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formName, setFormName] = useState('')
  const [formIcon, setFormIcon] = useState('📁')
  const [formColor, setFormColor] = useState(COLORS[0])

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const db = getDB()
      const allProjects = await db.getAll('projects')
      setProjects(allProjects || [])
    } catch (error) {
      console.error('加载项目失败:', error)
    }
  }

  // 打开添加Modal
  const openAddModal = () => {
    setEditId(null)
    setFormName('')
    setFormIcon(ICONS[0])
    setFormColor(COLORS[Math.floor(Math.random() * COLORS.length)])
    setShowModal(true)
  }

  // 打开编辑Modal
  const openEditModal = (project) => {
    setEditId(project.id)
    setFormName(project.name)
    setFormIcon(project.icon || '📁')
    setFormColor(project.color || COLORS[0])
    setShowModal(true)
  }

  // 保存
  const handleSave = async () => {
    if (!formName.trim()) {
      alert('请输入项目名称')
      return
    }

    try {
      const db = getDB()
      const payload = {
        name: formName.trim(),
        icon: formIcon,
        color: formColor,
        isDefault: false
      }

      if (editId) {
        await db.put('projects', { ...payload, id: editId })
      } else {
        await db.add('projects', payload)
      }

      setShowModal(false)
      loadProjects()
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  // 删除
  const handleDelete = async () => {
    if (!editId) return

    // 检查是否为默认项目
    const project = projects.find(p => p.id === editId)
    if (project?.isDefault) {
      alert('默认项目不能删除')
      return
    }

    if (!confirm('确定要删除该项目吗？删除后无法恢复。')) return

    try {
      const db = getDB()
      await db.delete('projects', editId)
      setShowModal(false)
      loadProjects()
    } catch (error) {
      alert('删除失败: ' + error.message)
    }
  }

  return (
    <div className="page projects-page">
      {/* Header */}
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={22} />
        </button>
        <h1>项目管理</h1>
        <button className="add-btn" onClick={openAddModal}>
          <Plus size={22} />
        </button>
      </div>

      <div className="page-content">
        <p className="hint-text">项目用于将账目分组管理，如旅行、装修等专项支出</p>

        <div className="project-list">
          {projects.map(project => (
            <div key={project.id} className="project-item" onClick={() => openEditModal(project)}>
              <div className="project-icon" style={{ backgroundColor: project.color || '#4ECDC4' }}>
                {project.icon || '📁'}
              </div>
              <div className="project-info">
                <span className="project-name">{project.name}</span>
                {project.isDefault && <span className="default-tag">默认</span>}
              </div>
              <Edit3 size={16} color="#ccc" />
            </div>
          ))}

          {projects.length === 0 && (
            <div className="empty-state">
              <FolderKanban size={48} color="#ddd" />
              <p>暂无项目</p>
              <button className="add-project-btn" onClick={openAddModal}>
                <Plus size={16} />
                <span>添加项目</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editId ? '编辑项目' : '添加项目'}</h3>
              <button onClick={() => setShowModal(false)}><X size={20} /></button>
            </div>

            <div className="form-group">
              <label>项目名称</label>
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="如：装修、旅行、婚礼"
                maxLength={12}
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
                    style={{ backgroundColor: c }}
                    onClick={() => setFormColor(c)}
                  />
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
        .projects-page {
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

        .page-content { padding: 16px; }

        .hint-text {
          font-size: 13px;
          color: #999;
          margin-bottom: 16px;
        }

        .project-list {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
        }

        .project-item {
          display: flex;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
        }

        .project-item:last-child { border-bottom: none; }
        .project-item:active { background: #fafafa; }

        .project-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-right: 14px;
        }

        .project-info {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .project-name {
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }

        .default-tag {
          font-size: 11px;
          padding: 2px 8px;
          background: #FFB800;
          color: #fff;
          border-radius: 10px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px;
        }

        .empty-state p { color: #999; margin: 16px 0; }

        .add-project-btn {
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

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
        }

        .icon-opt {
          width: 48px;
          height: 48px;
          background: #f5f5f5;
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

        .color-grid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .color-opt {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
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

export default Projects
