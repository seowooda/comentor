'use client'

import { BookmarkIcon, FileText } from 'lucide-react'
import clsx from 'clsx'
import { Questions } from '@/api'
import { mapCS, mapStatus } from '../../lib/mapEnum'
import React from 'react'
import { useRouter } from 'next/navigation'
import { QuestionStatus } from '@/api/types/common'

interface QuestionItemProps {
  question: Questions
  onBookmarkClick: () => void
}

export const QuestionItem = React.memo(
  ({ question, onBookmarkClick }: QuestionItemProps) => {
    const statusStyle = clsx('rounded-full px-3 py-1 text-sm font-medium', {
      'bg-green-50 text-green-500':
        question.questionStatus === ('DONE' as QuestionStatus),
      'bg-yellow-50 text-yellow-500':
        question.questionStatus === ('TODO' as QuestionStatus),
    })

    const router = useRouter()

    const isBookmarked = true

    //질문 클릭 시 질문 기록으로 이동
    const handleClick = () => {
      if (question.projectId && question.questionId) {
        // 프로젝트 기반 질문일 경우
        router.push(
          `/project/${question.projectId}?tab=question-history&questionId=${question.questionId}`,
        )
      } else {
        // CS 질문일 경우
        router.push(`/cs/solve/${question.csQuestionId}?tab=solution`)
      }
    }

    return (
      <div
        onClick={handleClick}
        className="grid max-w-full cursor-pointer grid-cols-[minmax(400px,3fr)_minmax(120px,1fr)_minmax(100px,1fr)_40px] items-center gap-4 border-b border-slate-300 px-6 py-5 transition hover:bg-slate-50"
      >
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 text-[16px]">{question.question}</p>
          {question.repoName && question.fileName && (
            <span className="flex items-center gap-1 text-sm">
              {question.repoName} /
              <FileText size={16} className="text-blue-600" />
              <span className="text-slate-500">{question.fileName}</span>
            </span>
          )}
        </div>
        <div>
          <span className="rounded-full bg-blue-100 px-2 py-1 text-sm text-blue-600">
            {mapCS(question.csCategory)}
          </span>
        </div>
        <div>
          <span className={statusStyle}>
            {mapStatus(question.questionStatus)}
          </span>
        </div>
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
            } hover:text-yellow-300`} // 북마크 상태에 따라 색상/아이콘 채우기 처리
          />
        </button>
      </div>
    )
  },
)

QuestionItem.displayName = 'QuestionItem'
