import { useState, useCallback } from 'react'

type UseModalReturnType = {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useModal = (): UseModalReturnType => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, openModal, closeModal }
}

export default useModal
