'use client'

import React from 'react'
import { QuestionHistoryView } from './QuestionHistoryView'
import { useQuestionHistory } from './useQuestionHistory'

interface QuestionHistoryContainerProps {
  projectId: string
  initialHistory?: any
  onBookmarkQuestion?: (questionId: number) => Promise<boolean>
}

/**
 * 질문 이력 컨테이너 컴포넌트
 * 데이터와 로직을 관리하고 UI 컴포넌트에 전달합니다.
 */
export const QuestionHistoryContainer: React.FC<
  QuestionHistoryContainerProps
> = ({ projectId, initialHistory, onBookmarkQuestion }) => {
  const {
    history,
    loading,
    selectedQuestion,
    bookmarkedQuestions,
    sortedDates,
    handleSelectQuestion,
    handleBookmark,
  } = useQuestionHistory({
    projectId,
    initialHistory,
    onBookmarkQuestion,
  })

  return (
    <QuestionHistoryView
      history={history}
      loading={loading}
      selectedQuestion={selectedQuestion}
      bookmarkedQuestions={bookmarkedQuestions}
      sortedDates={sortedDates}
      onSelectQuestion={handleSelectQuestion}
      onBookmark={handleBookmark}
    />
  )
}
