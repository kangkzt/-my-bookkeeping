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
            desc: '查看支出分类统计，或自定义支出分类',
            path: '/category-manage?type=expense'
        },
        {
            icon: PlusCircle,
            label: '收入分类',
            desc: '查看收入分类统计，或自定义收入分类',
            path: '/category-manage?type=income'
        },
        {
            icon: CreditCard,
            label: '账户',
            desc: '查看账户统计，或管理账户',
            path: '/accounts'
        },
        {
            icon: Users,
            label: '成员',
            desc: '查看成员统计，或管理成员',
            path: '/members'
        },
        {
            icon: Store,
            label: '商家',
            desc: '查看商家统计，或管理商家',
            path: '/merchants'
        },
        {
            icon: FolderKanban,
            label: '项目',
            desc: '查看项目统计，或管理项目',
            path: '/projects'
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
                        <div className="menu-icon">
                            <item.icon size={22} strokeWidth={1.5} />
                        </div>
                        <div className="menu-content">
                            <span className="menu-label">{item.label}</span>
                            <span className="menu-desc">{item.desc}</span>
                        </div>
                        <ChevronRight size={18} color="#ccc" />
                    </div>
                ))}
            </div>

            <style>{`
        .category-tags-page {
          background: #fff;
          min-height: 100vh;
        }

        .top-bar {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          padding-top: calc(12px + var(--safe-area-top));
          border-bottom: 1px solid #f5f5f5;
        }

        .back-btn {
          padding: 8px;
          color: #333;
        }

        .page-title {
          font-size: 17px;
          font-weight: 600;
          margin-left: 8px;
        }

        .spacer {
          flex: 1;
        }

        .menu-list {
          padding-top: 8px;
        }

        .menu-item {
          display: flex;
          align-items: center;
          padding: 20px;
          gap: 16px;
          border-bottom: 1px solid #f9f9f9;
        }

        .menu-item:active {
          background: #f9f9f9;
        }

        .menu-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #333;
        }

        .menu-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-label {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }

        .menu-desc {
          font-size: 13px;
          color: #999;
        }
      `}</style>
        </div>
    )
}

export default CategoryTags
