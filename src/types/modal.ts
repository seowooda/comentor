import { Folder } from '@/api'

export type ModalType = 'editFolder' | 'deleteFolder' | 'createFolder'

export type ModalProps = {
  editFolder: { folder: Folder }
  deleteFolder: { folderId: number }
  createFolder: { csQuestionId: number }
}
