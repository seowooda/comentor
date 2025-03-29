import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { DashboardCard } from '../DashboardCard/DashboardCard'
import { ProjectImportModal } from '../ProjectImportModal'

const Dashboard = ({ filter }: { filter: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleProjectSubmit = (data: any) => {
    console.log('프로젝트 생성:', data)
    // 프로젝트 생성 로직 구현 필요
  }

  const Card = [
    {
      id: 1,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Done',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 2,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Progress',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 3,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Progress',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 4,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Done',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 5,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Done',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 6,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Progress',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
    {
      id: 7,
      title: 'seowooda/CoMentor',
      personal_stack: ['React', 'Node.js'],
      description:
        'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
      status: 'Progress',
      created_At: '2025-03-20',
      updated_At: '2025-03-21',
    },
  ]

  // 필터링된 카드 리스트
  const filteredCards =
    filter === 'all' ? Card : Card.filter((card) => card.status === filter)

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-9">
      <div className="card-grid-2:grid-cols-2 card-grid-3:grid-cols-3 card-grid-4:grid-cols-4 card-grid-5:grid-cols-5 grid grid-cols-1 gap-9">
        {filteredCards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <DashboardCard card={card} />
          </div>
        ))}

        <div className="flex h-52 items-center justify-center">
          <PlusCircle
            size={52}
            className="cursor-pointer text-slate-400"
            onClick={handleModalOpen}
          />
        </div>
      </div>

      {isModalOpen && (
        <ProjectImportModal
          onClose={handleModalClose}
          onSubmit={handleProjectSubmit}
        />
      )}
    </div>
  )
}
export default Dashboard
