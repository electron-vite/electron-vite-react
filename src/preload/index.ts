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
  ipcRenderer: withPrototype(ipcRenderer),
  removeLoading,
})

// `exposeInMainWorld` can not detect `prototype` attribute and methods, manually patch it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.entries(Object.getPrototypeOf(obj))
  for (const [key, value] of protos) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof value === 'function') {
        // Some native API not work Renderer-process, like `NodeJS.EventEmitter['on']`. Wrap a function patch it.
        obj[key] = function (...args: any) {
          return value.call(obj, ...args)
        }
      } else {
        Object.assign(obj, { [key]: value })
      }
    }
  }
  return obj
}
