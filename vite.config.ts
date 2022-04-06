import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 8800,
    // proxy: {
    //   '/fm/': {
    //     target: 'http://192.168.31.54:3000/',
    //     pathRewrite: {
    //       '^/fm/': '/'
    //     }
    //   }
    // }
  }
})
