-- =========================================
-- Quick Bookkeeping - Supabase 数据库迁移脚本
-- =========================================
-- 请在 Supabase Dashboard -> SQL Editor 中执行此脚本
-- https://supabase.com/dashboard/project/ltfomzjfprjndgnxcwuu/sql

-- 1. 交易记录表
CREATE TABLE IF NOT EXISTS transactions (
    id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    device_id TEXT,
    type TEXT CHECK (type IN ('expense', 'income', 'transfer')),
    amount DECIMAL(12,2) NOT NULL,
    category_id BIGINT,
    account_id BIGINT,
    to_account_id BIGINT,
    person_id BIGINT,
    merchant TEXT,
    project TEXT,
    sub_category TEXT,
    remark TEXT,
    date TIMESTAMPTZ,
    balance_type TEXT,
    is_deleted SMALLINT DEFAULT 0,
    synced SMALLINT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 账户表
CREATE TABLE IF NOT EXISTS accounts (
    id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    device_id TEXT,
    name TEXT NOT NULL,
    icon TEXT,
    type TEXT,
    balance DECIMAL(12,2) DEFAULT 0,
    color TEXT,
    sort_order INT DEFAULT 0,
    is_deleted SMALLINT DEFAULT 0,
    synced SMALLINT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 分类表
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    device_id TEXT,
    name TEXT NOT NULL,
    icon TEXT,
    color TEXT,
    type TEXT CHECK (type IN ('expense', 'income')),
    "group" TEXT,
    sort_order INT DEFAULT 0,
    is_deleted SMALLINT DEFAULT 0,
    synced SMALLINT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 标签表
CREATE TABLE IF NOT EXISTS tags (
    id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    device_id TEXT,
    name TEXT NOT NULL,
    color TEXT,
    is_deleted SMALLINT DEFAULT 0,
    synced SMALLINT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. 成员表
CREATE TABLE IF NOT EXISTS persons (
    id BIGINT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    device_id TEXT,
    name TEXT NOT NULL,
    avatar TEXT,
    is_deleted SMALLINT DEFAULT 0,
    synced SMALLINT DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- 创建索引 (优化查询性能)
-- =========================================

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_updated_at ON transactions(updated_at);

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_tags_user_id ON tags(user_id);
CREATE INDEX IF NOT EXISTS idx_persons_user_id ON persons(user_id);

-- =========================================
-- 启用行级别安全 (RLS)
-- =========================================

ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;

-- =========================================
-- 创建 RLS 策略 (用户只能访问自己的数据)
-- =========================================

-- Transactions 策略
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own transactions" ON transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own transactions" ON transactions
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own transactions" ON transactions
    FOR DELETE USING (auth.uid() = user_id);

-- Accounts 策略
CREATE POLICY "Users can view own accounts" ON accounts
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own accounts" ON accounts
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own accounts" ON accounts
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own accounts" ON accounts
    FOR DELETE USING (auth.uid() = user_id);

-- Categories 策略
CREATE POLICY "Users can view own categories" ON categories
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own categories" ON categories
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own categories" ON categories
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own categories" ON categories
    FOR DELETE USING (auth.uid() = user_id);

-- Tags 策略
CREATE POLICY "Users can view own tags" ON tags
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own tags" ON tags
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own tags" ON tags
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own tags" ON tags
    FOR DELETE USING (auth.uid() = user_id);

-- Persons 策略
CREATE POLICY "Users can view own persons" ON persons
    FOR SELECT USING (auth.uid() = user_id);
    
CREATE POLICY "Users can insert own persons" ON persons
    FOR INSERT WITH CHECK (auth.uid() = user_id);
    
CREATE POLICY "Users can update own persons" ON persons
    FOR UPDATE USING (auth.uid() = user_id);
    
CREATE POLICY "Users can delete own persons" ON persons
    FOR DELETE USING (auth.uid() = user_id);

-- =========================================
-- 完成!
-- =========================================
-- 执行完毕后，您的 Supabase 项目将具备以下功能:
-- 1. 5 张数据表 (transactions, accounts, categories, tags, persons)
-- 2. 索引优化
-- 3. 行级别安全策略 (RLS)
-- 4. 用户只能访问和修改自己的数据
