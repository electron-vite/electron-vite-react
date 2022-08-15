import { rmSync } from 'fs'
import path from 'path'
import {
  type Plugin,
  type UserConfig,
  defineConfig,
} from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import pkg from './package.json'

rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true }) // v14.14.0

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
      main: {
        entry: 'electron/main/index.ts',
        vite: withDebug({
          build: {
            outDir: 'dist/electron/main',
          },
        }),
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          index: path.join(__dirname, 'electron/preload/index.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/electron/preload',
          }
        },
      },
      // Enables use of Node.js API in the Electron-Renderer
      // https://github.com/electron-vite/vite-plugin-electron/tree/main/packages/electron-renderer#electron-renderervite-serve
      renderer: {},
    }),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
  build: {
    minify: false
  }
})

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    config.build.sourcemap = true
    config.plugins = (config.plugins || []).concat({
      name: 'electron-vite-debug',
      configResolved(config) {
        const index = config.plugins.findIndex(p => p.name === 'electron-main-watcher');
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins as Plugin[]).splice(index, 1)
      },
    })
  }
  return config
}
