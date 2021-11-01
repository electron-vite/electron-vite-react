import { app, BrowserWindow } from 'electron'

const WINDOWS: Record<string, BrowserWindow | null> = {
  main: null,
  win1: null,
}

function mainWin() {
  WINDOWS.main = new BrowserWindow({
    title: 'Main window',
  })

  if (app.isPackaged) {
    WINDOWS.main.loadFile('')
  } else {
    WINDOWS.main.loadURL(`http://127.0.0.1:${process.env.PORT}`)
  }

}

app.whenReady().then(mainWin)
app.on('window-all-closed', () => {
  Object.keys(WINDOWS).forEach((key) => WINDOWS[key] = null)
})
