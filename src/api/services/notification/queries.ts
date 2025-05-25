import { fetcher, useGetQuery } from '@/api/lib/fetcher'
import { DefaultResponse, Notification } from './model'
import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'

export const useNotifications = () => {
  const { accessToken } = useAuthStore()

  return useGetQuery<Notification[]>(['notifications'], '/notifications', {
    enabled: !!accessToken,
  })
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
