import { CSCategory, QuestionStatus } from '@/api/types/common'

export interface DefaultResponse {
  code: number
  message: string
}

export interface Folder {
  folderId: number
  fileName: string
}

export interface FolderResponse {
  code: number
  message: string
  result: Folder[]
}

export interface FolderBookmark {
  fileName: string
  csQuestionId: number
}

export interface Questions {
  questionId: number
  projectId: number
  question: string
  repoName: string
  fileName: string
  csCategory: CSCategory
  questionStatus: QuestionStatus
}

export interface FolderQuestionResponse {
  code: number
  message: string
  result: Questions[]
}
