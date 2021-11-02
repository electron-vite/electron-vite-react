import fs from 'fs'
import path from 'path'
import { contextBridge, ipcRenderer } from 'electron'
import { domReady, injectWsCode } from './utils'
import { useLoading } from './loading'

const isDev = process.env.NODE_ENV === 'development'
const { appendLoading, removeLoading } = useLoading()

; (async () => {
  await domReady()

  appendLoading()
  isDev && injectWsCode({
    host: '127.0.0.1',
    port: process.env.PORT_WS as string,
  })
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
