import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vite.dev/config/

const backendUrl = 'http://localhost:4433';

export default defineConfig({
  plugins: [react()],
  server: {
    // Add the 'server' configuration object
    proxy: {

      // This proxies any request starting with /api to the backend URL
      '/api': {
        target: backendUrl,
        changeOrigin:
            true,       // Needed for virtual hosted sites/correct host header
        secure: false,  // If using self-signed HTTPS cert on backend
      },
      '/uploads': {
        // New rule for image uploads folder
        target: backendUrl,
        changeOrigin: true,
        secure: false,  // If using self-signed HTTPS cert
      }
    },
  }
})