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

export const folderInfo = () => {
  return useGetQuery<FolderResponse>(['folders'], '/folder')
}

export const folderUpdate = () => {
  return usePutMutation<DefaultResponse, Folder>('/folder')
}

export const folderDelete = (folderId: number) => {
  return useDeleteMutation<DefaultResponse>(`/folder?folderId=${folderId}`)
}

export const folderBookmark = () => {
  return usePostMutation<DefaultResponse, FolderBookmark>('/folder')
}

export const folderBookmarkCancel = () => {
  return usePostMutation<DefaultResponse, FolderBookmark>('/folder/cancel')
}

export const folderQuestions = (folderId: number) => {
  return useGetQuery<FolderQuestionResponse>(
    ['questions'],
    `/folder/questions?folderId=${folderId}`,
  )
}
