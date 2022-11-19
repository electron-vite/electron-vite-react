import { rmSync } from 'fs'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-electron-plugin'
import { customStart, loadViteEnv } from 'vite-electron-plugin/plugin'
import renderer from 'vite-plugin-electron-renderer'
import pkg from './package.json'

rmSync(path.join(__dirname, 'dist-electron'), { recursive: true, force: true })

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
      'styles': path.join(__dirname, 'src/assets/styles'),
    },
  },
  plugins: [
    react(),
    electron({
      include: [
        'electron',
        'preload',
      ],
      transformOptions: {
        sourcemap: !!process.env.VSCODE_DEBUG,
      },
      plugins: [
        ...(process.env.VSCODE_DEBUG
          ? [
            // Will start Electron via VSCode Debug
            customStart(debounce(() => console.log(/* For `.vscode/.debug.script.mjs` */'[startup] Electron App'))),
          ]
          : []),
        // Allow use `import.meta.env.VITE_SOME_KEY` in Electron-Main
        loadViteEnv(),
      ],
    }),
    // Use Node.js API in the Renderer-process
    renderer({
      nodeIntegration: true,
    }),
  ],
  server: process.env.VSCODE_DEBUG ? (() => {
    const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL)
    return {
      host: url.hostname,
      port: +url.port,
    }
  })() : undefined,
  clearScreen: false,
})

function debounce<Fn extends (...args: any[]) => void>(fn: Fn, delay = 299) {
  let t: NodeJS.Timeout
  return ((...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }) as Fn
}
