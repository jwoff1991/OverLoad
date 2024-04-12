import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // The output directory for build files
    assetsDir: 'assets', // The directory under outDir to place assets in
    
  },
  server: {
    proxy: {
        '/api': {
            target: 'http://127.0.0.1:5000',
            changeOrigin: true,
        },
    },
},
})
