import { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Camera, Check, Grid, CreditCard, FileText, Calendar, Users, Store, FolderKanban, X, Delete, ArrowRightLeft, Loader2, Mic } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { getDB } from '../db/database'
import { getAllCategories, getAllAccounts, getAllPersons, addTransaction, updateTransaction, getTransactionById, addPhoto, getPhotosByTransactionId, deletePhoto } from '../db/stores'
import { recognizeReceipt } from '../utils/ocr'
import { parseVoiceInput } from '../utils/nlp'
import './AddTransaction.css'

// 分类组定义
const categoryGroups = [
  { key: 'food', name: '食品酒水' },
  { key: 'living', name: '居家生活' },
  { key: 'transport', name: '行车交通' },
  { key: 'communication', name: '交流通讯' },
  { key: 'entertainment', name: '休闲娱乐' },
  { key: 'social', name: '人情往来' },
  { key: 'health', name: '医疗保健' },
  { key: 'finance', name: '金融保险' },
  { key: 'other', name: '其他' }
]

function AddTransaction() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('editId') || searchParams.get('edit')
  const templateId = searchParams.get('templateId')
  const dateParam = searchParams.get('date')

  // 基础状态
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('0.00')
  const [expression, setExpression] = useState('')
  const [isEditingAmount, setIsEditingAmount] = useState(true)
  const [loanType, setLoanType] = useState('debt_out') // 'debt_out' (借出), 'debt_in' (借入)
  const [balanceType, setBalanceType] = useState('increase') // 'increase' (增加), 'decrease' (减少)
  const [noStats, setNoStats] = useState(false)
  const [noBudget, setNoBudget] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(true) // 默认显示键盘

  // 表单数据
  const [categoryId, setCategoryId] = useState(null)
  const [accountId, setAccountId] = useState(null)
  const [toAccountId, setToAccountId] = useState(null)
  const [remark, setRemark] = useState('')
  const [date, setDate] = useState(() => {
    const now = new Date()
    return new Date(now.getTime() - (now.getTimezoneOffset() * 60000)).toISOString().slice(0, 16)
  })
  const [personId, setPersonId] = useState(null)
  const [merchantName, setMerchantName] = useState('')
  const [projectName, setProjectName] = useState('')

  // 数据源
  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])
  const [persons, setPersons] = useState([])
  const [merchants, setMerchants] = useState([])
  const [projects, setProjects] = useState([])

  // Modal
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showToAccountModal, setShowToAccountModal] = useState(false)
  const [showPersonModal, setShowPersonModal] = useState(false)
  const [showMerchantModal, setShowMerchantModal] = useState(false)
  const [showProjectModal, setShowProjectModal] = useState(false)

  // OCR Status
  // OCR & Voice Status
  const [recognizing, setRecognizing] = useState(false)
  const [showVoicePermissionModal, setShowVoicePermissionModal] = useState(false)
  const ocrTimeoutRef = useRef(null)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [photoFile, setPhotoFile] = useState(null)
  const [savedPhotos, setSavedPhotos] = useState([])
  const [listening, setListening] = useState(false)
  const [showVoiceTextModal, setShowVoiceTextModal] = useState(false)  // 文字输入替代语音
  const [voiceTextInput, setVoiceTextInput] = useState('')

  const [previewImage, setPreviewImage] = useState(null)
  const newPhotoUrl = useMemo(() => photoFile ? URL.createObjectURL(photoFile) : null, [photoFile])

  // 处理文字输入（替代语音）
  const handleVoiceTextSubmit = () => {
    const text = voiceTextInput.trim()
    if (!text) {
      setShowVoiceTextModal(false)
      return
    }

    try {
      const res = parseVoiceInput(text, categories, accounts)

      if (res.amount) {
        setAmount(res.amount.toFixed(2))
        setIsEditingAmount(false)
      }
      if (res.date) {
        const now = new Date()
        const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
        setDate(`${res.date}T${timeStr}`)
      }
      if (res.categoryId) setCategoryId(res.categoryId)
      if (res.accountId) setAccountId(res.accountId)
      if (res.remark) {
        setRemark(prev => (prev ? prev + ' ' : '') + res.remark)
      }
    } catch (e) {
      console.error('Parse error', e)
    }

    setVoiceTextInput('')
    setShowVoiceTextModal(false)
  }

  // 智能记账 - 使用文字输入模式（可配合系统键盘语音输入）
  const startListening = () => {
    // 直接打开文字输入模态框
    // 用户可以打字，或者点击键盘上的麦克风图标使用系统语音输入
    setShowVoiceTextModal(true)
  }

  const loadData = async () => {
    try {
      const db = getDB()
      const [allCats, allAccounts, allPersons, allMerchants, allProjects] = await Promise.all([
        getAllCategories(),
        getAllAccounts(),
        getAllPersons(),
        db.getAll('merchants'),
        db.getAll('projects')
      ])

      const typeCats = allCats.filter(c => c.type === type)
      setCategories(typeCats)
      setAccounts(allAccounts || [])
      setPersons(allPersons || [])
      setMerchants(allMerchants || [])
      setProjects(allProjects || [])

      if (typeCats.length > 0 && !categoryId) setCategoryId(typeCats[0].id)
      if (allAccounts?.length > 0 && !accountId) setAccountId(allAccounts[0].id)
      if (allPersons?.length > 0 && !personId) setPersonId(allPersons[0].id)
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  const loadEditData = async () => {
    try {
      const trans = await getTransactionById(editId)
      if (trans) {
        setType(trans.type || 'expense')
        setAmount(String(trans.amount || '0'))
        setCategoryId(trans.categoryId)
        setAccountId(trans.accountId)
        setToAccountId(trans.toAccountId)
        setRemark(trans.remark || '')
        setDate(trans.date?.slice(0, 16) || new Date().toISOString().slice(0, 16))
        setPersonId(trans.personId)
        setMerchantName(trans.merchant || '')
        setProjectName(trans.project || '')
        setNoStats(trans.noStats || false)
        setNoBudget(trans.noBudget || false)
        if (trans.type === 'balance') setBalanceType(trans.balanceType || 'increase')
        if (trans.type === 'debt_out' || trans.type === 'debt_in') {
          setType('loan')
          setLoanType(trans.type)
        }
        setIsEditingAmount(false)

        // Load photos
        const photos = await getPhotosByTransactionId(editId)
        setSavedPhotos(photos || [])
      }
    } catch (error) {
      console.error('加载编辑数据失败:', error)
    }
  }

  // 从模板加载数据
  const loadTemplateData = async () => {
    try {
      const db = getDB()
      const template = await db.get('templates', Number(templateId))
      if (template) {
        setType(template.type || 'expense')
        setAmount(String(template.amount || '0.00'))
        setCategoryId(template.categoryId)
        setAccountId(template.accountId)
        setRemark(template.remark || '')
        setNoStats(template.noStats || false)
        setNoBudget(template.noBudget || false)
      }
    } catch (error) {
      console.error('加载模板数据失败:', error)
    }
  }

  useEffect(() => {
    loadData()
  }, [type])

  useEffect(() => {
    if (editId) loadEditData()
  }, [editId])

  useEffect(() => {
    if (templateId) loadTemplateData()
  }, [templateId])

  useEffect(() => {
    if (dateParam && !editId) {
      const now = new Date()
      const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
      setDate(`${dateParam}T${timeStr}`)
    }
  }, [dateParam, editId])

  // 计算表达式结果
  const calculateResult = (expr) => {
    if (!expr) return 0
    try {
      const tokens = expr.split(/([+\-])/).filter(t => t)
      let result = parseFloat(tokens[0]) || 0
      for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i]
        const operand = parseFloat(tokens[i + 1]) || 0
        if (operator === '+') result += operand
        else if (operator === '-') result -= operand
      }
      return result
    } catch {
      return 0
    }
  }

  // 键盘处理
  const handleKeyPress = (key) => {
    if (key === 'OK') {
      const result = calculateResult(expression || amount)
      setAmount(result.toFixed(2))
      setExpression('')
      handleSubmit()
      return
    }

    if (key === 'DEL') {
      if (expression) {
        if (expression.length === 1) {
          setExpression('')
          setAmount('0.00')
        } else {
          const newExpr = expression.slice(0, -1)
          setExpression(newExpr)
          setAmount(calculateResult(newExpr).toFixed(2))
        }
      } else if (amount.length === 1 || amount === '0.00') {
        setAmount('0.00')
      } else {
        setAmount(prev => prev.slice(0, -1))
      }
      return
    }

    if (['+', '-'].includes(key)) {
      const currentExpr = expression || amount
      if (currentExpr && !/[+\-]$/.test(currentExpr)) {
        setExpression(currentExpr + key)
      }
      return
    }

    // 数字和小数点
    if (expression) {
      if (key === '.') {
        const parts = expression.split(/[+\-]/)
        const lastNum = parts[parts.length - 1]
        if (!lastNum.includes('.')) {
          setExpression(expression + key)
        }
      } else {
        const newExpr = expression + key
        setExpression(newExpr)
        setAmount(calculateResult(newExpr).toFixed(2))
      }
    } else {
      if (isEditingAmount) {
        if (key === '.') {
          if (!amount.includes('.')) setAmount(amount + '.')
        } else {
          if (amount === '0.00' || amount === '0') setAmount(key)
          else setAmount(amount + key)
        }
      } else {
        setAmount(key)
        setIsEditingAmount(true)
      }
    }
  }

  // 提交
  const handleSubmit = async () => {
    const finalAmount = parseFloat(amount)
    if (!finalAmount || finalAmount === 0) {
      alert('请输入金额')
      return
    }

    try {
      let dbType = type
      if (type === 'loan') dbType = loanType

      const data = {
        type: dbType,
        amount: finalAmount,
        balanceType: type === 'balance' ? balanceType : null,
        categoryId,
        accountId,
        toAccountId: type === 'transfer' ? toAccountId : null,
        remark,
        date,
        personId,
        merchant: merchantName,
        project: projectName
      }

      if (editId) {
        await updateTransaction(editId, data)
        // Update photo if new one added?
        if (photoFile) {
          // Read file to base64 or blob
          const reader = new FileReader()
          reader.readAsDataURL(photoFile)
          reader.onload = async () => {
            await addPhoto({
              transactionId: editId,
              data: reader.result,
              createdAt: new Date().toISOString()
            })
          }
        }
      } else {
        const newTrans = await addTransaction(data)
        if (photoFile) {
          const reader = new FileReader()
          reader.readAsDataURL(photoFile)
          reader.onload = async () => {
            await addPhoto({
              transactionId: newTrans.id,
              data: reader.result,
              createdAt: new Date().toISOString()
            })
          }
        }
      }
      navigate(-1)
    } catch (error) {
      alert('保存失败: ' + error.message)
    }
  }

  const currentCategory = categories.find(c => c.id === categoryId)
  const currentAccount = accounts.find(a => a.id === accountId)
  const toAccount = accounts.find(a => a.id === toAccountId)
  const currentPerson = persons.find(p => p.id === personId)

  const formatDate = (d) => {
    const date = new Date(d)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
  }

  const tabs = [
    { key: 'template', label: '模板' },
    { key: 'expense', label: '支出' },
    { key: 'income', label: '收入' },
    { key: 'transfer', label: '转账' },
    { key: 'balance', label: '余额' },
    { key: 'loan', label: '借贷' }
  ]

  const switchTab = (direction) => {
    const currentIndex = tabs.findIndex(t => t.key === type)
    if (currentIndex === -1) return

    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1
    if (nextIndex < 0 || nextIndex >= tabs.length) return

    const nextKey = tabs[nextIndex].key
    if (nextKey === 'template') {
      navigate('/templates')
    } else {
      setType(nextKey)
    }
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => switchTab('next'),
    onSwipedRight: () => switchTab('prev'),
    trackMouse: true
  })

  return (
    <div className="page add-page" {...handlers}>
      {/* Voice Permission Modal */}
      {showVoicePermissionModal && (
        <div className="modal-overlay" style={{ alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div className="modal-content" style={{ maxWidth: 300, borderRadius: 12, padding: 20, paddingBottom: 20 }}>
            <div className="voice-permission-title">
              请允许麦克风权限以使用语音记账
            </div>
            <div className="voice-permission-actions">
              <button className="voice-permission-confirm" onClick={() => {
                setShowVoicePermissionModal(false)
                startListening()
              }}>确定</button>
            </div>
          </div>
        </div>
      )}

      {/* 智能语音记账模态框 */}
      {showVoiceTextModal && (
        <div className="modal-overlay" onClick={() => setShowVoiceTextModal(false)} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{
            width: '100%',
            maxWidth: '100%',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: 24,
            paddingBottom: 40,
            animation: 'slideUp 0.3s ease-out'
          }}>
            <div className="modal-header" style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 24 }}>🎙️</span> 智能语音记账
              </h3>
              <button
                onClick={() => setShowVoiceTextModal(false)}
                style={{ background: '#f5f5f5', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}
              >
                <X size={20} color="#666" />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                background: '#f9fafb',
                padding: 16,
                borderRadius: 12,
                border: '1px dashed #ddd',
                fontSize: 14,
                color: '#666',
                lineHeight: 1.6
              }}>
                <p style={{ margin: 0, marginBottom: 8, fontWeight: 600, color: '#333' }}>💡 使用技巧：</p>
                <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'disc' }}>
                  <li>点击下方输入框</li>
                  <li>点击键盘上的 <strong style={{ color: '#4CAF50' }}>🎤 麦克风图标</strong></li>
                  <li>说出：<strong>"早餐20元"</strong> 或 <strong>"打车35 微信"</strong></li>
                </ul>
              </div>

              <div style={{ position: 'relative' }}>
                <input
                  id="voice-input-field"
                  type="text"
                  value={voiceTextInput}
                  onChange={e => setVoiceTextInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleVoiceTextSubmit()}
                  placeholder="试试说：午餐 30 元..."
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 50px',
                    borderRadius: 16,
                    border: '2px solid #e0e0e0',
                    fontSize: 18,
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s',
                    background: '#fff',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#4CAF50';
                    e.target.style.boxShadow = '0 4px 16px rgba(76, 175, 80, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e0e0e0';
                    e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                  }}
                />
                <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                  <Mic size={24} color="#4CAF50" />
                </div>
              </div>

              <button
                onClick={() => document.getElementById('voice-input-field').focus()}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 16,
                  background: '#f0f9ff',
                  color: '#007aff',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 8
                }}
              >
                <Mic size={20} />
                点击启用键盘语音输入
              </button>

              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button
                  onClick={handleVoiceTextSubmit}
                  style={{
                    flex: 1,
                    padding: 16,
                    borderRadius: 16,
                    border: 'none',
                    background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 700,
                    boxShadow: '0 8px 16px rgba(76, 175, 80, 0.2)',
                    cursor: 'pointer'
                  }}
                >
                  确 定
                </button>
              </div>
            </div>
          </div>
          <style>{`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* 顶部导航 */}
      <div className="top-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
          <span>记一笔</span>
        </button>
        <div className="header-actions">
          <button className="custom-btn" onClick={() => navigate('/settings/bookkeeping')}>☆自定义</button>
          <button className="save-btn" onClick={handleSubmit}>
            <Check size={20} />
          </button>
        </div>
      </div>

      {/* Tab栏 */}
      <div className="tab-bar">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`tab-item ${type === tab.key ? 'active' : ''}`}
            onClick={() => {
              if (tab.key === 'template') {
                navigate('/templates')
              } else {
                setType(tab.key)
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="amount-section" onClick={() => setShowKeyboard(true)}>
        <div className="amount-display">
          <span className="amount-value">{amount}</span>
          {expression && <span className="expression">{expression}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

          {/* Photos Thumbnails */}
          {savedPhotos.map(photo => (
            <div key={photo.id} className="thumb-box">
              <img src={photo.data} onClick={() => setPreviewImage(photo.data)} />
              <button className="thumb-del" onClick={async (e) => {
                e.stopPropagation()
                if (confirm('删除此照片?')) {
                  await deletePhoto(photo.id)
                  setSavedPhotos(prev => prev.filter(p => p.id !== photo.id))
                }
              }}><X size={10} /></button>
            </div>
          ))}
          {newPhotoUrl && (
            <div className="thumb-box new">
              <img src={newPhotoUrl} onClick={() => setPreviewImage(newPhotoUrl)} />
              <button className="thumb-del" onClick={(e) => {
                e.stopPropagation()
                setPhotoFile(null)
              }}><X size={10} /></button>
            </div>
          )}

          <button className="camera-btn" onClick={() => document.getElementById('camera-input').click()} disabled={recognizing}>
            {recognizing ? <Loader2 size={22} className="spin" /> : <Camera size={22} />}
            <span>{recognizing ? '识别中' : '拍照'}</span>
          </button>

          <button className={`camera-btn ${listening ? 'listening' : ''}`} onClick={startListening} disabled={recognizing || listening}>
            {listening ? <Loader2 size={22} className="spin" /> : <Mic size={22} />}
            <span>{listening ? '听写中' : '语音'}</span>
          </button>
        </div>
      </div>
      <input
        type="file"
        id="camera-input"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files[0]
          if (!file) return

          setPhotoFile(file)
          setRecognizing(true)
          setOcrProgress(0)

          if (ocrTimeoutRef.current) clearTimeout(ocrTimeoutRef.current)
          ocrTimeoutRef.current = setTimeout(() => {
            setRecognizing(false)
            alert('识别超时，请重试或手动输入')
          }, 15000)

          try {
            const res = await recognizeReceipt(file, (progress) => {
              setOcrProgress(Math.floor(progress * 100))
            })
            if (res.amount) {
              setAmount(res.amount.toFixed(2))
              setIsEditingAmount(false)
            }
            if (res.date) {
              const now = new Date()
              const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
              setDate(`${res.date}T${timeStr}`)
            }
            if (res.merchant) {
              setMerchantName(res.merchant)
            }
            setRemark(prev => (prev ? prev + ' ' : '') + 'OCR识别')
            // Don't alert, just show success via UI or toast
            // alert(`识别成功！\n金额: ${res.amount}\n日期: ${res.date || '未识别'}\n商家: ${res.merchant || '未识别'}`)
          } catch (err) {
            alert('识别失败: ' + err.message)
            setPhotoFile(null)
          } finally {
            if (ocrTimeoutRef.current) clearTimeout(ocrTimeoutRef.current)
            setRecognizing(false)
            setOcrProgress(0)
            e.target.value = '' // Reset
          }
        }}
      />

      {/* OCR Progress Bar */}
      {recognizing && (
        <div className="ocr-progress-overlay">
          <div className="ocr-progress-box">
            <span>正在识别... {ocrProgress}%</span>
            <div className="ocr-bar">
              <div className="ocr-fill" style={{ width: `${ocrProgress}%` }}></div>
            </div>
            <button
              className="ocr-cancel-btn"
              onClick={() => {
                setRecognizing(false)
                if (ocrTimeoutRef.current) clearTimeout(ocrTimeoutRef.current)
                setOcrProgress(0)
              }}
            >
              取消
            </button>
          </div>
        </div>
      )}



      {/* Full Screen Image Preview */}
      {previewImage && (
        <div className="preview-overlay" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} className="preview-img" alt="Original" onClick={e => e.stopPropagation()} />
          <button className="preview-close" onClick={() => setPreviewImage(null)}>
            <X size={24} />
          </button>
        </div>
      )}



      {/* 表单区 */}
      <div className="form-section">
        {/* 借贷类型 */}
        {type === 'loan' ? (
          <>
            <div className="form-row">
              <div className="row-icon"><ArrowRightLeft size={18} color="#999" /></div>
              <span className="row-label">类型</span>
              <div className="row-value loan-type-toggle">
                <button
                  className={loanType === 'debt_out' ? 'active' : ''}
                  onClick={() => setLoanType('debt_out')}
                >借出</button>
                <button
                  className={loanType === 'debt_in' ? 'active' : ''}
                  onClick={() => setLoanType('debt_in')}
                >借入</button>
              </div>
            </div>

            <div className="form-row" onClick={() => setShowPersonModal(true)}>
              <div className="row-icon"><Users size={18} color="#999" /></div>
              <span className="row-label">成员</span>
              <div className="row-value">
                {currentPerson?.name || '请选择成员(必选)'}
                <ChevronRight size={16} color="#ccc" />
              </div>
            </div>

            <div className="form-row" onClick={() => setShowAccountModal(true)}>
              <div className="row-icon"><CreditCard size={18} color="#999" /></div>
              <span className="row-label">账户</span>
              <div className="row-value">
                {currentAccount?.name || '请选择'}
                <ChevronDown size={16} color="#ccc" />
              </div>
            </div>
          </>
        ) : type === 'balance' ? (
          <>
            {/* 余额类型 */}
            <div className="form-row">
              <div className="row-icon"><ArrowRightLeft size={18} color="#999" /></div>
              <span className="row-label">调整</span>
              <div className="row-value loan-type-toggle">
                <button
                  className={balanceType === 'increase' ? 'active' : ''}
                  onClick={() => setBalanceType('increase')}
                >增加</button>
                <button
                  className={balanceType === 'decrease' ? 'active' : ''}
                  onClick={() => setBalanceType('decrease')}
                >减少</button>
              </div>
            </div>

            {/* 余额调整只需要账户 */}
            <div className="form-row" onClick={() => setShowAccountModal(true)}>
              <div className="row-icon"><CreditCard size={18} color="#999" /></div>
              <span className="row-label">账户</span>
              <div className="row-value">
                {currentAccount?.name || '请选择'}
                <ChevronDown size={16} color="#ccc" />
              </div>
            </div>
          </>
        ) : type === 'transfer' ? (
          <div className="form-row transfer-accounts">
            <div className="row-icon"><CreditCard size={18} color="#999" /></div>
            <span className="row-label">账户</span>
            <div className="transfer-pair">
              <div className="transfer-item" onClick={() => setShowAccountModal(true)}>
                <span className="transfer-type">转出</span>
                <span className="transfer-account">{currentAccount?.name || '请选择'}(CNY)</span>
              </div>
              <span className="transfer-arrow">⇄</span>
              <div className="transfer-item" onClick={() => setShowToAccountModal(true)}>
                <span className="transfer-type">转入</span>
                <span className="transfer-account">{toAccount?.name || '请选择'}(CNY)</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* 分类 */}
            <div className="form-row" onClick={() => setShowCategoryModal(true)}>
              <div className="row-icon"><Grid size={18} color="#999" /></div>
              <span className="row-label">分类</span>
              <div className="row-value">
                {currentCategory ? (
                  <>
                    <span>{currentCategory.name}</span>
                    <ChevronRight size={16} color="#ccc" />
                  </>
                ) : '请选择'}
              </div>
            </div>

            {/* 账户 */}
            <div className="form-row" onClick={() => setShowAccountModal(true)}>
              <div className="row-icon"><CreditCard size={18} color="#999" /></div>
              <span className="row-label">账户</span>
              <div className="row-value">
                {currentAccount?.name || '请选择'}(CNY)
                <ChevronDown size={16} color="#ccc" />
              </div>
            </div>
          </>
        )}

        {/* 备注 */}
        <div className="form-row">
          <div className="row-icon"><FileText size={18} color="#999" /></div>
          <span className="row-label">备注</span>
          <input
            type="text"
            className="row-input"
            placeholder="..."
            value={remark}
            onChange={e => setRemark(e.target.value)}
          />
        </div>

      </div>

      {/* 固定底部选项 */}
      <div className="quick-tags" style={{ padding: '0 16px 16px 16px' }}>
        <button className="tag-btn" onClick={() => document.getElementById('date-picker').showPicker()}>
          {formatDate(date)}
        </button>
        <input
          type="datetime-local"
          id="date-picker"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        />
        <button className="tag-btn" onClick={() => setShowPersonModal(true)}>
          {currentPerson?.name || '成员'}
        </button>
        <button className="tag-btn" onClick={() => setShowMerchantModal(true)}>
          {merchantName || '商家'}
        </button>
        <button className="tag-btn" onClick={() => setShowProjectModal(true)}>
          {projectName || '项目'}
        </button>
        <div style={{ flex: 1 }}></div>
        <button className="tag-btn" onClick={() => setShowKeyboard(!showKeyboard)} style={{ background: 'none', border: 'none', padding: '4px', color: '#999' }}>
          {showKeyboard ? <ChevronDown size={20} /> : <ChevronDown size={20} style={{ transform: 'rotate(180deg)' }} />}
        </button>
      </div>



      {/* 键盘区域 - 可折叠 */}
      {showKeyboard ? (
        <div className="keyboard-section">
          {/* 左侧类型切换 */}
          <div className="type-sidebar">
            <button className={`type-btn ${type === 'expense' ? 'active' : ''}`} onClick={() => setType('expense')}>
              支出
            </button>
            <button className={`type-btn ${type === 'income' ? 'active' : ''}`} onClick={() => setType('income')}>
              收入
            </button>
            <button className={`type-btn ${type === 'transfer' ? 'active' : ''}`} onClick={() => setType('transfer')}>
              转账
            </button>
          </div>

          {/* 数字键盘 */}
          <div className="number-pad">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'].map(key => (
              <button key={key} className="num-btn" onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
            <button className="num-btn" onClick={() => handleKeyPress('DEL')}>
              <Delete size={20} />
            </button>
          </div>

          {/* 右侧操作区 */}
          <div className="action-sidebar">
            <button className="action-btn" onClick={() => handleKeyPress('-')}>−</button>
            <button className="action-btn" onClick={() => handleKeyPress('+')}>+</button>
            <button className="action-btn ok" onClick={() => handleKeyPress('OK')}>
              确<br />定
            </button>
          </div>
        </div>
      ) : (
        /* 键盘收起时显示底部操作栏 */
        <div className="bottom-actions">
          <button className="bottom-btn outline" onClick={() => { handleKeyPress('OK'); setShowKeyboard(true) }}>
            再记一笔
          </button>
          <button className="bottom-btn primary" onClick={() => { handleKeyPress('OK'); navigate(-1) }}>
            完成
          </button>
        </div>
      )}

      {/* 分类选择Modal - 平铺模式 */}
      {
        showCategoryModal && (
          <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
            <div className="category-modal-content" onClick={e => e.stopPropagation()}>
              {/* 顶部操作栏 */}
              <div className="category-toolbar">
                <button className="toolbar-btn">⊕</button>
                <button className="toolbar-btn">⧉</button>
                <button className="toolbar-btn">⌕</button>
                <button className="toolbar-close" onClick={() => setShowCategoryModal(false)}>
                  <ChevronDown size={20} />
                </button>
              </div>

              {/* 分类组列表 */}
              <div className="category-groups">
                {categoryGroups.map(group => {
                  const groupCats = categories.filter(c => c.group === group.key || (!c.group && group.key === 'other'))
                  if (groupCats.length === 0) return null

                  return (
                    <div key={group.key} className="category-group">
                      <h4 className="group-title">{group.name}</h4>
                      <div className="group-items">
                        {groupCats.map(cat => (
                          <div
                            key={cat.id}
                            className={`cat-item ${categoryId === cat.id ? 'selected' : ''}`}
                            onClick={() => { setCategoryId(cat.id); setShowCategoryModal(false) }}
                          >
                            <div className="cat-icon" style={{ backgroundColor: cat.color }}>{cat.icon}</div>
                            <span>{cat.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}

                {/* 如果没有分组，直接显示所有分类 */}
                {categories.filter(c => !c.group).length === categories.length && (
                  <div className="category-group">
                    <div className="group-items">
                      {categories.map(cat => (
                        <div
                          key={cat.id}
                          className={`cat-item ${categoryId === cat.id ? 'selected' : ''}`}
                          onClick={() => { setCategoryId(cat.id); setShowCategoryModal(false) }}
                        >
                          <div className="cat-icon" style={{ backgroundColor: cat.color }}>{cat.icon}</div>
                          <span>{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }

      {/* 账户选择Modal */}
      {
        showAccountModal && (
          <div className="modal-overlay" onClick={() => setShowAccountModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>选择账户</h3>
                <button onClick={() => setShowAccountModal(false)}><X size={20} /></button>
              </div>
              <div className="list-items">
                {accounts.map(acc => (
                  <div
                    key={acc.id}
                    className="list-item"
                    onClick={() => { setAccountId(acc.id); setShowAccountModal(false) }}
                  >
                    <span>{acc.icon || '💳'}</span>
                    <span>{acc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* 转入账户选择Modal */}
      {
        showToAccountModal && (
          <div className="modal-overlay" onClick={() => setShowToAccountModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>选择转入账户</h3>
                <button onClick={() => setShowToAccountModal(false)}><X size={20} /></button>
              </div>
              <div className="list-items">
                {accounts.filter(a => a.id !== accountId).map(acc => (
                  <div
                    key={acc.id}
                    className="list-item"
                    onClick={() => { setToAccountId(acc.id); setShowToAccountModal(false) }}
                  >
                    <span>{acc.icon || '💳'}</span>
                    <span>{acc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* 成员选择Modal */}
      {
        showPersonModal && (
          <div className="modal-overlay" onClick={() => setShowPersonModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>选择成员</h3>
                <button onClick={() => setShowPersonModal(false)}><X size={20} /></button>
              </div>
              <div className="list-items">
                {persons.map(p => (
                  <div
                    key={p.id}
                    className="list-item"
                    onClick={() => { setPersonId(p.id); setShowPersonModal(false) }}
                  >
                    <span>{p.avatar || '👤'}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* 商家选择Modal */}
      {
        showMerchantModal && (
          <div className="modal-overlay" onClick={() => setShowMerchantModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>选择商家</h3>
                <button onClick={() => setShowMerchantModal(false)}><X size={20} /></button>
              </div>
              <div className="list-items">
                {merchants.map(m => (
                  <div
                    key={m.id}
                    className="list-item"
                    onClick={() => { setMerchantName(m.name); setShowMerchantModal(false) }}
                  >
                    <span>{m.icon || '🏪'}</span>
                    <span>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* 项目选择Modal */}
      {
        showProjectModal && (
          <div className="modal-overlay" onClick={() => setShowProjectModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3>选择项目</h3>
                <button onClick={() => setShowProjectModal(false)}><X size={20} /></button>
              </div>
              <div className="list-items">
                {projects.map(p => (
                  <div
                    key={p.id}
                    className="list-item"
                    onClick={() => { setProjectName(p.name); setShowProjectModal(false) }}
                  >
                    <span>{p.icon || '📁'}</span>
                    <span>{p.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }


    </div >
  )
}

export default AddTransaction
