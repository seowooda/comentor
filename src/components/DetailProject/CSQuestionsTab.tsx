'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Loader2,
  Code,
  X,
  FileText,
  RefreshCw,
  CheckCircle2,
  Award,
  BookOpen,
  BarChart3,
} from 'lucide-react'
import { CSQuestion } from '@/api/mocks/handlers/project'
import { generateCSQuestions } from '@/api/services/project'

interface QuestionItem extends CSQuestion {
  answered?: boolean
  userAnswer?: string
  feedback?: string
}

export interface CSQuestionsTabProps {
  projectId: string
  codeSnippet?: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean>
  onChooseAnotherCode?: () => void
  onGenerateMoreQuestions?: () => void
  onFinish?: () => void
}

/**
 * CS 질문 탭 컴포넌트
 * 생성된 CS 질문 목록을 표시하고 답변을 제출할 수 있습니다.
 */
const CSQuestionsTab: React.FC<CSQuestionsTabProps> = ({
  projectId,
  codeSnippet = '',
  onAnswerSubmit,
  onSaveQuestion,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  onFinish,
}) => {
  const [questions, setQuestions] = useState<QuestionItem[]>([])
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null,
  )
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [questionsLoading, setQuestionsLoading] = useState(true)
  const [savedQuestions, setSavedQuestions] = useState<number[]>([])
  const [showCompletionToast, setShowCompletionToast] = useState(false)
  const [showLearningInsights, setShowLearningInsights] = useState(false)

  // 질문 데이터 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!projectId) return

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
      } catch (error) {
        console.error('CS 질문을 가져오는 중 오류 발생:', error)
      } finally {
        setQuestionsLoading(false)
      }
    }

    fetchQuestions()
  }, [projectId, codeSnippet])

  // 모든 질문이 답변되었는지 확인
  useEffect(() => {
    const allAnswered =
      questions.length > 0 && questions.every((q) => q.answered)

    if (allAnswered && !showCompletionToast) {
      setShowCompletionToast(true)
      setShowLearningInsights(true)
      // 3초 후 토스트 메시지 자동으로 사라짐
      setTimeout(() => {
        setShowCompletionToast(false)
      }, 3000)
    }
  }, [questions])

  const handleSelectQuestion = (id: number) => {
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
  }

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value)
  }

  const handleSubmitAnswer = async () => {
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
  }

  const handleSaveQuestion = async (questionId: number) => {
    if (!onSaveQuestion) return

    try {
      const success = await onSaveQuestion(questionId)
      if (success) {
        setSavedQuestions((prev) => [...prev, questionId])
      }
    } catch (error) {
      console.error('질문 저장 중 오류 발생:', error)
    }
  }

  // 학습 인사이트 표시 토글
  const toggleLearningInsights = () => {
    setShowLearningInsights((prev) => !prev)
  }

  const allQuestionsAnswered =
    questions.length > 0 && questions.every((q) => q.answered)
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)
  const currentQuestionIndex =
    questions.findIndex((q) => q.id === selectedQuestionId) + 1
  const answeredCount = questions.filter((q) => q.answered).length

  if (questionsLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-700" />
        <span className="ml-2 text-slate-700">질문 목록을 불러오는 중...</span>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center text-slate-500">
        코드를 선택하고 CS 질문을 생성해주세요.
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-white">
      {/* 완료 토스트 알림 */}
      {showCompletionToast && (
        <div className="animate-fade-in fixed inset-x-0 top-4 z-50 mx-auto w-auto max-w-md rounded-lg bg-green-100 p-4 shadow-md transition-all duration-300">
          <div className="flex items-center">
            <CheckCircle2 className="mr-3 h-5 w-5 text-green-600" />
            <p className="text-sm font-medium text-green-800">
              축하합니다! 모든 질문에 답변을 완료했습니다.
            </p>
          </div>
        </div>
      )}

      {/* 선택된 코드 영역 */}
      <div className="mb-6 rounded-md border border-slate-200 p-4">
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-2">
            <Code className="h-4 w-4 text-zinc-600" />
            <span className="text-xs font-medium text-zinc-900">
              선택된 코드
            </span>
          </div>
          <span className="text-xs text-slate-500">
            {currentQuestionIndex} / {questions.length}
          </span>
        </div>

        <div className="relative">
          <div className="max-h-[260px] overflow-auto rounded-md bg-slate-50 p-4">
            <pre className="text-sm whitespace-pre-wrap text-slate-700">
              {codeSnippet || '코드가 선택되지 않았습니다.'}
            </pre>
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-zinc-400"
              style={{
                width: `${(answeredCount / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* 학습 인사이트 관련 컴포넌트 */}
      {allQuestionsAnswered && (
        <>
          {showLearningInsights ? (
            /* 학습 인사이트 (펼쳐진 상태) */
            <div className="mb-6 rounded-md border border-indigo-200 bg-indigo-50 p-4 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-indigo-600" />
                  <h3 className="font-medium text-indigo-900">학습 인사이트</h3>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-300 text-xs text-indigo-700 hover:bg-indigo-100"
                    onClick={onChooseAnotherCode}
                  >
                    다른 코드로 학습하기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-indigo-300 text-xs text-indigo-700 hover:bg-indigo-100"
                    onClick={onGenerateMoreQuestions}
                  >
                    추가 질문 생성하기
                  </Button>
                  <Button
                    size="sm"
                    className="bg-indigo-700 text-xs hover:bg-indigo-800"
                    onClick={toggleLearningInsights}
                  >
                    인사이트 숨기기
                  </Button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-md bg-white p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <BookOpen className="h-4 w-4" />
                    <h4 className="text-sm font-medium">핵심 개념 정리</h4>
                  </div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-700">
                    <li>• React 생명주기와 상태 관리</li>
                    <li>• 비동기 처리와 예외 처리</li>
                    <li>• 컴포넌트 최적화 기법</li>
                  </ul>
                </div>

                <div className="rounded-md bg-white p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <BarChart3 className="h-4 w-4" />
                    <h4 className="text-sm font-medium">학습 진행 현황</h4>
                  </div>
                  <div className="mt-2 text-xs text-slate-700">
                    <p>
                      • 완료한 문제: {answeredCount}/{questions.length}
                    </p>
                    <p>
                      • 저장한 문제: {savedQuestions.length}/{questions.length}
                    </p>
                    <p>• 학습 난이도: 중급</p>
                  </div>
                </div>

                <div className="rounded-md bg-white p-3 shadow-sm">
                  <div className="flex items-center space-x-2 text-indigo-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <h4 className="text-sm font-medium">다음 학습 제안</h4>
                  </div>
                  <div className="mt-2 text-xs text-slate-700">
                    <p>• 프론트엔드 최적화 기법 심화</p>
                    <p>• 서버 상태 관리 고급 기술</p>
                    <p>• 디자인 패턴 실전 적용</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* 학습 인사이트 (최소화된 상태) */
            <div
              className="mb-6 flex cursor-pointer items-center justify-between rounded-md border border-indigo-200 bg-indigo-50 p-3 transition-all duration-300 hover:bg-indigo-100"
              onClick={toggleLearningInsights}
            >
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">
                  학습 인사이트 보기
                </span>
              </div>
              <div className="flex items-center text-xs text-indigo-700">
                <span className="mr-2">
                  완료: {answeredCount}/{questions.length}
                </span>
                <span>
                  저장: {savedQuestions.length}/{questions.length}
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <h3 className="mb-4 font-semibold text-slate-800">생성된 CS 질문</h3>
          <div className="space-y-2">
            {questions.map((question) => (
              <div
                key={question.id}
                className={`cursor-pointer rounded-md p-3 ${selectedQuestionId === question.id ? 'bg-slate-100' : 'bg-white hover:bg-slate-50'}`}
                onClick={() => handleSelectQuestion(question.id)}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-slate-700">{question.question}</p>
                  <div className="ml-2 flex shrink-0 gap-1">
                    {question.answered && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                        답변 완료
                      </span>
                    )}
                    {savedQuestions.includes(question.id) && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                        저장됨
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 모든 질문 답변 완료 시 다음 단계 제안 */}
            {allQuestionsAnswered && (
              <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-3">
                <h4 className="mb-2 text-sm font-medium text-slate-800">
                  다음 단계
                </h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs"
                    onClick={onChooseAnotherCode}
                  >
                    <FileText className="mr-2 h-3.5 w-3.5" />
                    다른 코드 선택하기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs"
                    onClick={onGenerateMoreQuestions}
                  >
                    <RefreshCw className="mr-2 h-3.5 w-3.5" />
                    새로운 질문 생성하기
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-left text-xs"
                    onClick={onFinish}
                  >
                    <X className="mr-2 h-3.5 w-3.5" />
                    학습 종료하기
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
          {selectedQuestion ? (
            <>
              <div className="mb-4">
                <h3 className="font-medium text-slate-800">
                  {selectedQuestion.question}
                </h3>

                <div className="mt-1 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleSaveQuestion(selectedQuestion.id)}
                    disabled={savedQuestions.includes(selectedQuestion.id)}
                  >
                    {savedQuestions.includes(selectedQuestion.id)
                      ? '저장됨'
                      : '질문 저장'}
                  </Button>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    내 답변
                  </label>
                  <Textarea
                    placeholder="여기에 답변을 작성하세요..."
                    value={answer}
                    onChange={handleAnswerChange}
                    className="min-h-[150px]"
                    disabled={selectedQuestion.answered}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={
                      loading || !answer.trim() || selectedQuestion.answered
                    }
                    className={
                      selectedQuestion.answered
                        ? 'bg-green-600 hover:bg-green-700'
                        : ''
                    }
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {selectedQuestion.answered ? '답변 완료' : '답변 제출'}
                  </Button>
                </div>

                {(feedback || selectedQuestion.feedback) && (
                  <div className="mt-4 rounded-md bg-slate-50 p-3">
                    <h4 className="mb-2 text-sm font-medium">피드백</h4>
                    <div className="text-sm whitespace-pre-line text-slate-700">
                      {feedback || selectedQuestion.feedback}
                    </div>
                  </div>
                )}

                <div className="mt-4 rounded-md bg-slate-50 p-3">
                  <h4 className="mb-2 text-sm font-medium">모범 답안</h4>
                  <div className="text-sm text-slate-700">
                    {selectedQuestion.bestAnswer}
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

export default CSQuestionsTab
