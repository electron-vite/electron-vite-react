import { existsSync, rmSync } from 'fs'
import { join } from 'path'
import { defineConfig, UserConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import pkg from './package.json'

rmSync(join(__dirname, 'dist'), { recursive: true, force: true }) // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
      'styles': join(__dirname, 'src/assets/styles'),
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
          index: join(__dirname, 'electron/preload/index.ts'),
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
      renderer: {},
    }),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})

function withDebug(config: UserConfig): UserConfig {
  const debugFile = join(__dirname, 'node_modules/.electron-vite-debug')
  const isDebug = existsSync(debugFile)

  if (isDebug) {
    config.build.sourcemap = true
    config.plugins = (config.plugins || []).concat({
      name: 'electron-vite-debug',
      configResolved(config) {
        // TODO: when the next version of `vite-plugine-electron` is released, use the config hook.
        const index = config.plugins.findIndex(p => p.name === 'electron-main-watcher');
        (config.plugins as Plugin[]).splice(index, 1)
        rmSync(debugFile)
      },
    })
  }

  return config
}
