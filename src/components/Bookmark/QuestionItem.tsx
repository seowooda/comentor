'use client'

import { BookmarkIcon, FileText } from 'lucide-react'
import clsx from 'clsx'
import { Questions } from '@/api'
import { mapCS, mapStatus } from '../../lib/mapEnum'
import React from 'react'
import { useRouter } from 'next/navigation'
import { QuestionStatus } from '@/api/types/common'
import { truncatePath } from '@/lib/formatPath' // 경로 축약 함수 import

interface QuestionItemProps {
  question: Questions
  onBookmarkClick: () => void
}

export const QuestionItem = React.memo(
  ({ question, onBookmarkClick }: QuestionItemProps) => {
    const statusStyle = clsx(
      'rounded-full px-3 py-1 text-xs font-medium md:text-sm',
      {
        'bg-green-50 text-green-500':
          question.questionStatus === ('DONE' as QuestionStatus),
        'bg-yellow-50 text-yellow-500':
          question.questionStatus === ('TODO' as QuestionStatus),
      },
    )

    const router = useRouter()
    const isBookmarked = true

    const handleClick = () => {
      if (question.projectId && question.questionId) {
        router.push(
          `/project/${question.projectId}?tab=question-history&questionId=${question.questionId}`,
        )
      } else {
        router.push(`/cs/solve/${question.csQuestionId}?tab=solution`)
      }
    }

    const bookmarkButton = (
      <button
        type="button"
        aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
        aria-pressed={isBookmarked}
        onClick={(e) => {
          e.stopPropagation()
          onBookmarkClick()
        }}
      >
        <BookmarkIcon
          size={20}
          className={`cursor-pointer transition duration-200 ${
            isBookmarked ? 'fill-current text-yellow-400' : 'text-slate-500'
          } hover:text-yellow-300`}
        />
      </button>
    )

    return (
      <div
        onClick={handleClick}
        className="max-w-full cursor-pointer border-b border-slate-300 px-4 py-5 transition hover:bg-slate-50 md:grid md:grid-cols-[minmax(300px,3fr)_135px_100px_40px] md:items-center md:gap-4 md:px-6"
      >
        {/* --- 질문 제목 및 파일 정보 --- */}
        <div className="flex flex-col gap-2">
          <p className="line-clamp-2 text-sm md:text-base">
            {question.question}
          </p>
          {question.repoName && question.fileName && (
            <span className="flex items-center gap-1 text-xs md:text-sm">
              {question.repoName} /
              <FileText size={16} className="text-blue-600" />
              <span className="text-slate-500">
                {truncatePath(question.fileName, 2)}
              </span>
            </span>
          )}

          {/* --- 1. 모바일용 태그 및 북마크 아이콘 영역 --- */}
          <div className="mt-2 flex items-center justify-between md:hidden">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                {mapCS(question.csCategory)}
              </span>
              <span className={statusStyle}>
                {mapStatus(question.questionStatus)}
              </span>
            </div>
            {/* 모바일용 북마크 버튼 */}
            {bookmarkButton}
          </div>
        </div>

        {/* --- 카테고리 (데스크톱용) --- */}
        <div className="hidden md:block">
          <span className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-600">
            {mapCS(question.csCategory)}
          </span>
        </div>

        {/* --- 답변여부 (데스크톱용) --- */}
        <div className="hidden md:block">
          <span className={statusStyle}>
            {mapStatus(question.questionStatus)}
          </span>
        </div>

        {/* --- 2. 데스크톱용 북마크 버튼 (모바일에선 숨김) --- */}
        <div className="hidden items-center justify-center md:flex">
          {bookmarkButton}
        </div>
      </div>
    )
  },
)

QuestionItem.displayName = 'QuestionItem'
