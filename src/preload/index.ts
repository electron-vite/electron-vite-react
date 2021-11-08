import fs from 'fs'
import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady } from './utils'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { appendLoading, removeLoading } = useLoading()

; (async () => {
  await domReady()

  appendLoading()
})();

// ---------------------------------------------------

contextBridge.exposeInMainWorld('bridge', {
  __dirname,
  __filename,
  fs,
  path,
  ipcRenderer,
  removeLoading,
})
