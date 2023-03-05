import { ipcRenderer } from 'electron'
import type { ProgressInfo } from 'electron-updater'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/update/Modal'
import Progress from '@/components/update/Progress'
import styles from './update.module.scss'

const Update = () => {
  const [checking, setChecking] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [versionInfo, setVersionInfo] = useState<VersionInfo>()
  const [updateError, setUpdateError] = useState<ErrorType>()
  const [progressInfo, setProgressInfo] = useState<ProgressInfo>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalBtn, setModalBtn] = useState<{
    cancelText?: string
    okText?: string
    onCancel?: () => void
    onOk?: () => void
  }>({
    onCancel: () => setModalOpen(false),
    onOk: () => ipcRenderer.invoke('start-download'),
  })

  const checkUpdate = async () => {
    setChecking(true)
    /**
     * @type {import('electron-updater').UpdateCheckResult | null | { message: string, error: Error }}
     */
    const result = await ipcRenderer.invoke('check-update')
    setChecking(false)

    if (result?.error) {
      console.error(result.error)
      setUpdateAvailable(false)
    } else {
      setUpdateAvailable(true)
      setModalOpen(true)
    }
  }

  const onUpdateCanAvailable = useCallback((_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
    setVersionInfo(arg1)
    // Can be update
    if (arg1.update) {
      setModalBtn(state => ({
        ...state,
        cancelText: 'Cancel',
        okText: 'Update',
        onCancel: () => setModalOpen(false),
        onOk: () => ipcRenderer.invoke('start-download'),
      }))
    }
  }, [])

  const onUpdateError = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
    console.error(arg1.error)
    setUpdateError(arg1)
  }, [])

  const onDownloadProgress = useCallback((_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
    console.log(arg1)
    setProgressInfo(arg1)
  }, [])

  const onUpdateDownloaded = useCallback((_event: Electron.IpcRendererEvent, ...args: any[]) => {
    setModalBtn(state => ({
      ...state,
      cancelText: 'Later',
      okText: 'Install now',
      onOk: () => ipcRenderer.invoke('quit-and-install'),
    }))
  }, [])

  useEffect(() => {
    // Get version information and whether to update
    ipcRenderer.on('update-can-available', onUpdateCanAvailable)
    ipcRenderer.on('update-error', onUpdateError)
    ipcRenderer.on('download-progress', onDownloadProgress)
    ipcRenderer.on('update-downloaded', onUpdateDownloaded)

    return () => {
      ipcRenderer.off('update-can-available', onUpdateCanAvailable)
      ipcRenderer.off('update-error', onUpdateError)
      ipcRenderer.off('download-progress', onDownloadProgress)
      ipcRenderer.off('update-downloaded', onUpdateDownloaded)
    }
  }, [])

  return (
    <>
      <Modal
        open={modalOpen}
        cancelText={modalBtn?.cancelText}
        okText={modalBtn?.okText}
        onCancel={modalBtn?.onCancel}
        onOk={modalBtn?.onOk}
        footer={!versionInfo?.update ? /* hide footer */null : undefined}
      >
        <div className={styles.modalslot}>
          {updateError ? (
            <div className='update-error'>
              <p>Error downloading the latest version.</p>
              <p>{updateError.message}</p>
            </div>
          ) : null}
          {!updateAvailable ? (
            <div className='update-not-available'>
              <span>Check update is Error, Please check your Network!</span>
            </div>
          ) : null}
          {versionInfo
            ? (
              <div>
                <div>The last version is: v{versionInfo.newVersion}</div>
                <div>v{versionInfo.version} -&gt; v{versionInfo.newVersion}</div>
                <div className='update-progress'>
                  <div className='progress-title'>Update progress:</div>
                  <div className='progress-bar'>
                    <Progress percent={progressInfo?.percent} ></Progress>
                  </div>
                </div>
              </div>
            )
            : <span>Checking...</span>}
        </div>
      </Modal>
      <button disabled={checking} onClick={checkUpdate}>
        {checking ? 'Checking...' : 'Check update'}
      </button>
    </>
  )
}

export default Update
