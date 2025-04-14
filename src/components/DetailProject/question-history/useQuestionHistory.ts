'use client'

import { useState, useEffect, useCallback } from 'react'
import { getQuestionHistory, getQuestionDetail } from '@/api/services/question'
import { HistoryByDate, QuestionHistoryItem } from '../types'

interface UseQuestionHistoryProps {
  projectId: string
  initialHistory?: HistoryByDate
}

export default function useQuestionHistory({
  projectId,
  initialHistory,
}: UseQuestionHistoryProps) {
  const [history, setHistory] = useState<HistoryByDate>(initialHistory || {})
  const [loading, setLoading] = useState(!initialHistory)
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionHistoryItem | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionHistoryItem | null>(null)

  // 질문 이력 가져오기
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

  // 질문 선택 핸들러 - 상세 정보 API 호출 추가
  const handleSelectQuestion = async (
    selectedQuestion: QuestionHistoryItem | null,
  ) => {
    if (!selectedQuestion) {
      setCurrentQuestion(null)
      setSelectedQuestion(null)
      return
    }

    setSelectedQuestion(selectedQuestion)
    setDetailLoading(true)

    try {
      // 기본 정보는 바로 설정 (API 실패해도 최소한의 정보는 표시)
      setCurrentQuestion({
        ...selectedQuestion,
        question: selectedQuestion.question || '',
        answer: selectedQuestion.answer || '',
        codeSnippet: selectedQuestion.codeSnippet || '',
        feedback: selectedQuestion.feedback || '',
      })

      // 상세 정보 API 호출 - questionId 사용
      const actualId =
        (selectedQuestion as any).questionId || selectedQuestion.id
      const response = await getQuestionDetail(actualId)

      if (response) {
        setCurrentQuestion({
          ...response,
          id: selectedQuestion.id, // 기존 id 유지
        })
      }
    } catch (error) {
      console.error('질문 상세 정보를 불러오는 중 오류 발생:', error)
      // 오류 발생해도 기본 정보는 유지
    } finally {
      setDetailLoading(false)
    }
  }

  // 북마크 핸들러
  const handleBookmark = useCallback(
    async (
      questionId: number,
      onBookmark?: (questionId: number) => Promise<boolean>,
    ) => {
      if (!onBookmark) return false

      try {
        const success = await onBookmark(questionId)
        if (success) {
          setBookmarkedQuestions((prev) => [...prev, questionId])
          return true
        }
        return false
      } catch (error) {
        console.error('북마크 중 오류 발생:', error)
        return false
      }
    },
    [],
  )

  // 날짜 정렬 (최신순)
  const sortedDates = Object.keys(history).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime()
  })

  return {
    history,
    loading,
    detailLoading,
    selectedQuestion,
    currentQuestion,
    bookmarkedQuestions,
    sortedDates,
    handleSelectQuestion,
    handleBookmark,
  }
}
