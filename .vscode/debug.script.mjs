import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'
import { build, createServer } from 'vite'

const pkg = createRequire(import.meta.url)('../package.json')
const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function startDebug() {
  const server = await createServer({ configFile: 'packages/renderer/vite.config.ts' })

  await server.listen()

  await build({
    configFile: 'packages/preload/vite.config.ts',
    build: {
      watch: true,
      sourcemap: true,
    },
    mode: 'development',
  })

  await build({
    configFile: 'packages/main/vite.config.ts',
    build: {
      watch: true,
      sourcemap: true,
    },
    mode: 'development',
    plugins: [{
      name: 'electron-preload-watcher',
      writeBundle() {
        server.ws.send({ type: 'full-reload' })
      },
    }],
  })
}

function writeEnvLocal() {
  const envContent = Object.entries(pkg.env).map(([key, val]) => `${key}=${val}`)
  fs.writeFileSync(path.join(__dirname, '.env'), envContent.join('\n'))
}

// bootstrap
writeEnvLocal()
startDebug()
