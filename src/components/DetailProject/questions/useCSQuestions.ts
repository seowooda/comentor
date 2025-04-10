'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { generateCSQuestions } from '@/api/services/project'
import { QuestionItem } from '../CSQuestionsTab'

interface UseCSQuestionsProps {
  projectId: string
  codeSnippet: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean>
}

interface UseCSQuestionsReturn {
  questions: QuestionItem[]
  selectedQuestionId: number | null
  answer: string
  feedback: string | null
  loading: boolean
  questionsLoading: boolean
  savedQuestions: number[]
  showCompletionToast: boolean
  showLearningInsights: boolean
  allQuestionsAnswered: boolean
  selectedQuestion: QuestionItem | undefined
  currentQuestionIndex: number
  answeredCount: number
  handleSelectQuestion: (id: number) => void
  handleAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmitAnswer: () => Promise<void>
  handleSaveQuestion: (questionId: number) => Promise<void>
  toggleLearningInsights: () => void
}

/**
 * CS 질문 데이터와 상호작용을 관리하는 커스텀 훅
 */
export const useCSQuestions = ({
  projectId,
  codeSnippet,
  onAnswerSubmit,
  onSaveQuestion,
}: UseCSQuestionsProps): UseCSQuestionsReturn => {
  const [questions, setQuestions] = useState<QuestionItem[]>([])
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  )
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [savedQuestions, setSavedQuestions] = useState<number[]>([])
  const [showCompletionToast, setShowCompletionToast] = useState(false)
  const [showLearningInsights, setShowLearningInsights] = useState(false)
  const [dataFetched, setDataFetched] = useState(false)

  // 질문 데이터 가져오기 - 처음 한 번만 수행하도록 수정
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!projectId || !codeSnippet || dataFetched) return

      setQuestionsLoading(true)
      try {
        const data = await generateCSQuestions(projectId, codeSnippet, '')
        const enhancedData = data.map((q) => ({
          ...q,
          answered: false,
          userAnswer: '',
          feedback: '',
        }))
        setQuestions(enhancedData)
        if (enhancedData.length > 0 && selectedQuestionId === null) {
          setSelectedQuestionId(enhancedData[0].id)
        }
        setDataFetched(true)
      } catch (error) {
        console.error('CS 질문을 가져오는 중 오류 발생:', error)
      } finally {
        setQuestionsLoading(false)
      }
    }

    fetchQuestions()
  }, [projectId, codeSnippet, dataFetched, selectedQuestionId])

  // 모든 질문이 답변되었는지 확인
  useEffect(() => {
    const allAnswered =
      questions.length > 0 && questions.every((q) => q.answered)

    if (allAnswered && !showCompletionToast) {
      setShowCompletionToast(true)
      setShowLearningInsights(true)
      // 3초 후 토스트 메시지 자동으로 사라짐
      const timer = setTimeout(() => {
        setShowCompletionToast(false)
      }, 3000)

      return () => clearTimeout(timer) // 클린업 함수 추가
    }
  }, [questions, showCompletionToast])

  // 질문 선택 핸들러 - 메모이제이션 적용
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

  // 답변 변경 핸들러 - 메모이제이션 적용
  const handleAnswerChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setAnswer(e.target.value)
    },
    [],
  )

  // 답변 제출 핸들러 - 메모이제이션 적용
  const handleSubmitAnswer = useCallback(async () => {
    if (!onAnswerSubmit || !selectedQuestionId || !answer.trim()) return

    setLoading(true)
    try {
      const result = await onAnswerSubmit(answer, selectedQuestionId)
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
  }, [onAnswerSubmit, selectedQuestionId, answer])

  // 질문 저장 핸들러 - 메모이제이션 적용
  const handleSaveQuestion = useCallback(
    async (questionId: number) => {
      if (!onSaveQuestion) return

      try {
        const success = await onSaveQuestion(questionId)
        if (success) {
          setSavedQuestions((prev) => [...prev, questionId])
        }
      } catch (error) {
        console.error('질문 저장 중 오류 발생:', error)
      }
    },
    [onSaveQuestion],
  )

  // 학습 인사이트 표시 토글 - 메모이제이션 적용
  const toggleLearningInsights = useCallback(() => {
    setShowLearningInsights((prev) => !prev)
  }, [])

  // 파생 상태들 메모이제이션
  const allQuestionsAnswered = useMemo(
    () => questions.length > 0 && questions.every((q) => q.answered),
    [questions],
  )

  const selectedQuestion = useMemo(
    () => questions.find((q) => q.id === selectedQuestionId),
    [questions, selectedQuestionId],
  )

  const currentQuestionIndex = useMemo(
    () => questions.findIndex((q) => q.id === selectedQuestionId) + 1,
    [questions, selectedQuestionId],
  )

  const answeredCount = useMemo(
    () => questions.filter((q) => q.answered).length,
    [questions],
  )

  return {
    questions,
    selectedQuestionId,
    answer,
    feedback,
    loading,
    questionsLoading,
    savedQuestions,
    showCompletionToast,
    showLearningInsights,
    allQuestionsAnswered,
    selectedQuestion,
    currentQuestionIndex,
    answeredCount,
    handleSelectQuestion,
    handleAnswerChange,
    handleSubmitAnswer,
    handleSaveQuestion,
    toggleLearningInsights,
  }
}
