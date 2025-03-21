import { Pen, Trash2 } from 'lucide-react'

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
    <article className="flex w-[306px] rounded-[8px] border border-slate-400 bg-white p-[21px] shadow-md">
      <div className="flex flex-col gap-[22px]">
        {/* Header Section */}
        <header className="flex justify-between">
          <h2 className="text-[20px] font-semibold">{Card.title}</h2>
          <div className="flex items-center gap-[6px]">
            <button aria-label="Edit">
              <Pen size={14} className="cursor-pointer" />
            </button>
            <button aria-label="Delete">
              <Trash2 size={16} className="cursor-pointer" />
            </button>
          </div>
        </header>

        {/* Tech Stack List */}
        <ul className="flex gap-[10px]">
          {Card.personal_stack.map((stack, index) => (
            <li
              key={index}
              className="flex items-center rounded-[20px] bg-blue-100 px-2 py-1"
            >
              <span className="text-[8px] text-blue-500">{stack}</span>
            </li>
          ))}
        </ul>

        {/* Description */}
        <p className="text-[14px] font-light">{Card.description}</p>

        {/* Status & Updated Date */}
        <footer className="flex justify-between text-[10px] font-light">
          <div className="flex items-center gap-1">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                Card.status === 'Progress' ? 'bg-yellow-500' : 'bg-emerald-500'
              }`}
              aria-label={
                Card.status === 'Progress' ? 'In Progress' : 'Completed'
              }
            ></span>
            <p>{Card.status}</p>
          </div>
          <time dateTime={Card.updated_At}>
            Updated {formatDate(Card.updated_At)}
          </time>
        </footer>
      </div>
    </article>
  )
}
