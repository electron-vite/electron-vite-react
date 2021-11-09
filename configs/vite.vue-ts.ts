import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import pkg from '../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, '../src/react-ts'),
  plugins: [react()],
  base: './',
  build: {
    emptyOutDir: true,
    minify: false,
    outDir: join(__dirname, '../dist/react-ts'),
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
})
