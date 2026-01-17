import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, MessageCircle, Users, HardDrive,
  Trash2, Lock, Settings as SettingsIcon, LayoutGrid, FileText,
  BarChart3, Target, CreditCard, Download, Upload, Info, Calendar, X,
  LogOut, Cloud, RefreshCw, Loader2, CheckCircle, AlertCircle, User,
  Moon, Sun, Monitor, Palette, Check, Book, Edit3, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { ThemeService, THEMES } from '../services/ThemeService'
import { deleteBook } from '../db/global'
import { downloadExportCSV, downloadExportFile, exportImagesAsZip } from '../db/sync'
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
  const [bookName, setBookName] = useState('我的账本')
  const [showExportModal, setShowExportModal] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [username, setUsername] = useState(localStorage.getItem('username') || '用户')

  // Cloud sync state
  const [showCloudModal, setShowCloudModal] = useState(false)
  const [showThemeModal, setShowThemeModal] = useState(false)
  const [showDangerZone, setShowDangerZone] = useState(false)
  const [cloudUser, setCloudUser] = useState(null)
  const [syncStatus, setSyncStatus] = useState(null)
  const [syncProgress, setSyncProgress] = useState({ percent: 0, text: '' })
  const [currentTheme, setCurrentTheme] = useState('default')

  useEffect(() => {
    const loadSettings = async () => {
      const theme = await ThemeService.getTheme()
      setCurrentTheme(theme)
      const name = await secureStorage.get('current_book_name')
      if (name) setBookName(name)
    }
    loadSettings()
  }, [])

  const handleThemeChange = (themeId) => {
    ThemeService.setTheme(themeId)
    setCurrentTheme(themeId)
    showToast(`主题已切换为: ${THEMES.find(t => t.id === themeId).name}`, 'success')
  }

  // UI State
  const [toast, setToast] = useState(null)
  const [showEditNameModal, setShowEditNameModal] = useState(false)
  const [tempUsername, setTempUsername] = useState('')
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', content: '', onConfirm: null })

  const handleUpdateUsername = () => {
    if (tempUsername && tempUsername.trim()) {
      const newName = tempUsername.trim()
      localStorage.setItem('username', newName)
      setUsername(newName)
      setShowEditNameModal(false)
      showToast('用户名已更新', 'success')
    } else {
      showToast('用户名不能为空', 'error')
    }
  }

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
        const status = await SyncService.getStatus()
        setSyncStatus(status)
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
        localStorage.clear()
        secureStorage.clear()
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
    try {
      const bookIdStr = await secureStorage.get('current_book_id')
      logger.log('Deleting book, current id:', bookIdStr)
      const bookId = Number(bookIdStr)

      if (!bookId) {
        showToast('未找到当前账本信息', 'error')
        return
      }

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

              // 清理存储
              secureStorage.remove('current_book_id')
              secureStorage.remove('current_book_name')
              secureStorage.remove('current_db_name')

              showToast('账本已删除', 'success')
              // 强制刷新状态并跳转
              setTimeout(() => {
                navigate('/books')
                window.location.reload()
              }, 1000)
            } catch (e) {
              showToast('删除失败: ' + e.message, 'error')
            }
          } else {
            showToast('确认失败，账本未删除', 'info')
          }
        }
      })
    } catch (e) {
      showToast('操作异常: ' + e.message, 'error')
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
      // 默认为 text-only backup if user uses independent image backup? 
      // User request implies splitting. So let's make JSON export "Text Only" (exclude photos) for efficiency if they have the image backup option.
      // But for safety, standard JSON export should probably still be full?
      // "Space not enough" -> "Image don't save to cloud".
      // "Import export speed" -> "Separate them".
      // So if I offer "Export Images", I should probably offer "Export Data (Text Only)" or change JSON to text only?
      // Let's keep JSON as "Full" (safe default) but add a small note, OR add a new "Text Only" button?
      // Let's stick to adding "Export Images (ZIP)" and keeping JSON as is (Full), 
      // BUT for "Image independent backup" request, maybe I should modify handleExportJSON to ask/exclude photos?
      // I'll leave handleExportJSON as full backup for now (backward compatibility) and simply add Images ZIP. 
      // If user wants faster text backup, I can add a toggle or another button.
      // Let's just add the Image ZIP button first.
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

  const handleExportImages = async () => {
    setIsExporting(true)
    setSyncProgress({ percent: 0, text: '正在打包图片...' })
    try {
      await exportImagesAsZip((p) => setSyncProgress({ percent: p, text: `正在打包 (${p}%)` }))
      setShowExportModal(false)
      showToast('图片备份导出成功', 'success')
    } catch (e) {
      showToast('导出失败: ' + e.message, 'error')
    } finally {
      setIsExporting(false)
      setTimeout(() => setSyncProgress({ percent: 0, text: '' }), 500)
    }
  }

  // 功能列表 (保留核心功能) - 添加彩色图标
  const features = [
    { icon: SettingsIcon, label: '记账设置', desc: '默认账户、提醒等', path: '/settings/bookkeeping', color: '#667EEA' },
    { icon: LayoutGrid, label: '分类标签', desc: '管理收支分类', path: '/category-tags', color: '#FF9F43' },
    { icon: Users, label: '商家管理', desc: '管理常用商家', path: '/merchants', color: '#FF6B6B' },
    { icon: Calendar, label: '周期记账', desc: '定期自动记账', path: '/recurring', color: '#4ECDC4' },
    { icon: CreditCard, label: '账户管理', desc: '银行卡、现金等', path: '/accounts', color: '#6C5CE7' },
  ]

  const dataFeatures = [
    { icon: Download, label: '导出数据', desc: '支持CSV/JSON', action: handleExportClick, color: '#00B894' },
    { icon: Upload, label: '导入数据', desc: '支持随手记/JSON恢复', path: '/import', color: '#0984E3' },
  ]

  const accountFeatures = [
    { icon: Book, label: '切换账本', desc: '管理多账本', action: handleSwitchBook, color: '#A29BFE' },
    { icon: LogOut, label: '退出登录', desc: '安全退出', action: handleLogout, color: '#FF7675' },
  ]



  return (
    <div className="page settings-page" {...handlers}>
      <style>{`
        :root {
          --premium-gold: #D4AF37;
          --premium-gold-light: #FFD700;
          --premium-gold-dark: #B8860B;
          --glass-bg: rgba(255, 255, 255, 0.7);
          --glass-border: rgba(255, 255, 255, 0.3);
        }

        .settings-page {
          background: #f8f9fc;
          background-image: 
            radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(52, 211, 153, 0.05) 0px, transparent 50%),
            radial-gradient(at 50% 100%, rgba(102, 126, 234, 0.05) 0px, transparent 50%);
          padding-bottom: 120px;
          min-height: 100vh;
          font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
          transition: background 0.5s ease;
        }

        [data-theme='imperial-gold'] .settings-page {
          background: #0a0a0a;
          background-image: 
            radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.2) 0px, transparent 60%),
            radial-gradient(at 100% 30%, rgba(0, 0, 0, 0.8) 0px, transparent 70%);
          color: #FFD700;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          padding-top: calc(20px + var(--safe-area-top));
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          position: sticky;
          top: 0;
          z-index: 1000;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .back-btn, .msg-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2D3436;
          background: white;
          border: none;
          border-radius: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: all 0.3s;
        }

        .spacer { flex: 1; }

        .book-name-section {
          padding: 32px 24px;
          text-align: left;
        }

        .book-name {
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #1F2937;
        }

        .current-user {
          font-size: 14px;
          color: #6B7280;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-edit-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 4px 12px;
          background: white;
          border-radius: 50px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.03);
          font-weight: 600;
          color: #374151;
        }

        .section { margin-bottom: 32px; }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 24px;
          margin-bottom: 16px;
        }

        .section-icon {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .section-title-text {
          font-size: 17px;
          font-weight: 700;
          color: #1F2937;
        }

        .menu-list {
          background: white;
          border-radius: 24px;
          margin: 0 20px 24px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.02);
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 18px 24px;
          gap: 14px;
          border-bottom: 1px solid rgba(0,0,0,0.02);
          cursor: pointer;
          transition: background 0.2s;
        }
        .menu-item:hover { background: #fafafa; }
        .menu-item:last-child { border-bottom: none; }

        .menu-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .menu-label {
          flex: 1;
          font-size: 16px;
          font-weight: 600;
          color: #1F2937;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding: 0 20px;
        }

        .feature-card {
          background: white;
          border-radius: 20px;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.02);
          cursor: pointer;
          transition: all 0.2s;
        }
        .feature-card:active { transform: scale(0.95); }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .feature-label {
          font-size: 13px;
          font-weight: 600;
          color: #374151;
        }

        .theme-drawer, .name-edit-drawer {
          max-height: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0;
          margin: 0 20px;
        }

        .theme-drawer.open, .name-edit-drawer.open {
          max-height: 600px;
          opacity: 1;
          margin-top: 12px;
          margin-bottom: 24px;
        }

        .theme-grid-mini {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
          gap: 12px;
          padding: 16px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.03);
        }

        .theme-item-mini { cursor: pointer; text-align: center; }
        .theme-preview-mini {
          width: 100%;
          aspect-ratio: 1.5;
          border-radius: 10px;
          margin-bottom: 6px;
          border: 2px solid transparent;
          overflow: hidden;
          position: relative;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .theme-item-mini.active .theme-preview-mini {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary);
        }

        .theme-name-mini { font-size: 12px; font-weight: 600; color: #4B5563; }

        .name-edit-box {
          background: white;
          padding: 20px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.03);
        }

        .edit-input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid #E5E7EB;
          font-size: 15px;
          margin-bottom: 12px;
          outline: none;
        }
        .edit-input:focus { border-color: var(--primary); }

        .edit-actions { display: flex; gap: 10px; }
        .edit-btn { flex: 1; padding: 12px; border-radius: 10px; font-weight: 600; cursor: pointer; border: none; }
        .edit-btn.save { background: var(--primary); color: white; }
        .edit-btn.cancel { background: #F3F4F6; color: #4B5563; }

        .glass-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 20px;
        }

        .about-card {
          background: white;
          border-radius: 32px;
          width: 100%;
          max-width: 360px;
          padding: 40px 24px;
          text-align: center;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          animation: slideUp 0.4s ease-out;
        }

        .about-app-name { font-size: 24px; font-weight: 800; color: #1F2937; margin: 16px 0 8px; }
        .about-slogan { font-size: 14px; color: #6B7280; margin-bottom: 24px; }
        .af-item { background: #F9FAFB; padding: 8px 12px; border-radius: 10px; font-size: 12px; color: #4B5563; font-weight: 600; }

        /* 导出弹窗美化 */
        .export-modal {
          background: white;
          border-radius: 32px;
          width: 100%;
          max-width: 380px;
          padding: 32px 24px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.2);
          animation: slideUp 0.4s ease-out;
        }

        .export-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .export-header h3 {
          font-size: 20px;
          font-weight: 800;
          color: #1F2937;
          margin: 0;
        }

        .export-close {
          width: 36px;
          height: 36px;
          border-radius: 12px;
          border: none;
          background: #F3F4F6;
          color: #6B7280;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .export-options {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .export-item {
          display: flex;
          align-items: center;
          padding: 16px;
          background: #F9FAFB;
          border-radius: 20px;
          gap: 16px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid rgba(0,0,0,0.03);
        }

        .export-item:hover {
          background: white;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          border-color: var(--primary);
        }

        .export-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 12px;
          color: white;
          flex-shrink: 0;
        }

        .export-item.csv-item .export-icon-box { background: linear-gradient(135deg, #27AE60 0%, #2ECC71 100%); }
        .export-item.json-item .export-icon-box { background: linear-gradient(135deg, #2980B9 0%, #3498DB 100%); }
        .export-item.zip-item .export-icon-box { background: linear-gradient(135deg, #F39C12 0%, #F1C40F 100%); }

        .export-title {
          font-size: 16px;
          font-weight: 700;
          color: #1F2937;
          display: block;
          margin-bottom: 2px;
        }

        .export-desc {
          font-size: 13px;
          color: #6B7280;
          display: block;
        }

        /* 导出加载状态 */
        .export-loading {
          padding: 20px 10px;
          text-align: center;
        }

        .progress-container {
          width: 100%;
          height: 8px;
          background: #EEF2F7;
          border-radius: 10px;
          overflow: hidden;
          margin: 20px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary) 0%, #40a9ff 100%);
          border-radius: 10px;
          transition: width 0.3s ease;
        }

        .loading-text {
          font-size: 14px;
          color: #4B5563;
          font-weight: 600;
        }
      `}</style>
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

      {/* 账本名称 - 美化字体 */}
      <div className="book-name-section">
        <h1 className="book-name">{bookName}</h1>
        <div className="current-user">
          当前用户:
          <div className="user-edit-wrapper" onClick={() => {
            setTempUsername(username)
            setShowEditNameModal(true)
          }}>
            <span className="user-name-text">{username}</span>
            {showEditNameModal ? <ChevronUp size={14} className="edit-icon" /> : <Edit3 size={14} className="edit-icon" />}
          </div>
        </div>

        <div className={`name-edit-drawer ${showEditNameModal ? 'open' : ''}`}>
          <div className="name-edit-box">
            <div className="edit-input-wrapper">
              <input
                type="text"
                className="edit-input"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                placeholder="输入新用户名"
                autoFocus
              />
            </div>
            <div className="edit-actions">
              <button className="edit-btn cancel" onClick={() => setShowEditNameModal(false)}>取消</button>
              <button className="edit-btn save" onClick={handleUpdateUsername}>保存</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sync Section - 美化版 */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)' }}>
            <Cloud size={18} color="#fff" />
          </div>
          <span className="section-title-text" style={{ color: '#1890ff' }}>云同步</span>
        </div>
        <div className="menu-list">
          {/* 云端账号状态 */}
          {isSupabaseConfigured() ? (
            cloudUser ? (
              <div className="menu-item" onClick={() => setShowCloudModal(true)}>
                <div className="menu-icon" style={{ background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)', color: '#fff' }}>
                  <CheckCircle size={20} />
                </div>
                <span className="menu-label">云端已连接</span>
                <span className="menu-desc-text" style={{ fontSize: 12, color: '#52c41a', marginRight: 8 }}>
                  {cloudUser.email}
                </span>
                <ChevronRight size={18} color="#ccc" />
              </div>
            ) : (
              <div className="menu-item" onClick={() => setShowCloudModal(true)}>
                <div className="menu-icon" style={{ background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)', color: '#fff' }}>
                  <User size={20} />
                </div>
                <span className="menu-label">登录云端账号</span>
                <span className="menu-desc-text" style={{ fontSize: 12, color: '#888', marginRight: 8 }}>
                  同步多设备数据
                </span>
                <ChevronRight size={18} color="#ccc" />
              </div>
            )
          ) : (
            <div className="menu-item" style={{ opacity: 0.6 }}>
              <div className="menu-icon" style={{ background: '#f0f0f0', color: '#999' }}>
                <AlertCircle size={20} />
              </div>
              <span className="menu-label" style={{ color: '#999' }}>云同步未配置</span>
              <span className="menu-desc-text" style={{ fontSize: 12, color: '#bbb' }}>
                请设置 Supabase 环境变量
              </span>
            </div>
          )}

          {/* 同步按钮 */}
          <div className="menu-item" onClick={handleSync} style={{ opacity: cloudUser ? 1 : 0.5 }}>
            <div className="menu-icon" style={{ background: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)', color: '#fff' }}>
              {isSyncing ? <Loader2 className="animate-spin" size={20} /> : <RefreshCw size={20} />}
            </div>
            <span className="menu-label" style={{ color: '#1890ff' }}>
              {isSyncing ? '同步中...' : '立即同步'}
            </span>
            {syncStatus?.lastSyncAt && !isSyncing && (
              <span className="menu-desc-text" style={{ fontSize: 11, color: '#888', marginRight: 8 }}>
                上次: {new Date(syncStatus.lastSyncAt).toLocaleString('zh-CN')}
              </span>
            )}
            <ChevronRight size={18} color="#ccc" />
          </div>
          {isSyncing && (
            <div style={{ padding: '0 20px 16px' }}>
              <div style={{ width: '100%', height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${syncProgress.percent}%`, height: '100%', background: 'linear-gradient(90deg, #1890ff 0%, #40a9ff 100%)', transition: 'width 0.2s' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#888', marginTop: 6 }}>
                <span>{syncProgress.text}</span>
                <span>{syncProgress.percent}%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Appearance Section - 弹窗选择 */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)' }}>
            <Palette size={18} color="#fff" />
          </div>
          <span className="section-title-text" style={{ color: '#6C5CE7' }}>个性外观</span>
        </div>
        <div className="menu-list">
          <div className="menu-item" onClick={() => setShowThemeModal(!showThemeModal)}>
            <div className="menu-icon" style={{ background: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)', color: '#fff' }}>
              <Palette size={20} />
            </div>
            <span className="menu-label">主题视觉</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="menu-desc-text" style={{ fontSize: 13, color: '#888' }}>
                {THEMES.find(t => t.id === currentTheme)?.name || '默认'}
              </span>
              {showThemeModal ? <ChevronUp size={18} color="#ccc" /> : <ChevronDown size={18} color="#ccc" />}
            </div>
          </div>
        </div>

        <div className={`theme-drawer ${showThemeModal ? 'open' : ''}`}>
          <div className="theme-grid-mini">
            {THEMES.map(theme => (
              <div
                key={theme.id}
                className={`theme-item-mini ${currentTheme === theme.id ? 'active' : ''}`}
                onClick={() => handleThemeChange(theme.id)}
              >
                <div className="theme-preview-mini" style={{ background: theme.colors.bg }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '30%', background: theme.colors.primary, opacity: 0.8 }} />
                    <div style={{ flex: 1, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: '80%', height: '60%', background: theme.colors.card, borderRadius: 4, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                    </div>
                  </div>
                  {currentTheme === theme.id && (
                    <div style={{ position: 'absolute', top: 6, right: 6, background: theme.colors.primary, borderRadius: '50%', padding: 2, display: 'flex' }}>
                      <Check size={10} color="#fff" />
                    </div>
                  )}
                </div>
                <div className="theme-name-mini">{theme.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Section - 两栏布局 */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}>
            <Users size={18} color="#fff" />
          </div>
          <span className="section-title-text" style={{ color: '#667EEA' }}>账号与安全</span>
        </div>
        <div className="feature-grid">
          <div className="feature-card" style={{ background: 'linear-gradient(135deg, #667EEA15 0%, #764BA215 100%)' }}>
            <div className="feature-icon" style={{ background: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' }}>
              <User size={22} color="#fff" />
            </div>
            <span className="feature-label">{username}</span>
          </div>
          {accountFeatures.map((item, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => item.action ? item.action() : (item.path && navigate(item.path))}
            >
              <div className="feature-icon" style={{ background: item.color }}>
                <item.icon size={22} color="#fff" />
              </div>
              <span className="feature-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 基础功能列表 - 两栏布局 */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: 'linear-gradient(135deg, #FF9F43 0%, #FFB067 100%)' }}>
            <SettingsIcon size={18} color="#fff" />
          </div>
          <span className="section-title-text" style={{ color: '#FF9F43' }}>基础功能</span>
        </div>
        <div className="feature-grid">
          {features.map((item, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => item.path && navigate(item.path)}
            >
              <div className="feature-icon" style={{ background: item.color }}>
                <item.icon size={22} color="#fff" />
              </div>
              <span className="feature-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 数据管理 - 两栏布局 */}
      <div className="section">
        <div className="section-header">
          <div className="section-icon" style={{ background: 'linear-gradient(135deg, #00B894 0%, #55EFC4 100%)' }}>
            <HardDrive size={18} color="#fff" />
          </div>
          <span className="section-title-text" style={{ color: '#00B894' }}>数据管理</span>
        </div>
        <div className="feature-grid">
          {dataFeatures.map((item, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => item.action ? item.action() : (item.path && navigate(item.path))}
            >
              <div className="feature-icon" style={{ background: item.color }}>
                <item.icon size={22} color="#fff" />
              </div>
              <span className="feature-label">{item.label}</span>
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
            <span className="menu-value">v2.0.0 正式版</span>
            <ChevronRight size={18} color="#ccc" />
          </div>
        </div>
      </div>

      {/* 危险区域 - 默认收起 */}
      <div className="section">
        <div
          className="section-header danger-header"
          onClick={() => setShowDangerZone(!showDangerZone)}
          style={{ cursor: 'pointer', justifyContent: 'space-between', paddingRight: 10 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="section-title-text" style={{ color: '#ff4d4f', fontSize: 13 }}>危险区域</span>
          </div>
          {showDangerZone ? <ChevronUp size={16} color="#ff4d4f" /> : <ChevronDown size={16} color="#ff4d4f" />}
        </div>

        {showDangerZone && (
          <div className="menu-list danger-list">
            {/* 重置同步状态 */}
            <div className="menu-item" onClick={() => {
              if (window.confirm('确定要重置同步状态吗？这可以修复某些同步错误，但不会删除数据。')) {
                SyncService.resetSyncState()
                showToast('同步状态已重置', 'success')
                setTimeout(() => window.location.reload(), 1000)
              }
            }}>
              <div className="menu-icon" style={{ background: '#fff1f0', color: '#ff4d4f' }}>
                <RefreshCw size={20} />
              </div>
              <span className="menu-label" style={{ color: '#ff4d4f' }}>重置同步状态 (修复)</span>
              <ChevronRight size={18} color="#ccc" />
            </div>

            {/* 清空数据 */}
            <div className="menu-item" onClick={handleClearData}>
              <div className="menu-icon" style={{ background: '#fff1f0', color: '#ff4d4f' }}>
                <Trash2 size={20} />
              </div>
              <span className="menu-label" style={{ color: '#ff4d4f' }}>清空账本数据</span>
              <ChevronRight size={18} color="#ccc" />
            </div>

            {/* 删除账本 */}
            <div className="menu-item" onClick={handleDeleteBook}>
              <div className="menu-icon" style={{ background: '#fff1f0', color: '#ff4d4f' }}>
                <X size={20} />
              </div>
              <span className="menu-label" style={{ color: '#ff4d4f' }}>删除当前账本</span>
              <ChevronRight size={18} color="#ccc" />
            </div>
          </div>
        )}
      </div>

      {/* About Modal */}
      {
        showAbout && (
          <div className="modal-overlay glass-overlay" onClick={() => setShowAbout(false)}>
            <div className="about-card" onClick={e => e.stopPropagation()}>
              <button className="about-close-btn" onClick={() => setShowAbout(false)}><X size={22} /></button>

              <div className="about-header-section">
                <div className="about-logo-shadow">
                  <div className="about-logo-main">
                    <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
                  </div>
                </div>
                <h1 className="about-app-name">智玺云簿</h1>
                <div className="about-badges">
                  <span className="version-badge">v2.0.0 正式版</span>
                  <span className="pro-badge">OFFICIAL</span>
                </div>
              </div>

              <div className="about-body">
                <p className="about-slogan">智驭财富，玺墨金典</p>

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
        )
      }



      {/* Export Modal - 美化版 */}
      {
        showExportModal && (
          <div className="glass-overlay" onClick={() => !isExporting && setShowExportModal(false)}>
            <div className="export-modal" onClick={e => e.stopPropagation()}>
              <div className="export-header">
                <h3>选择导出格式</h3>
                {!isExporting && (
                  <button className="export-close" onClick={() => setShowExportModal(false)}>
                    <X size={20} />
                  </button>
                )}
              </div>

              {isExporting ? (
                <div className="export-loading">
                  <Loader2 className="animate-spin" size={40} color="var(--primary)" style={{ marginBottom: 20 }} />
                  <div className="loading-text">{syncProgress.text}</div>
                  <div className="progress-container">
                    <div className="progress-fill" style={{ width: `${syncProgress.percent}%` }} />
                  </div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>正在打包数据，请稍候</div>
                </div>
              ) : (
                <div className="export-options">
                  <div className="export-item csv-item" onClick={handleExportCSV}>
                    <div className="export-icon-box">CSV</div>
                    <div style={{ flex: 1 }}>
                      <span className="export-title">Excel 格式 (CSV)</span>
                      <span className="export-desc">适合电脑办公与查看流水</span>
                    </div>
                    <ChevronRight size={18} color="#D1D5DB" />
                  </div>

                  <div className="export-item json-item" onClick={handleExportJSON}>
                    <div className="export-icon-box">JSON</div>
                    <div style={{ flex: 1 }}>
                      <span className="export-title">数据备份 (JSON)</span>
                      <span className="export-desc">包含所有明细，可用于恢复数据</span>
                    </div>
                    <ChevronRight size={18} color="#D1D5DB" />
                  </div>

                  <div className="export-item zip-item" onClick={handleExportImages}>
                    <div className="export-icon-box">ZIP</div>
                    <div style={{ flex: 1 }}>
                      <span className="export-title">图片备份 (ZIP)</span>
                      <span className="export-desc">打包所有单据附件与图片</span>
                    </div>
                    <ChevronRight size={18} color="#D1D5DB" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }


      <style>{`
        .member-card {
          margin: 0 20px 24px;
          padding: 28px;
          background: linear-gradient(135deg, #2D3436 0%, #000000 100%);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          border: 1px solid rgba(255, 215, 0, 0.2);
        }

        .member-card::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%);
          pointer-events: none;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .member-icon {
          font-size: 32px;
          filter: drop-shadow(0 4px 8px rgba(255,215,0,0.3));
        }

        .member-label {
          font-size: 14px;
          color: rgba(255,215,0,0.8);
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .member-points {
          font-size: 32px;
          font-weight: 800;
          background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-left: auto;
          font-family: 'DIN Alternate', sans-serif;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 0 20px;
          margin-bottom: 24px;
        }

        .card-top { margin-bottom: 20px; }

        .avatars { display: flex; gap: -10px; }
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid white;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .avatar.add {
          background: white;
          border: 2px dashed #ddd;
          color: #bbb;
        }

        .storage-info { display: flex; flex-direction: column; gap: 12px; }
        .storage-text { font-size: 13px; color: #636E72; font-weight: 500; }
        .storage-bar {
          height: 6px;
          background: #EEF2F7;
          border-radius: 10px;
          overflow: hidden;
        }
        .storage-fill {
          height: 100%;
          background: var(--primary-gradient);
          border-radius: 10px;
        }

        .card-label { font-size: 14px; color: #2D3436; font-weight: 700; }

        .quick-features {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 0 20px;
          margin-bottom: 24px;
        }

        /* 云端模态框 */
        .cloud-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1500;
          padding: 20px;
        }

        .cloud-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 360px;
          padding: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        }

        .cloud-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .cloud-form { display: flex; flex-direction: column; gap: 12px; }
        .cloud-form input {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #eee;
        }

        .cloud-btn {
          padding: 12px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .cloud-btn:disabled { opacity: 0.6; }
        .cloud-error { color: #f5222d; font-size: 12px; margin-bottom: 8px; }

        .cloud-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding: 12px;
          background: #f9f9f9;
          border-radius: 12px;
        }
        
        .cloud-logout-btn {
          width: 100%;
          padding: 12px;
          background: #fff1f0;
          color: #f5222d;
          border: 1px solid #ffa39e;
          border-radius: 10px;
          cursor: pointer;
        }
      `}</style>

      {/* Cloud Login Modal */}
      {
        showCloudModal && (
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
        )
      }



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
    </div >
  )
}

export default Settings
