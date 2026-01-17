import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, LogOut, BookOpen, Wallet, PiggyBank, CreditCard, TrendingUp } from 'lucide-react'
import { getUserBooks, createBook, initGlobalDB } from '../db/global'
import { initDB } from '../db/database'
import { secureStorage } from '../utils/secureStorage'
import { logger } from '../utils/logger'

// 账本封面图标配置
const BOOK_ICONS = [
    { icon: BookOpen, color: '#4ECDC4', bg: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)' },
    { icon: Wallet, color: '#FF6B6B', bg: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)' },
    { icon: PiggyBank, color: '#FFB800', bg: 'linear-gradient(135deg, #FFB800 0%, #FF9F43 100%)' },
    { icon: CreditCard, color: '#667EEA', bg: 'linear-gradient(135deg, #667EEA 0%, #764BA2 100%)' },
    { icon: TrendingUp, color: '#6C5CE7', bg: 'linear-gradient(135deg, #6C5CE7 0%, #A29BFE 100%)' },
]

function BookList() {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const loadUserId = async () => {
            const id = await secureStorage.get('user_id')
            if (!id) {
                navigate('/login')
            } else {
                setUserId(Number(id))
            }
        }
        loadUserId()
    }, [])

    useEffect(() => {
        if (userId) {
            loadBooks()
        }
    }, [userId])

    const handleLogout = () => {
        secureStorage.clear()
        localStorage.clear()
        navigate('/login')
    }

    const loadBooks = async () => {
        try {
            await initGlobalDB()
            let userBooks = await getUserBooks(userId)

            if (userBooks.length === 0) {
                await createBook(userId, '默认账本', 'QuickBookDB')
                userBooks = await getUserBooks(userId)
            }
            setBooks(userBooks)
        } catch (e) {
            logger.error('加载账本失败:', e)
            alert('加载账本失败')
        } finally {
            setLoading(false)
        }
    }

    const handleOpenBook = async (book) => {
        try {
            await initDB(book.dbName)
            secureStorage.set('current_book_id', book.id)
            secureStorage.set('current_book_name', book.name)
            secureStorage.set('current_db_name', book.dbName)
            navigate('/')
        } catch (e) {
            logger.error('打开账本失败:', e)
            alert('打开账本失败')
        }
    }

    const handleCreateBook = async () => {
        const name = prompt('请输入新账本名称:')
        if (!name) return

        try {
            await createBook(userId, name)
            loadBooks()
        } catch (e) {
            alert('创建失败: ' + e.message)
        }
    }

    // 根据账本索引获取封面样式
    const getBookStyle = (index) => {
        return BOOK_ICONS[index % BOOK_ICONS.length]
    }

    return (
        <div className="page book-list-page">
            {/* 顶部区域 */}
            <div className="header">
                <div className="header-content">
                    <h1>我的账本</h1>
                    <p className="subtitle">选择一个账本开始记账</p>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20} />
                </button>
            </div>

            {/* 账本网格 */}
            <div className="book-grid">
                {books.map((book, index) => {
                    const style = getBookStyle(index)
                    const IconComponent = style.icon
                    return (
                        <div key={book.id} className="book-card" onClick={() => handleOpenBook(book)}>
                            <div className="book-cover" style={{ background: style.bg }}>
                                <div className="cover-pattern"></div>
                                <IconComponent size={36} color="#fff" strokeWidth={1.5} />
                            </div>
                            <div className="book-info">
                                <span className="book-name">{book.name}</span>
                                <span className="book-date">{new Date(book.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    )
                })}

                {/* 新建账本卡片 */}
                <div className="book-card add-card" onClick={handleCreateBook}>
                    <div className="add-icon">
                        <Plus size={28} color="#bbb" strokeWidth={1.5} />
                    </div>
                    <span className="add-text">新建账本</span>
                </div>
            </div>

            {/* 底部提示 */}
            <div className="bottom-tip">
                💡 每个账本独立存储，可用于不同场景的记账
            </div>

            <style>{`
                .book-list-page {
                    background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
                    min-height: 100vh;
                    padding: 20px;
                    padding-top: calc(20px + env(safe-area-inset-top, 0));
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 32px;
                }

                .header-content h1 {
                    font-size: 28px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin: 0 0 6px;
                }

                .subtitle {
                    color: #888;
                    font-size: 14px;
                    margin: 0;
                }

                .logout-btn {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                    border: none;
                    border-radius: 12px;
                    color: #666;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .logout-btn:hover {
                    background: #f5f5f5;
                }

                .book-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                }

                .book-card {
                    background: #fff;
                    border-radius: 20px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: 1px solid rgba(0,0,0,0.03);
                }

                .book-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
                }

                .book-card:active {
                    transform: scale(0.98);
                }

                .book-cover {
                    width: 80px;
                    height: 80px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                }

                .cover-pattern {
                    position: absolute;
                    top: -20px;
                    right: -20px;
                    width: 60px;
                    height: 60px;
                    background: rgba(255,255,255,0.15);
                    border-radius: 50%;
                }

                .book-info {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                }

                .book-name {
                    font-size: 15px;
                    font-weight: 600;
                    color: #1a1a1a;
                }

                .book-date {
                    font-size: 12px;
                    color: #999;
                }

                .add-card {
                    background: transparent;
                    border: 2px dashed #e0e0e0;
                    box-shadow: none;
                    justify-content: center;
                    min-height: 160px;
                }

                .add-card:hover {
                    border-color: #ccc;
                    background: rgba(0,0,0,0.01);
                    transform: none;
                    box-shadow: none;
                }

                .add-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: #f5f5f5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .add-text {
                    color: #999;
                    font-size: 14px;
                    font-weight: 500;
                }

                .bottom-tip {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    padding: 16px 20px;
                    padding-bottom: calc(16px + env(safe-area-inset-bottom, 0));
                    background: linear-gradient(180deg, transparent 0%, #fff 20%);
                    text-align: center;
                    color: #aaa;
                    font-size: 12px;
                }
            `}</style>
        </div>
    )
}

export default BookList
