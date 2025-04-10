'use client'

import React from 'react'
import { CSQuestionsContainer } from './questions/CSQuestionsContainer'
import { CSQuestion } from '@/api/mocks/handlers/project'

export interface CSQuestionsTabProps {
  projectId: string
  codeSnippet?: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean>
  onChooseAnotherCode?: () => void
  onGenerateMoreQuestions?: () => void
  onFinish?: () => void
}

export interface QuestionItem extends CSQuestion {
  answered?: boolean
  userAnswer?: string
  feedback?: string
}

/**
 * CS 질문 탭 컴포넌트
 * 생성된 CS 질문 목록을 표시하고 답변을 제출할 수 있습니다.
 */
const CSQuestionsTab: React.FC<CSQuestionsTabProps> = (props) => {
  return <CSQuestionsContainer {...props} />
}

export default CSQuestionsTab
