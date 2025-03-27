import { useAuthStore } from '@/stores/AuthStore'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'

export const API_URL = process.env.NEXT_PUBLIC_API_URL

interface FetchOptions extends RequestInit {
  auth?: boolean
}

export const fetcher = async <T>(
  url: string,
  { auth = false, headers, ...options }: FetchOptions = {},
): Promise<T> => {
  const token = auth ? useAuthStore.getState().token : null

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// ✅ GET 요청 (React Query)
export const useGetQuery = <T>(
  key: string[],
  url: string,
  auth: boolean = false,
  options?: UseQueryOptions<T, Error>,
) => {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: () => fetcher<T>(url, { method: 'GET', auth }),
    ...options,
  })
}

// ✅ POST 요청 (React Query)
export const usePostMutation = <T, V>(
  url: string,
  auth: boolean = false,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, { method: 'POST', body: JSON.stringify(data), auth }),
    ...options,
  })
}

// ✅ PUT 요청 (React Query)
export const usePutMutation = <T, V>(
  url: string,
  auth: boolean = false,
  options?: UseMutationOptions<T, Error, V>,
) => {
  return useMutation<T, Error, V>({
    mutationFn: (data: V) =>
      fetcher<T>(url, { method: 'PUT', body: JSON.stringify(data), auth }),
    ...options,
  })
}

// ✅ DELETE 요청 (React Query)
export const useDeleteMutation = <T>(
  url: string,
  auth: boolean = false,
  options?: UseMutationOptions<T, Error, void>,
) => {
  return useMutation<T, Error, void>({
    mutationFn: () => fetcher<T>(url, { method: 'DELETE', auth }),
    ...options,
  })
}
