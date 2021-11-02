process.env.NODE_ENV = 'development'

import { join } from 'path'
import electron from 'electron'
import { spawn, ChildProcess } from 'child_process'
import { createServer as createViteServer } from 'vite'
import { RollupWatcher, RollupWatcherEvent, watch } from 'rollup'
import WebSocket from 'ws'
import chalk from 'chalk'
import pkg from '../package.json'
import {
  mainOptions,
  preloadOptions,
} from './utils'
import { createWsServer, formatWsSendData } from './ws'

const TAG = chalk.bgGray('[dev.ts]')

function eventHandle(ev: RollupWatcherEvent) {
  if (ev.code === 'ERROR') {
    console.error(TAG, chalk.red(ev.error))
  } else if (ev.code === 'BUNDLE_START') {
    console.log(TAG, chalk.blue(`Rebuild - ${ev.output}`))
  }
}

function watchMain(): RollupWatcher {
  let electronProcess: ChildProcess | null = null

  return watch(mainOptions())
    .on('event', ev => {
      if (ev.code === 'END') {
        electronProcess && electronProcess.kill()
        electronProcess = spawn(
          electron as unknown as string,
          [join(__dirname, '..', pkg.main)],
          { stdio: 'inherit', env: Object.assign(process.env, pkg.env) },
        )
      } else if (ev.code === 'ERROR') {
        electronProcess && electronProcess.kill()
        electronProcess = null
      }

      eventHandle(ev)
    })
}

function watchPreload(): RollupWatcher {
  const wssObj = createWsServer({ TAG })

  return watch(preloadOptions())
    .on('event', ev => {
      if (ev.code === 'END') {
        // Hot reload renderer process !!!
        if (wssObj.instance?.readyState === WebSocket.OPEN) {
          console.log(TAG, chalk.yellow('Hot reload renderer process'))
          wssObj.instance.send(formatWsSendData({ cmd: 'reload', data: Date.now() }))
        }
      }

      eventHandle(ev)
    })
}

; (async () => {
  try {
    const server = await (await createViteServer({
      root: join(__dirname, '../react-ts'),
      configFile: join(__dirname, '../react-ts/vite.config.ts'),
    })).listen()
    const { host = '127.0.0.1', port = 3000 } = server.config.server

    console.log(TAG, chalk.yellow(`Server run at - http://${host}:${port}`))

    watchPreload()
    watchMain()
  } catch (error) {
    console.error(TAG, chalk.red(error))
  }
})();
