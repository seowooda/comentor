'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import {
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'
import { getQuestionHistory } from '@/api/services/project'

export interface QuestionHistoryTabProps {
  projectId: string
  initialHistory?: HistoryByDate
  onBookmarkQuestion?: (questionId: number) => Promise<boolean>
}

/**
 * 질문 이력 탭 컴포넌트
 * 날짜별로 그룹화된 질문 이력을 표시합니다.
 */
const QuestionHistoryTab: React.FC<QuestionHistoryTabProps> = ({
  projectId,
  initialHistory,
  onBookmarkQuestion,
}) => {
  const [history, setHistory] = useState<HistoryByDate>(initialHistory || {})
  const [loading, setLoading] = useState(!initialHistory)
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionHistoryItem | null>(null)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])

  // 초기 히스토리가 없는 경우 가져오기
  useEffect(() => {
    const fetchHistory = async () => {
      if (initialHistory || !projectId) return

      setLoading(true)
      try {
        const data = await getQuestionHistory(projectId)
        setHistory(data)
      } catch (error) {
        console.error('질문 이력을 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [projectId, initialHistory])

  const handleSelectQuestion = (question: QuestionHistoryItem) => {
    setSelectedQuestion(question)
  }

  const handleBookmark = async (questionId: number) => {
    if (!onBookmarkQuestion) return

    try {
      const success = await onBookmarkQuestion(questionId)
      if (success) {
        setBookmarkedQuestions((prev) => [...prev, questionId])
      }
    } catch (error) {
      console.error('북마크 중 오류 발생:', error)
    }
  }

  // 날짜 정렬 (최신순)
  const sortedDates = Object.keys(history).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  if (loading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
        <span className="ml-2 text-slate-700">질문 이력을 불러오는 중...</span>
      </div>
    )
  }

  if (sortedDates.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500">
        아직 저장된 질문이 없습니다.
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h3 className="mb-4 font-semibold text-slate-800">질문 이력</h3>
          <div className="space-y-6">
            {sortedDates.map((date) => (
              <div key={date}>
                <h4 className="mb-2 text-sm font-medium text-slate-700">
                  {date}
                </h4>
                <div className="space-y-2">
                  {history[date].map((question) => (
                    <div
                      key={question.id}
                      className={`cursor-pointer rounded-md p-3 ${
                        selectedQuestion?.id === question.id
                          ? 'bg-slate-100'
                          : 'bg-white hover:bg-slate-50'
                      }`}
                      onClick={() => handleSelectQuestion(question)}
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

        <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
          {selectedQuestion ? (
            <>
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
                    onClick={() => handleBookmark(selectedQuestion.id)}
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
                  <h4 className="mb-2 text-sm font-medium text-green-700">
                    피드백
                  </h4>
                  <div className="text-sm whitespace-pre-line text-green-600">
                    {selectedQuestion.feedback}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-60 items-center justify-center text-slate-500">
              왼쪽에서 질문을 선택해주세요.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionHistoryTab
