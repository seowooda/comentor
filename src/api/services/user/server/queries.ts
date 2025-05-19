import { serverFetcher } from '@/api/lib/serverFetcher'
import { UserResponse } from '../model'

export const fetchUserInfo = async () => {
  return await serverFetcher<UserResponse>('/user/info')
}
