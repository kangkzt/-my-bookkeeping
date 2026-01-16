import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function BookkeepingSettings() {
    const navigate = useNavigate()

    // Settings State
    const [layoutMode, setLayoutMode] = useState(localStorage.getItem('add_trans_layout') || 'tile')

    const handleLayoutChange = () => {
        const newMode = layoutMode === 'tile' ? 'list' : 'tile'
        setLayoutMode(newMode)
        localStorage.setItem('add_trans_layout', newMode)
    }

    return (
        <div className="page settings-page">
            <div className="top-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ChevronLeft size={24} />
                    <span>记账设置</span>
                </button>
            </div>

            <div className="settings-list">
                <div className="section-header">记一笔设置</div>
                <div className="settings-group">
                    <div className="settings-item" onClick={handleLayoutChange}>
                        <div className="item-left">
                            <span className="item-icon">📝</span>
                            <span className="item-label">记一笔样式</span>
                        </div>
                        <div className="item-right">
                            <span className="value-text">{layoutMode === 'tile' ? '平铺模式' : '列表模式'}</span>
                            <ChevronRight size={16} color="#ccc" />
                        </div>
                    </div>
                    <div className="settings-item">
                        <div className="item-left">
                            <span className="item-icon">🔲</span>
                            <span className="item-label">流水类型</span>
                        </div>
                        <div className="item-right">
                            <ChevronRight size={16} color="#ccc" />
                        </div>
                    </div>
                    <div className="settings-item">
                        <div className="item-left">
                            <span className="item-icon">⚙️</span>
                            <span className="item-label">记账选项</span>
                        </div>
                        <div className="item-right">
                            <ChevronRight size={16} color="#ccc" />
                        </div>
                    </div>
                </div>

                <div className="section-header">记账设置</div>
                <div className="settings-group">
                    <div className="settings-item">
                        <div className="item-left">
                            <span className="item-icon">📅</span>
                            <span className="item-label">自定义月起始日</span>
                            <span className="badge-free">限免中</span>
                        </div>
                        <div className="item-right">
                            <span className="value-text">每月1日</span>
                            <ChevronRight size={16} color="#ccc" />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        .settings-page {
          background: #F5F6F8;
          min-height: 100vh;
        }
        
        .top-header {
          background: #fff;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 10;
          border-bottom: 1px solid rgba(0,0,0,0.05);
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          border: none;
          background: none;
          font-size: 17px;
          font-weight: 500;
          color: #333;
        }

        .settings-list {
          padding: 16px;
          display: flex;
          flex-direction: column;
        }

        .section-header {
            font-size: 12px;
            color: #999;
            margin-bottom: 8px;
            margin-left: 4px;
        }

        .settings-group {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .settings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px;
          border-bottom: 1px solid #f9f9f9;
          cursor: pointer;
        }
        
        .settings-item:last-child {
          border-bottom: none;
        }
        
        .settings-item:active {
          background-color: #f5f5f5;
        }

        .item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .item-icon {
            font-size: 18px;
            width: 24px;
            text-align: center;
        }

        .item-label {
          font-size: 15px;
          color: #333;
        }

        .badge-free {
            font-size: 10px;
            color: #fff;
            background: #FF6B6B;
            padding: 2px 6px;
            border-radius: 4px;
            margin-left: 8px;
        }

        .item-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .value-text {
          font-size: 13px;
          color: #999;
        }
      `}</style>
        </div>
    )
}

export default BookkeepingSettings
