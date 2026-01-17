import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Book, LogOut, User } from 'lucide-react'
import { getUserBooks, createBook, initGlobalDB } from '../db/global'
import { initDB } from '../db/database'
import { secureStorage } from '../utils/secureStorage'
import { logger } from '../utils/logger'

function BookList() {
    const navigate = useNavigate()
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(true)

    const USER_ID = (() => {
        const id = secureStorage.get('user_id') || secureStorage.migrateFromLocalStorage('user_id')
        return id ? Number(id) : null
    })()

    useEffect(() => {
        if (!USER_ID) {
            navigate('/login')
            return
        }
        loadBooks()
    }, [USER_ID]) // Add USER_ID as dependency

    const handleLogout = () => {
        secureStorage.clear()
        localStorage.clear() // 清理旧的 localStorage 数据
        navigate('/login')
    }

    const loadBooks = async () => {
        try {
            await initGlobalDB()
            let userBooks = await getUserBooks(USER_ID)

            // If no books, create default one (Migration/First run support)
            if (userBooks.length === 0) {
                // Link existing legacy data as "默认账本"
                await createBook(USER_ID, '默认账本', 'QuickBookDB')
                userBooks = await getUserBooks(USER_ID)
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
            // Initialize the selected book's DB
            await initDB(book.dbName)
            // Persist choice (Secure)
            secureStorage.set('current_book_id', book.id)
            secureStorage.set('current_book_name', book.name)
            secureStorage.set('current_db_name', book.dbName)
            // Navigate Home
            navigate('/')
            // We might need to reload window to ensure all components re-bind? 
            // Or just initDB is enough if our stores use getDB() dynamically.
            // Our stores import getDB from database.js. If initDB updates the singleton `db`, then subsequent getDB() calls get the new one.
            // So navigation should be enough.
        } catch (e) {
            logger.error('打开账本失败:', e)
            alert('打开账本失败')
        }
    }

    const handleCreateBook = async () => {
        const name = prompt('请输入新账本名称:')
        if (!name) return

        try {
            await createBook(USER_ID, name)
            loadBooks()
        } catch (e) {
            alert('创建失败: ' + e.message)
        }
    }

    return (
        <div className="page book-list-page">
            <div className="header">
                <h1>我的账本</h1>
                <button className="user-btn" onClick={handleLogout}><LogOut size={20} color="#666" /></button>
            </div>

            <div className="book-grid">
                {books.map(book => (
                    <div key={book.id} className="book-card" onClick={() => handleOpenBook(book)}>
                        <div className="book-cover">{book.cover}</div>
                        <div className="book-info">
                            <span className="book-name">{book.name}</span>
                            <span className="book-date">{new Date(book.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}

                <div className="book-card add-card" onClick={handleCreateBook}>
                    <Plus size={32} color="#ccc" />
                    <span className="add-text">新建账本</span>
                </div>
            </div>

            <style>{`
                .book-list-page {
                    background: #f5f6fa;
                    min-height: 100vh;
                    padding: 20px;
                }
                .header {
                    display: flex; justify-content: space-between; align-items: center;
                    margin-bottom: 30px; padding-top: var(--safe-area-top);
                }
                .header h1 { font-size: 24px; color: #333; }
                
                .book-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
                    gap: 20px;
                }

                .book-card {
                    background: #fff;
                    border-radius: 16px;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                    cursor: pointer;
                    transition: transform 0.1s;
                }
                .book-card:active { transform: scale(0.98); }

                .book-cover {
                    font-size: 48px;
                    width: 80px; height: 100px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 8px;
                    display: flex; align-items: center; justify-content: center;
                    color: #fff;
                    box-shadow: 2px 4px 8px rgba(0,0,0,0.2);
                }

                .book-info {
                    display: flex; flex-direction: column; align-items: center;
                }
                .book-name { font-size: 15px; font-weight: 600; color: #333; }
                .book-date { font-size: 11px; color: #999; margin-top: 4px; }

                .add-card {
                    border: 2px dashed #ddd;
                    background: none;
                    box-shadow: none;
                    justify-content: center;
                }
                .add-text { color: #999; font-size: 14px; }
            `}</style>
        </div>
    )
}

export default BookList
