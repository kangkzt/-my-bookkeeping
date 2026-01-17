module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react', 'react-hooks'],
    settings: {
        react: {
            version: '18.2'
        }
    },
    rules: {
        // React 18 不需要显式导入 React
        'react/react-in-jsx-scope': 'off',
        // 暂时禁用 PropTypes 检查 (可后续启用 TypeScript)
        'react/prop-types': 'off',
        // 未使用变量警告
        'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        // 禁止 console (生产环境)
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        // Hooks 规则
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn'
    },
    ignorePatterns: ['dist/', 'node_modules/', '*.config.js']
}
