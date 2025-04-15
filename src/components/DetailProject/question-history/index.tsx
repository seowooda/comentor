'use client'

import React, { useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import { QuestionHistoryTabProps } from '../types'
import HistoryList from './HistoryList'
import QuestionDetail from './QuestionDetail'
import useQuestionHistory from './useQuestionHistory'

/**
 * 질문 이력 탭 컴포넌트
 * 날짜별로 그룹화된 질문 이력을 표시합니다.
 */
const QuestionHistoryTab: React.FC<QuestionHistoryTabProps> = ({
  projectId,
  initialHistory,
  onBookmarkQuestion,
}) => {
  const {
    history,
    loading,
    detailLoading,
    selectedQuestion,
    currentQuestion,
    bookmarkedQuestions,
    sortedDates,
    handleSelectQuestion,
    handleBookmark,
  } = useQuestionHistory({
    projectId,
    initialHistory,
  })

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
        <span className="ml-2 text-slate-700">질문 이력을 불러오는 중...</span>
      </div>
    )
  }

  // 질문 목록이 비어있는 경우
  if (sortedDates.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center">
        <div className="text-center">
          <p className="text-slate-700">아직 기록된 질문이 없습니다.</p>
          <p className="mt-2 text-sm text-slate-500">
            코드 선택 탭에서 질문을 생성해보세요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h3 className="mb-4 font-semibold text-slate-800">
            질문 이력 ({sortedDates.length}일)
          </h3>
          <HistoryList
            dates={sortedDates}
            history={history}
            selectedQuestionId={selectedQuestion?.id}
            bookmarkedQuestions={bookmarkedQuestions}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>

        <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
          {detailLoading ? (
            <div className="flex h-60 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-slate-700" />
              <span className="ml-2 text-slate-700">
                질문 상세 정보를 불러오는 중...
              </span>
            </div>
          ) : (
            <QuestionDetail
              question={currentQuestion}
              isBookmarked={
                currentQuestion
                  ? bookmarkedQuestions.includes(currentQuestion.id)
                  : false
              }
              onBookmark={(id) => handleBookmark(id, onBookmarkQuestion)}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionHistoryTab
