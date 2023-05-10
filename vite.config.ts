import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
      emptyOutDir: true,
    assetsInlineLimit: 4096 * 300
  },
  plugins: [react()],

})
