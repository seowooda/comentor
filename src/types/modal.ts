import { Folder } from '@/api'

export type ModalType = 'editFolder' | 'deleteFolder'

export type ModalProps = {
  editFolder: { folder: Folder }
  deleteFolder: { folderId: number }
}
