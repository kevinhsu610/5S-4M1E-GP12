/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */
/** WARNING: DON'T EDIT THIS FILE */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// 获取插件配置
function getPlugins() {
  return [react(), tsconfigPaths()]
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: getPlugins(),
  build: {
    // 代码分割配置
    rollupOptions: {
      output: {
        manualChunks: {
          // 将大型依赖拆分为单独的chunk
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'recharts': ['recharts'],
          'framer-motion': ['framer-motion'],
          'sonner': ['sonner'],
        },
      },
    },
    // 优化构建速度
    cacheDir: '.vite-cache',
    // 生成源映射以帮助调试
    sourcemap: true,
  },
  // 开发服务器配置
  server: {
    // 启用热模块替换
    hmr: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'recharts', 'framer-motion', 'sonner'],
  },
});
