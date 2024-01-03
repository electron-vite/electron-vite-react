import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './index.css'

// `nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
// import './demos/ipc'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
