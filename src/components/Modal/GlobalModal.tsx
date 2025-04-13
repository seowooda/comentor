'use client'

import { useModalStore } from '@/store/modalStore'
import { DeleteFolderModal, EditFolderModal } from './Folder'

const GlobalModal = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore()

  if (!isOpen || !modalType) return null

  switch (modalType) {
    case 'editFolder':
      return (
        <EditFolderModal
          folderId={modalProps?.folderId || null}
          onClose={closeModal}
        />
      )
    case 'deleteFolder':
      return (
        <DeleteFolderModal
          folderId={modalProps?.folderId || null}
          onClose={closeModal}
        />
      )
  }
}

export default GlobalModal
