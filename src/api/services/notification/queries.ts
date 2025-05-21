import { fetcher, useGetQuery } from '@/api/lib/fetcher'
import { DefaultResponse } from './model'
import { useMutation } from '@tanstack/react-query'

export const useNotifications = () => {
  return useGetQuery<Notification>(['notifications'], '/notifications')
}

export const useReadNotification = () => {
  useMutation<DefaultResponse, Error, number>({
    mutationFn: (notificationId: number) => {
      return fetcher<DefaultResponse>(`/notifications/${notificationId}`, {
        method: 'POST',
      })
    },
  })
}
