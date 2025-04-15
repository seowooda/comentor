import {
  useDeleteMutation,
  useGetQuery,
  usePutMutation,
} from '@/api/lib/fetcher'
import {
  FolderResponse,
  FolderUpdate,
  DefaultResponse,
  FolderDetailResponse,
} from './model'

export const folderInfo = () => {
  return useGetQuery<FolderResponse>(['folders'], '/folders')
}

export const folderUpdate = (folderId: number) => {
  return usePutMutation<DefaultResponse, FolderUpdate>(`/folders/${folderId}`)
}

export const folderDelete = (folderId: number) => {
  return useDeleteMutation<DefaultResponse>(`/folders/${folderId}`)
}

export const folderDetailInfo = () => {
  return useGetQuery<FolderDetailResponse>(['records'], '/records')
}
