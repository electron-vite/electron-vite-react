import { useState } from 'react'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <img src="./logo.svg" className="logo" alt="Vite logo" />
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
