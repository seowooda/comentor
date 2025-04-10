'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { FileText, RefreshCw, X } from 'lucide-react'
import { QuestionItem } from '../../CSQuestionsTab'

interface QuestionListProps {
  questions: QuestionItem[]
  selectedQuestionId: number | null
  savedQuestions: number[]
  allQuestionsAnswered: boolean
  onSelectQuestion: (id: number) => void
  onChooseAnotherCode: () => void
  onGenerateMoreQuestions: () => void
  onFinish: () => void
}

/**
 * 질문 목록 컴포넌트
 * 생성된 CS 질문 목록을 표시하고 선택 기능을 제공합니다.
 */
export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedQuestionId,
  savedQuestions,
  allQuestionsAnswered,
  onSelectQuestion,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  onFinish,
}) => {
  return (
    <div className="lg:col-span-1">
      <h3 className="mb-4 font-semibold text-slate-800">생성된 CS 질문</h3>
      <div className="space-y-2">
        {questions.map((question) => (
          <div
            key={question.id}
            className={`cursor-pointer rounded-md p-3 ${selectedQuestionId === question.id ? 'bg-slate-100' : 'bg-white hover:bg-slate-50'}`}
            onClick={() => onSelectQuestion(question.id)}
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
  )
}
