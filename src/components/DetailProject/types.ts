import {
  Project,
  HistoryByDate as ImportedHistoryByDate,
} from '@/api/services/project/model'

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
  onSelectCodeSnippet: (snippet: string, folderName: string) => void
}

// CS 질문 관련 타입 (공통 속성)
interface BaseQuestion {
  id: number
  question: string
  codeSnippet?: string
  fileName?: string
  folderName?: string
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
  folderName?: string
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
  activeTab?: string
  activeCSQuestionIds?: number[]
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

// 질문 이력 아이템 기본 타입
export interface QuestionHistoryItem extends BaseQuestion {
  answer?: string
  feedback?: string
  answered?: boolean
  createdAt?: string
  questionId?: number
  csQuestionId?: number

  [key: string]: any
}

// 날짜별 질문 이력 타입
export interface HistoryByDate extends ImportedHistoryByDate {}

// 탭 컴포넌트 공통 속성
export interface TabProps {
  projectId: string
  onTabChange?: (tabId: string) => void
}

// CS 질문 탭 컴포넌트 속성
export interface CSQuestionsTabProps extends TabProps {
  codeSnippet?: string
  folderName?: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean | undefined>
  onQuestionsLoad?: (questions: any[]) => void
}

// 코드 선택 탭 컴포넌트 속성
export interface CodeSelectionTabProps extends TabProps {
  onSelectedCode?: (code: string) => void
  onFinish?: () => void
}
