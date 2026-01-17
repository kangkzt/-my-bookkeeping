import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, MessageCircle, Users, HardDrive,
  Trash2, Lock, Settings as SettingsIcon, LayoutGrid, FileText,
  BarChart3, Target, CreditCard, Download, Upload, Info, Calendar, X,
  Book, LogOut, Cloud, RefreshCw, Loader2, CheckCircle, AlertCircle, User
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { deleteBook } from '../db/global'
import { downloadExportCSV, downloadExportFile } from '../db/sync'
import { clearCurrentBookData, closeDB } from '../db/database'
import { SyncService } from '../services/SyncService'
import Toast from '../components/Toast'
import ConfirmDialog from '../components/ConfirmDialog'
import {
  supabase, isSupabaseConfigured, getCurrentUser,
  signInWithEmail, signUpWithEmail, signOut
} from '../services/supabaseClient'
import { secureStorage } from '../utils/secureStorage'
import { logger } from '../utils/logger'

function Settings() {
  const navigate = useNavigate()
  const [bookName, setBookName] = useState(secureStorage.get('current_book_name') || '我的账本')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)

  // Cloud sync state
  const [showCloudModal, setShowCloudModal] = useState(false)
  const [cloudUser, setCloudUser] = useState(null)
  const [syncStatus, setSyncStatus] = useState(null)
  const [syncProgress, setSyncProgress] = useState({ percent: 0, text: '' })

  // UI State
  const [toast, setToast] = useState(null)
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', content: '', onConfirm: null })

  const showToast = (message, type = 'info') => setToast({ message, type })

  const translateError = (msg) => {
    const m = String(msg)
    if (m.includes('transactions_type_check')) return '包含无效的交易类型 (如"余额调整")，系统已尝试自动修复，请再次点击同步。'
    if (m.includes('violates check constraint')) return '数据格式不符合云端要求，请尝试重置同步状态。'
    if (m.includes('fetch') || m.includes('Network request failed')) return '网络连接失败，请检查网络设置。'
    return '操作失败: ' + m
  }
  const [cloudEmail, setCloudEmail] = useState('')
  const [cloudPassword, setCloudPassword] = useState('')
  const [isCloudLogin, setIsCloudLogin] = useState(true)
  const [cloudLoading, setCloudLoading] = useState(false)
  const [cloudError, setCloudError] = useState('')

  // Load cloud user on mount
  useEffect(() => {
    const loadCloudUser = async () => {
      if (isSupabaseConfigured()) {
        const user = await getCurrentUser()
        setCloudUser(user)
        setSyncStatus(SyncService.getStatus())
      }
    }
    loadCloudUser()
  }, [])

  const handlers = useSwipeable({
    onSwipedRight: () => navigate(-1),
    trackMouse: true
  })

  const handleLogout = () => {
    setConfirmDialog({
      isOpen: true,
      title: '退出登录',
      content: '确定要退出当前本地账号吗？(仅清除本地登录状态，数据保留)',
      confirmText: '退出',
      onConfirm: () => {
        setConfirmDialog(curr => ({ ...curr, isOpen: false }))
        localStorage.removeItem('username')
        navigate('/login')
      }
    })
  }

  const handleClearData = async () => {
    setConfirmDialog({
      isOpen: true,
      title: '清空账本数据',
      content: '警告：确定要清空当前账本的所有流水和照片吗？此操作无法撤销！(配置将保留)',
      type: 'danger',
      confirmText: '确认清空',
      onConfirm: async () => {
        setConfirmDialog(curr => ({ ...curr, isOpen: false }))
        try {
          await clearCurrentBookData()
          showToast('数据已清空', 'success')
          setTimeout(() => navigate('/'), 1000)
        } catch (e) {
          showToast('清空失败: ' + e.message, 'error')
        }
      }
    })
  }

  const handleSync = async () => {
    if (isSyncing) return

    if (!isSupabaseConfigured()) {
      alert('Supabase 未配置，请设置环境变量')
      return
    }

    if (!cloudUser) {
      setShowCloudModal(true)
      return
    }

    setIsSyncing(true)
    setSyncProgress({ percent: 0, text: '准备中...' })
    try {
      const result = await SyncService.sync((p) => {
        const text = p.phase === 'push' ? '正在上传...' : p.phase === 'pull' ? '正在下载...' : '同步完成'
        setSyncProgress({ percent: Math.round(p.progress || 0), text })
        logger.log('Sync progress:', p)
      })

      if (result.success) {
        setSyncStatus(SyncService.getStatus())
        alert(`同步完成！\n↑ 上传: ${result.pushed} 条\n↓ 下载: ${result.pulled} 条`)
      } else {
        showToast(translateError(result.error), 'error')
      }
    } catch (e) {
      showToast(translateError(e.message), 'error')
    } finally {
      setIsSyncing(false)
      setTimeout(() => setSyncProgress({ percent: 0, text: '' }), 1000)
    }
  }

  const handleCloudLogin = async () => {
    if (!cloudEmail || !cloudPassword) {
      setCloudError('请输入邮箱和密码')
      return
    }

    setCloudLoading(true)
    setCloudError('')

    try {
      if (isCloudLogin) {
        await signInWithEmail(cloudEmail, cloudPassword)
      } else {
        await signUpWithEmail(cloudEmail, cloudPassword)
      }

      const user = await getCurrentUser()
      setCloudUser(user)
      setShowCloudModal(false)
      setCloudEmail('')
      setCloudPassword('')

      if (user) {
        alert('登录成功！现在可以同步数据了')
      }
    } catch (e) {
      setCloudError(e.message)
    } finally {
      setCloudLoading(false)
    }
  }

  const handleCloudLogout = async () => {
    setConfirmDialog({
      isOpen: true,
      title: '退出云端账号',
      content: '确定要退出云端账号吗？本地数据将保留，但无法继续同步。',
      confirmText: '退出',
      onConfirm: async () => {
        setConfirmDialog(curr => ({ ...curr, isOpen: false }))
        await signOut()
        setCloudUser(null)
        showToast('已退出云端账号', 'success')
      }
    })
  }

  const handleDeleteBook = async () => {
    const bookId = Number(localStorage.getItem('current_book_id'))
    if (!bookId) return

    setConfirmDialog({
      isOpen: true,
      title: '危险：永久删除当前账本？',
      content: '所有数据都将丢失，且无法找回！请谨慎操作。',
      type: 'danger',
      confirmText: '彻底删除',
      onConfirm: async () => {
        setConfirmDialog(curr => ({ ...curr, isOpen: false }))
        const doubleCheck = prompt('请输入 "删除" 以确认:')
        if (doubleCheck === '删除') {
          try {
            closeDB() // 关闭连接防止文件锁
            await deleteBook(bookId)
            localStorage.removeItem('current_book_id')
            localStorage.removeItem('current_book_name')
            localStorage.removeItem('current_db_name')
            showToast('账本已删除', 'success')
            navigate('/books')
          } catch (e) {
            showToast('删除失败: ' + e.message, 'error')
          }
        } else {
          showToast('确认失败，账本未删除', 'info')
        }
      }
    })
  }


  // ... inside return ...



  const handleSwitchBook = () => {
    navigate('/books')
  }

  // 导出数据
  const handleExportClick = () => {
    setShowExportModal(true)
  }

  const handleExportCSV = async () => {
    setIsExporting(true)
    setSyncProgress({ percent: 0, text: '正在生成 CSV...' })
    try {
      await downloadExportCSV((p) => setSyncProgress({ percent: p, text: `正在生成 CSV (${p}%)` }))
      setShowExportModal(false)
      showToast('CSV 导出成功，请查看下载文件夹', 'success')
    } catch (e) {
      showToast('导出失败: ' + e.message, 'error')
    } finally {
      setIsExporting(false)
      setTimeout(() => setSyncProgress({ percent: 0, text: '' }), 500)
    }
  }

  const handleExportJSON = async () => {
    setIsExporting(true)
    setSyncProgress({ percent: 0, text: '正在生成 JSON...' })
    try {
      await downloadExportFile((p) => setSyncProgress({ percent: p, text: `正在生成 JSON (${p}%)` }))
      setShowExportModal(false)
      showToast('JSON 备份导出成功', 'success')
    } catch (e) {
      showToast('导出失败: ' + e.message, 'error')
    } finally {
      setIsExporting(false)
      setTimeout(() => setSyncProgress({ percent: 0, text: '' }), 500)
    }
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
        <div className="section-title">☁️ 云同步</div>
        <div className="menu-list">
          {/* 云端账号状态 */}
          {isSupabaseConfigured() ? (
            cloudUser ? (
              <div className="menu-item" onClick={() => setShowCloudModal(true)}>
                <div className="menu-icon" style={{ color: '#52c41a' }}>
                  <CheckCircle size={20} />
                </div>
                <span className="menu-label">云端已连接</span>
                <span className="menu-desc-text" style={{ fontSize: 12, color: '#999', marginRight: 8 }}>
                  {cloudUser.email}
                </span>
                <ChevronRight size={18} color="#ccc" />
              </div>
            ) : (
              <div className="menu-item" onClick={() => setShowCloudModal(true)}>
                <div className="menu-icon" style={{ color: '#faad14' }}>
                  <User size={20} />
                </div>
                <span className="menu-label">登录云端账号</span>
                <span className="menu-desc-text" style={{ fontSize: 12, color: '#999', marginRight: 8 }}>
                  同步多设备数据
                </span>
                <ChevronRight size={18} color="#ccc" />
              </div>
            )
          ) : (
            <div className="menu-item" style={{ opacity: 0.5 }}>
              <div className="menu-icon" style={{ color: '#999' }}>
                <AlertCircle size={20} />
              </div>
              <span className="menu-label">云同步未配置</span>
              <span className="menu-desc-text" style={{ fontSize: 12, color: '#999' }}>
                请设置 Supabase 环境变量
              </span>
            </div>
          )}

          {/* 同步按钮 */}
          <div className="menu-item" onClick={handleSync} style={{ opacity: cloudUser ? 1 : 0.5 }}>
            <div className="menu-icon" style={{ color: '#1890ff' }}>
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
            </div>
            <span className="menu-label" style={{ color: '#1890ff' }}>
              {isSyncing ? '同步中...' : '立即同步'}
            </span>
            {syncStatus?.lastSyncAt && !isSyncing && (
              <span className="menu-desc-text" style={{ fontSize: 11, color: '#999', marginRight: 8 }}>
                上次: {new Date(syncStatus.lastSyncAt).toLocaleString('zh-CN')}
              </span>
            )}
            <Cloud size={18} color="#ccc" />
          </div>
          {isSyncing && (
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ width: '100%', height: 4, background: '#f0f0f0', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${syncProgress.percent}%`, height: '100%', background: '#1890ff', transition: 'width 0.2s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#999', marginTop: 4 }}>
                <span>{syncProgress.text}</span>
                <span>{syncProgress.percent}%</span>
              </div>
            </div>
          )}
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
          <div className="menu-item" onClick={() => setShowAbout(true)}>
            <div className="menu-icon">
              <Info size={20} />
            </div>
            <span className="menu-label">关于</span>
            <span className="menu-value">v1.0.0</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="modal-overlay glass-overlay" onClick={() => setShowAbout(false)}>
          <div className="about-card" onClick={e => e.stopPropagation()}>
            <button className="about-close-btn" onClick={() => setShowAbout(false)}><X size={22} /></button>

            <div className="about-header-section">
              <div className="about-logo-shadow">
                <div className="about-logo-main">
                  <span className="logo-emoji">💸</span>
                </div>
              </div>
              <h1 className="about-app-name">快速记账</h1>
              <div className="about-badges">
                <span className="version-badge">v1.0.8</span>
                <span className="pro-badge">PRO</span>
              </div>
            </div>

            <div className="about-body">
              <p className="about-slogan">用心记录每一笔财富</p>

              <div className="about-feature-row">
                <div className="af-item"><span className="af-icon">⚡</span>极速</div>
                <div className="af-item"><span className="af-icon">🔒</span>私密</div>
                <div className="af-item">
                  <span className="af-icon">☁️</span>云端
                </div>
              </div>

              <div className="about-actions-list">
                <div className="action-row">
                  <span>隐私协议</span>
                  <ChevronRight size={14} color="#ccc" />
                </div>
                <div className="action-row">
                  <span>使用帮助</span>
                  <ChevronRight size={14} color="#ccc" />
                </div>
              </div>

              <div className="about-footer">
                <p>Designed by Scarlet Cosmos</p>
                <p className="copyright">© 2026年 快速记账 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 危险区域 */}
      <div className="section">
        <div className="section-title" style={{ color: '#ff4d4f' }}>危险区域</div>
        <div className="menu-list">
          <div className="menu-item" onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: '强制重置同步状态？',
              content: '这会将所有本地数据标记为“未同步”，并在下次同步时全部重新上传。通常用于解决“无法上传”或“数据不一致”的问题。请确保网络良好。',
              type: 'danger',
              confirmText: '重置并修复',
              onConfirm: async () => {
                setConfirmDialog(curr => ({ ...curr, isOpen: false }))
                try {
                  const count = await SyncService.resetSyncState()
                  showToast(`重置成功！${count} 条数据待上传，请点击同步。`, 'success')
                } catch (e) {
                  showToast('重置失败: ' + e.message, 'error')
                }
              }
            })
          }}>
            <div className="menu-icon" style={{ color: '#ff4d4f' }}>
              <RefreshCw size={20} />
            </div>
            <span className="menu-label" style={{ color: '#ff4d4f' }}>重置同步状态 (修复)</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
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
        <div className="modal-overlay" onClick={() => !isExporting && setShowExportModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>选择导出格式</h3>
              {!isExporting && <button onClick={() => setShowExportModal(false)}><X size={20} /></button>}
            </div>

            {isExporting ? (
              <div style={{ padding: 40, textAlign: 'center' }}>
                <Loader2 className="animate-spin" size={32} color="#1890ff" style={{ marginBottom: 16 }} />
                <div style={{ fontSize: 15, color: '#333', marginBottom: 8 }}>{syncProgress.text}</div>
                <div style={{ width: '100%', height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${syncProgress.percent}%`, height: '100%', background: '#1890ff', transition: 'width 0.2s' }} />
                </div>
              </div>
            ) : (
              <div className="export-options">
                <div className="export-item" onClick={handleExportCSV}>
                  <div className="export-icon csv">CSV</div>
                  <div className="export-info">
                    <span className="export-title">导出 CSV (Excel)</span>
                    <span className="export-desc">适合在 Excel 中查看编辑</span>
                  </div>
                  <ChevronRight size={18} color="#ccc" />
                </div>
                <div className="export-item" onClick={handleExportJSON}>
                  <div className="export-icon json">JSON</div>
                  <div className="export-info">
                    <span className="export-title">导出 JSON (备份)</span>
                    <span className="export-desc">包含完整数据，用于恢复备份</span>
                  </div>
                  <ChevronRight size={18} color="#ccc" />
                </div>
              </div>
            )}
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

        /* About Modal Styles */
        .about-modal {
          position: relative;
          background: linear-gradient(180deg, #667eea 0%, #764ba2 40%, #fff 40%);
          border-radius: 24px;
          width: 90%;
          max-width: 400px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease-out;
        }
        
        .about-modal .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255,255,255,0.2);
          border: none;
          border-radius: 50%;
          padding: 8px;
          color: #fff;
        }
        
        .about-header {
          text-align: center;
          padding: 40px 20px 60px;
          color: #fff;
        }
        
        .about-header .app-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }
        
        .about-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }
        
        .about-header .version {
          opacity: 0.8;
          margin-top: 8px;
          font-size: 14px;
        }
        
        .about-content {
          padding: 0 24px 30px;
          margin-top: -30px;
        }
        
        .about-content .slogan {
          text-align: center;
          font-size: 18px;
          color: #667eea;
          font-weight: 600;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .about-content .intro p {
          color: #666;
          line-height: 1.8;
          font-size: 14px;
          margin-bottom: 12px;
        }
        
        .about-content .features-list {
          background: #f8f9ff;
          border-radius: 16px;
          padding: 20px;
          margin: 20px 0;
        }
        
        .about-content .features-list h3 {
          margin: 0 0 12px;
          font-size: 16px;
          color: #333;
        }
        
        .about-content .features-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .about-content .features-list li {
          padding: 8px 0;
          font-size: 14px;
          color: #555;
          border-bottom: 1px solid #eee;
        }
        
        .about-content .features-list li:last-child {
          border-bottom: none;
        }
        
        .about-content .author-section {
          margin-top: 24px;
        }
        
        .about-content .author-section h3 {
          font-size: 16px;
          color: #333;
          margin: 0 0 12px;
        }
        
        .about-content .author-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #f5f7ff 0%, #fff 100%);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #eee;
        }
        
        .about-content .author-avatar {
          font-size: 40px;
        }
        
        .about-content .author-info {
          display: flex;
          flex-direction: column;
        }
        
        .about-content .author-name {
          font-weight: 600;
          color: #333;
        }
        
        .about-content .author-role {
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }
        
        .about-content .copyright {
          text-align: center;
          font-size: 12px;
          color: #bbb;
          margin-top: 24px;
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        /* Cloud Login Modal Styles */
        .cloud-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .cloud-modal {
          background: #fff;
          border-radius: 20px;
          width: 100%;
          max-width: 360px;
          padding: 24px;
          animation: slideUp 0.3s ease;
        }
        
        .cloud-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .cloud-modal-header h3 {
          font-size: 18px;
          color: #333;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .cloud-modal-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }
        /* About Modal Premium V2 */
        .glass-overlay {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          animation: fadeIn 0.3s ease;
          display: flex; align-items: center; justify-content: center;
        }

        .about-card {
          width: 80%;
          max-width: 320px;
          background: white;
          border-radius: 30px;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
          overflow: hidden;
          position: relative;
          animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(0,0,0,0.05);
          border: none;
          color: #666;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .about-header-section {
          padding: 40px 0 20px;
          text-align: center;
          background: linear-gradient(180deg, #F0F9FF 0%, #fff 100%);
        }

        .about-logo-shadow {
          width: 80px; height: 80px;
          margin: 0 auto 16px;
          position: relative;
        }
        .about-logo-main {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1890ff, #36cfc9);
          border-radius: 22px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 15px 30px rgba(24, 144, 255, 0.3);
          transform: rotate(-3deg);
        }
        .logo-emoji { font-size: 40px; }

        .about-app-name {
          font-size: 22px;
          font-weight: 800;
          color: #111;
          margin: 0 0 8px;
          letter-spacing: 0.5px;
        }

        .about-badges {
          display: flex; gap: 6px; justify-content: center;
        }
        .version-badge {
          background: #f3f3f3; color: #666;
          padding: 2px 8px; border-radius: 6px;
          font-size: 10px; font-weight: 600;
        }
        .pro-badge {
          background: #000; color: #FFD700;
          padding: 2px 8px; border-radius: 6px;
          font-size: 10px; font-weight: 800;
        }

        .about-body { padding: 0 24px 30px; }
        .about-slogan {
          text-align: center; font-size: 13px; color: #888; margin-bottom: 24px;
        }

        .about-feature-row {
          display: flex; justify-content: space-around;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f9f9f9;
        }
        .af-item { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 11px; color: #555; font-weight: 500; }
        .af-icon { font-size: 20px; background: #f5f5f5; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }

        .about-actions-list {
          display: flex; flex-direction: column; gap: 12px; margin-bottom: 30px;
        }
        .action-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 13px; color: #333;
          padding: 0 4px;
        }

        .about-footer { text-align: center; }
        .about-footer p { font-size: 10px; color: #ccc; margin: 2px 0; }
        
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        
        .cloud-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .cloud-form input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 12px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }
        
        .cloud-form input:focus {
          border-color: #1890ff;
          box-shadow: 0 0 0 3px rgba(24, 144, 255, 0.1);
        }
        
        .cloud-error {
          background: #fff2f0;
          color: #ff4d4f;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
        }
        
        .cloud-btn {
          padding: 14px;
          background: linear-gradient(135deg, #1890ff, #096dd9);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .cloud-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .cloud-toggle {
          text-align: center;
          font-size: 13px;
          color: #666;
          margin-top: 8px;
        }
        
        .cloud-toggle span {
          color: #1890ff;
          cursor: pointer;
        }
        
        .cloud-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f5f5f5;
          border-radius: 12px;
          margin-bottom: 16px;
        }
        
        .cloud-user-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #1890ff, #52c41a);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 20px;
        }
        
        .cloud-user-details {
          flex: 1;
        }
        
        .cloud-user-email {
          font-weight: 600;
          color: #333;
        }
        
        .cloud-user-status {
          font-size: 12px;
          color: #52c41a;
          margin-top: 2px;
        }
        
        .cloud-logout-btn {
          padding: 12px;
          background: #fff;
          border: 1px solid #ff4d4f;
          color: #ff4d4f;
          border-radius: 12px;
          font-size: 14px;
          cursor: pointer;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>

      {/* Cloud Login Modal */}
      {showCloudModal && (
        <div className="cloud-modal-overlay" onClick={() => setShowCloudModal(false)}>
          <div className="cloud-modal" onClick={e => e.stopPropagation()}>
            <div className="cloud-modal-header">
              <h3><Cloud size={20} /> 云同步</h3>
              <button className="cloud-modal-close" onClick={() => setShowCloudModal(false)}>
                <X size={20} />
              </button>
            </div>

            {cloudUser ? (
              <>
                <div className="cloud-user-info">
                  <div className="cloud-user-avatar">
                    <User size={24} />
                  </div>
                  <div className="cloud-user-details">
                    <div className="cloud-user-email">{cloudUser.email}</div>
                    <div className="cloud-user-status">✓ 已连接</div>
                  </div>
                </div>

                <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
                  <div>设备 ID: {syncStatus?.deviceId?.slice(-8) || 'N/A'}</div>
                  {syncStatus?.lastSyncAt && (
                    <div>上次同步: {new Date(syncStatus.lastSyncAt).toLocaleString('zh-CN')}</div>
                  )}
                </div>

                <button className="cloud-logout-btn" onClick={handleCloudLogout}>
                  退出云端账号
                </button>
              </>
            ) : (
              <div className="cloud-form">
                {cloudError && <div className="cloud-error">{cloudError}</div>}

                <input
                  type="email"
                  placeholder="邮箱"
                  value={cloudEmail}
                  onChange={e => setCloudEmail(e.target.value)}
                />

                <input
                  type="password"
                  placeholder="密码"
                  value={cloudPassword}
                  onChange={e => setCloudPassword(e.target.value)}
                />

                <button
                  className="cloud-btn"
                  onClick={handleCloudLogin}
                  disabled={cloudLoading}
                >
                  {cloudLoading ? (
                    <><Loader2 className="animate-spin" size={18} /> 处理中...</>
                  ) : (
                    isCloudLogin ? '登录' : '注册'
                  )}
                </button>

                <div className="cloud-toggle">
                  {isCloudLogin ? (
                    <>没有账号？<span onClick={() => setIsCloudLogin(false)}>立即注册</span></>
                  ) : (
                    <>已有账号？<span onClick={() => setIsCloudLogin(true)}>去登录</span></>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Global Toast & Dialog */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        content={confirmDialog.content}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(curr => ({ ...curr, isOpen: false }))}
        type={confirmDialog.type}
        confirmText={confirmDialog.confirmText}
      />
    </div>
  )
}

export default Settings
