import {
  useDeleteMutation,
  useGetQuery,
  usePostMutation,
  usePutMutation,
} from '@/api/lib/fetcher'
import {
  FolderResponse,
  DefaultResponse,
  Folder,
  FolderQuestionResponse,
  FolderBookmark,
} from './model'

//폴더 목록 조회
export const folderInfo = () => {
  return useGetQuery<FolderResponse>(['folders'], '/folder')
}

//폴더 이름 수정
export const folderUpdate = () => {
  return usePutMutation<DefaultResponse, Folder>('/folder')
}

//폴더 삭제
export const folderDelete = (folderId: number) => {
  return useDeleteMutation<DefaultResponse>(`/folder?folderId=${folderId}`)
}

//폴더 질문 북마크
export const folderBookmark = () => {
  return usePostMutation<DefaultResponse, FolderBookmark>('/folder')
}

//폴더 질문 북마크 취소
export const folderBookmarkCancel = () => {
  return usePostMutation<DefaultResponse, FolderBookmark>('/folder/cancel')
}

//폴더 질문 목록 조회
export const folderQuestions = (folderId: number) => {
  return useGetQuery<FolderQuestionResponse>(
    ['questions'],
    `/folder/questions?folderId=${folderId}`,
  )
}
