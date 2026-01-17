import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 3000,
    host: true
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
        // 代码分割优化 - 减小主包体积
        manualChunks: {
          // React 核心库
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // 图表库 (较大)
          charts: ['chart.js', 'react-chartjs-2'],
          // 数据库 & 工具库
          db: ['idb', 'papaparse'],
          // OCR (可延迟加载)
          ocr: ['tesseract.js']
        }
      }
    }
  },
  resolve: {
    preserveSymlinks: true
  }
})
