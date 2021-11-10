import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

console.log('contextBridge ->', window.bridge)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
  () => {
    window.bridge.removeLoading()
  },
)
