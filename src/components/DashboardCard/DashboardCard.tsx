import { Pen, Trash2 } from 'lucide-react'

type CardType = {
  id: number
  title: string
  personal_stack: string[]
  description: string
  status: string
  created_At: string
  updated_At: string
}

export const DashboardCard = ({ card }: { card: CardType }) => {
  const formatDate = (dateString: string) => dateString.replace(/-/g, '. ')

  return (
    <article className="flex w-[306px] rounded-[8px] border border-slate-400 bg-white p-[21px] shadow-md">
      <div className="flex flex-col gap-[22px]">
        {/* Header Section */}
        <header className="flex justify-between">
          <h2 className="text-[20px] font-semibold">{card.title}</h2>
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
          {card.personal_stack.map((stack, index) => (
            <li
              key={index}
              className="flex items-center rounded-[20px] bg-blue-100 px-2 py-1"
            >
              <span className="text-[8px] text-blue-500">{stack}</span>
            </li>
          ))}
        </ul>

        {/* Description */}
        <p className="text-[14px] font-light">{card.description}</p>

        {/* Status & Updated Date */}
        <footer className="flex justify-between text-[10px] font-light">
          <div className="flex items-center gap-1">
            <span
              className={`h-[7px] w-[7px] rounded-full ${
                card.status === 'Progress' ? 'bg-yellow-500' : 'bg-emerald-500'
              }`}
              aria-label={
                card.status === 'Progress' ? 'In Progress' : 'Completed'
              }
            ></span>
            <p>{card.status}</p>
          </div>
          <time dateTime={card.updated_At}>
            Updated {formatDate(card.updated_At)}
          </time>
        </footer>
      </div>
    </article>
  )
}
