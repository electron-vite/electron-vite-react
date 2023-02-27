import nodeLogo from "./assets/node.svg"
import { useEffect, useRef, useState } from 'react'
import './App.scss'
import Update from "./pages/update"
import { ipcRenderer } from "electron"

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

interface checkUpdateType {
  checkUpdate: boolean
}

function App() {
  const [count, setCount] = useState(0)
  const ref =useRef<any>(null)
  const [checkBtnText, setCheckBtnText] = useState('check update')
  const [checkLoading, setCheckLoading] = useState(false)
  const [checkType, setCheckType] = useState(false)
  const [openModalType, setopenModalType] = useState(false)
  /**
   * @description 检查是否有新的更新 Listen for new updates
   */
  const checkUpdate = () => {
    setCheckLoading(true)
    setCheckBtnText('checking Update ...')
    ipcRenderer.send('check-update')
  }
  /**
   * @description 获取到检查结果 Get the check results
   */
  ipcRenderer.on('check-update-type', (_event, ...args: checkUpdateType[]) => {
    setCheckLoading(false)
    setCheckBtnText('check update')
    setCheckType(args[0].checkUpdate)
    setopenModalType(true)
  })
  /**
   * @description 在通信监听的过程中获取不到ref.
   */
  useEffect(()=>{
    if (openModalType){
    ref.current!.openModal()
    setopenModalType(false)
    }
  }, [openModalType])

  return (
    <div className="App">
      <div>
        <a href="https://github.com/electron-vite/electron-vite-react" target="_blank">
          <img src="./electron-vite.svg" className="logo" alt="Electron + Vite logo" />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button disabled={checkLoading} onClick={checkUpdate}>
          {checkBtnText}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Electron + Vite logo to learn more
      </p>
      <div className="flex-center">
        Place static files into the<code>/public</code> folder <img style={{ width: "5em" }} src={nodeLogo} alt="Node logo" />
      </div>
      <Update ref={ref} checkType={checkType}/>
    </div>
  )
}

export default App
