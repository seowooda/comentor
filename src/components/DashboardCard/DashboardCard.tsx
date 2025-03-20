import { Github, Pen, Trash2 } from 'lucide-react'

export const DashboardCard = () => {
  const Card = {
    title: 'seowooda/CoMentor',
    personal_stack: ['React', 'Node.js'],
    description: 'Github 커밋 기반으로 개인별 맞춤 CS 질문을 생성해주는 서비스',
    status: 'Progress',
    created_At: '2025-03-20',
    updated_At: '2025-03-21',
  }

  const formatDate = (dateString: string) => dateString.replace(/-/g, '. ')

  return (
    <div className="flex w-[306px] rounded-[8px] border border-slate-400 bg-white p-[21px] shadow-md">
      <div className="flex flex-col gap-[22px]">
        <div className="flex justify-between">
          <p className="text-[20px] font-semibold">{Card.title}</p>
          <div className="flex items-center gap-[6px]">
            <Pen size={14} className="cursor-pointer" />
            <Trash2 size={16} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-[10px]">
          {Card.personal_stack.map((stack, index) => (
            <span key={index} className="rounded-[20px] bg-blue-100 px-2 py-1">
              <p className="text-[8px] text-blue-500">{stack}</p>
            </span>
          ))}
        </div>
        <p className="text-[14px] font-light">{Card.description}</p>

        <div className="flex justify-between text-[10px] font-light">
          <div className="flex items-center gap-1">
            <div
              className={`h-[7px] w-[7px] rounded-full ${
                Card.status === 'Progress' ? 'bg-yellow-500' : 'bg-emerald-500'
              }`}
            ></div>
            <p>{Card.status}</p>
          </div>
          <p>Updated {formatDate(Card.updated_At)}</p>
        </div>
      </div>
    </div>
  )
}
