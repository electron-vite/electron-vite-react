process.env.NODE_ENV = 'production'

import { build as viteBuild } from 'vite'
import chalk from 'chalk'

const TAG = chalk.bgBlue('[build.mjs]')

const viteConfigs = {
  main: 'configs/vite.main.ts',
  preload: 'configs/vite.preload.ts',
  renderer: 'configs/vite.renderer.ts',
}

async function buildElectron() {
  for (const [name, configPath] of Object.entries(viteConfigs)) {
    console.group(TAG, name)
    await viteBuild({
      configFile: configPath,
      mode: process.env.NODE_ENV,
    })
    console.groupEnd()
    console.log() // for beautiful log.
  }
}

// bootstrap
await buildElectron()
