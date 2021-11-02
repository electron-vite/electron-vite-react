import { join } from 'path'
import { spawn, ChildProcess } from 'child_process'
import electron from 'electron'
import { RollupWatcher, RollupWatcherEvent, watch } from 'rollup'
import { createServer as createViteServer } from 'vite'
import pkg from '../package.json'
import {
  mainOptions,
  preloadOptions,
} from './utils'

const TAG = '[dev.ts]'

function eventHandle(ev: RollupWatcherEvent) {
  if (ev.code === 'ERROR') {
    console.error(TAG, ev.error)
  } else if (ev.code === 'BUNDLE_START') {
    console.log(TAG, `Rebuild - ${ev.output}`)
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
  return watch(preloadOptions())
    .on('event', ev => {
      if (ev.code === 'END') {
        // TODO Hot reload
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

    console.log(TAG, `Server run at - http://${host}:${port}`)

    watchPreload()
    watchMain()
  } catch (error) {
    console.error(TAG, error)
  }
})();
