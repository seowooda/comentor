'use client'

import { useEffect, useState } from 'react'
import { useModalStore } from '@/store/modalStore'
import { CreateFolderModal, DeleteFolderModal, EditFolderModal } from './Folder'
import { ModalProps } from '@/types/modal'

const GlobalModal = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore()

  const [shouldRender, setShouldRender] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      setTimeout(() => setVisible(true), 10)
    } else {
      setVisible(false)
      setTimeout(() => setShouldRender(false), 300)
    }
  }, [isOpen])

  if (!shouldRender || !modalType) return null

  const renderModal = () => {
    switch (modalType) {
      case 'editFolder':
        return (
          <EditFolderModal
            folder={(modalProps as ModalProps['editFolder']).folder}
            onClose={closeModal}
          />
        )
      case 'deleteFolder':
        return (
          <DeleteFolderModal
            folderId={(modalProps as ModalProps['deleteFolder']).folderId}
            onClose={closeModal}
          />
        )
      case 'createFolder':
        const { questionId, csQuestionId, onBookmarkDone } =
          modalProps as ModalProps['createFolder']
        return (
          <CreateFolderModal
            questionId={questionId}
            csQuestionId={csQuestionId}
            onBookmarkDone={onBookmarkDone}
            onClose={closeModal}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`transform transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {renderModal()}
      </div>
    </div>
  )
}

export default GlobalModal
