export interface DefaultResponse {
  code: number
  message: string
}

export interface Folder {
  id: number
  folder_name: string
}

export interface FolderResponse {
  code: number
  message: string
  result: Folder[]
}

export interface FolderDetail {
  id: number
  folderId: number
  question: string
  date: string
  answer: string
  feedback: string
}

export interface FolderDetailResponse {
  code: number
  message: string
  result: FolderDetail[]
}

export interface FolderUpdate {
  folder_name: string
}
