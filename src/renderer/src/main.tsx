import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    window.bridge.removeLoading()
  },
)

// -----------------------------------------------------------

console.log('contextBridge ->', window.bridge)

// Use 'electron-store'
const store = {
  async get(key: string) {
    const { invoke } = window.bridge.ipcRenderer
    let value = await invoke('electron-store', 'get', key)
    try {
      value = JSON.parse(value)
    } finally {
      return value
    }
  },
  async set(key: string, value: any) {
    const { invoke } = window.bridge.ipcRenderer
    let val = value
    try {
      if (value && typeof value === 'object') {
        val = JSON.stringify(value)
      }
    } finally {
      await invoke('electron-store', 'set', key, val)
    }
  },
};

(async () => {
  await store.set('Date.now', Date.now())
  console.log('electron-store ->', 'Date.now:', await store.get('Date.now'))
  console.log('electron-store ->', 'path:', await window.bridge.ipcRenderer.invoke('electron-store', 'path'))
})();
