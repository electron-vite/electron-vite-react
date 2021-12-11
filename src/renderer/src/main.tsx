import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './samples/electron-store'
import './index.css'

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

// Use ipcRenderer.on
window.bridge.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args)
})
