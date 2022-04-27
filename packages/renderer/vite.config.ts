import { join } from 'path'
import { builtinModules } from 'module'
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import optimizer from 'vite-plugin-optimizer'
import resolve from 'vite-plugin-resolve'
import pkg from '../../package.json'

/**
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
  mode: process.env.NODE_ENV,
  root: __dirname,
  plugins: [
    react(),
    electron(),
    resolve({
      /**
       * Here you resolve some CommonJs module.
       * Or some Node.js native modules they may not be built correctly by vite.
       * At the same time, these modules should be put in `dependencies`,
       * because they will not be built by vite, but will be packaged into `app.asar` by electron-builder
       */
      // ESM format code snippets
      'electron-store': 'export default require("electron-store");',
      // Node.js native module
      serialport: `
        const { SerialPort } = require("serialport");
        export { SerialPort }
      `,
    }),
  ],
  base: './',
  build: {
    outDir: '../../dist/renderer',
    emptyOutDir: true,
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src'),
    },
  },
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
})

/**
 * For usage of Electron and NodeJS APIs in the Renderer process
 * @see https://github.com/caoxiemeihao/electron-vue-vite/issues/52
 */
export function electron(
  entries: Parameters<typeof optimizer>[0] = {}
): Plugin {
  const builtins = builtinModules.filter((t) => !t.startsWith('_'))

  /**
   * @see https://github.com/caoxiemeihao/vite-plugins/tree/main/packages/resolve#readme
   */
  return optimizer({
    electron: electronExport(),
    ...builtinModulesExport(builtins),
    ...entries,
  })

  function electronExport() {
    return `
/**
 * For all exported modules see https://www.electronjs.org/docs/latest/api/clipboard -> Renderer Process Modules
 */
const electron = require("electron");
const {
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
} = electron;

export {
  electron as default,
  clipboard,
  nativeImage,
  shell,
  contextBridge,
  crashReporter,
  ipcRenderer,
  webFrame,
  desktopCapturer,
  deprecate,
}
`
  }

  function builtinModulesExport(modules: string[]) {
    return modules
      .map((moduleId) => {
        const nodeModule = require(moduleId)
        const requireModule = `const M = require("${moduleId}");`
        const exportDefault = `export default M;`
        const exportMembers =
          Object.keys(nodeModule)
            .map((attr) => `export const ${attr} = M.${attr}`)
            .join(';\n') + ';'
        const nodeModuleCode = `
${requireModule}

${exportDefault}

${exportMembers}
`

        return { [moduleId]: nodeModuleCode }
      })
      .reduce((memo, item) => Object.assign(memo, item), {})
  }
}
