import type { ProgressInfo } from 'electron-updater'
import { useCallback, useEffect, useState } from 'react'
import Modal from '@/components/update/modal'
import Progress from '@/components/update/progress'

const Update = () => {
  const [checking, setChecking] = useState(false)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [versionInfo, setVersionInfo] = useState<VersionInfo>()
  const [updateError, setUpdateError] = useState<ErrorType>()
  const [progressInfo, setProgressInfo] = useState<Partial<ProgressInfo>>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [modalBtn, setModalBtn] = useState<{
    cancelText?: string
    okText?: string
    onCancel?: () => void
    onOk?: () => void
  }>({
    onCancel: () => window.ipcRenderer.invoke('cancel-download').then(() => setModalOpen(false)),
    onOk: () => window.ipcRenderer.invoke('start-download'),
  })

  const checkUpdate = async () => {
    setChecking(true)
    /**
     * @type {import('electron-updater').UpdateCheckResult | null | { message: string, error: Error }}
     */
    const result = await window.ipcRenderer.invoke('check-update')
    setProgressInfo({ percent: 0 })
    setChecking(false)
    setModalOpen(true)
    if (result?.error) {
      setUpdateAvailable(false)
      setUpdateError(result?.error)
    }
  }

  const onUpdateCanAvailable = useCallback((_event: Electron.IpcRendererEvent, arg1: VersionInfo) => {
    setVersionInfo(arg1)
    setUpdateError(undefined)
    // Can be update
    if (arg1.update) {
      setModalBtn(state => ({
        ...state,
        cancelText: 'Cancel',
        okText: 'Update',
        onOk: () => window.ipcRenderer.invoke('start-download'),
      }))
      setUpdateAvailable(true)
    } else {
      setUpdateAvailable(false)
    }
  }, [])

  const onUpdateError = useCallback((_event: Electron.IpcRendererEvent, arg1: ErrorType) => {
    setUpdateAvailable(false)
    setUpdateError(arg1)
  }, [])

  const onDownloadProgress = useCallback((_event: Electron.IpcRendererEvent, arg1: ProgressInfo) => {
    setProgressInfo(arg1)
  }, [])

  const onUpdateDownloaded = useCallback((_event: Electron.IpcRendererEvent, ...args: any[]) => {
    setProgressInfo({ percent: 100 })
    setModalBtn(state => ({
      ...state,
      cancelText: 'Later',
      okText: 'Install now',
      onOk: () => window.ipcRenderer.invoke('quit-and-install'),
    }))
  }, [])

  useEffect(() => {
    // Get version information and whether to update
    window.ipcRenderer.on('update-can-available', onUpdateCanAvailable)
    window.ipcRenderer.on('update-error', onUpdateError)
    window.ipcRenderer.on('download-progress', onDownloadProgress)
    window.ipcRenderer.on('update-downloaded', onUpdateDownloaded)

    return () => {
      window.ipcRenderer.off('update-can-available', onUpdateCanAvailable)
      window.ipcRenderer.off('update-error', onUpdateError)
      window.ipcRenderer.off('download-progress', onDownloadProgress)
      window.ipcRenderer.off('update-downloaded', onUpdateDownloaded)
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
        footer={updateAvailable ? /* hide footer */null : undefined}
      >
        <div className='space-y-4'>
          {updateError
            ? (
              <div className='space-y-2 text-sm leading-6 text-rose-100'>
                <p className='font-semibold text-rose-50'>Error downloading the latest version.</p>
                <p className='text-rose-100/90'>{updateError.message}</p>
              </div>
            ) : updateAvailable
              ? (
                <div className='space-y-4 text-sm text-slate-700'>
                  <div className='text-base font-semibold text-slate-900'>The latest version is v{versionInfo?.newVersion}</div>
                  <div className='ml-0 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600'>
                    v{versionInfo?.version} -&gt; v{versionInfo?.newVersion}
                  </div>
                  <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3'>
                    <div className='shrink-0 font-medium text-slate-700'>Update progress:</div>
                    <div className='min-w-0 flex-1'>
                      <Progress percent={progressInfo?.percent} ></Progress>
                    </div>
                  </div>
                </div>
              )
              : (
                <pre className='overflow-auto rounded-2xl bg-slate-950 p-4 text-left text-xs leading-6 text-slate-100'>{JSON.stringify(versionInfo ?? {}, null, 2)}</pre>
              )}
        </div>
      </Modal>
      <button
        disabled={checking}
        onClick={checkUpdate}
        className='inline-flex items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-5 py-3 font-semibold text-cyan-100 transition hover:border-cyan-300/50 hover:bg-cyan-400/20 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {checking ? 'Checking...' : 'Check update'}
      </button>
    </>
  )
}

export default Update
