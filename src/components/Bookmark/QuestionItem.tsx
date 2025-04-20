'use client'

import { BookmarkIcon, FileText } from 'lucide-react'
import clsx from 'clsx'
import { Questions, QuestionStatus } from '@/api'
import { mapCS, mapStatus } from './lib/mapEnum'

interface QuestionItemProps {
  question: Questions
  onBookmarkCancel: (questionId: number) => void // 클릭된 질문을 식별하는 ID를 전달
}

export const QuestionItem = ({
  question,
  onBookmarkCancel,
}: QuestionItemProps) => {
  const statusStyle = clsx('rounded-full px-3 py-1 text-sm font-medium', {
    'bg-green-50 text-green-500':
      question.questionStatus === ('DONE' as QuestionStatus),
    'bg-yellow-50 text-yellow-500':
      question.questionStatus === ('TODO' as QuestionStatus),
  })

  // 북마크가 되어있는지 체크하는 변수
  const isBookmarked = true // 실제 상태로 바꿔야 함, 예: `question.isBookmarked`

  return (
    <div className="grid max-w-full grid-cols-[minmax(400px,3fr)_minmax(120px,1fr)_minmax(100px,1fr)_40px] items-center gap-4 border-b border-slate-300 px-6 py-5 transition hover:bg-slate-50">
      <div className="flex flex-col gap-1">
        <p className="line-clamp-2 text-[16px]">{question.question}</p>
        <span className="flex items-center gap-1 text-sm">
          {question.repoName} / <FileText size={16} className="text-blue-600" />
          <span className="text-slate-500">{question.repoName}</span>
        </span>
      </div>
      <div>
        <span className="rounded-full bg-slate-200 px-2 py-1 text-sm text-slate-500">
          {mapCS(question.csCategory)}
        </span>
      </div>
      <div>
        <span className={statusStyle}>
          {mapStatus(question.questionStatus)}
        </span>
      </div>
      <BookmarkIcon
        size={20}
        onClick={() => onBookmarkCancel(question.questionId)}
        className={`cursor-pointer transition duration-200 ${
          isBookmarked ? 'fill-current text-yellow-400' : 'text-slate-500'
        } hover:text-yellow-300`} // 북마크 상태에 따라 색상/아이콘 채우기 처리
      />
    </div>
  )
}
