import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import resolve from 'vite-plugin-resolve'
import pkg from '../package.json'

// https://vitejs.dev/config/
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: join(__dirname, '../src/renderer'),
  plugins: [
    react(),
    resolve({
      electron: 'export default require("electron");',
    }),
  ],
  base: './',
  build: {
    emptyOutDir: true,
    outDir: '../../dist/renderer',
  },
  resolve: {
    alias: {
      '@': join(__dirname, '../src/renderer/src'),
      'src': join(__dirname, '../src'),
    },
  },
  server: {
    host: pkg.env.HOST,
    port: pkg.env.PORT,
  },
  optimizeDeps: {
    exclude: ['electron'],
  }
})
