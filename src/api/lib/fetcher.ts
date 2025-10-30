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
  const { accessToken, refreshToken, role, setAccessToken, clearAuth } =
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

    // 401: 인증 만료(토큰 재발급 시도)
    if (response.status === 401) {
      if (!retry) {
        clearAuth()
        throw new Error('인증이 만료되었습니다. 다시 로그인해 주세요.')
      }

      // ✅ GUEST 유저는 재발급 시도 금지
      if (role === 'GUEST') {
        throw new Error('GUEST 유저는 토큰 재발급 대상이 아닙니다.')
      }

      // refreshToken 없으면 그냥 로그아웃
      if (!refreshToken) {
        clearAuth()
        throw new Error('토큰이 만료되었습니다. 다시 로그인해 주세요.')
      }

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

      // 🔄 새 accessToken 저장
      setAccessToken(data.result)

      // ✅ 단 한 번만 재시도
      return await fetcher<T>(url, options, false)
    }

    // 403: 권한 없음 (토큰 만료와는 다른 상태)
    if (response.status === 403) {
      throw new Error('권한이 없습니다.')
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

export const usePostMutation = <T, V = void>(
  url: string,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, {
        method: 'POST',
        ...(data !== undefined && { body: JSON.stringify(data) }),
      }),
    ...options,
  })
}

export const usePutMutation = <T, V = void>(
  url: string,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, {
        method: 'PUT',
        ...(data !== undefined &&
          data !== null && { body: JSON.stringify(data) }),
      }),
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
