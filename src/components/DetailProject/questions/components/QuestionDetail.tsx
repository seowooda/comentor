'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { QuestionItem } from '../../CSQuestionsTab'

interface QuestionDetailProps {
  selectedQuestion?: QuestionItem
  answer: string
  feedback: string | null
  loading: boolean
  savedQuestions: number[]
  onAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmitAnswer: () => void
  onSaveQuestion: (questionId: number) => void
}

/**
 * 질문 상세 및 답변 컴포넌트
 * 선택된 질문의 상세 정보를 표시하고 답변 작성 기능을 제공합니다.
 */
export const QuestionDetail: React.FC<QuestionDetailProps> = ({
  selectedQuestion,
  answer,
  feedback,
  loading,
  savedQuestions,
  onAnswerChange,
  onSubmitAnswer,
  onSaveQuestion,
}) => {
  if (!selectedQuestion) {
    return (
      <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
        <div className="flex h-60 items-center justify-center text-slate-500">
          왼쪽에서 질문을 선택해주세요.
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-md border border-slate-200 p-4 lg:col-span-2">
      <div className="mb-4">
        <h3 className="font-medium text-slate-800">
          {selectedQuestion.question}
        </h3>

        <div className="mt-1 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => onSaveQuestion(selectedQuestion.id)}
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
          <label className="mb-2 block text-sm font-medium">내 답변</label>
          <Textarea
            placeholder="여기에 답변을 작성하세요..."
            value={answer}
            onChange={onAnswerChange}
            className="min-h-[150px]"
            disabled={selectedQuestion.answered}
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={onSubmitAnswer}
            disabled={loading || !answer.trim() || selectedQuestion.answered}
            className={
              selectedQuestion.answered ? 'bg-green-600 hover:bg-green-700' : ''
            }
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
    </div>
  )
}
