import { useAuthStore } from '@/stores/AuthStore'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface FetchOptions extends RequestInit {
  auth?: boolean
}

export const fetcher = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    credentials: 'include', // ✅ 인증 쿠키 포함
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// ✅ GET 요청 (React Query)
export const useGetQuery = <T>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => fetcher<T>(url, { method: 'GET' }),
    staleTime: 1000 * 60 * 5, // ✅ 5분 동안은 fresh 상태 유지
    ...options,
  })
}

// ✅ POST 요청 (React Query)
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

// ✅ PUT 요청 (React Query)
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

// ✅ DELETE 요청 (React Query)
export const useDeleteMutation = <T>(
  url: string,
  options?: UseMutationOptions<T, Error, void>,
) => {
  return useMutation<T, Error, void>({
    mutationFn: () => fetcher<T>(url, { method: 'DELETE' }),
    ...options,
  })
}
