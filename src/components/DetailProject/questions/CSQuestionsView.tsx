'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { QuestionItem } from '../CSQuestionsTab'
import {
  CodeSnippet,
  CompletionToast,
  LearningInsights,
  QuestionDetail,
  QuestionList,
} from './components'

interface CSQuestionsViewProps {
  // 데이터
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
  selectedQuestion?: QuestionItem
  currentQuestionIndex: number
  answeredCount: number
  codeSnippet: string

  // 이벤트 핸들러
  onSelectQuestion: (id: number) => void
  onAnswerChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmitAnswer: () => void
  onSaveQuestion: (questionId: number) => void
  onToggleLearningInsights: () => void
  onChooseAnotherCode: () => void
  onGenerateMoreQuestions: () => void
  onFinish: () => void
}

/**
 * CS 질문 UI 렌더링 컴포넌트
 * 상태 관리 없이 UI만 표시합니다.
 */
export const CSQuestionsView: React.FC<CSQuestionsViewProps> = ({
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
  codeSnippet,
  onSelectQuestion,
  onAnswerChange,
  onSubmitAnswer,
  onSaveQuestion,
  onToggleLearningInsights,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  onFinish,
}) => {
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
      <CompletionToast show={showCompletionToast} />

      {/* 선택된 코드 영역 */}
      <CodeSnippet
        codeSnippet={codeSnippet}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
      />

      {/* 학습 인사이트 관련 컴포넌트 */}
      {allQuestionsAnswered && (
        <LearningInsights
          showLearningInsights={showLearningInsights}
          onToggleLearningInsights={onToggleLearningInsights}
          onChooseAnotherCode={onChooseAnotherCode}
          onGenerateMoreQuestions={onGenerateMoreQuestions}
          answeredCount={answeredCount}
          savedQuestionsCount={savedQuestions.length}
          totalQuestionsCount={questions.length}
        />
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 왼쪽 질문 목록 영역 */}
        <QuestionList
          questions={questions}
          selectedQuestionId={selectedQuestionId}
          savedQuestions={savedQuestions}
          allQuestionsAnswered={allQuestionsAnswered}
          onSelectQuestion={onSelectQuestion}
          onChooseAnotherCode={onChooseAnotherCode}
          onGenerateMoreQuestions={onGenerateMoreQuestions}
          onFinish={onFinish}
        />

        {/* 오른쪽 질문 상세/답변 영역 */}
        <QuestionDetail
          selectedQuestion={selectedQuestion}
          answer={answer}
          feedback={feedback}
          loading={loading}
          savedQuestions={savedQuestions}
          onAnswerChange={onAnswerChange}
          onSubmitAnswer={onSubmitAnswer}
          onSaveQuestion={onSaveQuestion}
        />
      </div>
    </div>
  )
}
