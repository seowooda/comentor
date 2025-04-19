'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { getCSQuestionHistory, getQuestionDetail } from '@/api'
import { HistoryByDate, UIQuestionHistoryItem } from '../types'

interface UseQuestionHistoryProps {
  projectId: string
  initialHistory?: HistoryByDate
  forceRefresh?: boolean
}

// 정규화된 데이터 구조를 위한 인터페이스
interface NormalizedQuestions {
  byId: Record<number, UIQuestionHistoryItem>
  byDate: Record<string, number[]>
  allDates: string[]
}

export default function useQuestionHistory({
  projectId,
  initialHistory,
  forceRefresh = false,
}: UseQuestionHistoryProps) {
  // 정규화된 데이터 구조로 상태 관리
  const [questionsData, setQuestionsData] = useState<NormalizedQuestions>(
    () => {
      if (!initialHistory) {
        return { byId: {}, byDate: {}, allDates: [] }
      }

      // 초기 데이터 정규화
      const byId: Record<number, UIQuestionHistoryItem> = {}
      const byDate: Record<string, number[]> = {}
      const allDates = Object.keys(initialHistory).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
      )

      allDates.forEach((date) => {
        const questions = initialHistory[date] || []
        byDate[date] = []

        questions.forEach((question: UIQuestionHistoryItem) => {
          const id = (question as any).questionId || question.id || 0
          if (id) {
            byId[id] = question
            byDate[date].push(id)
          }
        })
      })

      return { byId, byDate, allDates }
    },
  )

  const [loading, setLoading] = useState(!initialHistory || forceRefresh)
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  )
  const [detailLoading, setDetailLoading] = useState(false)
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<number[]>([])

  // 메모이제이션된 현재 선택된 질문
  const selectedQuestion = useMemo(
    () =>
      selectedQuestionId !== null
        ? questionsData.byId[selectedQuestionId]
        : null,
    [selectedQuestionId, questionsData.byId],
  )

  // 메모이제이션된 현재 질문 (상세 정보 포함)
  const [currentQuestion, setCurrentQuestion] =
    useState<UIQuestionHistoryItem | null>(null)

  // 메모이제이션된 날짜 정렬 (최신순)
  const sortedDates = useMemo(
    () => questionsData.allDates,
    [questionsData.allDates],
  )

  // 메모이제이션된 이력 데이터
  const history = useMemo(() => {
    const result: HistoryByDate = {}

    sortedDates.forEach((date) => {
      const questionIds = questionsData.byDate[date] || []
      result[date] = questionIds
        .map((id) => {
          const question = questionsData.byId[id]
          if (!question) return null
          // 모든 필수 필드 보장
          return {
            ...question,
            answer: question.answer || '',
            feedback: question.feedback || '',
            codeSnippet: question.codeSnippet || '',
          }
        })
        .filter(Boolean) as UIQuestionHistoryItem[]
    })

    return result
  }, [questionsData, sortedDates])

  // 질문 이력 가져오기
  useEffect(() => {
    const fetchHistory = async () => {
      // 초기 데이터가 있고 강제 새로고침이 아니면 API 호출 생략
      if (initialHistory && !forceRefresh) return

      setLoading(true)
      try {
        const data = await getCSQuestionHistory(projectId)

        // 받아온 데이터 정규화
        const byId: Record<number, UIQuestionHistoryItem> = {}
        const byDate: Record<string, number[]> = {}
        const allDates = Object.keys(data).sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime(),
        )

        allDates.forEach((date) => {
          const questions = data[date] || []
          byDate[date] = []

          questions.forEach((question: UIQuestionHistoryItem) => {
            const id = (question as any).questionId || question.id || 0
            if (id) {
              byId[id] = question
              byDate[date].push(id)
            }
          })
        })

        setQuestionsData({ byId, byDate, allDates })
      } catch (error) {
        console.error('질문 이력을 가져오는 중 오류 발생:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHistory()
  }, [projectId, initialHistory, forceRefresh])

  // 질문 선택 핸들러 - 상세 정보 API 호출 추가
  const handleSelectQuestion = useCallback(
    async (question: UIQuestionHistoryItem | null) => {
      if (!question) {
        setCurrentQuestion(null)
        setSelectedQuestionId(null)
        return
      }

      const questionId = (question as any).questionId || question.id || 0
      setSelectedQuestionId(questionId)
      setDetailLoading(true)

      try {
        // 기본 정보는 바로 설정 (API 실패해도 최소한의 정보는 표시)
        setCurrentQuestion({
          ...question,
          question: question.question || '',
          answer: question.answer || '',
          relatedCode: question.relatedCode || '',
          feedback: question.feedback || '',
        })

        // 상세 정보 API 호출
        const response = await getQuestionDetail(questionId)

        if (response) {
          setCurrentQuestion({
            ...response,
            id: questionId, // 기존 id 유지
          })
        }
      } catch (error) {
        console.error('질문 상세 정보를 불러오는 중 오류 발생:', error)
        // 오류 발생해도 기본 정보는 유지
      } finally {
        setDetailLoading(false)
      }
    },
    [],
  )

  // 데이터 새로고침 함수 추가
  const refreshHistory = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getCSQuestionHistory(projectId)

      // 받아온 데이터 정규화
      const byId: Record<number, UIQuestionHistoryItem> = {}
      const byDate: Record<string, number[]> = {}
      const allDates = Object.keys(data).sort(
        (a, b) => new Date(b).getTime() - new Date(a).getTime(),
      )

      allDates.forEach((date) => {
        const questions = data[date] || []
        byDate[date] = []

        questions.forEach((question: UIQuestionHistoryItem) => {
          const id = (question as any).questionId || question.id || 0
          if (id) {
            byId[id] = question
            byDate[date].push(id)
          }
        })
      })

      setQuestionsData({ byId, byDate, allDates })
      return true
    } catch (error) {
      console.error('질문 이력을 다시 가져오는 중 오류 발생:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [projectId])

  // 개별 질문 업데이트 - 최적화된 업데이트 로직
  const updateQuestion = useCallback(
    (questionId: number, updates: Partial<UIQuestionHistoryItem>) => {
      setQuestionsData((prevData) => {
        // 해당 질문이 존재하지 않으면 변경 없음
        if (!prevData.byId[questionId]) return prevData

        // 변경된 질문 데이터
        const updatedQuestion = {
          ...prevData.byId[questionId],
          ...updates,
        }

        // 최적화된 업데이트: 변경된 질문만 업데이트
        return {
          ...prevData,
          byId: {
            ...prevData.byId,
            [questionId]: updatedQuestion,
          },
        }
      })

      // 현재 선택된 질문이 업데이트 대상이면 현재 질문도 업데이트
      if (selectedQuestionId === questionId) {
        setCurrentQuestion((prev: UIQuestionHistoryItem | null) =>
          prev ? { ...prev, ...updates } : null,
        )
      }
    },
    [selectedQuestionId],
  )

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
    updateQuestion,
    refreshHistory,
  }
}
