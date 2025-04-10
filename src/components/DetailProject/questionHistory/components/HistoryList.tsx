'use client'

import React from 'react'
import {
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'

interface HistoryListProps {
  sortedDates: string[]
  history: HistoryByDate
  selectedQuestionId: number | null
  bookmarkedQuestions: number[]
  onSelectQuestion: (question: QuestionHistoryItem) => void
}

/**
 * 날짜별로 정렬된 질문 이력 목록 컴포넌트
 */
export const HistoryList: React.FC<HistoryListProps> = ({
  sortedDates,
  history,
  selectedQuestionId,
  bookmarkedQuestions,
  onSelectQuestion,
}) => {
  return (
    <div className="lg:col-span-1">
      <h3 className="mb-4 font-semibold text-slate-800">질문 이력</h3>
      <div className="space-y-6">
        {sortedDates.map((date) => (
          <div key={date}>
            <h4 className="mb-2 text-sm font-medium text-slate-700">{date}</h4>
            <div className="space-y-2">
              {history[date].map((question) => (
                <div
                  key={question.id}
                  className={`cursor-pointer rounded-md p-3 ${
                    selectedQuestionId === question.id
                      ? 'bg-slate-100'
                      : 'bg-white hover:bg-slate-50'
                  }`}
                  onClick={() => onSelectQuestion(question)}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm text-slate-700">
                      {question.question}
                    </p>
                    {bookmarkedQuestions.includes(question.id) && (
                      <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                        북마크됨
                      </span>
                    )}
                  </div>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {question.codeSnippet}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
