import RsModal from "@/components/RsModal"
import RsProgress from "@/components/RsProgress"
import { ipcRenderer } from "electron"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import "./index.scss"

interface VersionInfo {
  oldVersion: string,
  newVersion: string
}

interface isUpdateAvailable extends VersionInfo {
  isUpdate: boolean,

}
interface ModalBtnText {
  canCelText: string,
  submitText: string
}

let onModalSubmit = () => { }
let onModalCanCel = () => { }

const Update = forwardRef((props: { checkType: boolean }, ref) => {
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

  useImperativeHandle(ref, () => ({
    openModal: () => setIsOpenModal(true)
  }));

  useEffect(() => {
    onModalCanCel = () => setIsOpenModal(false)
  }, [])

  /**
  * @description 获取版本信息和是否需要更新 Get version information and whether to update
  */
  ipcRenderer.on('is-update-available', (_event, ...args: isUpdateAvailable[]) => {
    setVersionInfo({
      oldVersion: args[0].oldVersion,
      newVersion: args[0].newVersion,
    })
    setIsNeedUpdate(args[0].isUpdate)
    if (args[0].isUpdate) {
      setModalBtnText({
        canCelText: 'cancel',
        submitText: 'update'
      })
      onModalSubmit = () => ipcRenderer.send('start-download')
      onModalCanCel = () => setIsOpenModal(false)
    }
  })
  /**
   * @description 如果更新失败了抛出更新失败信息 Throw the update failure message if the update fails
   */
  ipcRenderer.on('update-error', (_event, ...args: { updateError: boolean }[]) => {
    setUpdateError(args[0].updateError)
  })
  /**
   * @description 监听更新进度 update progress 
   */
  ipcRenderer.on('update-progress', (_event, ...args: { progressInfo: number }[]) => {
    setPercentNum(args[0].progressInfo)
  })
  /**
   * @description 监听是否更新完成 is update been completed
   */
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
      <RsModal isOpenModal={isOpenModal} onCanCel={onModalCanCel} onSubmit={onModalSubmit}
        canCelText={modalBtnText.canCelText} submitText={modalBtnText.submitText}
        isFooterShow={props.checkType && isNeedUpdate}>
        <div className="modal-body">
          {updateError ?
            <div className="update-error">Error downloading the latest version, please contact the developer</div> :
            props.checkType ? (
              isNeedUpdate ? (
                <div>
                  <div>
                    <span> oldVersion : v.{versionInfo.oldVersion} </span>
                    <span> newVersion : v.{versionInfo.newVersion} </span>
                  </div>
                  <div className="update-progress">
                    <span className="progress-title"> update progress : </span>
                    <RsProgress percent={percentNum} ></RsProgress>
                  </div>
                </div>)
                : <span>This is last version : v.{versionInfo.oldVersion} !</span>
            ) : <span>Check update is Error,Please check your network!</span>
          }

        </div>
      </RsModal>

    </>
  )
})

export default Update