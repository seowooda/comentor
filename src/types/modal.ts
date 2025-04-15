export type ModalType = 'editFolder' | 'deleteFolder'

export type ModalProps = {
  editFolder: { folderId: number }
  deleteFolder: { folderId: number }
}
