import React, { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X, Clock, Calendar as CalIcon } from 'lucide-react'

// Helper to get days in month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

function DatePickerModal({ isOpen, onClose, onSelect, initialDate, title = "选择日期", enableTime = false }) {
    const [isVisible, setIsVisible] = useState(false)

    // Animation Logic
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <DatePickerContent
            isOpen={isOpen}
            onClose={onClose}
            onSelect={onSelect}
            initialDate={initialDate}
            title={title}
            enableTime={enableTime}
        />
    )
}

function DatePickerContent({ isOpen, onClose, onSelect, initialDate, title, enableTime }) {
    const [viewDate, setViewDate] = useState(initialDate ? new Date(initialDate) : new Date())
    const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : new Date())

    // Time State
    const [hour, setHour] = useState(selectedDate.getHours())
    const [minute, setMinute] = useState(selectedDate.getMinutes())
    const [mode, setMode] = useState('date') // 'date' | 'time'

    useEffect(() => {
        if (isOpen && initialDate) {
            const d = new Date(initialDate)
            if (!isNaN(d.getTime())) {
                setViewDate(d)
                setSelectedDate(d)
                setHour(d.getHours())
                setMinute(d.getMinutes())
            }
        }
        setMode('date')
    }, [isOpen, initialDate])

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const startDay = getFirstDayOfMonth(year, month)
    const startDayMon = startDay === 0 ? 6 : startDay - 1

    const days = []
    for (let i = 0; i < startDayMon; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i))

    const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1))
    const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1))

    const isSameDay = (d1, d2) => {
        if (!d1 || !d2) return false
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
    }

    const formatDateResult = (d, h, m) => {
        const y = d.getFullYear()
        const mo = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        if (!enableTime) return `${y}-${mo}-${day}`

        const hh = String(h).padStart(2, '0')
        const mm = String(m).padStart(2, '0')
        return `${y}-${mo}-${day}T${hh}:${mm}`
    }

    const handleDayClick = (date) => {
        setSelectedDate(date)
        if (!enableTime) {
            // Instant select for date-only mode
            onSelect(formatDateResult(date))
            onClose()
        }
    }

    const handleConfirm = () => {
        onSelect(formatDateResult(selectedDate, hour, minute))
        onClose()
    }

    // Scroll Logic for Time
    const hours = Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: 60 }, (_, i) => i)

    return (
        <div className={`date-picker-overlay ${isOpen ? 'open' : 'closing'}`} onClick={onClose}>
            <div className={`date-picker-modal ${isOpen ? 'open' : 'closing'}`} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="picker-header">
                    <span className="picker-title">{title}</span>
                    <button className="close-btn" onClick={onClose}><X size={20} color="#999" /></button>
                </div>

                {/* Tabs for Date/Time Mode */}
                {enableTime && (
                    <div className="mode-tabs">
                        <button className={`mode-tab ${mode === 'date' ? 'active' : ''}`} onClick={() => setMode('date')}>
                            <CalIcon size={16} />
                            <span>{selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日</span>
                        </button>
                        <button className={`mode-tab ${mode === 'time' ? 'active' : ''}`} onClick={() => setMode('time')}>
                            <Clock size={16} />
                            <span>{String(hour).padStart(2, '0')}:{String(minute).padStart(2, '0')}</span>
                        </button>
                    </div>
                )}

                {/* DATE VIEW */}
                {mode === 'date' && (
                    <div className="calendar-view">
                        <div className="month-nav">
                            <button onClick={handlePrevMonth}><ChevronLeft size={20} color="#666" /></button>
                            <span className="month-label">{year}年 {month + 1}月</span>
                            <button onClick={handleNextMonth}><ChevronRight size={20} color="#666" /></button>
                        </div>
                        <div className="weekdays-grid">
                            {['一', '二', '三', '四', '五', '六', '日'].map(d => <div key={d}>{d}</div>)}
                        </div>
                        <div className="days-grid">
                            {days.map((date, i) => {
                                if (!date) return <div key={i}></div>
                                const isSelected = isSameDay(date, selectedDate)
                                const isToday = isSameDay(date, new Date())
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleDayClick(date)}
                                        className={`day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                                    >
                                        {date.getDate()}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* TIME VIEW */}
                {mode === 'time' && (
                    <div className="time-view">
                        <div className="time-column">
                            <div className="col-label">时</div>
                            <div className="scroll-container">
                                {hours.map(h => (
                                    <div key={h}
                                        className={`time-item ${h === hour ? 'selected' : ''}`}
                                        onClick={() => setHour(h)}
                                    >
                                        {String(h).padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-divider">:</div>
                        <div className="time-column">
                            <div className="col-label">分</div>
                            <div className="scroll-container">
                                {minutes.map(m => (
                                    <div key={m}
                                        className={`time-item ${m === minute ? 'selected' : ''}`}
                                        onClick={() => setMinute(m)}
                                    >
                                        {String(m).padStart(2, '0')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Confirm Button for Time Mode */}
                {enableTime && (
                    <div className="footer-action">
                        <button className="confirm-btn" onClick={handleConfirm}>确定</button>
                    </div>
                )}

            </div>

            <style>{`
                .date-picker-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 2000;
                    display: flex; align-items: flex-end; justify-content: center;
                    opacity: 0; transition: opacity 0.3s;
                }
                .date-picker-overlay.open { opacity: 1; }
                
                .date-picker-modal {
                    background: white; width: 100%; max-width: 480px;
                    border-radius: 24px 24px 0 0; padding: 24px;
                    transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
                    box-shadow: 0 -4px 30px rgba(0,0,0,0.15);
                    display: flex; flex-direction: column; gap: 16px;
                    max-height: 85vh;
                }
                .date-picker-modal.open { transform: translateY(0); }

                .picker-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
                .picker-title { font-size: 18px; font-weight: 600; color: #333; }
                .close-btn { background: #f5f5f5; border: none; padding: 6px; border-radius: 50%; cursor: pointer; display: flex; }

                .mode-tabs { display: flex; background: #f5f5f5; padding: 4px; border-radius: 12px; margin-bottom: 8px; }
                .mode-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; border: none; background: none; border-radius: 10px; font-size: 14px; color: #666; font-weight: 500; cursor: pointer; transition: all 0.2s; }
                .mode-tab.active { background: #fff; color: #FFB800; shadow: 0 2px 8px rgba(0,0,0,0.05); font-weight: 600; }

                .calendar-view { animation: fadeIn 0.2s; }
                .month-nav { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding: 0 8px; }
                .month-nav button { padding: 8px; background: #f9f9f9; border-radius: 50%; border: none; cursor: pointer; }
                .month-label { font-size: 16px; font-weight: 600; color: #333; }
                
                .weekdays-grid { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 12px; color: #aaa; font-size: 12px; }
                .days-grid { display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 12px; column-gap: 4px; }
                
                .day-cell {
                    width: 40px; height: 40px; border-radius: 12px; border: none; background: transparent;
                    color: #333; font-size: 15px; font-weight: 500; cursor: pointer;
                    margin: 0 auto; display: flex; align-items: center; justify-content: center;
                }
                .day-cell.selected { background: #FFB800; color: #fff; font-weight: 600; box-shadow: 0 4px 12px rgba(255, 184, 0, 0.4); }
                .day-cell.today { color: #FFB800; background: #FFF9E6; }
                .day-cell.selected.today { background: #FFB800; color: #fff; }

                .time-view { display: flex; align-items: center; justify-content: center; height: 250px; gap: 20px; animation: fadeIn 0.2s; }
                .time-column { flex: 1; height: 100%; display: flex; flex-direction: column; align-items: center; background: #f9f9f9; border-radius: 16px; overflow: hidden; position: relative; }
                .col-label { font-size: 12px; color: #999; padding: 8px; background: #f0f0f0; width: 100%; text-align: center; font-weight: 600; }
                .scroll-container { flex: 1; overflow-y: auto; width: 100%; padding: 80px 0; text-align: center; scroll-behavior: smooth; }
                .scroll-container::-webkit-scrollbar { display: none; }
                
                .time-item { padding: 10px; font-size: 18px; color: #ccc; cursor: pointer; transition: all 0.2s; }
                .time-item.selected { font-size: 24px; font-weight: 700; color: #333; transform: scale(1.1); }
                
                .col-divider { font-size: 24px; font-weight: 700; color: #ddd; margin-top: 24px; }

                .footer-action { margin-top: 10px; }
                .confirm-btn { width: 100%; padding: 14px; background: linear-gradient(135deg, #FFB800 0%, #FF9500 100%); color: white; border: none; border-radius: 16px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 12px rgba(255, 184, 0, 0.3); cursor: pointer; }
                .confirm-btn:active { transform: scale(0.98); }

                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            `}</style>
        </div>
    )
}

export default DatePickerModal
