import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL || 'http://localhost:3000',
          changeOrigin:true,
          secure: false,
          ws: true, 
        },
      },
    },
    plugins: [
      react(), 
      tailwindcss()
    ],
  };
})
