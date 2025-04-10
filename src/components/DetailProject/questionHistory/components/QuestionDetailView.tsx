'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { QuestionHistoryItem } from '@/api/mocks/handlers/project'

interface QuestionDetailViewProps {
  selectedQuestion: QuestionHistoryItem | null
  bookmarkedQuestions: number[]
  onBookmark: (questionId: number) => void
}

/**
 * 선택된 질문의 상세 정보를 표시하는 컴포넌트
 */
export const QuestionDetailView: React.FC<QuestionDetailViewProps> = ({
  selectedQuestion,
  bookmarkedQuestions,
  onBookmark,
}) => {
  if (!selectedQuestion) {
    return (
      <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
        <div className="flex h-60 items-center justify-center text-slate-500">
          왼쪽에서 질문을 선택해주세요.
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
      <div className="mb-4">
        <h3 className="font-medium text-slate-800">
          {selectedQuestion.question}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {selectedQuestion.codeSnippet}
        </p>

        <div className="mt-1 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onBookmark(selectedQuestion.id)}
            disabled={bookmarkedQuestions.includes(selectedQuestion.id)}
          >
            {bookmarkedQuestions.includes(selectedQuestion.id)
              ? '북마크됨'
              : '북마크 추가'}
          </Button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-md bg-slate-50 p-3">
          <h4 className="mb-2 text-sm font-medium">내 답변</h4>
          <div className="text-sm whitespace-pre-line text-slate-700">
            {selectedQuestion.answer}
          </div>
        </div>

        <div className="rounded-md bg-green-50 p-3">
          <h4 className="mb-2 text-sm font-medium text-green-700">피드백</h4>
          <div className="text-sm whitespace-pre-line text-green-600">
            {selectedQuestion.feedback}
          </div>
        </div>
      </div>
    </div>
  )
}
