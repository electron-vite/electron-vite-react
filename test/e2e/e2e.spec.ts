import path from 'node:path'
import { spawn, type ChildProcess } from 'node:child_process'
import {
  type ElectronApplication,
  type Page,
  type JSHandle,
  expect,
  test,
  _electron as electron,
} from '@playwright/test'
import type { BrowserWindow } from 'electron'

const root = path.resolve(import.meta.dirname, '..', '..')
let electronApp: ElectronApplication
let page: Page
let xvfbProcess: ChildProcess | undefined

function startXvfbOnLinux(): Promise<void> {
  if (process.platform !== 'linux' || process.env.DISPLAY) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    xvfbProcess = spawn('Xvfb', [':99', '-screen', '0', '1280x720x24', '-ac'], {
      stdio: 'ignore',
      detached: true,
    })

    xvfbProcess.once('error', reject)

    setTimeout(() => {
      process.env.DISPLAY = ':99'
      resolve()
    }, 500)
  })
}

test.beforeAll(async () => {
  test.setTimeout(30000)
  await startXvfbOnLinux()

  electronApp = await electron.launch({
    args: ['.', '--no-sandbox'],
    cwd: root,
    env: { ...process.env, NODE_ENV: 'development' },
  })
  page = await electronApp.firstWindow()

  const mainWin: JSHandle<BrowserWindow> = await electronApp.browserWindow(page)
  await mainWin.evaluate(async (win) => {
    win.webContents.executeJavaScript('console.log("Execute JavaScript with e2e testing.")')
  })
})

test.afterAll(async () => {
  if (page) {
    await page.screenshot({ path: 'test/screenshots/e2e.png' })
    await page.close()
  }

  if (electronApp) {
    await electronApp.close()
  }

  if (xvfbProcess?.pid) {
    process.kill(-xvfbProcess.pid)
    xvfbProcess = undefined
  }
})

test.describe('[electron-vite-react] e2e tests', () => {
  test('startup', async () => {
    const title = await page.title()
    expect(title).toBe('Electron + Vite + React')
  })

  test('should be home page is load correctly', async () => {
    const h1 = await page.$('h1')
    const title = await h1?.textContent()
    expect(title).toBe('A sharp starter with Tailwind-first styling.')
  })

  test('should be count button can click', async () => {
    const countButton = await page.$('button:has-text("Increment counter")')
    const countValue = await page.$('div.text-5xl')

    const valueBeforeClick = await countValue?.textContent()
    expect(valueBeforeClick).toBe('0')

    await countButton?.click()

    const valueAfterClick = await countValue?.textContent()
    expect(valueAfterClick).toBe('1')
  })
})
