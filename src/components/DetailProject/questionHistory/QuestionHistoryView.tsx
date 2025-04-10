'use client'

import React from 'react'
import {
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'
import {
  HistoryList,
  QuestionDetailView,
  LoadingState,
  EmptyState,
} from './components'

interface QuestionHistoryViewProps {
  history: HistoryByDate
  loading: boolean
  selectedQuestion: QuestionHistoryItem | null
  bookmarkedQuestions: number[]
  sortedDates: string[]
  onSelectQuestion: (question: QuestionHistoryItem) => void
  onBookmark: (questionId: number) => void
}

/**
 * 질문 이력 UI 컴포넌트
 * 상태 관리 없이 UI만 표시합니다.
 */
export const QuestionHistoryView: React.FC<QuestionHistoryViewProps> = ({
  history,
  loading,
  selectedQuestion,
  bookmarkedQuestions,
  sortedDates,
  onSelectQuestion,
  onBookmark,
}) => {
  if (loading) {
    return <LoadingState />
  }

  if (sortedDates.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <HistoryList
          sortedDates={sortedDates}
          history={history}
          selectedQuestionId={selectedQuestion?.id || null}
          bookmarkedQuestions={bookmarkedQuestions}
          onSelectQuestion={onSelectQuestion}
        />

        <QuestionDetailView
          selectedQuestion={selectedQuestion}
          bookmarkedQuestions={bookmarkedQuestions}
          onBookmark={onBookmark}
        />
      </div>
    </div>
  )
}
