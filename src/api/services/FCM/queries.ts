import { useDeleteMutation, usePostMutation } from '@/api/lib/fetcher'
import { DefaultResponse, FCMToken } from './model'

export const useRegisterFCMToken = () => {
  return usePostMutation<DefaultResponse, FCMToken>('/push/register')
}

export const useDeleteFCMToken = () => {
  return useDeleteMutation<DefaultResponse, FCMToken>('/push/logout')
}
