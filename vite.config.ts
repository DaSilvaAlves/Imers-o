import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ISOLAMENTO TOTAL AI-VELOCITY-PROJECT
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    port: 5333, // Porta nova e livre
    strictPort: true,
    host: true, // Garante que localhost e 127.0.0.1 funcionam
  }
})
