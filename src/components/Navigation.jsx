import { NavLink, useNavigate } from 'react-router-dom'
import { List, BarChart2, Plus, Calendar, Settings } from 'lucide-react'

function Navigation() {
    const navigate = useNavigate()

    const navItems = [
        { path: '/records', icon: List, label: '流水' },
        { path: '/statistics', icon: BarChart2, label: '报表' },
        { action: 'add', icon: Plus, label: '', isCenter: true },
        { path: '/calendar', icon: Calendar, label: '日历' },
        { path: '/settings', icon: Settings, label: '设置' }
    ]

    return (
        <nav className="bottom-nav">
            {navItems.map((item, index) =>
                item.isCenter ? (
                    <button
                        key="add"
                        className="nav-add-btn"
                        onClick={() => navigate('/add')}
                        aria-label="记一笔"
                    >
                        <Plus size={28} strokeWidth={2.5} />
                    </button>
                ) : (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon className="nav-icon" size={22} />
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                )
            )}
        </nav>
    )
}

export default Navigation

