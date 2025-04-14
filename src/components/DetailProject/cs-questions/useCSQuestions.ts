'use client'

import { useState, useEffect, useCallback } from 'react'
import { QuestionItem } from '../types'
import { generateCSQuestions } from '@/api/services/question'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { CSQuestion } from '@/api/mocks/handlers/project'

interface UseCSQuestionsProps {
  projectId: string
  codeSnippet?: string
  fileName?: string
}

export default function useCSQuestions({
  projectId,
  codeSnippet = '',
  fileName = '',
}: UseCSQuestionsProps) {
  // QueryClient 인스턴스 가져오기
  const queryClient = useQueryClient()

  // 질문 상태 캐시 키 (탭 간 이동 시 상태 유지에 사용)
  const cacheKey = `question-state-${projectId}-${codeSnippet ? codeSnippet.substring(0, 20) : ''}`

  // 캐시에서 이전 상태 가져오기
  const cachedState = queryClient.getQueryData<{
    questions: QuestionItem[]
    selectedQuestionId: number | null
    savedQuestions: number[]
    answer: string
    feedback: string | null
  }>([cacheKey])

  // 로컬 상태 (캐시된 상태가 있으면 사용)
  const [questions, setQuestions] = useState<QuestionItem[]>(
    cachedState?.questions || [],
  )
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    cachedState?.selectedQuestionId || null,
  )
  const [answer, setAnswer] = useState(cachedState?.answer || '')
  const [feedback, setFeedback] = useState<string | null>(
    cachedState?.feedback || null,
  )
  const [loading, setLoading] = useState(false)
  const [savedQuestions, setSavedQuestions] = useState<number[]>(
    cachedState?.savedQuestions || [],
  )
  const [showCompletionToast, setShowCompletionToast] = useState(false)
  const [showLearningInsights, setShowLearningInsights] = useState(false)

  // React Query를 사용하여 질문 데이터 가져오기 및 캐싱
  const {
    data: csQuestions,
    isLoading: questionsLoading,
    error,
  } = useQuery<CSQuestion[]>({
    queryKey: ['csQuestions', projectId, codeSnippet, fileName],
    queryFn: () => generateCSQuestions(projectId, codeSnippet, fileName),
    enabled: !!projectId && !!codeSnippet,
    staleTime: 1000 * 60 * 30, // 30분간 데이터 유지
    gcTime: 1000 * 60 * 60, // 60분간 캐시 유지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    refetchOnMount: false, // 마운트 시 재요청 방지
    refetchOnReconnect: false, // 재연결 시 재요청 방지
  })

  // 상태 변경 시 캐시 업데이트
  useEffect(() => {
    if (questions.length > 0) {
      queryClient.setQueryData([cacheKey], {
        questions,
        selectedQuestionId,
        savedQuestions,
        answer,
        feedback,
      })
    }
  }, [
    questions,
    selectedQuestionId,
    savedQuestions,
    answer,
    feedback,
    queryClient,
    cacheKey,
  ])

  // 초기 데이터 로딩 (캐시된 상태가 없는 경우에만)
  useEffect(() => {
    // 이미 상태가 있으면 초기화하지 않음 (탭 전환 후 돌아왔을 때)
    if (
      csQuestions &&
      Array.isArray(csQuestions) &&
      csQuestions.length > 0 &&
      questions.length === 0 // 상태가 없을 때만 초기화
    ) {
      // 초기 질문 상태 설정
      const initialQuestions = csQuestions.map((q: CSQuestion) => ({
        ...q,
        answered: false, // 기본값은 미답변
        userAnswer: '',
        feedback: '',
        codeSnippet: codeSnippet.substring(0, 100) + '...',
        fileName, // 파일명 추가
      }))

      setQuestions(initialQuestions)

      // 선택된 질문이 없을 때만 첫 번째 질문 선택
      if (selectedQuestionId === null && initialQuestions.length > 0) {
        setSelectedQuestionId(initialQuestions[0].id)
      }
    }
  }, [csQuestions, codeSnippet, fileName, selectedQuestionId, questions.length])

  // 컴포넌트 마운트 시 선택된 질문이 있고 캐시된 상태가 없는 경우,
  // 답변한 질문이면 해당 답변과 피드백 설정
  useEffect(() => {
    if (
      selectedQuestionId &&
      questions.length > 0 &&
      !cachedState // 캐시된 상태가 없는 경우에만
    ) {
      const selectedQuestion = questions.find(
        (q) => q.id === selectedQuestionId,
      )
      if (selectedQuestion?.answered && selectedQuestion?.userAnswer) {
        setAnswer(selectedQuestion.userAnswer)
        setFeedback(selectedQuestion.feedback || null)
      }
    }
  }, [selectedQuestionId, questions, cachedState])

  // 모든 질문이 답변되었는지 확인
  useEffect(() => {
    if (questions.length === 0) return

    const allAnswered = questions.every((q) => q.answered)

    if (allAnswered && !showCompletionToast) {
      setShowCompletionToast(true)
      setShowLearningInsights(true)
      // 3초 후 토스트 메시지 자동으로 사라짐
      setTimeout(() => {
        setShowCompletionToast(false)
      }, 3000)
    }
  }, [questions, showCompletionToast])

  const handleSelectQuestion = useCallback(
    (id: number) => {
      const selectedQuestion = questions.find((q) => q.id === id)
      setSelectedQuestionId(id)

      // 이미 답변한 질문이면 기존 답변과 피드백 표시
      if (selectedQuestion?.answered && selectedQuestion?.userAnswer) {
        setAnswer(selectedQuestion.userAnswer)
        setFeedback(selectedQuestion.feedback || null)
      } else {
        setAnswer('')
        setFeedback(null)
      }
    },
    [questions],
  )

  const handleAnswerChange = useCallback((value: string) => {
    setAnswer(value)
  }, [])

  const handleSubmitAnswer = useCallback(
    async (
      onSubmit?: (answer: string, questionId: number) => Promise<string>,
    ) => {
      if (!onSubmit || !selectedQuestionId || !answer.trim()) return

      setLoading(true)
      try {
        const result = await onSubmit(answer, selectedQuestionId)
        setFeedback(result)

        // 답변과 피드백 함께 저장
        setQuestions((prev) =>
          prev.map((q) =>
            q.id === selectedQuestionId
              ? { ...q, answered: true, userAnswer: answer, feedback: result }
              : q,
          ),
        )
      } catch (error) {
        console.error('답변 제출 중 오류 발생:', error)
        setFeedback('답변 제출 중 오류가 발생했습니다.')
      } finally {
        setLoading(false)
      }
    },
    [selectedQuestionId, answer],
  )

  const handleSaveQuestion = useCallback(
    async (
      questionId: number,
      onSave?: (questionId: number) => Promise<boolean | undefined>,
    ) => {
      if (!onSave) return

      try {
        const success = await onSave(questionId)
        if (success) {
          setSavedQuestions((prev) => [...prev, questionId])
          return true
        }
        return false
      } catch (error) {
        console.error('질문 저장 중 오류 발생:', error)
        return false
      }
    },
    [],
  )

  const toggleLearningInsights = useCallback(() => {
    setShowLearningInsights((prev) => !prev)
  }, [])

  // 현재 상태 계산
  const allQuestionsAnswered =
    questions.length > 0 && questions.every((q) => q.answered)
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)
  const currentQuestionIndex =
    questions.findIndex((q) => q.id === selectedQuestionId) + 1
  const answeredCount = questions.filter((q) => q.answered).length
  const progressPercentage =
    questions.length > 0 ? (answeredCount / questions.length) * 100 : 0

  return {
    // 상태
    questions,
    selectedQuestionId,
    answer,
    feedback,
    loading,
    questionsLoading,
    savedQuestions,
    showCompletionToast,
    showLearningInsights,

    // 계산된 값
    allQuestionsAnswered,
    selectedQuestion,
    currentQuestionIndex,
    answeredCount,
    progressPercentage,

    // 이벤트 핸들러
    handleSelectQuestion,
    handleAnswerChange,
    handleSubmitAnswer,
    handleSaveQuestion,
    toggleLearningInsights,
  }
}
