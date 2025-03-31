import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
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
        '/cpi': {
          target: 'https://cz9nnvaeqa.execute-api.ap-southeast-1.amazonaws.com',
          changeOrigin: !isProduction,
        },
      },
    }
  };
});