// 프로젝트 데이터 타입
export interface Project {
  id: string
  title: string
  description: string
  role: string
  techStack: string[]
  status: string
  updatedAt: string
  files: string[]
}

// 커밋 데이터 타입
export interface Commit {
  id: string
  fileName: string
  code: string
  commitDate: string
}

// CS 질문 타입
export interface CSQuestion {
  id: number
  question: string
  bestAnswer: string
}

// 질문 이력 아이템 타입
export interface QuestionHistoryItem {
  id: number
  question: string
  codeSnippet?: string
  fileName?: string
  status?: string
  // API 응답에서 가능한 필드
  csQuestionId?: number
  answer?: string
  feedback?: string
  answered?: boolean
  concept?: string
  date?: string
  userCode?: string
}

// 날짜별 질문 이력 타입
export interface HistoryByDate {
  [key: string]: QuestionHistoryItem[]
}
