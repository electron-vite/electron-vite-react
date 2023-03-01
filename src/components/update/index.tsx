import Modal from '@/components/update/Modal'
import Progress from '@/components/update/Progress'
import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'
import updateScss from './update.module.scss'
import { checkUpdateType, isUpdateAvailable, ModalBtnText, VersionInfo } from './type'


let onModalSubmit = () => { }
let onModalCanCel = () => { }

const Update = () => {
  const [checkBtnText, setCheckBtnText] = useState('check update')
  const [checkType, setCheckType] = useState(false)
  const [checkLoading, setCheckLoading] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [percentNum, setPercentNum] = useState<number>(0)
  const [isNeedUpdate, setIsNeedUpdate] = useState<boolean>(false)
  const [updateError, setUpdateError] = useState<boolean>(false)
  const [versionInfo, setVersionInfo] = useState<VersionInfo>({
    oldVersion: '',
    newVersion: ''
  })
  const [modalBtnText, setModalBtnText] = useState<ModalBtnText>({
    canCelText: '',
    submitText: ''
  })

  useEffect(() => {
    onModalCanCel = () => setIsOpenModal(false)
  }, [])

  // Check for updates
  const checkUpdate = () => {
    setCheckLoading(true)
    setCheckBtnText('checking Update ...')
    ipcRenderer.send('check-update')
  }

  // Listen to get the check result
  ipcRenderer.on('check-update-type', (_event, ...args: checkUpdateType[]) => {
    setCheckLoading(false)
    setCheckBtnText('check update')
    setCheckType(args[0].checkUpdate)
    setIsOpenModal(true)
  })

  // Get version information and whether to update
  ipcRenderer.on('is-update-available', (_event, ...args: isUpdateAvailable[]) => {
    setVersionInfo({
      oldVersion: args[0].oldVersion,
      newVersion: args[0].newVersion,
    })
    setIsNeedUpdate(args[0].isUpdate)
    // Update required
    if (args[0].isUpdate) {
      setModalBtnText({
        canCelText: 'cancel',
        submitText: 'update'
      })
      onModalSubmit = () => ipcRenderer.send('start-download')
      onModalCanCel = () => setIsOpenModal(false)
    }
  })

  // Throw the update failure message when the update fails
  ipcRenderer.on('update-error', (_event, ...args: { updateError: boolean }[]) => {
    setUpdateError(args[0].updateError)
    setCheckType(false)
  })

  // Get update progress 
  ipcRenderer.on('update-progress', (_event, ...args: { progressInfo: number }[]) => {
    setPercentNum(args[0].progressInfo)
  })

  // is update been completed
  ipcRenderer.on('update-downed', (_event, ...args) => {
    setPercentNum(100)
    setModalBtnText({
      canCelText: 'install later',
      submitText: 'install now'
    })
    onModalSubmit = () => ipcRenderer.send('quit-and-install')
    onModalCanCel = () => {
      ipcRenderer.send('will-quit')
      setIsOpenModal(false)
    }
  })

  return (
    <>
      <Modal isOpenModal={isOpenModal} onCanCel={onModalCanCel} onSubmit={onModalSubmit}
        canCelText={modalBtnText.canCelText} submitText={modalBtnText.submitText}
        isFooterShow={checkType && isNeedUpdate}>
        <div className={updateScss.modalslot}>
          {updateError ?
            <div className='update-error'>Error downloading the latest version, please contact the developer</div> :
            checkType ? (
              isNeedUpdate ? (
                <div>
                  <div>
                    <span> oldVersion : v.{versionInfo.oldVersion} </span>
                    <span> newVersion : v.{versionInfo.newVersion} </span>
                  </div>
                  <div className='update-progress'>
                    <span className='progress-title'> update progress : </span>
                    <Progress percent={percentNum} ></Progress>
                  </div>
                </div>)
                : <span>This is last version : v.{versionInfo.oldVersion} !</span>
            ) : <span>Check update is Error,Please check your network!</span>
          }
        </div>
      </Modal>
      <button disabled={checkLoading} onClick={checkUpdate}>
        {checkBtnText}
      </button>
    </>
  )
}

export default Update