export enum QuestionStatus {
  Done = 'DONE',
  Progress = 'PROGRESS',
}

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
  fileName: string
  questionId: number
  question: string
  questionStatus: QuestionStatus
}

export interface FolderQuestionResponse {
  code: number
  message: string
  result: Questions[]
}
