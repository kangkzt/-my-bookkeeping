import { useState, useEffect } from 'react'
import { ArrowLeft, Plus, Trash2, Calendar, Check, X, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getDB } from '../db/database'
import { getAllCategories, getAllAccounts } from '../db/stores'

function Recurring() {
    const navigate = useNavigate()
    const [rules, setRules] = useState([])
    const [showModal, setShowModal] = useState(false)

    // Form State
    const [amount, setAmount] = useState('')
    const [remark, setRemark] = useState('')
    const [type, setType] = useState('expense')
    const [frequency, setFrequency] = useState('monthly') // monthly, yearly
    const [day, setDay] = useState(1)
    const [categoryId, setCategoryId] = useState(null)
    const [accountId, setAccountId] = useState(null)

    // Data Sources
    const [categories, setCategories] = useState([])
    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const db = getDB()
        const [cats, accs, allRules] = await Promise.all([
            getAllCategories(),
            getAllAccounts(),
            db.getAll('recurring_rules')
        ])
        setCategories(cats)
        setAccounts(accs)
        setRules(allRules || [])

        if (cats.length > 0) setCategoryId(cats[0].id)
        if (accs.length > 0) setAccountId(accs[0].id)
    }

    const handleSave = async () => {
        if (!amount || !categoryId || !accountId) return

        const rule = {
            type,
            amount: parseFloat(amount),
            remark: remark || (type === 'expense' ? '自动记账支出' : '自动记账收入'),
            frequency,
            day: Number(day),
            categoryId,
            accountId,
            lastRun: null, // Never run
            createdAt: new Date().toISOString()
        }

        const db = getDB()
        await db.add('recurring_rules', rule)
        setShowModal(false)
        loadData()
    }

    const handleDelete = async (id) => {
        if (!confirm('确定删除此规则吗？')) return
        const db = getDB()
        await db.delete('recurring_rules', id)
        loadData()
    }

    const currentCat = categories.find(c => c.id === categoryId)
    const currentAcc = accounts.find(a => a.id === accountId)

    return (
        <div className="page recurring-page">
            <div className="page-header">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>周期记账</h1>
                <button className="add-btn" onClick={() => setShowModal(true)}>
                    <Plus size={24} />
                </button>
            </div>

            <div className="page-content">
                <div className="rule-list">
                    {rules.map(rule => {
                        const cat = categories.find(c => c.id === rule.categoryId)
                        return (
                            <div key={rule.id} className="rule-item">
                                <div className="rule-icon" style={{ backgroundColor: cat?.color || '#ccc' }}>
                                    {cat?.icon || <RefreshCw size={20} />}
                                </div>
                                <div className="rule-info">
                                    <span className="rule-name">{rule.remark}</span>
                                    <span className="rule-desc">每月 {rule.day} 日 · ¥{rule.amount}</span>
                                </div>
                                <button className="delete-btn" onClick={() => handleDelete(rule.id)}>
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        )
                    })}

                    {rules.length === 0 && (
                        <div className="empty-state">
                            <RefreshCw size={48} color="#ddd" />
                            <p>暂无自动记账规则</p>
                            <button className="btn-primary" onClick={() => setShowModal(true)}>添加规则</button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>新建周期规则</h3>

                        <div className="form-group">
                            <label>类型</label>
                            <div className="radio-group">
                                <button className={type === 'expense' ? 'active' : ''} onClick={() => setType('expense')}>支出</button>
                                <button className={type === 'income' ? 'active' : ''} onClick={() => setType('income')}>收入</button>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>金额</label>
                            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" />
                        </div>

                        <div className="form-group">
                            <label>日期 (每月)</label>
                            <select value={day} onChange={e => setDay(e.target.value)}>
                                {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                                    <option key={d} value={d}>{d}日</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>备注</label>
                            <input type="text" value={remark} onChange={e => setRemark(e.target.value)} placeholder="例如：房租" />
                        </div>

                        <div className="form-group">
                            <label>分类</label>
                            <select value={categoryId} onChange={e => setCategoryId(Number(e.target.value))}>
                                {categories.filter(c => c.type === type).map(c => (
                                    <option key={c.id} value={c.id}>{c.icon} {c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>账户</label>
                            <select value={accountId} onChange={e => setAccountId(Number(e.target.value))}>
                                {accounts.map(a => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="modal-actions">
                            <button className="cancel" onClick={() => setShowModal(false)}>取消</button>
                            <button className="save" onClick={handleSave}>保存</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .recurring-page { background: #f5f6fa; min-height: 100vh; }
                .page-header { background: #fff; display: flex; justify-content: space-between; padding: 16px; align-items: center; padding-top: calc(16px + var(--safe-area-top)); }
                .page-header h1 { font-size: 18px; font-weight: 600; }
                .rule-list { padding: 16px; display: flex; flex-direction: column; gap: 12px; }
                .rule-item { background: #fff; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 12px; }
                .rule-icon { width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; }
                .rule-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
                .rule-name { font-weight: 500; color: #333; }
                .rule-desc { font-size: 13px; color: #999; }
                .delete-btn { color: #ccc; }
                .empty-state { text-align: center; padding: 40px; color: #999; display: flex; flex-direction: column; align-items: center; gap: 16px; }
                .btn-primary { background: #FFB800; color: #fff; border: none; padding: 10px 24px; border-radius: 20px; }
                
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; }
                .modal-content { background: #fff; width: 100%; max-width: 320px; border-radius: 16px; padding: 20px; }
                .modal-content h3 { text-align: center; margin-bottom: 20px; }
                .form-group { margin-bottom: 16px; }
                .form-group label { display: block; font-size: 13px; color: #666; margin-bottom: 6px; }
                .form-group input, .form-group select { width: 100%; padding: 8px; border: 1px solid #eee; border-radius: 8px; }
                .radio-group { display: flex; gap: 12px; }
                .radio-group button { flex: 1; padding: 8px; border: 1px solid #eee; border-radius: 8px; background: #fff; }
                .radio-group button.active { background: #e6f7ff; color: #1890ff; border-color: #1890ff; }
                
                .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
                .modal-actions button { flex: 1; padding: 10px; border-radius: 8px; border: none; font-weight: 500; }
                .cancel { background: #f5f5f5; color: #666; }
                .save { background: #FFB800; color: #fff; }
            `}</style>
        </div>
    )
}

export default Recurring
