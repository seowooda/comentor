import { Plus, PlusCircle } from 'lucide-react'
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
    <div className="flex w-full flex-wrap gap-9">
      {filteredCards.map((card) => (
        <DashboardCard key={card.id} card={card} />
      ))}

      <div className="flex h-52 w-[306px] items-center justify-center">
        <PlusCircle
          size={52}
          className="cursor-pointer text-slate-400"
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
export default Dashboard
