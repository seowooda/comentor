import { Plus, PlusCircle } from 'lucide-react'
import { DashboardCard } from '../DashboardCard/DashboardCard'

const Dashboard = () => {
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

  return (
    <div className="flex w-full flex-wrap gap-9">
      {Card.map((card) => (
        <DashboardCard key={card.id} card={card} />
      ))}

      <div className="flex w-[306px] items-center justify-center">
        <PlusCircle size={52} className="text-slate-400" />
      </div>
    </div>
  )
}
export default Dashboard
