import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/fabrica-2025",
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000
  },
})
