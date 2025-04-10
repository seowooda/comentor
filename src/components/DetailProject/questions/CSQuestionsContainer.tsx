'use client'

import React from 'react'
import { CSQuestionsView } from './CSQuestionsView'
import { useCSQuestions } from './useCSQuestions'
import { CSQuestionsTabProps } from '../CSQuestionsTab'

/**
 * CS 질문 컨테이너 컴포넌트
 * 데이터와 로직을 관리하고, UI 컴포넌트에 전달합니다.
 */
export const CSQuestionsContainer: React.FC<CSQuestionsTabProps> = ({
  projectId,
  codeSnippet = '',
  onAnswerSubmit,
  onSaveQuestion,
  onChooseAnotherCode,
  onGenerateMoreQuestions,
  onFinish,
}) => {
  const {
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
  } = useCSQuestions({
    projectId,
    codeSnippet,
    onAnswerSubmit,
    onSaveQuestion,
  })

  // 질문이 아직 로딩 중이거나 데이터가 없는 경우 처리는 View 컴포넌트에게 위임
  return (
    <CSQuestionsView
      questions={questions}
      selectedQuestionId={selectedQuestionId}
      answer={answer}
      feedback={feedback}
      loading={loading}
      questionsLoading={questionsLoading}
      savedQuestions={savedQuestions}
      showCompletionToast={showCompletionToast}
      showLearningInsights={showLearningInsights}
      allQuestionsAnswered={allQuestionsAnswered}
      selectedQuestion={selectedQuestion}
      currentQuestionIndex={currentQuestionIndex}
      answeredCount={answeredCount}
      codeSnippet={codeSnippet}
      onSelectQuestion={handleSelectQuestion}
      onAnswerChange={handleAnswerChange}
      onSubmitAnswer={handleSubmitAnswer}
      onSaveQuestion={handleSaveQuestion}
      onToggleLearningInsights={toggleLearningInsights}
      onChooseAnotherCode={onChooseAnotherCode || (() => {})}
      onGenerateMoreQuestions={onGenerateMoreQuestions || (() => {})}
      onFinish={onFinish || (() => {})}
    />
  )
}
