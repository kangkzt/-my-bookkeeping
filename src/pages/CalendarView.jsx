import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable' // Import
import { getTransactionsByMonth, getAllCategories } from '../db/stores'

function CalendarView() {
  const navigate = useNavigate()
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  const [currentDate, setCurrentDate] = useState(new Date())
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedDate, setSelectedDate] = useState(todayStr)

  // Swipe Logic
  const handlers = useSwipeable({
    onSwipedLeft: () => handleNextMonth(),
    onSwipedRight: () => handlePrevMonth(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 50,
    swipeDuration: 500,
    touchEventOptions: { passive: false }
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  useEffect(() => {
    loadData()
  }, [year, month])

  const loadData = async () => {
    try {
      const [monthTrans, allCats] = await Promise.all([
        getTransactionsByMonth(year, month),
        getAllCategories()
      ])
      setTransactions(monthTrans)
      setCategories(allCats)
    } catch (error) {
      console.error('加载失败:', error)
    }
  }

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 2, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month, 1))
    setSelectedDate(null)
  }

  const handleMonthPicker = (e) => {
    if (e.target.value) {
      const [y, m] = e.target.value.split('-')
      setCurrentDate(new Date(Number(y), Number(m) - 1, 1))
      setSelectedDate(null)
    }
  }

  const getCategory = (categoryId) => {
    return categories.find(c => c.id === categoryId) || { name: '未知', icon: '❓', color: '#999' }
  }

  const formatAmount = (amount) => {
    if (amount >= 10000) return (amount / 10000).toFixed(1) + 'w'
    if (amount >= 1000) return (amount / 1000).toFixed(1) + 'k'
    return amount.toFixed(0)
  }

  const generateCalendarDays = () => {
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    const startWeekDay = firstDay.getDay()
    const daysInMonth = lastDay.getDate()
    const prevMonthLastDay = new Date(year, month - 1, 0).getDate()

    const days = []

    for (let i = startWeekDay - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, isEmpty: true, isPrev: true })
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const dayTrans = transactions.filter(t => {
        const tDate = t.date ? t.date.split('T')[0] : ''
        return tDate === dateStr
      })
      const income = dayTrans.filter(t => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0)
      const expense = dayTrans.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0)

      days.push({
        day: i,
        date: dateStr,
        income,
        expense,
        hasData: income > 0 || expense > 0
      })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      days.push({ day: i, isEmpty: true, isNext: true })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const weekDays = ['日', '一', '二', '三', '四', '五', '六']

  const selectedTransactions = selectedDate
    ? transactions.filter(t => {
      const tDate = t.date ? t.date.split('T')[0] : ''
      return tDate === selectedDate
    })
    : []

  const formatDateDisplay = () => {
    if (selectedDate) {
      const d = new Date(selectedDate)
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
    }
    return `${year}年${month}月`
  }

  return (
    <div className="page calendar-page" {...handlers}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>

        <div className="calendar-nav">
          <button onClick={handlePrevMonth} className="nav-arrow"><ChevronLeft size={20} /></button>
          <div className="date-display" onClick={() => document.getElementById('cal-month-picker').showPicker()}>
            <span>{year}年{month}月</span>
            <input
              type="month"
              id="cal-month-picker"
              value={`${year}-${String(month).padStart(2, '0')}`}
              onChange={handleMonthPicker}
              className="hidden-picker"
            />
          </div>
          <button onClick={handleNextMonth} className="nav-arrow"><ChevronRight size={20} /></button>
        </div>

        <div style={{ width: 36 }}></div>
      </div>

      <div className="calendar-container">
        <div className="weekday-row">
          {weekDays.map((day, i) => (
            <div key={day} className={`weekday-cell ${i === 0 || i === 6 ? 'weekend' : ''}`}>
              {day}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {calendarDays.map((item, index) => {
            const isToday = item.date === todayStr
            const isSelected = item.date === selectedDate

            return (
              <div
                key={index}
                className={`day-cell ${item.isEmpty ? 'empty' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => !item.isEmpty && setSelectedDate(item.date)}
              >
                {isToday ? (
                  <div className={`today-circle ${isSelected ? 'selected' : ''}`}>今</div>
                ) : item.hasData ? (
                  <div className={`day-with-data ${isSelected ? 'selected' : ''}`}>
                    <span className="day-num">{item.day}</span>
                    <span className="day-amount">{formatAmount(item.expense || item.income)}</span>
                  </div>
                ) : (
                  <span className={`day-number ${item.isEmpty ? 'muted' : ''}`}>{item.day}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="transactions-panel">
        <div className="selected-date-title">{selectedDate ? formatDateDisplay() : '选择日期查看详情'}</div>
        {selectedTransactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <div className="empty-cards">
                <div className="card-mock"></div>
                <div className="card-icon">+</div>
              </div>
            </div>
            <p className="empty-title">无流水</p>
            <p className="empty-hint">点击右下角加号开始记账</p>
          </div>
        ) : (
          <div className="transaction-list">
            {selectedTransactions.map(trans => {
              const category = getCategory(trans.categoryId)
              return (
                <div key={trans.id} className="transaction-item" onClick={() => navigate(`/add?editId=${trans.id}`)}>
                  <div className="category-icon" style={{ backgroundColor: category.color }}>
                    {category.icon}
                  </div>
                  <div className="trans-info">
                    <span className="trans-cat">{category.name}</span>
                    {trans.remark && <span className="trans-remark">{trans.remark}</span>}
                  </div>
                  <span className={`trans-amount ${trans.type}`}>
                    {trans.type === 'expense' ? '-' : '+'}{Number(trans.amount).toFixed(2)}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <button className="fab-btn" onClick={() => navigate(selectedDate ? `/add?date=${selectedDate}` : '/add')}>
        <Plus size={24} />
      </button>

      <style>{`
        .calendar-page {
          background: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .page-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
        }

        .back-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #333;
        }

        .calendar-nav {
           display: flex;
           align-items: center;
           gap: 12px;
        }
        
        .nav-arrow {
           background: none;
           border: none;
           padding: 4px;
           color: #666;
           cursor: pointer;
        }

        .date-display {
           font-size: 16px;
           font-weight: 600;
           color: #333;
           position: relative;
           cursor: pointer;
        }
        
        .hidden-picker {
           position: absolute;
           top: 0; left: 0;
           width: 100%; height: 100%;
           opacity: 0;
           cursor: pointer;
        }

        .calendar-container {
          padding: 0 12px;
        }

        .weekday-row {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          margin-bottom: 8px;
        }

        .weekday-cell {
          text-align: center;
          font-size: 12px;
          color: #999;
          padding: 8px 0;
        }

        .weekday-cell.weekend { color: #999; }

        .days-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .day-cell {
          aspect-ratio: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 8px;
          position: relative;
          padding: 4px;
        }

        .day-cell.empty { cursor: default; }
        .day-cell.selected { background: #FFB800; color: #fff; }
        .day-cell.selected .day-num { background: #fff; color: #FFB800; }
        .day-cell.selected .day-amount { color: #fff; opacity: 0.9; }

        .day-number { font-size: 15px; color: #333; }
        .day-number.muted { color: #ddd; }

        .today-circle {
          width: 32px;
          height: 32px;
          background: #f5f5f5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #333;
          border: 1px solid #e0e0e0;
        }
        .today-circle.selected { background: #fff; color: #FFB800; border: none; }

        .day-with-data {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .day-with-data .day-num {
          width: 28px;
          height: 28px;
          background: #4ECDC4;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        .day-amount { font-size: 10px; color: #4ECDC4; }

        .transactions-panel {
          flex: 1;
          background: #f9fafb;
          padding: 20px;
          padding-bottom: 100px;
          border-top: 1px solid #f5f5f5;
          margin-top: 10px;
        }
        
        .selected-date-title {
           font-size: 14px; color: #999; margin-bottom: 12px;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
        }

        .empty-illustration { margin-bottom: 20px; }
        .empty-cards { position: relative; width: 120px; height: 80px; }
        
        .card-mock {
          position: absolute;
          width: 100px;
          height: 60px;
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
          border-radius: 12px;
          left: 0;
          top: 10px;
        }

        .card-icon {
          position: absolute;
          right: 0; top: 0; width: 36px; height: 36px;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 20px;
          box-shadow: 0 4px 12px rgba(255, 184, 0, 0.3);
        }

        .empty-title { font-size: 16px; color: #333; margin-bottom: 8px; }
        .empty-hint { font-size: 13px; color: #999; }

        .transaction-list { display: flex; flex-direction: column; gap: 12px; }
        .transaction-item {
          display: flex; align-items: center; padding: 14px;
          background: #fff; border-radius: 12px; cursor: pointer;
        }

        .category-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; margin-right: 12px;
        }

        .trans-info { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .trans-cat { font-size: 15px; color: #333; }
        .trans-remark { font-size: 12px; color: #999; }
        .trans-amount { font-size: 16px; font-weight: 600; }
        .trans-amount.expense { color: #333; }
        .trans-amount.income { color: #ff6b6b; }

        .fab-btn {
          position: fixed; bottom: 84px; right: 20px;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%);
          color: #fff; border: none;
          box-shadow: 0 4px 16px rgba(255, 184, 0, 0.4);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
        }

        @media (min-width: 768px) {
          .fab-btn { right: calc(50% - 240px + 20px); }
        }
      `}</style>
    </div>
  )
}

export default CalendarView
