import React from 'react'

const ConfirmDialog = ({ isOpen, title, content, onConfirm, onCancel, confirmText = '确认', cancelText = '取消', type = 'info' }) => {
    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 11000
        }} onClick={onCancel}>
            <div style={{
                backgroundColor: '#fff', borderRadius: 16, width: '85%', maxWidth: 320,
                overflow: 'hidden', animation: 'scaleIn 0.2s ease-out'
            }} onClick={e => e.stopPropagation()}>
                <div style={{ padding: '24px 24px 20px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: 18, fontWeight: 600, margin: '0 0 12px', color: '#333' }}>{title}</h3>
                    <div style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{content}</div>
                </div>
                <div style={{ display: 'flex', borderTop: '1px solid #f0f0f0' }}>
                    <button onClick={onCancel} style={{
                        flex: 1, padding: '16px', background: '#fff', border: 'none',
                        fontSize: 16, color: '#666', cursor: 'pointer', borderRight: '1px solid #f0f0f0',
                        borderRadius: '0 0 0 16px'
                    }}>{cancelText}</button>
                    <button onClick={onConfirm} style={{
                        flex: 1, padding: '16px', background: '#fff', border: 'none',
                        fontSize: 16, color: type === 'danger' ? '#ff4d4f' : '#1890ff', fontWeight: 600, cursor: 'pointer',
                        borderRadius: '0 0 16px 0'
                    }}>{confirmText}</button>
                </div>
            </div>
            <style>{`
         @keyframes scaleIn {
           from { transform: scale(0.9); opacity: 0; }
           to { transform: scale(1); opacity: 1; }
         }
       `}</style>
        </div>
    )
}

export default ConfirmDialog
