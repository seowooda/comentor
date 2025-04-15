'use client'

import { useModalStore } from '@/store/modalStore'
import { DeleteFolderModal, EditFolderModal } from './Folder'
import { useEffect, useState } from 'react'

const GlobalModal = () => {
  const { isOpen, modalType, modalProps, closeModal } = useModalStore()

  const [shouldRender, setShouldRender] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // 살짝 delay줘서 열릴 때 애니메이션 보이게
      setTimeout(() => setVisible(true), 10)
    } else {
      // 닫힐 때는 애니메이션 보여주고 나서 제거
      setVisible(false)
      setTimeout(() => setShouldRender(false), 300) // 트랜지션 길이만큼 기다리기
    }
  }, [isOpen])

  if (!shouldRender) return null

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
        {modalType === 'editFolder' && (
          <EditFolderModal
            folderId={modalProps?.folderId || null}
            onClose={closeModal}
          />
        )}
        {modalType === 'deleteFolder' && (
          <DeleteFolderModal
            folderId={modalProps?.folderId || null}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  )
}

export default GlobalModal
