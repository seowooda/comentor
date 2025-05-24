import { useDeleteMutation, usePostMutation } from '@/api/lib/fetcher'
import { DefaultResponse, FCMRegisterRequest } from './model'

export const useRegisterFCMToken = () => {
  return usePostMutation<DefaultResponse, FCMRegisterRequest>('/push/register')
}

export const useDeleteFCMToken = () => {
  return useDeleteMutation<DefaultResponse, FCMRegisterRequest>('/push/logout')
}
