import { defineConfig, UserConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist',
    emptyOutDir: true,
    assetsInlineLimit: 4096 * 300
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
} satisfies UserConfig)
