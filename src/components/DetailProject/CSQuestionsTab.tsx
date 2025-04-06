'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { CSQuestion } from '@/api/mocks/handlers/project'
import { generateCSQuestions } from '@/api/services/project'

interface QuestionItem extends CSQuestion {}

export interface CSQuestionsTabProps {
  projectId: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean>
}

/**
 * CS 질문 탭 컴포넌트
 * 생성된 CS 질문 목록을 표시하고 답변을 제출할 수 있습니다.
 */
const CSQuestionsTab: React.FC<CSQuestionsTabProps> = ({
  projectId,
  onAnswerSubmit,
  onSaveQuestion,
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

  // 질문 데이터 가져오기
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!projectId) return

      setQuestionsLoading(true)
      try {
        const data = await generateCSQuestions(projectId, '', '')
        setQuestions(data)
        if (data.length > 0 && selectedQuestionId === null) {
          setSelectedQuestionId(data[0].id)
        }
      } catch (error) {
        console.error('CS 질문을 가져오는 중 오류 발생:', error)
      } finally {
        setQuestionsLoading(false)
      }
    }

    fetchQuestions()
  }, [projectId])

  const handleSelectQuestion = (id: number) => {
    setSelectedQuestionId(id)
    setAnswer('')
    setFeedback(null)
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

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)

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
                  {savedQuestions.includes(question.id) && (
                    <span className="ml-2 shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-600">
                      저장됨
                    </span>
                  )}
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
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={loading || !answer.trim()}
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    답변 제출
                  </Button>
                </div>

                {feedback && (
                  <div className="mt-4 rounded-md bg-slate-50 p-3">
                    <h4 className="mb-2 text-sm font-medium">피드백</h4>
                    <div className="text-sm whitespace-pre-line text-slate-700">
                      {feedback}
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
