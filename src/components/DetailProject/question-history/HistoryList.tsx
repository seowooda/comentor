'use client'

import React, { useState } from 'react'
import { HistoryByDate, UIQuestionHistoryItem } from '../types'
import QuestionCard from '../ui/QuestionCard'
import { ChevronDown, ChevronRight } from 'lucide-react'

interface HistoryListProps {
  dates: string[]
  history: HistoryByDate
  selectedQuestionId?: number
  bookmarkedQuestions: number[]
  onSelectQuestion: (question: UIQuestionHistoryItem) => void
  onAnswer?: (question: UIQuestionHistoryItem) => void
}

/**
 * 질문 이력 목록 컴포넌트
 */
const HistoryList: React.FC<HistoryListProps> = ({
  dates,
  history,
  selectedQuestionId,
  bookmarkedQuestions,
  onSelectQuestion,
  onAnswer,
}) => {
  // 각 날짜별 열림/닫힘 상태 관리
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>(
    dates.reduce((acc, date) => ({ ...acc, [date]: true }), {}),
  )

  // 날짜 토글 핸들러
  const toggleDate = (date: string) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date],
    }))
  }

  if (dates.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500">
        아직 저장된 질문이 없습니다.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {dates.map((date) => {
        const questions = history[date] || []
        const questionsCount = questions.length

        return (
          <div key={date} className="rounded-md border border-slate-200">
            <div
              className="flex cursor-pointer items-center justify-between rounded-t-md bg-slate-50 p-3"
              onClick={() => toggleDate(date)}
            >
              <h4 className="flex items-center text-sm font-medium text-slate-700">
                {expandedDates[date] ? (
                  <ChevronDown className="mr-1 h-4 w-4" />
                ) : (
                  <ChevronRight className="mr-1 h-4 w-4" />
                )}
                {date}
              </h4>
              <span className="text-xs text-slate-500">
                {questionsCount}개 질문
              </span>
            </div>

            {expandedDates[date] && (
              <div className="px-3 pt-2 pb-3">
                {questionsCount > 0 ? (
                  <div className="custom-scrollbar max-h-[400px] space-y-2 overflow-y-auto pr-2">
                    {questions.map((question, index) => {
                      // ID 값 확인하고 보정
                      const questionId =
                        (question as any).questionId ||
                        (typeof question.id === 'number' ? question.id : 0) ||
                        (question.csQuestionId as number) ||
                        index

                      // 질문 상태에 따른 표시 결정
                      const isAnswered =
                        question.answered !== undefined
                          ? question.answered
                          : Boolean(
                              question.answer && question.answer.trim() !== '',
                            )

                      // API에서 상태를 대문자로 정규화했으므로 단순 비교
                      const isDone =
                        (question.status as string) === 'DONE' ||
                        (isAnswered && !question.status)

                      const statusText = isDone ? '답변됨' : '답변필요'
                      const statusColor = isDone ? 'green' : 'yellow'

                      // QuestionItem 생성
                      const questionItem = {
                        id: questionId,
                        answered: isAnswered,
                        question: question.question || '질문 내용 없음',
                        relatedCode: (question as any).relatedCode || '',
                        folderName: (question as any).folderName || '',
                        status: isDone ? 'DONE' : 'TODO',
                        userAnswer: question.answer || '',
                        feedback: question.feedback || '',
                      }

                      return (
                        <QuestionCard
                          key={questionId || `question-${date}-${index}`}
                          question={questionItem}
                          isSelected={
                            Number(selectedQuestionId) === Number(questionId)
                          }
                          isBookmarked={bookmarkedQuestions.includes(
                            questionId,
                          )}
                          onClick={() =>
                            onSelectQuestion({
                              ...question,
                              id: questionId,
                              folderName: (question as any).folderName,
                            })
                          }
                          statusText={statusText}
                          statusColor={statusColor}
                          onAnswer={
                            onAnswer
                              ? () =>
                                  onAnswer({
                                    ...question,
                                    id: questionId,
                                    question:
                                      question.question || '질문 내용 없음',
                                    fileName: (question as any).fileName || '',
                                    folderName:
                                      (question as any).folderName || '',
                                  })
                              : undefined
                          }
                        />
                      )
                    })}
                  </div>
                ) : (
                  <div className="rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                    이 날짜의 질문 목록을 불러올 수 없습니다.
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HistoryList
