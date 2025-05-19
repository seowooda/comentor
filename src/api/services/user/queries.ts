import { usePostMutation, usePutMutation } from '@/api/lib/fetcher'
import { User, UserResponse } from './model'

export const useUserJoin = () => {
  return usePostMutation<UserResponse, User>('/user/join')
}

export const useUserEdit = () => {
  return usePutMutation<UserResponse, User>('/user/edit')
}
