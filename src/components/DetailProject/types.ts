import {
  Project,
  CSQuestion,
  HistoryByDate as ImportedHistoryByDate,
} from '@/api/mocks/handlers/project'
import { RefObject } from 'react'

// 프로젝트 데이터 타입
export interface ProjectData extends Project {}

// 프로젝트 상세 페이지 props
export interface DetailProjectProps {
  params: Promise<{
    projectId: string
  }>
}

// 프로젝트 헤더 props
export interface ProjectHeaderProps {
  project: ProjectData
  onEdit?: () => void
  onDelete?: () => void
}

// 코드 선택 탭 props
export interface CodeSelectionTabProps {
  projectId: string
  files?: string[]
  onSelectCodeSnippet: (snippet: string, fileName: string) => void
}

// CS 질문 관련 타입 (공통 속성)
interface BaseQuestion {
  id: number
  question: string
  codeSnippet?: string
  fileName?: string
  status?: string
}

// CS 질문 관련 타입
export interface QuestionItem extends BaseQuestion {
  bestAnswer?: string
  answered?: boolean
  userAnswer?: string
  feedback?: string
}

// CS 질문 탭 props
export interface CSQuestionsTabProps {
  projectId: string
  codeSnippet?: string
  fileName?: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean | undefined>
  onChooseAnotherCode?: () => void
  onGenerateMoreQuestions?: () => void
  onFinish?: () => void
  onTabChange?: (tabId: string) => void
}

// 질문 이력 탭 props
export interface QuestionHistoryTabProps {
  projectId: string
  initialHistory?: HistoryByDate
  onBookmarkQuestion?: (questionId: number) => Promise<boolean>
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onTabChange?: (tabId: string) => void
}

// 재사용 가능한 UI 컴포넌트 props
export interface CodeSnippetViewerProps {
  code: string
  title?: string
  progress?: number
  total?: number
  current?: number
}

export interface QuestionCardProps {
  question: QuestionItem
  isSelected?: boolean
  isBookmarked?: boolean
  statusText?: string
  statusColor?: 'green' | 'yellow' | 'red' | 'blue'
  onClick?: () => void
  onAnswer?: (question: QuestionItem) => void
}

// 질문 이력 아이템 타입
export interface QuestionHistoryItem extends BaseQuestion {
  // API 응답에서 가능한 필드
  csQuestionId?: number
  answer?: string
  feedback?: string
  answered?: boolean
  concept?: string
  date?: string
  userCode?: string
  // API와 프론트엔드에서 사용하는 공통 필드
  questionId?: number // API 응답에서 대체 ID로 사용될 수 있음
}

// 날짜별 질문 이력 타입
export interface HistoryByDate extends ImportedHistoryByDate {}
