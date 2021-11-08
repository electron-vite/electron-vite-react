process.env.NODE_ENV = 'production'

import { readFileSync } from 'fs'
import { join } from 'path'
import electron from 'electron'
import { spawn } from 'child_process'
import { createServer, build as viteBuild } from 'vite'
import chalk from 'chalk'

const TAG = chalk.bgGreen('[dev.mjs]')
const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))

/**
 * @param {{ name: string; configFile: string; writeBundle: import('rollup').OutputPlugin['writeBundle'] }} param0
 * @returns {import('rollup').RollupWatcher}
 */
function getWatcher({ name, configFile, writeBundle }) {
  return viteBuild({
    // Options here precedence over configFile
    build: {
      watch: {},
    },
    configFile,
    plugins: [
      { name, writeBundle },
    ],
  })
}

/**
 * @returns {Promise<import('rollup').RollupWatcher>}
 */
async function watchMain() {
  /**
   * @type {import('child_process').ChildProcessWithoutNullStreams | null}
   */
  let electronProcess = null

  /**
   * @type {import('rollup').RollupWatcher}
   */
  const watcher = await getWatcher({
    name: 'electron-main-watcher',
    configFile: 'src/main/vite.config.ts',
    writeBundle() {
      electronProcess && electronProcess.kill()
      electronProcess = spawn(electron, ['.'], {
        stdio: 'inherit',
        env: Object.assign(process.env, pkg.env), // Why don't work?
      })
    },
  })

  return watcher
}

/**
 * @param {import('vite').ViteDevServer} viteDevServer
 * @returns {Promise<import('rollup').RollupWatcher>}
 */
async function watchPreload(viteDevServer) {
  return getWatcher({
    name: 'electron-preload-watcher',
    configFile: 'src/preload/vite.config.ts',
    writeBundle() {
      viteDevServer.ws.send({
        type: 'full-reload',
      })
    },
  })
}

; (async () => {
  const viteDevServer = await createServer({ configFile: 'src/react-ts/vite.config.ts' })

  await viteDevServer.listen()

  await watchPreload(viteDevServer)
  await watchMain()
})()
