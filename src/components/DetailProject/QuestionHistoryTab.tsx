'use client'

import React from 'react'
import { QuestionHistoryContainer } from './questionHistory/QuestionHistoryContainer'
import { HistoryByDate } from '@/api/mocks/handlers/project'

export interface QuestionHistoryTabProps {
  projectId: string
  initialHistory?: HistoryByDate
  onBookmarkQuestion?: (questionId: number) => Promise<boolean>
}

/**
 * 질문 이력 탭 컴포넌트
 * 날짜별로 그룹화된 질문 이력을 표시합니다.
 */
const QuestionHistoryTab: React.FC<QuestionHistoryTabProps> = (props) => {
  return <QuestionHistoryContainer {...props} />
}

export default QuestionHistoryTab
