'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, BookOpen } from 'lucide-react'
import { QuestionItem } from '../types'

interface AnswerFormProps {
  question: QuestionItem | undefined
  answer: string
  feedback: string | null
  loading: boolean
  onAnswerChange: (value: string) => void
  onSubmit: () => void
  onSave: (questionId: number) => void
  isSaved: boolean
}

/**
 * 답변 폼 컴포넌트
 */
const AnswerForm: React.FC<AnswerFormProps> = ({
  question,
  answer,
  feedback,
  loading,
  onAnswerChange,
  onSubmit,
  onSave,
  isSaved,
}) => {
  if (!question) {
    return (
      <div className="rounded-md bg-slate-50 p-4 text-center text-slate-500">
        질문을 선택해주세요.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md bg-slate-50 p-4">
        <h3 className="mb-2 text-sm font-medium text-slate-800">질문</h3>
        <p className="text-sm text-slate-700">{question.question}</p>

        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSave(question.id)}
            disabled={isSaved}
            className="flex items-center space-x-1 text-xs"
          >
            <BookOpen className="mr-1 h-3 w-3" />
            <span>{isSaved ? '저장됨' : '저장하기'}</span>
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium text-slate-800">답변</h3>
        <Textarea
          value={answer}
          onChange={(e) => onAnswerChange(e.target.value)}
          placeholder="답변을 입력하세요..."
          className="min-h-[120px] resize-none"
          disabled={loading || !!feedback}
        />
        <div className="mt-2 flex justify-end">
          <Button
            onClick={onSubmit}
            disabled={loading || !answer.trim() || !!feedback}
            className="flex items-center space-x-1"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                <span>제출 중...</span>
              </>
            ) : (
              '답변 제출'
            )}
          </Button>
        </div>
      </div>

      {feedback && (
        <div className="rounded-md bg-green-50 p-4">
          <h3 className="mb-2 text-sm font-medium text-green-700">피드백</h3>
          <div className="text-sm whitespace-pre-line text-green-600">
            {feedback}
          </div>
        </div>
      )}
    </div>
  )
}

export default AnswerForm
