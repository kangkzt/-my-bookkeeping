import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Helper to get days in month
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

function DatePickerModal({ isOpen, onClose, onSelect, initialDate, title = "选择日期" }) {
    if (!isOpen) return null

    const [viewDate, setViewDate] = useState(initialDate ? new Date(initialDate) : new Date())
    const [selectedDate, setSelectedDate] = useState(initialDate ? new Date(initialDate) : new Date())

    useEffect(() => {
        if (isOpen && initialDate) {
            const d = new Date(initialDate)
            // Check if valid
            if (!isNaN(d.getTime())) {
                setViewDate(d)
                setSelectedDate(d)
            }
        }
    }, [isOpen, initialDate])

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const daysInMonth = getDaysInMonth(year, month)
    const startDay = getFirstDayOfMonth(year, month) // 0=Sun
    // Adjust for Monday start (0=Sun, 1=Mon -> Mon(1)=0, Sun(0)=6)
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

    // Format YYYY-MM-DD
    const formatDate = (d) => {
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
    }

    return (
        <div className="date-picker-overlay" onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 2000,
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
        }}>
            <div className="date-picker-modal" onClick={e => e.stopPropagation()} style={{
                background: 'white', width: '100%', maxWidth: 450,
                borderTopLeftRadius: 24, borderTopRightRadius: 24,
                padding: 24, animation: 'slideUp 0.3s',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <span style={{ fontSize: 18, fontWeight: 600, color: '#333' }}>{title}</span>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}><X size={24} color="#999" /></button>
                </div>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, padding: '0 10px' }}>
                    <button onClick={handlePrevMonth} style={{ padding: 8, background: '#f5f5f5', borderRadius: '50%', border: 'none', cursor: 'pointer' }}><ChevronLeft size={20} color="#666" /></button>
                    <span style={{ fontSize: 17, fontWeight: 600, color: '#333' }}>{year}年 {month + 1}月</span>
                    <button onClick={handleNextMonth} style={{ padding: 8, background: '#f5f5f5', borderRadius: '50%', border: 'none', cursor: 'pointer' }}><ChevronRight size={20} color="#666" /></button>
                </div>

                {/* Weekdays */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 12, color: '#999', fontSize: 13, fontWeight: 500 }}>
                    {['一', '二', '三', '四', '五', '六', '日'].map(d => <div key={d}>{d}</div>)}
                </div>

                {/* Days */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', rowGap: 16 }}>
                    {days.map((date, i) => {
                        if (!date) return <div key={i}></div>
                        const isSelected = isSameDay(date, selectedDate)
                        const isToday = isSameDay(date, new Date())
                        return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>
                                <button
                                    onClick={() => {
                                        onSelect(formatDate(date))
                                        onClose()
                                    }}
                                    style={{
                                        width: 40, height: 40, borderRadius: '50%', border: 'none',
                                        background: isSelected ? '#FFB800' : 'transparent',
                                        color: isSelected ? 'white' : isToday ? '#FFB800' : '#333',
                                        fontWeight: isSelected || isToday ? 600 : 400,
                                        fontSize: 16,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', transition: 'all 0.2s'
                                    }}
                                >
                                    {date.getDate()}
                                </button>
                            </div>
                        )
                    })}
                </div>

                <div style={{ height: 30 }}></div>
            </div>
            <style>{`
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default DatePickerModal
