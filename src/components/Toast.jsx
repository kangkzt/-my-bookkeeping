import React, { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                setVisible(false)
                setTimeout(onClose, 300) // Wait for animation
            }, duration)
            return () => clearTimeout(timer)
        }
    }, [duration, onClose])

    const styles = {
        wrapper: {
            position: 'fixed',
            top: 24,
            left: '50%',
            transform: visible ? 'translate(-50%, 0)' : 'translate(-50%, -100%)',
            opacity: visible ? 1 : 0,
            transition: 'all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
            backgroundColor: '#fff',
            borderRadius: 12,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            zIndex: 11000,
            minWidth: 320,
            maxWidth: '90vw',
            borderLeft: `4px solid ${type === 'success' ? '#52c41a' :
                    type === 'error' ? '#ff4d4f' :
                        type === 'warning' ? '#faad14' : '#1890ff'
                }`
        },
        icon: {
            flexShrink: 0,
            color: type === 'success' ? '#52c41a' :
                type === 'error' ? '#ff4d4f' :
                    type === 'warning' ? '#faad14' : '#1890ff'
        }
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.icon}>
                {type === 'success' && <CheckCircle size={20} />}
                {type === 'error' && <AlertCircle size={20} />}
                {type === 'warning' && <AlertTriangle size={20} />}
                {type === 'info' && <Info size={20} />}
            </div>
            <div style={{ flex: 1, fontSize: 14, color: '#333', lineHeight: 1.5, wordBreak: 'break-word' }}>
                {message}
            </div>
            <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#ccc' }}>
                <X size={16} />
            </button>
        </div>
    )
}

export default Toast
