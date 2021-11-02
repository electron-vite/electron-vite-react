import { join } from 'path'
import { app, BrowserWindow } from 'electron'

const WINDOWS: Record<string, BrowserWindow | null> = {
  main: null,
  win1: null,
}

function mainWin() {
  WINDOWS.main = new BrowserWindow({
    title: 'Main window',
    webPreferences: {
      preload: join(__dirname, '../preload/index.main')
    },
  })

  if (app.isPackaged) {
    WINDOWS.main.loadFile(join(__dirname, '../react-ts/index.html'))
  } else {
    WINDOWS.main.loadURL(`http://127.0.0.1:${process.env.PORT}`)
    WINDOWS.main.maximize()
  }

}

app.whenReady().then(mainWin)
app.on('window-all-closed', () => {
  Object.keys(WINDOWS).forEach((key) => WINDOWS[key] = null)
})
