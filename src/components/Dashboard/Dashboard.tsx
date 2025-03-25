import { PlusCircle } from 'lucide-react'
import { DashboardCard } from '../DashboardCard/DashboardCard'

const Dashboard = ({ filter }: { filter: string }) => {
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
    <div className="flex w-full justify-center">
      <div className="mx-auto grid grid-cols-1 gap-12 px-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {filteredCards.map((card) => (
          <div key={card.id} className="flex justify-center">
            <DashboardCard card={card} />
          </div>
        ))}

        <div className="flex h-52 items-center justify-center">
          <PlusCircle
            size={52}
            className="cursor-pointer text-slate-400"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  )
}
export default Dashboard
