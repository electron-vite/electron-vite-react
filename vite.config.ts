import { rmSync } from 'fs'
import { join } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron/renderer'

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
        vite: {
          build: {
            sourcemap: false,
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload scripts here
          splash: join(__dirname, 'electron/preload/splash.ts'),
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
          }
        },
      },
    }),
    // Enables use of Node.js API in the Renderer-process
    renderer(),
  ]
})
