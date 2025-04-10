'use client'

import { useState, useEffect } from 'react'
import {
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'
import { getQuestionHistory } from '@/api/services/project'

interface UseQuestionHistoryProps {
  projectId: string
  initialHistory?: HistoryByDate
  onBookmarkQuestion?: (questionId: number) => Promise<boolean>
}

interface UseQuestionHistoryReturn {
  history: HistoryByDate
  loading: boolean
  selectedQuestion: QuestionHistoryItem | null
  bookmarkedQuestions: number[]
  sortedDates: string[]
  handleSelectQuestion: (question: QuestionHistoryItem) => void
  handleBookmark: (questionId: number) => Promise<void>
}

/**
 * 질문 이력 데이터와 상호작용을 관리하는 커스텀 훅
 */
export const useQuestionHistory = ({
  projectId,
  initialHistory,
  onBookmarkQuestion,
}: UseQuestionHistoryProps): UseQuestionHistoryReturn => {
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

  // 질문 선택 핸들러
  const handleSelectQuestion = (question: QuestionHistoryItem) => {
    setSelectedQuestion(question)
  }

  // 북마크 핸들러
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

  return {
    history,
    loading,
    selectedQuestion,
    bookmarkedQuestions,
    sortedDates,
    handleSelectQuestion,
    handleBookmark,
  }
}
