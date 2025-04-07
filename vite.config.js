import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env
  },
  plugins: [vue()],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  server: {
    proxy: {
      '/api_1': {
        target: 'https://cz9nnvaeqa.execute-api.ap-southeast-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api_1/, ''),
      },
      '/api_2': {
        target: 'https://1l67wgiui0.execute-api.ap-southeast-1.amazonaws.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api_2/, ''),
      },
    }
  },
})