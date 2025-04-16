'use client'

import React, { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'
import { QuestionHistoryTabProps } from '../types'
import HistoryList from './HistoryList'
import QuestionDetail from './QuestionDetail'
import useQuestionHistory from './useQuestionHistory'
import { submitCSAnswer } from '@/api'

/**
 * 질문 이력 탭 컴포넌트
 * 날짜별로 그룹화된 질문 이력을 표시합니다.
 */
const QuestionHistoryTab: React.FC<QuestionHistoryTabProps> = ({
  projectId,
  initialHistory,
  onBookmarkQuestion,
  onAnswerSubmit,
  onTabChange,
  activeTab,
}) => {
  // 이전에 활성화된 탭을 추적하는 ref
  const prevActiveTabRef = useRef<string | undefined>(undefined)
  // 탭 전환 감지를 위한 ref
  const didSwitchToThisTabRef = useRef(false)

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
    updateQuestion,
    refreshHistory,
  } = useQuestionHistory({
    projectId,
    initialHistory,
    forceRefresh: didSwitchToThisTabRef.current,
  })

  useEffect(() => {
    if (
      activeTab === 'question-history' &&
      prevActiveTabRef.current !== 'question-history'
    ) {
      didSwitchToThisTabRef.current = true
      refreshHistory().then(() => {
        didSwitchToThisTabRef.current = false
      })
    }

    prevActiveTabRef.current = activeTab
  }, [activeTab, refreshHistory])

  const historyListKey = `history-list-${sortedDates.length}-${Object.keys(history).length}`

  const handleAnswerSubmit = async (question: any, answer: string) => {
    try {
      if (!answer.trim()) return undefined

      const questionId = question.id || question.questionId || 0

      let feedback: string
      if (onAnswerSubmit) {
        feedback = await onAnswerSubmit(answer, questionId)
      } else {
        // 기본 API 사용
        feedback = await submitCSAnswer(questionId, answer)
      }

      // 최적화된 방식으로 해당 질문만 업데이트
      updateQuestion(questionId, {
        answer,
        feedback,
        status: 'DONE',
        answered: true,
      })

      return feedback
    } catch (error) {
      console.error('답변 제출 중 오류 발생:', error)
      return '답변 제출 중 오류가 발생했습니다.'
    }
  }

  // CS 질문 탭으로 이동
  const handleAnswerInQuestionTab = (question: any) => {
    if (onTabChange) {
      // 질문 ID를 세션 스토리지에 저장
      sessionStorage.setItem('selectedQuestionId', String(question.id))
      onTabChange('cs-questions')
    }
  }

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
            key={historyListKey}
            dates={sortedDates}
            history={history}
            selectedQuestionId={currentQuestion?.id || selectedQuestion?.id}
            bookmarkedQuestions={bookmarkedQuestions}
            onSelectQuestion={handleSelectQuestion}
            onAnswer={handleAnswerInQuestionTab}
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
              onAnswer={handleAnswerSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionHistoryTab
