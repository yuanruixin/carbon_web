import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    // 代理配置
    open:true,
    proxy: {
      '/api': { 
        target: 'http://127.0.0.1:3007', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
      '/download': { 
        target: 'http://127.0.0.1:3007', // 目标地址 --> 服务器地址
        changeOrigin: true, // 允许跨域
      },
    }
  }
})


