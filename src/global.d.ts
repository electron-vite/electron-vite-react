export { }

declare global {
  interface Window {
    // Expose API through preload script
    fs: typeof import('fs')
    ipcRenderer: import('electron').IpcRenderer
    removeLoading: () => void
  }
}
