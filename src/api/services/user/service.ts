import { fetcher } from '@/api/lib/fetcher'
import { User } from './model'

export const joinUser = async (user: User) => {
  return fetcher<{ message: string }>('/user/join', {
    method: 'POST',
    body: JSON.stringify(user),
  })
}
