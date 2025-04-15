import { ModalType, ModalProps } from '@/types/modal'
import { create } from 'zustand'

interface ModalStore {
  isOpen: boolean
  modalType: ModalType | null
  modalProps: ModalProps[ModalType] | null
  openModal: <T extends ModalType>(type: T, props: ModalProps[T]) => void
  closeModal: () => void
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  modalProps: null,
  openModal: (type, props) =>
    set({ isOpen: true, modalType: type, modalProps: props }),
  closeModal: () => set({ isOpen: false, modalType: null, modalProps: null }),
}))
