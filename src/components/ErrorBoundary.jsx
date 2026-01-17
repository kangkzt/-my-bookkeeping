import { Component } from 'react'

/**
 * ErrorBoundary - 全局错误边界组件
 * 
 * 捕获子组件树中的 JavaScript 错误，防止整个应用崩溃
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)
        this.setState({ errorInfo })
    }

    handleReload = () => {
        window.location.reload()
    }

    handleGoHome = () => {
        window.location.href = '/'
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={styles.container}>
                    <div style={styles.icon}>😵</div>
                    <h2 style={styles.title}>哎呀，出错了</h2>
                    <p style={styles.message}>
                        应用遇到了一些问题，请尝试刷新页面
                    </p>
                    <div style={styles.buttons}>
                        <button style={styles.primaryBtn} onClick={this.handleReload}>
                            刷新页面
                        </button>
                        <button style={styles.secondaryBtn} onClick={this.handleGoHome}>
                            返回首页
                        </button>
                    </div>
                    {process.env.NODE_ENV === 'development' && (
                        <details style={styles.details}>
                            <summary>错误详情 (开发模式)</summary>
                            <pre style={styles.pre}>
                                {this.state.error?.toString()}
                                {this.state.errorInfo?.componentStack}
                            </pre>
                        </details>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: '#f5f6fa',
        textAlign: 'center'
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px'
    },
    title: {
        fontSize: '20px',
        fontWeight: 600,
        color: '#333',
        margin: '0 0 8px'
    },
    message: {
        fontSize: '14px',
        color: '#666',
        margin: '0 0 24px'
    },
    buttons: {
        display: 'flex',
        gap: '12px'
    },
    primaryBtn: {
        padding: '12px 24px',
        background: '#1677ff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer'
    },
    secondaryBtn: {
        padding: '12px 24px',
        background: '#f0f0f0',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        fontSize: '14px',
        cursor: 'pointer'
    },
    details: {
        marginTop: '24px',
        textAlign: 'left',
        width: '100%',
        maxWidth: '500px'
    },
    pre: {
        background: '#1a1a1a',
        color: '#ff6b6b',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '12px',
        overflow: 'auto',
        maxHeight: '200px'
    }
}

export default ErrorBoundary
