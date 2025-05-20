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

// CS 질문 응답 DTO (Data Transfer Object) - 백엔드 API 응답 타입
export interface CSQuestionDTO {
  questionId: number
  question: string
  relatedCode?: string
  csCategory?: string
}

// 핵심 도메인 모델 - 앱 내부에서 사용하는 기본 타입
export interface CSQuestion {
  id: number
  question: string
  relatedCode?: string
  csCategory?: string
}

// DTO에서 도메인 모델로 변환하는 헬퍼 함수
export function mapDtoToCSQuestion(dto: CSQuestionDTO): CSQuestion {
  return {
    id: dto.questionId,
    question: dto.question,
    relatedCode: dto.relatedCode,
    csCategory: dto.csCategory,
  }
}

// 질문 이력 아이템 타입
export interface QuestionHistoryItem {
  id: number
  question: string
  relatedCode?: string
  status?: string
  csQuestionId?: number
  answer?: string
  feedback?: string
  date?: string
  userCode?: string
  answered?: boolean
}

// 날짜별 질문 이력 타입
export interface HistoryByDate {
  [key: string]: QuestionHistoryItem[]
}

// 파일 및 폴더 정보 인터페이스 (깃허브 파일 호출용)
export interface FileItem {
  name: string
  path: string
  type: 'file' | 'dir'
  url?: string
}

export interface CategoryQuestionCountResponse {
  code: number
  message: string
  result: Record<string, number>
}

export interface CategoryCorrectStat {
  category: string
  correctCount: number
  incorrectCount: number
}

export interface CategoryCorrectStatsResponse {
  code: number
  message: string
  result: CategoryCorrectStat[]
}
