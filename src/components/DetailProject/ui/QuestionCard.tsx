'use client'

import React from 'react'
import { QuestionCardProps } from '../types'
import { FileCode } from 'lucide-react'

/**
 * 재사용 가능한 질문 카드 컴포넌트
 */
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected = false,
  isBookmarked = false,
  statusText,
  statusColor = 'green',
  onClick,
}) => {
  // 상태 색상 스타일 결정
  const getStatusColorStyle = () => {
    switch (statusColor) {
      case 'yellow':
        return 'bg-yellow-100 text-yellow-600'
      case 'red':
        return 'bg-red-100 text-red-600'
      case 'blue':
        return 'bg-blue-100 text-blue-600'
      case 'green':
      default:
        return 'bg-green-100 text-green-600'
    }
  }

  return (
    <div
      className={`cursor-pointer rounded-md p-3 ${
        isSelected ? 'bg-slate-100' : 'bg-white hover:bg-slate-50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-700">{question.question}</p>
        {isBookmarked && (
          <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
            북마크됨
          </span>
        )}
      </div>

      {question.fileName && (
        <div className="mt-2 flex items-center text-xs text-blue-600">
          <FileCode className="mr-1 h-3 w-3" />
          <span className="truncate">{question.fileName}</span>
        </div>
      )}

      {question.codeSnippet && (
        <p className="mt-1 truncate text-xs text-slate-500">
          {question.codeSnippet}
        </p>
      )}

      <div className="mt-1 flex justify-end">
        {(statusText || question.answered) && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${getStatusColorStyle()}`}
          >
            {statusText || '답변됨'}
          </span>
        )}
      </div>
    </div>
  )
}

export default QuestionCard
