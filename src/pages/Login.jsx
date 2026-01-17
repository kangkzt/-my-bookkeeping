import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../db/global'
import { secureStorage } from '../utils/secureStorage'
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera'
import { Camera as CameraIcon, Plus, ChevronLeft, ChevronRight, Wallet, PieChart, TrendingUp, Shield } from 'lucide-react'

// 轮播广告数据
const SLIDES = [
    {
        icon: Wallet,
        title: '智玺云簿',
        desc: '智驭财富，玺墨金典',
        color: '#D4AF37'
    },
    {
        icon: PieChart,
        title: '智能分析',
        desc: '可视化图表一目了然',
        color: '#FF6B6B'
    },
    {
        icon: TrendingUp,
        title: '财富增长',
        desc: '科学理财，积少成多',
        color: '#FFB800'
    },
    {
        icon: Shield,
        title: '安全可靠',
        desc: '本地存储，隐私无忧',
        color: '#667EEA'
    }
]

function Login() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
    const [error, setError] = useState('')
    const [currentSlide, setCurrentSlide] = useState(0)

    // 自动轮播
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % SLIDES.length)
        }, 3000)
        return () => clearInterval(timer)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!username || !password) {
            return setError('请输入用户名和密码')
        }

        try {
            let user
            if (isRegister) {
                user = await registerUser(username, password, avatar)
            } else {
                user = await loginUser(username, password)
            }

            await secureStorage.set('user_id', user.id)
            await secureStorage.set('username', user.username)
            navigate('/books')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleAvatarClick = async () => {
        try {
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.Base64,
                source: CameraSource.Prompt,
                saveToGallery: false,
                direction: CameraDirection.Front
            })
            setAvatar(`data:image/jpeg;base64,${image.base64String}`)
        } catch (e) {
            console.log('Camera cancelled', e)
        }
    }

    return (
        <div className="login-page">
            {/* 顶部轮播区域 */}
            <div className="carousel-section">
                <div className="carousel-container">
                    {SLIDES.map((slide, index) => (
                        <div
                            key={index}
                            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                        >
                            <div className="slide-icon" style={{ background: slide.color }}>
                                <slide.icon size={36} color="#fff" strokeWidth={1.5} />
                            </div>
                            <h2 className="slide-title">{slide.title}</h2>
                            <p className="slide-desc">{slide.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="carousel-dots">
                    {SLIDES.map((_, index) => (
                        <div
                            key={index}
                            className={`dot ${index === currentSlide ? 'active' : ''}`}
                            onClick={() => setCurrentSlide(index)}
                        />
                    ))}
                </div>
            </div>

            {/* 登录卡片 */}
            <div className="login-card">
                {/* Logo 和标题 */}
                <div className="brand-section">
                    <div className="app-logo">
                        <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', borderRadius: 16 }} />
                    </div>
                    <h1 className="app-name">智玺云簿</h1>
                    <p className="tagline">
                        {isRegister ? '开启您的智享财务之旅 ✨' : '智驭财富 · 玺墨金典'}
                    </p>
                </div>

                {error && <div className="error-msg">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="用户名"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="密码"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-btn">
                        {isRegister ? '立即注册' : '登 录'}
                    </button>
                </form>

                <div className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
                    {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
                </div>

                {/* 底部引导词 */}
                <div className="bottom-tips">
                    <span>🔒 数据本地存储</span>
                    <span>📊 智能统计分析</span>
                    <span>🎯 预算目标管理</span>
                </div>
            </div>

            <style>{`
                .login-page {
                    min-height: 100vh;
                    min-height: 100dvh;
                    display: flex;
                    flex-direction: column;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
                    padding: 0;
                    overflow: hidden;
                }

                /* 轮播区域 */
                .carousel-section {
                    flex: 0 0 auto;
                    padding: 40px 20px 30px;
                    padding-top: calc(40px + env(safe-area-inset-top, 0));
                }

                .carousel-container {
                    position: relative;
                    height: 140px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .carousel-slide {
                    position: absolute;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    opacity: 0;
                    transform: translateX(30px);
                    transition: all 0.5s ease;
                    pointer-events: none;
                }

                .carousel-slide.active {
                    opacity: 1;
                    transform: translateX(0);
                    pointer-events: auto;
                }

                .slide-icon {
                    width: 72px;
                    height: 72px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 12px;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
                }

                .slide-title {
                    color: #fff;
                    font-size: 22px;
                    font-weight: 700;
                    margin: 0 0 6px;
                    text-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }

                .slide-desc {
                    color: rgba(255,255,255,0.9);
                    font-size: 14px;
                    margin: 0;
                }

                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-top: 16px;
                }

                .dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 4px;
                    background: rgba(255,255,255,0.4);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .dot.active {
                    width: 24px;
                    background: #fff;
                }

                /* 登录卡片 */
                .login-card {
                    flex: 1;
                    background: #fff;
                    border-radius: 32px 32px 0 0;
                    padding: 32px 24px;
                    padding-bottom: calc(32px + env(safe-area-inset-bottom, 0));
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
                }

                .brand-section {
                    text-align: center;
                    margin-bottom: 24px;
                }

                .app-logo {
                    width: 72px;
                    height: 72px;
                    background: white;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
                }

                .logo-icon {
                    font-size: 36px;
                }

                .app-name {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin: 0 0 8px;
                }

                .tagline {
                    color: #888;
                    font-size: 14px;
                    margin: 0;
                }

                .error-msg {
                    background: #FEF2F2;
                    color: #EF4444;
                    padding: 12px 16px;
                    border-radius: 12px;
                    font-size: 13px;
                    width: 100%;
                    margin-bottom: 16px;
                    text-align: center;
                    font-weight: 500;
                    border: 1px solid #FECACA;
                }

                form {
                    width: 100%;
                    max-width: 320px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .input-group input {
                    width: 100%;
                    padding: 16px 20px;
                    border: 2px solid #f0f0f0;
                    border-radius: 14px;
                    background: #fafafa;
                    outline: none;
                    transition: all 0.2s ease;
                    font-size: 16px;
                    color: #333;
                    box-sizing: border-box;
                }

                .input-group input:focus {
                    border-color: #4ECDC4;
                    background: #fff;
                    box-shadow: 0 0 0 4px rgba(78, 205, 196, 0.15);
                }

                .input-group input::placeholder {
                    color: #bbb;
                }

                .submit-btn {
                    padding: 16px;
                    background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
                    color: #fff;
                    border: none;
                    border-radius: 14px;
                    font-weight: 700;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
                    margin-top: 8px;
                }

                .submit-btn:active {
                    transform: scale(0.98);
                }

                .toggle-link {
                    margin-top: 20px;
                    color: #888;
                    font-size: 14px;
                    cursor: pointer;
                    transition: color 0.2s;
                }

                .toggle-link:hover {
                    color: #4ECDC4;
                }

                .bottom-tips {
                    margin-top: auto;
                    padding-top: 24px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 16px;
                    color: #aaa;
                    font-size: 12px;
                }

                .bottom-tips span {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
            `}</style>
        </div>
    )
}

export default Login
