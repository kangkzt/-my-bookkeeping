import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../db/global'

function Login() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!username || !password) {
            return setError('请输入用户名和密码')
        }

        try {
            let user
            if (isRegister) {
                user = await registerUser(username, password)
            } else {
                user = await loginUser(username, password)
            }

            // Save User Session
            localStorage.setItem('user_id', user.id)
            localStorage.setItem('username', user.username)

            // Redirect to Book List
            navigate('/books')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="logo">💰</div>
                <h1>极速记账</h1>
                <p className="subtitle">{isRegister ? '注册新账号，开启财富之旅' : '欢迎回来，登录您的账号'}</p>

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
            </div>

            <style>{`
                .login-page {
                    height: 100vh;
                    display: flex; align-items: center; justify-content: center;
                    background: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
                    padding: 20px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
                .login-card {
                    background: rgba(255, 255, 255, 0.95);
                    padding: 40px 30px;
                    border-radius: 24px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.08);
                    width: 100%;
                    max-width: 360px;
                    display: flex; flex-direction: column; align-items: center;
                    backdrop-filter: blur(10px);
                }
                .logo { 
                    font-size: 56px; 
                    margin-bottom: 16px; 
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
                    transition: transform 0.3s ease;
                }
                .logo:hover { transform: scale(1.1) rotate(5deg); }
                h1 { 
                    font-size: 26px; 
                    color: #2c3e50; 
                    margin-bottom: 8px; 
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .subtitle { 
                    color: #7f8c8d; 
                    margin-bottom: 32px; 
                    font-size: 14px; 
                }
                
                .error-msg {
                    background: #ffecb3; 
                    color: #d35400;
                    padding: 12px; 
                    border-radius: 12px; 
                    font-size: 13px;
                    width: 100%; 
                    margin-bottom: 20px; 
                    text-align: center;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 500;
                }

                form { width: 100%; display: flex; flex-direction: column; gap: 20px; }
                
                .input-group input {
                    width: 100%;
                    padding: 16px; 
                    border: 2px solid transparent; 
                    border-radius: 16px;
                    background: #f0f2f5; 
                    outline: none; 
                    transition: all 0.3s ease;
                    font-size: 15px;
                    color: #34495e;
                    box-sizing: border-box;
                }
                .input-group input:focus { 
                    border-color: #4CAF50; 
                    background: #fff; 
                    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.1);
                }
                .input-group input::placeholder { color: #aab7b8; }
                
                .submit-btn {
                    padding: 16px; 
                    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); 
                    color: #fff;
                    border: none; 
                    border-radius: 16px; 
                    font-weight: 700; 
                    font-size: 16px;
                    cursor: pointer; 
                    transition: all 0.3s ease;
                    box-shadow: 0 10px 20px rgba(67, 233, 123, 0.3);
                    text-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }
                .submit-btn:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(67, 233, 123, 0.4);
                }
                .submit-btn:active { transform: translateY(0); }

                .toggle-link {
                    margin-top: 24px; 
                    color: #95a5a6; 
                    font-size: 14px; 
                    cursor: pointer;
                    transition: color 0.2s;
                    user-select: none;
                }
                .toggle-link:hover { color: #4CAF50; text-decoration: underline; }
            `}</style>
        </div>
    )
}

export default Login
