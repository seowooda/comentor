// 질문 관련 공통 타입 임포트
import {
  CSQuestion,
  HistoryByDate,
  QuestionHistoryItem,
} from '@/api/mocks/handlers/project'

// CS 질문 생성 요청 타입 정의
export interface CreateProjectCsQuestionRequest {
  projectId: number
  userCode: string
  folderName?: string
}

// 피드백 요청 타입 정의
export interface FeedbackRequest {
  csQuestionId: number
  answer: string
}

// 피드백 응답 타입 정의
export interface FeedbackResponse {
  code: number
  message: string
  result: string
}

// CS 질문 응답 타입 정의
export interface CSQuestionResponse {
  code: number
  message: string
  result: {
    id: number
    question: string
    csStack?: string
    codeSnippet?: string
    createdAt: string
  }
}

// CS 질문 목록 응답 타입 정의
export interface CSQuestionListResponse {
  code: number
  message: string
  result: Record<
    string,
    Array<{
      id: number
      question: string
      csStack?: string
      answered?: boolean
      createdAt: string
    }>
  >
}

// 최근 CS 질문 목록 응답 타입 정의
export interface RecentCSQuestionsResponse {
  code: number
  message: string
  result: Array<{
    id: number
    question: string
    csStack?: string
    codeSnippet?: string
    createdAt: string
  }>
}

// 공통 타입들을 재내보내기
export type { CSQuestion, HistoryByDate, QuestionHistoryItem }
