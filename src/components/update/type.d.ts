
export interface checkUpdateType {
  checkUpdate: boolean
}

export interface VersionInfo {
  oldVersion: string
  newVersion: string
}

export interface isUpdateAvailable extends VersionInfo {
  isUpdate: boolean

}
export interface ModalBtnText {
  canCelText: string
  submitText: string
}
