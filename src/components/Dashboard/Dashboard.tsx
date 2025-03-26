import { PlusCircle } from 'lucide-react'
import { DashboardCard } from '../DashboardCard/DashboardCard'
import { useEffect, useState } from 'react'

const Dashboard = ({ filter }: { filter: string }) => {
  const [columns, setColumns] = useState(1)

  // 화면 크기 변경 감지를 위한 이펙트
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1815) {
        setColumns(5)
      } else if (window.innerWidth >= 1474) {
        setColumns(4)
      } else if (window.innerWidth >= 1130) {
        setColumns(3)
      } else if (window.innerWidth >= 768) {
        setColumns(2)
      } else {
        setColumns(1)
      }
    }

    // 초기 로드 시 한번 실행
    handleResize()

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', handleResize)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    gap: '2.25rem',
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-9">
      <div style={gridStyle}>
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
