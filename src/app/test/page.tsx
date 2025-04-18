'use client'
import { useModalStore } from '@/store/modalStore'
import { Bookmark } from 'lucide-react'

export default function Test() {
  const { openModal } = useModalStore()

  const handleClick = () => {
    openModal('createFolder', { csQuestionId: 1 })
  }

  return (
    <div>
      <Bookmark size={24} onClick={handleClick} />
    </div>
  )
}
