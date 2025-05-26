import { useAuthStore } from '@/store/authStore'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'

export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
  retry = true,
): Promise<T> => {
  const { accessToken, refreshToken, setAccessToken, clearAuth } =
    useAuthStore.getState()

  const fetchRequest = async (token: string | null): Promise<T> => {
    const response = await fetch(`/api${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    })

    // 🔹 인증 실패 시 토큰 재발급 시도
    if (response.status === 401 || response.status === 403) {
      if (!retry) {
        // 이미 재시도 한 번 했는데도 실패했다면, 로그인 해제
        clearAuth()
        throw new Error('인증이 만료되었습니다. 다시 로그인해 주세요.')
      }

      // refreshToken 없으면 그냥 종료
      if (!refreshToken) {
        clearAuth()
        throw new Error('토큰이 만료되었습니다. 다시 로그인해 주세요.')
      }

      // 🔁 accessToken 재발급 시도
      const refreshResponse = await fetch('/api/user/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })

      if (!refreshResponse.ok) {
        clearAuth()
        throw new Error('토큰 재발급 실패. 다시 로그인해 주세요.')
      }

      const data = await refreshResponse.json()

      if (!data.result) {
        clearAuth()
        throw new Error('토큰 재발급 실패. 다시 로그인해 주세요.')
      }

      // 🆕 새 accessToken 저장
      setAccessToken(data.result)

      // ✅ 한 번만 재시도
      return await fetcher<T>(url, options, false)
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
    staleTime: 1000 * 60 * 5, // 5분 캐시
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

export const useDeleteMutation = <T, V = void>(
  url: string,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) => {
      const hasBody = data !== undefined && data !== null

      return fetcher<T>(url, {
        method: 'DELETE',
        ...(hasBody && {
          body: JSON.stringify(data),
        }),
      })
    },
    ...options,
  })
}
