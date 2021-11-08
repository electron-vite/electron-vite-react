import { join } from 'path'
import { app, BrowserWindow } from 'electron'

let win: BrowserWindow | null = null

async function mainWin() {
  win = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: join(__dirname, '../preload/index.cjs')
    },
  })

  if (app.isPackaged) {
    win.loadFile(join(__dirname, '../react-ts/index.html'))
  } else {
    const pkg = await import('../../package.json')
    const url = `http://${pkg.env.HOST || '127.0.0.1'}:${pkg.env.PORT}`

    win.loadURL(url)
    win.maximize()
  }
}

app.whenReady().then(mainWin)
app.on('window-all-closed', () => {
  win = null
  app.quit()
})
