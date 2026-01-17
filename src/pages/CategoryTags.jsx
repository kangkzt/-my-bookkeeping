import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronRight, MinusCircle, PlusCircle,
  CreditCard, Users, Store, FolderKanban
} from 'lucide-react'

function CategoryTags() {
  const navigate = useNavigate()

  const menuItems = [
    {
      icon: MinusCircle,
      label: '支出分类',
      desc: '管理您的支出分类',
      path: '/category-manage?type=expense',
      color: '#FF6B6B',
      bg: '#FFF0F0'
    },
    {
      icon: PlusCircle,
      label: '收入分类',
      desc: '管理您的收入分类',
      path: '/category-manage?type=income',
      color: '#4ECDC4',
      bg: '#E8FBF9'
    },
    {
      icon: CreditCard,
      label: '账户管理',
      desc: '银行卡、现金、支付宝等',
      path: '/accounts',
      color: '#667EEA',
      bg: '#F0F3FF'
    },
    {
      icon: Users,
      label: '成员管理',
      desc: '家庭成员分账统计',
      path: '/members',
      color: '#FFB800',
      bg: '#FFF8E6'
    },
    {
      icon: Store,
      label: '商家管理',
      desc: '常用消费商家',
      path: '/merchants',
      color: '#FF9F43',
      bg: '#FFF4EB'
    },
    {
      icon: FolderKanban,
      label: '项目管理',
      desc: '装修、旅行等专项支出',
      path: '/projects',
      color: '#6C5CE7',
      bg: '#F3F0FF'
    },
  ]

  return (
    <div className="page category-tags-page">
      {/* 顶部导航 */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ChevronLeft size={24} />
        </button>
        <h1 className="page-title">分类标签</h1>
        <div className="spacer"></div>
      </div>

      {/* 菜单列表 */}
      <div className="menu-list">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="menu-item"
            onClick={() => navigate(item.path)}
          >
            <div className="menu-icon" style={{ background: item.bg, color: item.color }}>
              <item.icon size={24} strokeWidth={1.8} />
            </div>
            <div className="menu-content">
              <span className="menu-label">{item.label}</span>
              <span className="menu-desc">{item.desc}</span>
            </div>
            <ChevronRight size={20} color="#ccc" />
          </div>
        ))}
      </div>

      <style>{`
        .category-tags-page {
          background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 16px 20px;
          padding-top: calc(16px + var(--safe-area-top));
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }

        .back-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
          background: #f5f5f5;
          border-radius: 12px;
          border: none;
          transition: all 0.2s;
        }

        .back-btn:hover {
          background: #eee;
        }

        .page-title {
          font-size: 18px;
          font-weight: 600;
          margin-left: 16px;
          color: #1a1a1a;
        }

        .spacer {
          flex: 1;
        }

        .menu-list {
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 16px;
          gap: 16px;
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid rgba(0,0,0,0.03);
        }

        .menu-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
        }

        .menu-item:active {
          transform: scale(0.98);
        }

        .menu-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          flex-shrink: 0;
        }

        .menu-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-label {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .menu-desc {
          font-size: 13px;
          color: #888;
        }
      `}</style>
    </div>
  )
}

export default CategoryTags
