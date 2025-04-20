export enum QuestionStatus {
  DONE = 'DONE',
  TODO = 'TODO',
}

export enum CSCategory {
  DATA_STRUCTURE_ALGORITHM = 'DATA_STRUCTURE_ALGORITHM',
  OPERATING_SYSTEMS = 'OPERATING_SYSTEMS',
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  SECURITY = 'SECURITY',
  LANGUAGE_AND_DEVELOPMENT_PRINCIPLES = 'LANGUAGE_AND_DEVELOPMENT_PRINCIPLES',
  ETC = 'ETC',
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
  questionId: number
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
