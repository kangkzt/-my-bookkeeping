import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/index.css'

// Suppress React DevTools message
const originalInfo = console.info;
console.info = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Download the React DevTools')) return;
    originalInfo(...args);
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)
