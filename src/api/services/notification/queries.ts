import { fetcher, useGetQuery } from '@/api/lib/fetcher'
import { DefaultResponse, Notification } from './model'
import { useMutation } from '@tanstack/react-query'

export const useNotifications = () => {
  return useGetQuery<Notification[]>(['notifications'], '/notifications')
}

export const useReadNotification = () => {
  return useMutation<DefaultResponse, Error, number>({
    mutationFn: (notificationId: number) => {
      return fetcher<DefaultResponse>(
        `/notifications/read?id=${notificationId}`,
        {
          method: 'POST',
        },
      )
    },
  })
}
