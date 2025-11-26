import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from './context/AppContext'

import './index.css'


// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
