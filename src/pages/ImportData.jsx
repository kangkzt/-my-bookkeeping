import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, UploadCloud, DownloadCloud, FileSpreadsheet, FileJson, Check, AlertCircle, Loader2, Cloud, Settings, X } from 'lucide-react'
import { importData, importCSVData, exportAllData, checkWebDAVConnection, uploadToWebDAV, downloadFromWebDAV } from '../db/sync'
import Papa from 'papaparse'

function ImportData() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [syncing, setSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState(null)
  const [importing, setImporting] = useState(false)
  const [importMsg, setImportMsg] = useState('')

  // 云端配置
  const [showCloudSettings, setShowCloudSettings] = useState(false)
  const [cloudConfig, setCloudConfig] = useState(() => ({
    provider: localStorage.getItem('cloud_provider') || 'tianyi', // tianyi, baidu, dav
    davUrl: localStorage.getItem('cloud_dav_url') || '',
    davUser: localStorage.getItem('cloud_dav_user') || '',
    davPassword: ''
  }))

  const saveCloudConfig = async (newConfig) => {
    // 验证连接
    if (newConfig.provider === 'dav') {
      if (!newConfig.davUrl || !newConfig.davUser || !newConfig.davPassword) {
        alert('请填写完整的 WebDAV 配置')
        return
      }
      try {
        setImportMsg('正在验证连接...')
        await checkWebDAVConnection(newConfig.davUrl, newConfig.davUser, newConfig.davPassword)
        alert('连接成功！')
      } catch (e) {
        alert('连接失败：' + e.message)
        return
      } finally {
        setImportMsg('')
      }
    }

    setCloudConfig(newConfig)
    localStorage.setItem('cloud_provider', newConfig.provider)
    if (newConfig.davUrl) localStorage.setItem('cloud_dav_url', newConfig.davUrl)
    if (newConfig.davUser) localStorage.setItem('cloud_dav_user', newConfig.davUser)
    sessionStorage.setItem('cloud_dav_password', newConfig.davPassword)

    setShowCloudSettings(false)
  }

  // 加载时尝试读取 Session 密码
  useEffect(() => {
    const pwd = sessionStorage.getItem('cloud_dav_password')
    if (pwd) setCloudConfig(prev => ({ ...prev, davPassword: pwd }))
  }, [])

  // 云端同步 - 上传
  const handleCloudUpload = async () => {
    if (cloudConfig.provider !== 'dav') {
      alert('暂仅支持 WebDAV 协议同步，请在设置中配置 WebDAV')
      setShowCloudSettings(true)
      return
    }

    setSyncing(true)
    setSyncStatus(null)
    setImportMsg('正在打包数据...')
    try {
      const data = await exportAllData()
      setImportMsg('正在上传...')
      await uploadToWebDAV(cloudConfig, data)
      setSyncStatus('success')
      setImportMsg('备份上传成功！')
    } catch (e) {
      console.error(e)
      setSyncStatus('error')
      setImportMsg('上传失败: ' + e.message)
    } finally {
      setSyncing(false)
    }
  }

  // 云端同步 - 下载恢复
  const handleCloudDownload = async () => {
    if (cloudConfig.provider !== 'dav') {
      alert('暂仅支持 WebDAV 协议同步')
      return
    }
    if (!confirm('从云端恢复将覆盖当前本地数据，是否继续？')) return

    setSyncing(true)
    setSyncStatus(null)
    setImportMsg('正在下载...')
    try {
      const data = await downloadFromWebDAV(cloudConfig)
      setImportMsg('正在恢复数据库...')
      await importData(data)
      setSyncStatus('success')
      setImportMsg('数据恢复成功！')
    } catch (e) {
      console.error(e)
      setSyncStatus('error')
      setImportMsg('下载失败: ' + e.message)
    } finally {
      setSyncing(false)
    }
  }

  const getProviderName = (p) => {
    switch (p) {
      case 'tianyi': return '天翼云盘'
      case 'baidu': return '百度网盘'
      case 'dav': return 'WebDAV'
      default: return '云盘'
    }
  }

  // 本地文件选择
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const isCsv = file.name.toLowerCase().endsWith('.csv')
    const reader = new FileReader()

    setImporting(true)
    setImportMsg('正在解析数据...')

    reader.onload = async (event) => {
      try {
        let text = event.target.result
        if (isCsv) {
          // 预处理：去除随手记头部说明行
          const lines = text.split('\n')
          if (lines.length > 0 && lines[0].includes('随手记')) {
            lines.shift()
            text = lines.join('\n')
          }

          // 解析 CSV
          Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
              try {
                const count = await importCSVData(results.data)
                setImportMsg(`成功导入 ${count} 条记录`)
                setTimeout(() => {
                  window.location.href = '/' // Force reload to Home
                }, 1500)
              } catch (err) {
                setImportMsg('导入出错：' + err.message)
              } finally {
                setImporting(false)
              }
            }
          })
        } else {
          // JSON
          const data = JSON.parse(text)
          await importData(data)
          setImportMsg('JSON 数据恢复成功')
          setImporting(false)
        }
      } catch (error) {
        setImportMsg('文件解析失败：' + error.message)
        setImporting(false)
      }
    }

    reader.readAsText(file) // CSV use text
  }

  return (
    <div className="page import-page">
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1>数据备份与恢复</h1>
      </div>

      <div className="content">
        {/* 云端同步卡片 */}
        <div className="card cloud-card">
          <div className="card-header">
            <div className="icon-box cloud">
              <Cloud size={24} />
            </div>
            <div className="card-title">
              <h3>{getProviderName(cloudConfig.provider)}</h3>
              <p>自动同步备份，数据不丢失</p>
            </div>
            <button className="settings-btn" onClick={() => setShowCloudSettings(true)}>
              <Settings size={20} />
            </button>
          </div>

          <div className="sync-actions">
            <button className="sync-btn upload" onClick={handleCloudUpload} disabled={syncing}>
              {syncing ? <Loader2 className="spin" size={20} /> : <UploadCloud size={20} />}
              <span>上传备份</span>
            </button>
            <button className="sync-btn download" onClick={handleCloudDownload} disabled={syncing}>
              {syncing ? <Loader2 className="spin" size={20} /> : <DownloadCloud size={20} />}
              <span>恢复数据</span>
            </button>
          </div>

          {syncStatus === 'success' && (
            <div className="status-tip success">
              <Check size={14} /> {importMsg}
            </div>
          )}
          {syncStatus === 'error' && (
            <div className="status-tip error" style={{ background: '#ffebee', color: '#c62828' }}>
              <AlertCircle size={14} /> {importMsg}
            </div>
          )}
        </div>

        {/* 本地导入卡片 */}
        <div className="card local-card">
          <div className="card-header">
            <div className="icon-box folder">
              <FileSpreadsheet size={24} />
            </div>
            <div className="card-title">
              <h3>本地导入</h3>
              <p>支持随手记CSV、系统备份JSON</p>
            </div>
          </div>

          <div className="import-area" onClick={() => fileInputRef.current.click()}>
            <div className="upload-placeholder">
              <div className="up-icon">⊕</div>
              <p>点击选择文件 (CSV/JSON)</p>
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".csv,.json"
            className="hidden-input"
            onChange={handleFileSelect}
          />

          {importing && (
            <div className="status-tip loading">
              <Loader2 className="spin" size={14} /> 正在处理...
            </div>
          )}
          {!importing && importMsg && !syncStatus && (
            <div className="status-tip info">
              {importMsg.includes('失败') ? <AlertCircle size={14} /> : <Check size={14} />}
              {importMsg}
            </div>
          )}
        </div>

        <div className="tips-section">
          <h4>📝 导入说明</h4>
          <ul>
            <li>支持<b>随手记</b>导出文件的直接导入</li>
            <li>支持本应用导出的 <b>JSON</b> 备份文件恢复</li>
            <li>CSV文件请确保包含：日期、类型、金额、分类、账户 (会自动去除随手记头部)</li>
          </ul>
        </div>
      </div>

      {/* Cloud Settings Modal */}
      {showCloudSettings && (
        <div className="modal-overlay" onClick={() => setShowCloudSettings(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>同步设置</h3>
              <button onClick={() => setShowCloudSettings(false)}><X size={20} /></button>
            </div>
            <div className="settings-form">
              <div className="form-group">
                <label>选择网盘</label>
                <div className="provider-options">
                  {['tianyi', 'baidu', 'dav'].map(p => (
                    <button
                      key={p}
                      className={`provider-btn ${cloudConfig.provider === p ? 'active' : ''}`}
                      onClick={() => setCloudConfig({ ...cloudConfig, provider: p })}
                    >
                      {getProviderName(p)}
                    </button>
                  ))}
                </div>
              </div>

              {cloudConfig.provider === 'dav' && (
                <>
                  <div className="form-group">
                    <label>服务器地址 (WebDAV URL)</label>
                    <input
                      type="text"
                      className="form-input"
                      value={cloudConfig.davUrl}
                      onChange={e => setCloudConfig({ ...cloudConfig, davUrl: e.target.value })}
                      placeholder="https://dav.jianguoyun.com/dav/"
                    />
                  </div>
                  <div className="form-group">
                    <label>用户名</label>
                    <input
                      type="text"
                      className="form-input"
                      value={cloudConfig.davUser}
                      onChange={e => setCloudConfig({ ...cloudConfig, davUser: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>密码</label>
                    <input
                      type="password"
                      className="form-input"
                      value={cloudConfig.davPassword}
                      onChange={e => setCloudConfig({ ...cloudConfig, davPassword: e.target.value })}
                      placeholder="WebDAV 密码"
                    />
                  </div>
                </>
              )}

              {/* Other Providers Hint */}
              {cloudConfig.provider !== 'dav' && (
                <div className="form-group">
                  <p style={{ fontSize: 12, color: '#999' }}>
                    百度网盘/天翼云盘 请使用其 WebDAV 代理服务，或者直接选择 WebDAV 模式填写对应地址。
                    (暂不支持直接 OAuth 登录)
                  </p>
                </div>
              )}

              <button className="save-btn-full" onClick={() => saveCloudConfig(cloudConfig)}>
                保存并验证
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .import-page {
          background: #F5F6F8;
          min-height: 100vh;
        }
        .top-bar {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          background: #fff;
        }
        .top-bar h1 { font-size: 18px; font-weight: 600; }
        .back-btn { border: none; background: none; padding: 4px; }
        
        .content { padding: 16px; display: flex; flex-direction: column; gap: 16px; }
        
        .card {
           background: #fff; border-radius: 16px; padding: 20px;
           box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        
        .card-header { display: flex; gap: 12px; margin-bottom: 20px; align-items: center; }
        .icon-box {
           width: 48px; height: 48px; border-radius: 12px;
           display: flex; align-items: center; justify-content: center;
        }
        .icon-box.cloud { background: #E3F2FD; color: #1565C0; }
        .icon-box.folder { background: #FFF3E0; color: #EF6C00; }
        
        .card-title { flex: 1; }
        .card-title h3 { font-size: 16px; font-weight: 600; margin: 0 0 4px 0; }
        .card-title p { font-size: 12px; color: #999; margin: 0; }

        .settings-btn { background: none; border: none; color: #999; padding: 8px; }
        
        .sync-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sync-btn {
           display: flex; flex-direction: column; align-items: center; justify-content: center;
           gap: 8px; padding: 16px;
           border: 1px solid #eee; border-radius: 12px;
           background: #fafafa; color: #666; font-size: 13px;
        }
        .sync-btn:active { background: #f0f0f0; }
        .sync-btn.upload { color: #1565C0; background: #f5faff; border-color: #bbdefb; }
        .sync-btn.download { color: #2E7D32; background: #f1f8e9; border-color: #c8e6c9; }
        
        .import-area {
           border: 2px dashed #eee; border-radius: 12px;
           padding: 30px; text-align: center; cursor: pointer;
           transition: all 0.2s;
        }
        .import-area:active { background: #fafafa; border-color: #ddd; }
        .up-icon { font-size: 24px; color: #ccc; margin-bottom: 8px; }
        .upload-placeholder p { color: #999; font-size: 13px; margin: 0; }
        
        .hidden-input { display: none; }
        
        .status-tip {
           margin-top: 12px; padding: 10px; border-radius: 8px; font-size: 13px;
           display: flex; align-items: center; gap: 6px;
        }
        .status-tip.success { background: #E8F5E9; color: #2E7D32; }
        .status-tip.info { background: #E3F2FD; color: #1565C0; }
        .status-tip.loading { background: #FFF3E0; color: #EF6C00; }
        
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .tips-section { color: #999; font-size: 12px; padding: 0 8px; }
        .tips-section h4 { font-size: 13px; color: #666; margin-bottom: 8px; }
        .tips-section ul { padding-left: 20px; margin: 0; }
        .tips-section li { margin-bottom: 4px; }

        /* Modal & Form */
        .modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; width: 90%; max-width: 400px;
          border-radius: 16px; padding: 0; overflow: hidden;
        }
        .modal-header {
           padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
           border-bottom: 1px solid #eee;
        }
        .modal-header h3 { font-size: 18px; margin: 0; }
        .modal-header button { background: none; border: none; }
        
        .settings-form { padding: 20px; display: flex; flex-direction: column; gap: 16px; }
        .form-group label { display: block; font-size: 14px; margin-bottom: 8px; color: #666; }
        
        .provider-options { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
        .provider-btn {
           padding: 8px; border: 1px solid #eee; border-radius: 8px; background: #fff; color: #666; font-size: 13px;
        }
        .provider-btn.active { background: #E3F2FD; color: #1565C0; border-color: #1565C0; }
        
        .form-input {
           width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px;
        }
        
        .save-btn-full {
           width: 100%; padding: 12px; background: #FFB800; color: #fff; border: none; border-radius: 8px; font-size: 16px; margin-top: 8px;
        }
      `}</style>
    </div>
  )
}

export default ImportData
