import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    server: {
      port: 3000,
      open: true
    }
  }

  // Configuración de base path
  if (command === 'serve' || process.env.VERCEL) {
    config.base = '/'
  } else {
    // Base path para GitHub Pages
    config.base = '/KairosMix/'
  }

  return config
})
