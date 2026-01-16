import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, MessageCircle, Users, HardDrive,
  Trash2, Lock, Settings as SettingsIcon, LayoutGrid, FileText,
  BarChart3, Target, CreditCard, Download, Upload, Info, Calendar, X,
  Book, LogOut, Cloud, RefreshCw, Loader2
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { deleteBook } from '../db/global'
import { clearCurrentBookData } from '../db/database'
import { SyncService } from '../services/SyncService'

// ... imports ...

function Settings() {
  const navigate = useNavigate()
  const [bookName, setBookName] = useState(localStorage.getItem('current_book_name') || '我的账本')
  const [showExportModal, setShowExportModal] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)

  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true
  })

  const handleLogout = () => {
    if (confirm('确定要退出登录吗？')) {
      localStorage.clear()
      navigate('/login')
    }
  }

  const handleClearData = async () => {
    if (confirm('警告：确定要清空当前账本的所有流水和照片吗？此操作无法撤销！\n(分类和账户设置将保留)')) {
      try {
        await clearCurrentBookData()
        alert('数据已清空')
        navigate('/')
      } catch (e) {
        alert('清空失败: ' + e.message)
      }
    }
  }

  const handleSync = async () => {
    if (isSyncing) return
    setIsSyncing(true)
    // 模拟一点延迟让用户看到 loading
    setTimeout(async () => {
      const result = await SyncService.sync()
      setIsSyncing(false)
      if (result.success) {
        alert('同步完成 (模拟 Supabase 环境)')
      } else {
        alert('同步失败: ' + result.error)
      }
    }, 500)
  }

  const handleDeleteBook = async () => {
    const bookId = Number(localStorage.getItem('current_book_id'))
    if (!bookId) return

    if (confirm('危险：确定要 **永久删除** 当前账本吗？\n所有数据都将丢失，且无法找回！')) {
      const doubleCheck = prompt('请输入 "删除" 以确认:')
      if (doubleCheck === '删除') {
        try {
          await deleteBook(bookId)
          localStorage.removeItem('current_book_id')
          localStorage.removeItem('current_book_name')
          localStorage.removeItem('current_db_name')
          alert('账本已删除')
          navigate('/books')
        } catch (e) {
          alert('删除失败: ' + e.message)
        }
      }
    }
  }


  // ... inside return ...



  const handleSwitchBook = () => {
    navigate('/books')
  }

  // 导出数据
  const handleExportClick = () => {
    setShowExportModal(true)
  }

  // 功能列表
  const features = [
    { icon: SettingsIcon, label: '记账设置', desc: '默认账户、提醒等', path: '/settings/bookkeeping' },
    { icon: LayoutGrid, label: '分类标签', desc: '管理收支分类', path: '/category-tags' },
    { icon: Users, label: '商家管理', desc: '管理常用商家', path: '/merchants' },
    { icon: Calendar, label: '周期记账', desc: '定期自动记账', path: '/recurring' },
    { icon: FileText, label: '流水管理', desc: '查看所有记录', path: '/records' },
    { icon: BarChart3, label: '报表分析', desc: '收支统计图表', path: '/statistics' },
    { icon: Target, label: '预算中心', desc: '设置月度预算', path: '/budget' },
    { icon: CreditCard, label: '账户管理', desc: '银行卡、现金等', path: '/accounts' },
  ]

  const dataFeatures = [
    { icon: Download, label: '导出数据', desc: '支持CSV/JSON', action: handleExportClick },
    { icon: Upload, label: '导入数据', desc: '支持随手记/JSON恢复', path: '/import' },
  ]

  const accountFeatures = [
    { icon: Book, label: '切换账本', desc: '管理多账本', action: handleSwitchBook },
    { icon: LogOut, label: '退出登录', desc: '安全退出', action: handleLogout },
  ]

  const username = localStorage.getItem('username') || '用户'

  return (
    <div className="page settings-page" {...handlers}>
      {/* 顶部导航 */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="spacer"></div>
        <button className="msg-btn">
          <MessageCircle size={22} />
        </button>
      </div>

      {/* 账本名称 */}
      <div className="book-name-section">
        <h1 className="book-name">{bookName}</h1>
        <div style={{ fontSize: 13, color: '#999', marginTop: 4 }}>当前用户: {username}</div>
      </div>

      {/* 会员卡片区域 */}
      <div className="member-card">
        <div className="member-info">
          <span className="member-icon">🍌</span>
          <span className="member-label">记账积分</span>
          <span className="member-points">128</span>
        </div>
      </div>

      {/* Sync Section */}
      <div className="section">
        <div className="section-title">多端同步</div>
        <div className="menu-list">
          <div className="menu-item" onClick={handleSync}>
            <div className="menu-icon" style={{ color: '#1890ff' }}>
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
            </div>
            <span className="menu-label" style={{ color: '#1890ff' }}>立即同步 (Supabase)</span>
            <Cloud size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* Account Section */}
      <div className="section">
        <div className="section-title">账号与安全</div>
        <div className="menu-list">
          <div className="menu-item">
            <div className="menu-icon"><Users size={20} /></div>
            <span className="menu-label">当前账号</span>
            <span className="menu-value">{username}</span>
          </div>
          {accountFeatures.map((item, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() => item.action ? item.action() : (item.path && navigate(item.path))}
            >
              <div className="menu-icon">
                <item.icon size={20} />
              </div>
              <span className="menu-label">{item.label}</span>
              <span className="menu-desc-text" style={{ fontSize: 12, color: '#999', marginRight: 8 }}>{item.desc}</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          ))}
        </div>
      </div>

      {/* 功能卡片区域 */}
      <div className="feature-cards">
        <div className="feature-card" onClick={() => navigate('/members')}>
          <div className="card-top">
            <div className="avatars">
              <span className="avatar">👨</span>
              <span className="avatar">👩</span>
              <span className="avatar add">+</span>
            </div>
          </div>
          <div className="card-label">成员与角色管理</div>
        </div>

        <div className="feature-card">
          <div className="card-top">
            <div className="storage-info">
              <span className="storage-text">本地存储</span>
              <div className="storage-bar">
                <div className="storage-fill" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
          <div className="card-label">我的空间</div>
        </div>
      </div>

      {/* 快捷功能 */}
      <div className="quick-features">
        <div className="quick-item" onClick={() => navigate('/records')}>
          <div className="quick-icon">
            <Trash2 size={20} />
          </div>
          <div className="quick-info">
            <span className="quick-label">流水回收站</span>
            <span className="quick-desc">可恢复历史删除流水</span>
          </div>
          <span className="quick-badge">限免中</span>
        </div>

        <div className="quick-item">
          <div className="quick-icon">
            <Lock size={20} />
          </div>
          <div className="quick-info">
            <span className="quick-label">封账</span>
            <span className="quick-desc">封账后流水不可修改</span>
          </div>
          <span className="quick-badge">限免中</span>
        </div>
      </div>

      {/* 基础功能列表 */}
      <div className="section">
        <div className="section-title">基础功能</div>
        <div className="menu-list">
          {features.map((item, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="menu-icon">
                <item.icon size={20} />
              </div>
              <span className="menu-label">{item.label}</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          ))}
        </div>
      </div>

      {/* 数据管理 */}
      <div className="section">
        <div className="section-title">数据管理</div>
        <div className="menu-list">
          {dataFeatures.map((item, index) => (
            <div
              key={index}
              className="menu-item"
              onClick={() => item.action ? item.action() : (item.path && navigate(item.path))}
            >
              <div className="menu-icon">
                <item.icon size={20} />
              </div>
              <span className="menu-label">{item.label}</span>
              <span className="menu-desc-text" style={{ fontSize: 12, color: '#999', marginRight: 8 }}>{item.desc}</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          ))}
        </div>
      </div>

      {/* 关于 */}
      <div className="section">
        <div className="menu-list">
          <div className="menu-item">
            <div className="menu-icon">
              <Info size={20} />
            </div>
            <span className="menu-label">关于</span>
            <span className="menu-value">v1.0.0</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* 危险区域 */}
      <div className="section">
        <div className="section-title" style={{ color: '#ff4d4f' }}>危险区域</div>
        <div className="menu-list">
          <div className="menu-item" onClick={handleClearData}>
            <div className="menu-icon" style={{ color: '#ff4d4f' }}>
              <Trash2 size={20} />
            </div>
            <span className="menu-label" style={{ color: '#ff4d4f' }}>清空账本数据</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
          <div className="menu-item" onClick={handleDeleteBook}>
            <div className="menu-icon" style={{ color: '#ff4d4f' }}>
              <X size={20} />
            </div>
            <span className="menu-label" style={{ color: '#ff4d4f' }}>删除当前账本</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* Android/Center Modal */}
      {showExportModal && (
        <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>选择导出格式</h3>
              <button onClick={() => setShowExportModal(false)}><X size={20} /></button>
            </div>
            <div className="export-options">
              <div className="export-item" onClick={() => { downloadExportCSV(); setShowExportModal(false) }}>
                <div className="export-icon csv">CSV</div>
                <div className="export-info">
                  <span className="export-title">导出 CSV (Excel)</span>
                  <span className="export-desc">适合在 Excel 中查看编辑</span>
                </div>
                <ChevronRight size={18} color="#ccc" />
              </div>
              <div className="export-item" onClick={() => { downloadExportFile(); setShowExportModal(false) }}>
                <div className="export-icon json">JSON</div>
                <div className="export-info">
                  <span className="export-title">导出 JSON (备份)</span>
                  <span className="export-desc">包含完整数据，用于恢复备份</span>
                </div>
                <ChevronRight size={18} color="#ccc" />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .settings-page {
          background: #F5F6F8;
          padding-bottom: 100px;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }

        .back-btn, .msg-btn {
          padding: 8px;
          color: #333;
          background: none;
          border: none;
        }

        .spacer {
          flex: 1;
        }

        .book-name-section {
          padding: 20px 20px 16px;
          background: #fff;
        }

        .book-name {
          font-size: 22px;
          font-weight: 600;
          color: #333;
        }

        /* 会员卡片 */
        .member-card {
          margin: 0 16px 16px;
          padding: 20px;
          background: linear-gradient(135deg, #FFE5D0 0%, #FFD4B8 100%);
          border-radius: 16px;
          margin-top: -8px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .member-icon {
          font-size: 24px;
        }

        .member-label {
          font-size: 14px;
          color: #8B6914;
        }

        .member-points {
          font-size: 28px;
          font-weight: 700;
          color: #8B6914;
          margin-left: auto;
        }

        /* 功能卡片 */
        .feature-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .feature-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
        }

        .card-top {
          margin-bottom: 12px;
        }

        .avatars {
          display: flex;
          gap: 4px;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .avatar.add {
          background: #fff;
          border: 1px dashed #ccc;
          color: #999;
          font-size: 18px;
        }

        .storage-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .storage-text {
          font-size: 12px;
          color: #999;
        }

        .storage-bar {
          height: 6px;
          background: #f0f0f0;
          border-radius: 3px;
          overflow: hidden;
        }

        .storage-fill {
          height: 100%;
          background: linear-gradient(90deg, #4ECDC4 0%, #44B8A8 100%);
          border-radius: 3px;
        }

        .card-label {
          font-size: 13px;
          color: #666;
        }

        /* 快捷功能 */
        .quick-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          padding: 0 16px;
          margin-bottom: 16px;
        }

        .quick-item {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          position: relative;
        }

        .quick-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          margin-bottom: 8px;
        }

        .quick-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .quick-label {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }

        .quick-desc {
          font-size: 11px;
          color: #999;
        }

        .quick-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%);
          color: #fff;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
        }

        /* 分区 */
        .section {
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 13px;
          color: #999;
          padding: 12px 20px 8px;
        }

        .menu-list {
          background: #fff;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #f9f9f9;
          gap: 12px;
          cursor: pointer;
        }

        .menu-item:last-child {
          border-bottom: none;
        }
        
        .menu-item:active { background: #fafafa; }

        .menu-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
        }

        .menu-label {
          flex: 1;
          font-size: 15px;
          color: #333;
        }

        .menu-value {
          font-size: 13px;
          color: #999;
          margin-right: 4px;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: flex-end; /* Mobile: bottom */
          z-index: 1000;
        }
        
        .modal-content {
          background: #fff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          max-height: 80vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }
        
        .modal-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 16px 20px;
           border-bottom: 1px solid #eee;
        }
        
        .modal-header h3 { font-size: 18px; font-weight: 600; margin: 0; }
        .modal-header button { background:none; border:none; padding:4px; }
        
        .export-options { padding: 8px 0; }
        .export-item {
           display: flex; align-items: center;
           padding: 16px 20px;
           border-bottom: 1px solid #f9f9f9;
           cursor: pointer;
        }
        .export-item:active { background: #f5f5f5; }
        
        .export-icon {
           width: 44px; height: 44px;
           border-radius: 8px;
           display: flex; align-items: center; justify-content: center;
           font-weight: 700; font-size: 14px;
           margin-right: 16px;
        }
        .export-icon.csv { background: #E8F5E9; color: #2E7D32; }
        .export-icon.json { background: #E3F2FD; color: #1565C0; }
        
        .export-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .export-title { font-size: 16px; color: #333; font-weight: 500;}
        .export-desc { font-size: 12px; color: #999; }
        
        @keyframes slideUp {
           from { transform: translateY(100%); }
           to { transform: translateY(0); }
        }

        @media (min-width: 768px) {
           .modal-overlay {
              align-items: center; justify-content: center;
           }
           .modal-content {
              width: 400px;
              border-radius: 20px;
           }
        }
      `}</style>
    </div>
  )
}

export default Settings
