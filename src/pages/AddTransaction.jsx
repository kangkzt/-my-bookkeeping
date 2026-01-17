import { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Camera as CameraIcon, Check, Grid, CreditCard, FileText, Calendar, Users, Store, FolderKanban, X, Delete, ArrowRightLeft, Loader2, Mic, Reply, Bookmark, Keyboard } from 'lucide-react'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { SpeechRecognition } from '@capacitor-community/speech-recognition'
import { Capacitor } from '@capacitor/core'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable'
import { getDB } from '../db/database'
import { getAllCategories, getAllAccounts, getAllPersons, addTransaction, updateTransaction, getTransactionById, addPhoto, getPhotosByTransactionId, deletePhoto } from '../db/stores'
import { recognizeReceipt } from '../utils/ocr'
import { parseVoiceInput } from '../utils/nlp'
import './AddTransaction.css'

// Constants for timeouts
const VOICE_PARSE_DELAY_MS = 1000
const PROCESSING_TIMEOUT_MS = 5000


const formatDateCN = (isoStr) => {
  if (!isoStr) return ''
  const d = new Date(isoStr)
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function AddTransaction() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const editId = searchParams.get('editId') || searchParams.get('edit')
  const dateParam = searchParams.get('date')

  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('0.00')
  const [expression, setExpression] = useState('')
  const [isEditingAmount, setIsEditingAmount] = useState(true)
  const [loanType, setLoanType] = useState('debt_out')
  const [balanceType, setBalanceType] = useState('increase')
  const [showKeyboard, setShowKeyboard] = useState(true)

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
  const [subCategory, setSubCategory] = useState('')

  const [categories, setCategories] = useState([])
  const [accounts, setAccounts] = useState([])
  const [persons, setPersons] = useState([])
  const [merchants, setMerchants] = useState([])
  const [projects, setProjects] = useState([])

  // Modals
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showSubCatModal, setShowSubCatModal] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showToAccountModal, setShowToAccountModal] = useState(false)
  const [showPersonModal, setShowPersonModal] = useState(false)

  // Media
  const [recognizing, setRecognizing] = useState(false)
  const [photoFiles, setPhotoFiles] = useState([])
  const [savedPhotos, setSavedPhotos] = useState([])
  const [showVoiceTextModal, setShowVoiceTextModal] = useState(false)
  const [isOCR, setIsOCR] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [previewIndex, setPreviewIndex] = useState(-1)
  const [showSourceModal, setShowSourceModal] = useState(false)
  const [voiceTextInput, setVoiceTextInput] = useState('')
  const [webRecognition, setWebRecognition] = useState(null)
  const fileInputRef = useRef(null)

  // Combined Photos Helper with proper URL cleanup
  const [allPhotos, setAllPhotos] = useState([])

  useEffect(() => {
    const saved = savedPhotos.map(p => ({ ...p, isNew: false, url: p.data }))
    const newUrls = []
    const newFiles = photoFiles.map(f => {
      const url = URL.createObjectURL(f)
      newUrls.push(url)
      return { file: f, isNew: true, url }
    })
    setAllPhotos([...saved, ...newFiles])

    // Cleanup: Revoke URLs when component unmounts or files change
    return () => {
      newUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [savedPhotos, photoFiles])


  /* Camera Handlers */
  const handleCameraClick = () => {
    // Web Fallback
    if (!Capacitor.isNativePlatform()) {
      fileInputRef.current?.click()
      return
    }
    setShowSourceModal(true)
  }

  const handleTakePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera
      })
      const response = await fetch(image.webPath)
      const blob = await response.blob()
      const file = new File([blob], `camera_${Date.now()}.jpg`, { type: "image/jpeg" })
      processFile(file)
      setShowSourceModal(false)
    } catch (e) {
      console.log('Camera error:', e)
    }
  }

  const handlePickFromGallery = async () => {
    try {
      const { photos } = await Camera.pickImages({ quality: 90, limit: 9 })
      if (photos.length > 0) {
        for (const p of photos) {
          const response = await fetch(p.webPath)
          const blob = await response.blob()
          const file = new File([blob], `gallery_${Date.now()}.jpg`, { type: "image/jpeg" })
          processFile(file)
        }
      }
      setShowSourceModal(false)
    } catch (e) {
      console.log('Pick error:', e)
    }
  }

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => processFile(file))
    }
  }

  const processFile = async (file) => {
    if (!file) return

    setPhotoFiles(prev => [...prev, file])
    setIsOCR(true)
    setOcrProgress(0)

    // Simulate progress behavior (clamp at 90% until done)
    const progressInterval = setInterval(() => {
      setOcrProgress(prev => prev < 90 ? prev + 5 : prev)
    }, 500)

    try {
      const ocrTask = recognizeReceipt(file)
      // Extend timeout to 45s for mobile (Tesseract + Network)
      const timeoutTask = new Promise((_, reject) => setTimeout(() => reject(new Error('识别超时 (45s)')), 45000))

      const text = await Promise.race([ocrTask, timeoutTask])

      clearInterval(progressInterval)
      setOcrProgress(100)

      if (text) {
        // 1. Amount & Date
        if (text.amount) {
          const val = parseFloat(String(text.amount).replace(/,/g, ''))
          if (!isNaN(val) && val > 0) {
            let currentTotal = 0
            if (expression) {
              currentTotal = calculateResult(expression)
            } else {
              currentTotal = parseFloat(amount) || 0
            }
            const newTotal = currentTotal + val
            setAmount(newTotal.toFixed(2))
            setExpression('') // Show only result
          }
        }
        if (text.date) setDate(text.date)
        if (text.merchant) setMerchantName(text.merchant)

        const rawText = [text.merchant, ...(text.items || [])].join(' ')

        // 2. Smart Category Matching
        const matchedCat = categories.find(c => rawText.includes(c.name))
        if (matchedCat) {
          setCategoryId(matchedCat.id)
          if (matchedCat.type !== type) setType(matchedCat.type)
        }

        // 3. Smart Account Matching
        if (rawText.includes('支付宝') || rawText.includes('Alipay')) {
          const acc = accounts.find(a => a.name.includes('支付宝') || a.name.includes('Alipay'))
          if (acc) setAccountId(acc.id)
        } else if (rawText.includes('微信') || rawText.includes('WeChat')) {
          const acc = accounts.find(a => a.name.includes('微信') || a.name.includes('WeChat'))
          if (acc) setAccountId(acc.id)
        }

        // REMOVED: Auto Remark logic
      }
    } catch (e) {
      clearInterval(progressInterval)
      console.error('OCR Error:', e)
      alert(`识别失败: ${e.message}`)
    } finally {
      setTimeout(() => {
        setIsOCR(false)
        setOcrProgress(0)
      }, 500)
    }
  }

  const adjustDate = (delta) => {
    const d = new Date(date)
    d.setDate(d.getDate() + delta)
    const offsetDate = new Date(d.getTime() - (d.getTimezoneOffset() * 60000))
    setDate(offsetDate.toISOString().slice(0, 16))
  }

  /* Voice Logic Fix: Use Ref for latest value */
  const voiceTextRef = useRef('')
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    voiceTextRef.current = voiceTextInput
  }, [voiceTextInput])

  const handleVoiceParse = async () => {
    const textToParse = voiceTextRef.current

    // 1. Check for empty input (Critical for Service Failure Detection)
    if (!textToParse) {
      setIsProcessing(false)
      // Custom Alert for troubleshooting
      if (confirm('未识别到文字。\n\n如果您已说话但无法识别，极可能是因为手机默认语音服务为 Google (需翻墙)。\n\n建议：\n1. 请检查手机设置 -> 语音输入 -> 切换为"华为/讯飞/百度"。\n2. 或者只是单纯没听清，是否重试？')) {
        // User clicked OK (Retry?), maybe nothing.
      }
      return
    }

    try {
      const result = await parseVoiceInput(textToParse, categories, accounts)

      if (!result || (!result.amount && !result.category && !result.remark)) {
        throw new Error('未识别到有效记账信息')
      }

      if (result.type) setType(result.type)
      if (result.amount) { setAmount(String(result.amount)); setExpression('') }
      if (result.category) {
        const cat = categories.find(c => c.name.includes(result.category))
        if (cat) setCategoryId(cat.id)
      }
      if (result.remark) setRemark(result.remark)
      if (result.date) setDate(new Date(result.date).toISOString().slice(0, 16))

      setShowVoiceTextModal(false)
      setVoiceTextInput('')
      voiceTextRef.current = ''
    } catch (e) {
      console.error(e)
      alert('识别出错: ' + (e.message || '未知错误'))
    } finally {
      setIsProcessing(false)
    }
  }

  // Listener for "No Popup" mode
  useEffect(() => {
    const l = SpeechRecognition.addListener('partialResults', (data) => {
      if (data.matches && data.matches.length > 0) {
        setVoiceTextInput(data.matches[0])
      }
    })
    return () => {
      l.remove()
      SpeechRecognition.removeAllListeners()
    }
  }, [])

  // Voice recognition timeout ref
  const listeningTimeoutRef = useRef(null)
  const MAX_LISTENING_DURATION = 5000 // 5 seconds

  const startListening = async () => {
    // 1. Web Fallback
    if (!Capacitor.isNativePlatform()) {
      if (!('webkitSpeechRecognition' in window)) {
        alert('当前浏览器不支持语音识别 (Chrome Only)')
        return
      }
      const recognition = new window.webkitSpeechRecognition()
      recognition.lang = 'zh-CN'
      recognition.continuous = false
      recognition.interimResults = true
      recognition.onstart = () => setRecognizing(true)
      recognition.onend = () => setRecognizing(false)
      recognition.onresult = (event) => {
        setVoiceTextInput(event.results[0][0].transcript)
      }
      recognition.start()
      setWebRecognition(recognition)
      return
    }

    // 2. Native Plugin (No Popup Mode)
    try {
      const { available } = await SpeechRecognition.available()
      if (!available) {
        alert('您的设备不支持语音识别')
        return
      }

      const status = await SpeechRecognition.requestPermissions()
      if (status.speechRecognition !== 'granted') {
        alert('请允许麦克风权限')
        return
      }

      setRecognizing(true)
      setVoiceTextInput('')

      // Set auto-timeout for max listening duration
      listeningTimeoutRef.current = setTimeout(async () => {
        setRecognizing(false)
        setIsProcessing(false)
        await SpeechRecognition.stop().catch(() => { })
        alert('识别超时（10秒）。\n\n可能原因：\n1. 未检测到说话\n2. 系统语音服务（如Google）无法连接\n\n建议检查手机设置 -> 语音输入，切换为华为/讯飞/百度。')
      }, MAX_LISTENING_DURATION)

      await SpeechRecognition.start({
        language: "zh-CN",
        maxResults: 1,
        partialResults: true,
        popup: false
      })

    } catch (e) {
      setRecognizing(false)
      if (listeningTimeoutRef.current) clearTimeout(listeningTimeoutRef.current)
      console.error('Speech Error:', e)
      alert('启动失败: ' + e.message)
    }
  }

  const stopListening = async () => {
    // Clear timeout when manually stopped
    if (listeningTimeoutRef.current) {
      clearTimeout(listeningTimeoutRef.current)
      listeningTimeoutRef.current = null
    }

    if (!Capacitor.isNativePlatform()) {
      if (webRecognition) webRecognition.stop()
      setRecognizing(false)
      return
    }
    try {
      await SpeechRecognition.stop()
      setRecognizing(false)
    } catch (e) { console.error(e) }
  }

  const handleTouchEnd = async (e) => {
    e.preventDefault()
    setRecognizing(false)
    setIsProcessing(true) // Show processing state immediately
    await stopListening()

    // Safety timeout: Force stop processing after 5 seconds
    const processingTimeout = setTimeout(() => {
      setIsProcessing(false)
      alert('识别超时。\n\n可能原因：\n1. 未检测到说话\n2. 系统语音服务无法连接\n\n建议检查手机设置中的语音输入服务。')
    }, 5000)

    // Give it a moment to receive final packets from Native
    setTimeout(() => {
      clearTimeout(processingTimeout) // Clear if parse runs
      handleVoiceParse()
    }, 1000)
  }


  // ... (rest of code)


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

      if (!editId) {
        if (typeCats.length > 0 && !categoryId) setCategoryId(typeCats[0].id)
        if (allAccounts?.length > 0 && !accountId) setAccountId(allAccounts[0].id)
        if (allPersons?.length > 0 && !personId) setPersonId(allPersons[0].id)
      }
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  const loadEditData = async () => {
    try {
      const trans = await getTransactionById(Number(editId))
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
        setSubCategory(trans.subCategory || '')
        if (trans.type === 'balance') setBalanceType(trans.balanceType || 'increase')
        if (trans.type === 'debt_out' || trans.type === 'debt_in') {
          setType('loan')
          setLoanType(trans.type)
        }
        setIsEditingAmount(false)
        const photos = await getPhotosByTransactionId(Number(editId))
        setSavedPhotos(photos || [])
      }
    } catch (error) { console.error(error) }
  }

  useEffect(() => { loadData() }, [type])
  useEffect(() => { if (editId) loadEditData() }, [editId])
  useEffect(() => {
    if (dateParam && !editId) {
      const now = new Date()
      const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0')
      setDate(`${dateParam}T${timeStr}`)
    }
  }, [dateParam, editId])

  // Logic: Calculate, KeyPress, Submit (Same as before)
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
    } catch { return 0 }
  }

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
        if (expression.length === 1) { setExpression(''); setAmount('0.00') }
        else {
          const newExpr = expression.slice(0, -1); setExpression(newExpr); setAmount(calculateResult(newExpr).toFixed(2))
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
      if (currentExpr && !/[+\-]$/.test(currentExpr)) setExpression(currentExpr + key)
      return
    }
    if (expression) {
      if (key === '.') {
        if (!expression.split(/[+\-]/).pop().includes('.')) setExpression(expression + key)
      } else {
        const newExpr = expression + key
        setExpression(newExpr)
        setAmount(calculateResult(newExpr).toFixed(2))
      }
    } else {
      if (isEditingAmount) {
        if (key === '.') { if (!amount.includes('.')) setAmount(amount + '.') }
        else {
          if (amount === '0.00' || amount === '0') setAmount(key)
          else setAmount(amount + key)
        }
      } else {
        setAmount(key); setIsEditingAmount(true)
      }
    }
  }

  const handleSubmit = async (isSaveAndNew) => {
    const keepOpen = (typeof isSaveAndNew === 'boolean') ? isSaveAndNew : false
    const finalAmount = parseFloat(amount)
    if (!finalAmount || finalAmount === 0) { alert('请输入金额'); return }
    try {
      let dbType = type
      if (type === 'loan') dbType = loanType
      const data = {
        type: dbType,
        amount: finalAmount,
        balanceType: type === 'balance' ? balanceType : null,
        categoryId, accountId, toAccountId: type === 'transfer' ? toAccountId : null,
        remark, date, personId, merchant: merchantName, project: projectName, subCategory: subCategory
      }
      const processPhoto = async (transId) => {
        if (photoFiles.length > 0) {
          for (const file of photoFiles) {
            await new Promise(resolve => {
              const reader = new FileReader()
              reader.readAsDataURL(file)
              reader.onload = async () => {
                await addPhoto({ transactionId: transId, data: reader.result, createdAt: new Date().toISOString() })
                resolve()
              }
            })
          }
        }
      }
      if (editId) { await updateTransaction(editId, data); await processPhoto(editId) }
      else { const newTrans = await addTransaction(data); await processPhoto(newTrans.id) }

      if (keepOpen) {
        setAmount('0.00')
        setExpression('')
        setRemark('')
        setPhotoFiles([])
        alert('已保存')
      } else {
        navigate(-1)
      }
    } catch (e) { alert('保存失败: ' + e.message) }
  }

  // Classic Theme Colors
  const getThemeColor = () => {
    if (type === 'income') return '#FFB800'
    if (type === 'expense') return '#4ECDC4' // Cyan Teal
    if (type === 'transfer') return '#4A90E2'
    if (type === 'loan') return '#9B59B6'
    return '#4ECDC4'
  }

  // Helpers
  const currentCategory = categories.find(c => c.id === categoryId)
  const currentAccount = accounts.find(a => a.id === accountId)
  const toAccount = accounts.find(a => a.id === toAccountId)
  const currentPerson = persons.find(p => p.id === personId)

  const tabs = [
    { key: 'template', label: '模板' },
    { key: 'expense', label: '支出' },
    { key: 'income', label: '收入' },
    { key: 'transfer', label: '转账' },
    { key: 'balance', label: '余额' },
    { key: 'loan', label: '借贷' }
  ]

  const switchTab = (dir) => {
    const idx = tabs.findIndex(t => t.key === type)
    let next = dir === 'next' ? idx + 1 : idx - 1
    if (next >= 0 && next < tabs.length) {
      if (tabs[next].key === 'template') navigate('/templates')
      else setType(tabs[next].key)
    }
  }
  const handlers = useSwipeable({
    onSwipedLeft: () => switchTab('next'),
    onSwipedRight: () => switchTab('prev'),
    trackMouse: true
  })

  // Group categories for Modal
  const groupedCategories = useMemo(() => {
    // Mock grouping or simple
    return { '默认': categories }
  }, [categories])

  const renderCategoryIcon = (cat) => (
    <div style={{ width: 36, height: 36, borderRadius: 10, background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
      {cat.icon || '🏷️'}
    </div>
  )

  return (
    <div className="page add-page" {...handlers} style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#F7F8FA' }}>

      {/* 1. Header & Tabs */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', paddingTop: 'calc(12px + var(--safe-top))' }}>
          <button onClick={() => navigate(-1)} style={{ border: 'none', background: 'none', fontSize: 16, color: '#333', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={24} /> {editId ? '编辑' : '记一笔'}
          </button>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: '#FFF9E6', color: '#FFB800', fontSize: 12, padding: '4px 12px', border: 'none', borderRadius: 12 }}>自定义</button>
            <button onClick={handleSubmit} style={{ background: '#FFB800', border: 'none', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={16} color="white" />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', overflowX: 'auto', gap: 24, padding: '0 20px', scrollbarWidth: 'none' }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => tab.key === 'template' ? navigate('/templates') : setType(tab.key)}
              style={{
                border: 'none', background: 'none', padding: '10px 0', fontSize: 15,
                color: type === tab.key ? '#333' : '#999', fontWeight: type === tab.key ? '600' : '400',
                position: 'relative'
              }}
            >
              {tab.label}
              {type === tab.key && <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 3, background: '#FFB800', borderRadius: 2 }}></div>}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Amount Display */}
      <div onClick={() => setShowKeyboard(true)} style={{ background: '#fff', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${getThemeColor()}`, cursor: 'pointer' }}>
        <div style={{ fontSize: 48, fontWeight: 500, fontFamily: 'DIN Alternate', color: getThemeColor(), flex: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginRight: 10 }}>
          {expression || amount}
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {/* Photos Badge */}
          {(allPhotos.length > 0) && (
            <div onClick={(e) => {
              e.stopPropagation();
              setPreviewIndex(allPhotos.length - 1);
            }} style={{ position: 'relative', width: 40, height: 40, borderRadius: 8, overflow: 'hidden', border: '1px solid #eee' }}>
              <img src={allPhotos[allPhotos.length - 1].url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {allPhotos.length > 1 && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: 10, padding: '0 4px', borderBottomLeftRadius: 4 }}>
                  {allPhotos.length}
                </div>
              )}
            </div>
          )}

          {/* Camera (Now First) */}
          <div onClick={(e) => { e.stopPropagation(); handleCameraClick() }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#666', fontSize: 10, position: 'relative' }}>
            <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isOCR ? (
                <div style={{ position: 'relative', width: 24, height: 24 }}>
                  <svg viewBox="0 0 36 36" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="4" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00bfa5" strokeWidth="4" strokeDasharray={`${ocrProgress}, 100`} />
                  </svg>
                </div>
              ) : <CameraIcon size={20} />}
            </div>

            {isOCR ? `${ocrProgress}%` : '拍照'}
            <input type="file" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} accept="image/*" multiple />
          </div>

          {/* Voice (Now Second) */}
          <div onClick={(e) => { e.stopPropagation(); setShowVoiceTextModal(true) }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#666', fontSize: 10 }}>
            <div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mic size={20} />
            </div>
            语音
          </div>
        </div>
      </div>

      {/* 3. Linear Form (The Key "This Style") */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 0 }}>

        {/* Category Row */}
        {type !== 'transfer' && type !== 'loan' && (
          <>
            <div className="form-row" onClick={() => setShowCategoryModal(true)}>
              <div className="row-icon"><Grid size={18} color="#999" /></div>
              <div className="row-label">分类</div>
              <div className="row-value" style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 8 }}>
                {currentCategory ? (
                  <>
                    <span style={{ fontSize: 14 }}>{currentCategory.name}</span>
                    <div onClick={(e) => {
                      e.stopPropagation();
                      setShowSubCatModal(true);
                    }} style={{ background: '#F3F4F6', borderRadius: 12, padding: '2px 8px', fontSize: 11, color: '#666', border: '1px dashed #ccc' }}>
                      {subCategory || '+子分类'}
                    </div>
                  </>
                ) : <span style={{ color: '#ccc' }}>选择分类</span>}
              </div>
              <ChevronRight size={16} color="#ccc" />
            </div>


          </>
        )}

        {/* Account Row */}
        <div className="form-row" onClick={() => setShowAccountModal(true)}>
          <div className="row-icon"><CreditCard size={18} color="#999" /></div>
          <div className="row-label">账户</div>
          <div className="row-value" style={{ justifyContent: 'flex-start' }}>
            {currentAccount?.name || '选择账户'}
          </div>
        </div>

        {/* Remark Row */}
        <div className="form-row">
          <div className="row-icon"><Bookmark size={18} color="#999" /></div>
          <div className="row-label">备注</div>
          <input type="text" value={remark} onChange={e => setRemark(e.target.value)} placeholder="..."
            style={{ border: 'none', background: 'none', fontSize: 14, flex: 1, outline: 'none' }}
          />
        </div>

        {/* Chips Row (Date, Member, etc) */}
        <div style={{ padding: '20px 16px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
          {/* Date Chip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div onClick={() => adjustDate(-1)} style={{ padding: 4 }}><ChevronLeft size={16} color="#666" /></div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', background: '#F3F4F6', borderRadius: 16, padding: '6px 12px', fontSize: 12, color: '#333' }}>
              <span style={{ pointerEvents: 'none' }}>{formatDateCN(date)}</span>
              <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)}
                style={{ position: 'absolute', inset: 0, opacity: 0, width: '100%', height: '100%' }}
              />
            </div>
            <div onClick={() => adjustDate(1)} style={{ padding: 4 }}><ChevronRight size={16} color="#666" /></div>
          </div>

          {/* Member Chip */}
          <div style={{ background: '#F3F4F6', borderRadius: 16, padding: '6px 12px', fontSize: 12, color: '#333' }} onClick={() => setShowPersonModal(true)}>
            {currentPerson?.name || '成员'}
          </div>

          {/* Merchant Chip */}
          <div style={{ background: '#F3F4F6', borderRadius: 16, padding: '6px 12px', fontSize: 12, color: '#333' }} onClick={() => {
            const name = prompt('商家名称', merchantName); if (name !== null) setMerchantName(name);
          }}>
            {merchantName || '商家'}
          </div>

          {/* Project Chip */}
          <div style={{ background: '#F3F4F6', borderRadius: 16, padding: '6px 12px', fontSize: 12, color: '#333' }} onClick={() => {
            const name = prompt('项目名称', projectName); if (name !== null) setProjectName(name);
          }}>
            {projectName || '项目'}
          </div>
        </div>

      </div>

      {/* 4. Keyboard (3 Columns: Sidebar | Numpad | Actions) */}
      {
        showKeyboard && (
          <div className="keyboard-section">
            {/* Left Sidebar (Type Switcher from Image? Or Shortcuts?) */}
            {/* Image shows "支出", "收入", "转账" on left. */}
            <div className="type-sidebar">
              <button className={`type-btn ${type === 'expense' ? 'active' : ''}`} onClick={() => setType('expense')}>支出</button>
              <button className={`type-btn ${type === 'income' ? 'active' : ''}`} onClick={() => setType('income')}>收入</button>
              <button className={`type-btn ${type === 'transfer' ? 'active' : ''}`} onClick={() => setType('transfer')}>转账</button>
              {/* If Loan is needed, add scroll or squeeze */}
            </div>

            {/* Center Numpad */}
            <div className="number-pad">
              {[7, 8, 9, 4, 5, 6, 1, 2, 3, '.', 0].map(k => (
                <button key={k} className="num-btn" onClick={() => handleKeyPress(String(k))}>{k}</button>
              ))}
              <button className="num-btn" onClick={() => handleKeyPress('DEL')}><Delete size={22} /></button>
            </div>

            {/* Right Actions */}
            <div className="action-sidebar" style={{ position: 'relative' }}>
              <button onClick={() => setShowKeyboard(false)} style={{
                position: 'absolute', top: -32, right: 0, width: '100%', height: 32,
                background: '#fff', border: 'none', borderTopLeftRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 -2px 5px rgba(0,0,0,0.05)', zIndex: 10
              }}>
                <ChevronDown size={20} color="#666" />
              </button>
              <button className="action-btn" onClick={() => handleKeyPress('-')}>-</button>
              <button className="action-btn" onClick={() => handleKeyPress('+')}>+</button>
              <button className="action-btn ok" onClick={handleSubmit}>确定</button>
            </div>
          </div>
        )
      }

      {/* Bottom Actions (Shown when keyboard is hidden) */}
      {
        !showKeyboard && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px', paddingBottom: 'calc(16px + env(safe-area-inset-bottom))', background: '#fff', borderTop: '1px solid #f5f5f5', display: 'flex', gap: 16, zIndex: 100 }}>
            <button onClick={() => handleSubmit(true)} style={{ flex: 1, height: 44, borderRadius: 22, border: '1px solid #FFB800', background: '#FFF9E6', color: '#FFB800', fontSize: 16 }}>再记一笔</button>
            <button onClick={() => handleSubmit(false)} style={{ flex: 1, height: 44, borderRadius: 22, background: '#FFB800', color: '#fff', border: 'none', fontSize: 16 }}>完成</button>
          </div>
        )
      }

      {/* Category Modal (Simple grid overlay) */}
      {
        showCategoryModal && (
          <div className="modal-overlay" onClick={() => setShowCategoryModal(false)}>
            <div className="category-modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header"><h3>选择分类</h3><X size={20} onClick={() => setShowCategoryModal(false)} /></div>
              <div className="category-groups">
                <div className="group-items">
                  {categories.map(cat => (
                    <div key={cat.id} className={`cat-item ${categoryId === cat.id ? 'selected' : ''}`} onClick={() => { setCategoryId(cat.id); setShowCategoryModal(false); }}>
                      <div className="cat-icon">{cat.icon}</div>
                      <span>{cat.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      }


      {/* SubCategory Modal */}
      {showSubCatModal && (
        <div className="modal-overlay" onClick={() => setShowSubCatModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h3>选择子分类</h3><X size={20} onClick={() => setShowSubCatModal(false)} /></div>
            <div style={{ padding: 16 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['早餐', '午餐', '晚餐', '零食', '饮料', '水果', '买菜', '打车', '地铁', '公交', '日用品', '服饰'].map(s => (
                  <div key={s} onClick={() => { setSubCategory(s); setShowSubCatModal(false); }}
                    style={{ background: subCategory === s ? '#FFF3E0' : '#F3F4F6', color: subCategory === s ? '#FFB800' : '#333', padding: '8px 16px', borderRadius: 16, fontSize: 13 }}>
                    {s}
                  </div>
                ))}
                <div onClick={() => {
                  const s = prompt('自定义子分类');
                  if (s) { setSubCategory(s); setShowSubCatModal(false); }
                }} style={{ background: '#fff', border: '1px dashed #ccc', color: '#666', padding: '8px 16px', borderRadius: 16, fontSize: 13 }}>
                  + 自定义
                </div>
              </div>
              {subCategory && (
                <div onClick={() => { setSubCategory(''); setShowSubCatModal(false); }} style={{ marginTop: 20, textAlign: 'center', color: '#ff4d4f', fontSize: 14 }}>
                  清除当前子分类
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Voice Modal - Simplified Keyboard Input Mode */}
      {
        showVoiceTextModal && (
          <div className="modal-overlay" onClick={() => setShowVoiceTextModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: 24 }}>
              <h3>语音/文本记账</h3>

              {/* Instructions */}
              <div style={{
                background: '#f0f7ff',
                border: '1px solid #91caff',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
                fontSize: 13,
                color: '#0958d9'
              }}>
                <Keyboard size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
                <strong>使用方法：</strong>点击输入框 → 用键盘 🎤 语音按钮说话 → 自动识别
              </div>

              {/* Text Input - Auto-parse on blur */}
              <textarea
                id="voice-textarea"
                value={voiceTextInput}
                onChange={e => setVoiceTextInput(e.target.value)}
                onBlur={() => {
                  // Auto-parse when keyboard closes (user taps away)
                  if (voiceTextInput.trim()) {
                    setIsProcessing(true)
                    setTimeout(async () => {
                      await handleVoiceParse()
                    }, 100)
                  }
                }}
                style={{
                  width: '100%',
                  height: 100,
                  padding: 12,
                  background: '#fafafa',
                  border: '1px solid #d9d9d9',
                  borderRadius: 8,
                  marginBottom: 16,
                  fontSize: 16,
                  resize: 'none'
                }}
                placeholder="点击这里，用键盘语音输入...
例如：午餐 35元 微信"
              />

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button
                  onClick={() => setShowVoiceTextModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px 0',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 15,
                    cursor: 'pointer'
                  }}>
                  取消
                </button>
                <button
                  onClick={() => {
                    if (!voiceTextInput.trim()) {
                      alert('请先输入或语音输入内容')
                      return
                    }
                    setIsProcessing(true)
                    // Use setTimeout to avoid blocking UI
                    setTimeout(async () => {
                      await handleVoiceParse()
                    }, 100)
                  }}
                  disabled={isProcessing}
                  style={{
                    flex: 2,
                    padding: '12px 0',
                    background: isProcessing ? '#faad14' : '#1677ff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: isProcessing ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}>
                  {isProcessing ? (
                    <><Loader2 className="spin" size={18} /> 识别中...</>
                  ) : (
                    <><Check size={18} /> 智能识别</>
                  )}
                </button>
              </div>
            </div>
          </div>
        )
      }

      {/* Account Modal */}
      {
        showAccountModal && (
          <div className="modal-overlay" onClick={() => setShowAccountModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header"><h3>选择账户</h3></div>
              <div className="list-items">
                {accounts.map(a => (
                  <div key={a.id} className="list-item" onClick={() => { setAccountId(a.id); setShowAccountModal(false) }}>
                    <span>{a.icon}</span> <span>{a.name}</span> {accountId === a.id && <Check size={16} color="#00bfa5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Person Modal */}
      {
        showPersonModal && (
          <div className="modal-overlay" onClick={() => setShowPersonModal(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header"><h3>选择成员</h3></div>
              <div className="list-items">
                {persons.map(p => (
                  <div key={p.id} className="list-item" onClick={() => { setPersonId(p.id); setShowPersonModal(false) }}>
                    <span>{p.name}</span> {personId === p.id && <Check size={16} color="#00bfa5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }

      {/* Image Preview Modal */}
      {/* Image Preview Modal */}
      {
        previewIndex >= 0 && allPhotos[previewIndex] && (
          <div className="modal-overlay" onClick={() => setPreviewIndex(-1)} style={{ background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
            <div onClick={e => e.stopPropagation()} style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

              {/* Image */}
              <img src={allPhotos[previewIndex].url} style={{ width: '100%', height: '80%', objectFit: 'contain' }} />

              {/* Controls */}
              <div style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}>
                <button onClick={() => setPreviewIndex(-1)} style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: 20, padding: '8px 16px', backdropFilter: 'blur(5px)' }}>关闭</button>
              </div>

              {/* Navigation & Delete */}
              <div style={{ position: 'absolute', bottom: 40, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px' }}>
                {previewIndex > 0 ? (
                  <button onClick={() => setPreviewIndex(prev => prev - 1)} style={{ background: 'none', border: 'none', color: '#fff' }}><ChevronLeft size={32} /></button>
                ) : <div style={{ width: 32 }} />}

                <button onClick={async () => {
                  if (!confirm('确定删除这张图片吗？')) return;
                  const target = allPhotos[previewIndex];
                  if (target.isNew) {
                    // Delete from photoFiles
                    setPhotoFiles(prev => prev.filter(f => f !== target.file))
                  } else {
                    // Delete from savedPhotos
                    try {
                      await deletePhoto(target.id)
                      setSavedPhotos(prev => prev.filter(p => p.id !== target.id))
                    } catch (e) { alert('删除失败') }
                  }
                  if (allPhotos.length <= 1) setPreviewIndex(-1)
                  else if (previewIndex >= allPhotos.length - 1) setPreviewIndex(previewIndex - 1)
                }} style={{ width: 50, height: 50, borderRadius: 25, background: '#ff4d4f', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255, 77, 79, 0.4)' }}>
                  <Delete size={24} color="#fff" />
                </button>

                {previewIndex < allPhotos.length - 1 ? (
                  <button onClick={() => setPreviewIndex(prev => prev + 1)} style={{ background: 'none', border: 'none', color: '#fff' }}><ChevronRight size={32} /></button>
                ) : <div style={{ width: 32 }} />}
              </div>

              {/* Counter */}
              <div style={{ position: 'absolute', top: 40, left: 20, color: '#fff', fontSize: 16, fontWeight: 500 }}>
                {previewIndex + 1} / {allPhotos.length}
              </div>

            </div>
          </div>
        )
      }

      {/* Source Selection Modal */}
      {
        showSourceModal && (
          <div className="modal-overlay" onClick={() => setShowSourceModal(false)} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={e => e.stopPropagation()} style={{ width: '90%', marginBottom: 30, display: 'flex', flexDirection: 'column', gap: 10, zIndex: 3001 }}>
              <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: 14, overflow: 'hidden' }}>
                <button onClick={handleTakePhoto} style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.1)', fontSize: 18, color: '#007AFF', cursor: 'pointer' }}>
                  拍照
                </button>
                <button onClick={handlePickFromGallery} style={{ width: '100%', padding: '16px', background: 'transparent', border: 'none', fontSize: 18, color: '#007AFF', cursor: 'pointer' }}>
                  从相册选择
                </button>
              </div>
              <button onClick={() => setShowSourceModal(false)} style={{ width: '100%', padding: '16px', background: 'white', borderRadius: 14, border: 'none', fontSize: 18, fontWeight: '600', color: '#007AFF', cursor: 'pointer' }}>
                取消
              </button>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default AddTransaction
