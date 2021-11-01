import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    minify: false,
    outDir: join(process.cwd(), 'dist/react-ts'),
  },
})
