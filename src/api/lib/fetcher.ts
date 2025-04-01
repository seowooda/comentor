import { useAuthStore } from '@/store/authStore'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'

const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  const { accessToken, refreshToken, setAccessToken, clearAuth } =
    useAuthStore.getState()

  const fetchRequest = async (token: string | null): Promise<T> => {
    const response = await fetch(`/api${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
        ...options.headers,
      },
    })

    if (response.status === 403) {
      // ✅ refreshToken이 없으면 바로 로그아웃 처리
      if (!refreshToken) {
        clearAuth()
        throw new Error('토큰이 만료되었습니다. 다시 로그인해 주세요.')
      }

      // ✅ accessToken 갱신 요청
      const refreshResponse = await fetch('/api/user/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })

      if (!refreshResponse.ok) {
        clearAuth()
        throw new Error('토큰이 만료되었습니다. 다시 로그인해 주세요.')
      }

      const data = await refreshResponse.json()
      setAccessToken(data.accessToken)

      // ✅ 새로운 accessToken으로 원래 요청 재시도
      return await fetchRequest(data.accessToken)
    }

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  return await fetchRequest(accessToken)
}

export const useGetQuery = <T>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => fetcher<T>(url, { method: 'GET' }),
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

export const usePostMutation = <T, V>(
  url: string,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, { method: 'POST', body: JSON.stringify(data) }),
    ...options,
  })
}

export const usePutMutation = <T, V>(
  url: string,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, { method: 'PUT', body: JSON.stringify(data) }),
    ...options,
  })
}

export const useDeleteMutation = <T>(
  url: string,
  options?: UseMutationOptions<T, Error, void>,
) => {
  return useMutation<T, Error, void>({
    mutationFn: () => fetcher<T>(url, { method: 'DELETE' }),
    ...options,
  })
}
