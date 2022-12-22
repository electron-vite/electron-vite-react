import { useState } from 'react'
import reactLogo from './assets/react.svg'
import electronLogo from './assets/electron.svg'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://www.electronjs.org/" target="_blank">
          <img src={electronLogo} className="logo" alt="Electron logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron, Vite and React logos to learn more
      </p>
      <div className="flex-center">
        Place static files into the<code>/public</code> folder <img style={{ width: "5em" }} src="/node.svg" alt="Node logo" />
      </div>
    </div>
  )
}

export default App
