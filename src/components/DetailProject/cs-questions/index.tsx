'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import { CSQuestionsTabProps } from '../types'
import CodeSnippetViewer from '../ui/CodeSnippetViewer'
import QuestionList from './QuestionList'
import AnswerForm from './AnswerForm'
import LearningInsights from './LearningInsights'
import useCSQuestions from './useCSQuestions'

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
  const {
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
  } = useCSQuestions({ projectId, codeSnippet })

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
      {/* 코드 스니펫 표시 */}
      <CodeSnippetViewer
        code={codeSnippet}
        current={currentQuestionIndex}
        total={questions.length}
        progress={progressPercentage}
      />

      {/* 학습 인사이트 (모든 질문 답변 시) */}
      {allQuestionsAnswered && (
        <LearningInsights
          show={showLearningInsights}
          showToast={showCompletionToast}
          onChooseAnotherCode={onChooseAnotherCode || (() => {})}
          onGenerateMoreQuestions={onGenerateMoreQuestions || (() => {})}
          onFinish={onFinish || (() => {})}
          onToggle={toggleLearningInsights}
        />
      )}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* 질문 목록 */}
        <div className="md:col-span-1">
          <QuestionList
            questions={questions}
            selectedQuestionId={selectedQuestionId}
            savedQuestions={savedQuestions}
            onSelectQuestion={handleSelectQuestion}
          />
        </div>

        {/* 답변 폼 및 피드백 */}
        <div className="md:col-span-2">
          <AnswerForm
            question={selectedQuestion}
            answer={answer}
            feedback={feedback}
            loading={loading}
            onAnswerChange={handleAnswerChange}
            onSubmit={() => handleSubmitAnswer(onAnswerSubmit)}
            onSave={(id) => handleSaveQuestion(id, onSaveQuestion)}
            isSaved={
              selectedQuestionId
                ? savedQuestions.includes(selectedQuestionId)
                : false
            }
          />
        </div>
      </div>
    </div>
  )
}

export default CSQuestionsTab
