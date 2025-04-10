'use client'

import React from 'react'
import { QuestionItem } from '../types'
import QuestionCard from '../ui/QuestionCard'

interface QuestionListProps {
  questions: QuestionItem[]
  selectedQuestionId: number | null
  savedQuestions: number[]
  onSelectQuestion: (id: number) => void
}

/**
 * CS 질문 목록 컴포넌트
 */
const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  selectedQuestionId,
  savedQuestions,
  onSelectQuestion,
}) => {
  if (questions.length === 0) {
    return (
      <div className="rounded-md bg-slate-50 p-4 text-center text-slate-500">
        질문이 없습니다. 코드를 선택하고 CS 질문을 생성해주세요.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="mb-2 text-sm font-medium text-slate-800">질문 목록</h3>
      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          question={question}
          isSelected={selectedQuestionId === question.id}
          isBookmarked={savedQuestions.includes(question.id)}
          onClick={() => onSelectQuestion(question.id)}
        />
      ))}
    </div>
  )
}

export default QuestionList
