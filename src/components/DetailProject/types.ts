import {
  Project,
  HistoryByDate as DomainHistoryByDate,
  CSQuestion as DomainCSQuestion,
} from '@/api/services/project/model'

// HistoryByDate 재익스포트
export type HistoryByDate = DomainHistoryByDate

// =============== 프로젝트 관련 UI 타입 ===============

// 프로젝트 데이터 (도메인 모델 확장)
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

// =============== 탭 관련 UI 타입 ===============

// 탭 컴포넌트 공통 속성
export interface TabProps {
  projectId: string
  onTabChange?: (tabId: string) => void
}

// 코드 선택 탭 props
export interface CodeSelectionTabProps extends TabProps {
  files?: string[]
  onSelectCodeSnippet: (snippet: string, folderName: string) => void
  onSelectedCode?: (code: string) => void
  onFinish?: () => void
}

// =============== CS 질문 관련 UI 타입 ===============

// UI 기본 질문 타입 (도메인 모델 확장)
export interface BaseQuestion extends DomainCSQuestion {
  folderName?: string
  status?: string
  codeSnippet?: string
}

// 질문 목록 표시에 사용되는 타입
export interface QuestionItem extends BaseQuestion {
  answered?: boolean
  userAnswer?: string
  feedback?: string
}

// UI용 질문 이력 아이템 타입 (도메인 모델 확장)
export interface UIQuestionHistoryItem extends BaseQuestion {
  answer?: string
  feedback?: string
  answered?: boolean
  createdAt?: string
  questionId?: number
  csQuestionId?: number
  [key: string]: any
}

// CS 질문 탭 props
export interface CSQuestionsTabProps extends TabProps {
  relatedCode?: string
  codeSnippet?: string
  folderName?: string
  onAnswerSubmit?: (answer: string, questionId: number) => Promise<string>
  onSaveQuestion?: (questionId: number) => Promise<boolean | undefined>
  onQuestionsLoad?: (questions: any[]) => void
  onChooseAnotherCode?: () => void
  onGenerateMoreQuestions?: () => void
  onFinish?: () => void
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

// =============== 공통 UI 컴포넌트 타입 ===============

// 코드 스니펫 뷰어 props
export interface CodeSnippetViewerProps {
  code: string
  title?: string
  progress?: number
  total?: number
  current?: number
}

// 질문 카드 props
export interface QuestionCardProps {
  question: QuestionItem
  isSelected?: boolean
  isBookmarked?: boolean
  statusText?: string
  statusColor?: 'green' | 'yellow' | 'red' | 'blue'
  onClick?: () => void
  onAnswer?: (question: QuestionItem) => void
}
