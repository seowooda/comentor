import { BookmarkIcon, FileText } from 'lucide-react'
import clsx from 'clsx'

interface QuestionItemProps {
  question: string
  status: string
  category: string
  project: string
  folderName: string
}

export const QuestionItem = ({
  question,
  status,
  category,
  project,
  folderName,
}: QuestionItemProps) => {
  const statusStyle = clsx('rounded-full px-3 py-1 text-sm font-medium', {
    'bg-green-50 text-green-500': status === '답변됨',
    'bg-yellow-50 text-yellow-500': status === '답변필요',
  })

  return (
    <div className="grid grid-cols-[3fr_1fr_1fr_40px] items-center gap-2 px-6 py-3 transition hover:bg-slate-50">
      <div className="flex flex-col gap-1">
        <p className="text-[16px]">{question}</p>
        <span className="flex items-center gap-1 text-sm text-slate-500">
          {project} / <FileText size={16} /> {folderName}
        </span>
      </div>
      <div>
        <span className="rounded-full bg-slate-200 px-2 py-1 text-sm text-slate-500">
          {category}
        </span>
      </div>
      <div>
        <span className={statusStyle}>{status}</span>
      </div>
      <BookmarkIcon
        size={20}
        className="cursor-pointer text-slate-500 transition duration-200 hover:text-slate-900"
      />
    </div>
  )
}
