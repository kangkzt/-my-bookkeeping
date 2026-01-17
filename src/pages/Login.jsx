import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser, loginUser } from '../db/global'
import { secureStorage } from '../utils/secureStorage'
import { Camera, CameraResultType, CameraSource, CameraDirection } from '@capacitor/camera'
import { Camera as CameraIcon, Plus } from 'lucide-react'

function Login() {
    const navigate = useNavigate()
    const [isRegister, setIsRegister] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(null)
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
                user = await registerUser(username, password, avatar)
            } else {
                user = await loginUser(username, password)
            }

            // Save User Session (Secure)
            secureStorage.set('user_id', user.id)
            secureStorage.set('username', user.username)

            // Redirect to Book List
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
            <div className="login-card">
                <div className="avatar-container" onClick={handleAvatarClick}>
                    {avatar ? (
                        <>
                            <img src={avatar} alt="Avatar" className="avatar-img" />
                            <div className="avatar-edit-badge"><Plus size={14} color="#fff" strokeWidth={3} /></div>
                        </>
                    ) : (
                        <div className="avatar-placeholder">
                            <CameraIcon size={28} color="#fff" />
                            {isRegister && <span className="avatar-hint">自拍头像</span>}
                            {!isRegister && <span className="avatar-hint">点击设置</span>}
                        </div>
                    )}
                </div>
                <h1>快速记账</h1>
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
                    background: var(--bg-app);
                    padding: 20px;
                }
                .login-card {
                    background: rgba(255, 255, 255, 0.9);
                    padding: 40px 30px;
                    border-radius: 24px;
                    box-shadow: var(--shadow-float);
                    width: 100%;
                    max-width: 360px;
                    display: flex; flex-direction: column; align-items: center;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.6);
                }
                .avatar-container {
                    width: 96px; height: 96px;
                    border-radius: 50%;
                    background: var(--primary-gradient);
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 24px;
                    cursor: pointer;
                    box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                    overflow: hidden;
                    position: relative;
                    border: 3px solid #fff;
                    transition: transform 0.2s;
                }
                .avatar-container:active { transform: scale(0.95); }
                .avatar-img { width: 100%; height: 100%; object-fit: cover; }
                .avatar-placeholder { display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .avatar-hint { font-size: 10px; color: rgba(255,255,255,0.95); font-weight: 500; }
                .avatar-edit-badge {
                    position: absolute; bottom: 0; right: 0;
                    width: 24px; height: 24px;
                    background: #333; border-radius: 50%;
                    border: 2px solid #fff;
                    display: flex; align-items: center; justify-content: center;
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
                    color: var(--text-primary); 
                    margin-bottom: 8px; 
                    font-weight: 700;
                    letter-spacing: 1px;
                }
                .subtitle { 
                    color: var(--text-secondary); 
                    margin-bottom: 32px; 
                    font-size: 14px; 
                }
                
                .error-msg {
                    background: #FEF2F2; 
                    color: var(--expense);
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
                    border: 1px solid #FECACA;
                }

                form { width: 100%; display: flex; flex-direction: column; gap: 20px; }
                
                .input-group input {
                    width: 100%;
                    padding: 16px; 
                    border: 1px solid transparent; 
                    border-radius: 16px;
                    background: var(--bg-input); 
                    outline: none; 
                    transition: all 0.3s ease;
                    font-size: 15px;
                    color: var(--text-primary);
                    box-sizing: border-box;
                }
                .input-group input:focus { 
                    border-color: var(--primary); 
                    background: #fff; 
                    box-shadow: 0 0 0 4px var(--primary-shadow);
                }
                .input-group input::placeholder { color: var(--text-muted); }
                
                .submit-btn {
                    padding: 16px; 
                    background: var(--primary-gradient); 
                    color: #fff;
                    border: none; 
                    border-radius: 16px; 
                    font-weight: 700; 
                    font-size: 16px;
                    cursor: pointer; 
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 20px var(--primary-shadow);
                }
                .submit-btn:active { transform: scale(0.98); }

                .toggle-link {
                    margin-top: 24px; 
                    color: var(--text-muted); 
                    font-size: 14px; 
                    cursor: pointer;
                    transition: color 0.2s;
                    user-select: none;
                }
                .toggle-link:hover { color: var(--primary); }
            `}</style>
        </div>
    )
}

export default Login
