// src/app/dashboard/page.tsx
'use client'

import { ProjectImportModal } from '@/components/ProjectImportModal'
import useModal from '@/hooks/useModal'

const DashboardPage = () => {
  const { isOpen, openModal, closeModal } = useModal()

  const handleSubmit = (data: {
    title: string
    description: string
    role: string
    status: 'in_progress' | 'completed'
  }) => {
    //todo 삭제
    console.log('Project Data:', data)
    closeModal()
  }

  return (
    <div>
      <button onClick={openModal}>프로젝트 불러오기</button>
      {isOpen && (
        <ProjectImportModal onClose={closeModal} onSubmit={handleSubmit} />
      )}
    </div>
  )
}

export default DashboardPage
