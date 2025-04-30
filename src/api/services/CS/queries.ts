import { fetcher, useGetQuery } from '@/api/lib/fetcher'
import { CSQuestionDetailResponse, CSQuestionResponse } from './model'
import { useInfiniteQuery } from '@tanstack/react-query'

export const getCSQuestion = (page: number) => {
  return useGetQuery<CSQuestionResponse>(
    ['CS Dashboard', page.toString()],
    `/question/list?page=${page}`,
    {
      enabled: page !== undefined,
      staleTime: 0,
    },
  )
}

export const getCSQuestionDetail = (csQuestionId: number) => {
  return useGetQuery<CSQuestionDetailResponse>(
    ['cs-question', csQuestionId.toString()],
    `/question?csQuestionId=${csQuestionId}`,
  )
}

export const useInfiniteQuestions = () => {
  return useInfiniteQuery<CSQuestionResponse>({
    queryKey: ['cs-question-infinite'],
    queryFn: async ({ pageParam = 0 }) => {
      return await fetcher<CSQuestionResponse>(
        `/question/list?page=${pageParam}`,
        {
          method: 'GET',
        },
      )
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.result
      return currentPage < totalPages - 1 ? currentPage + 1 : undefined
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5, // optional: 5분 캐시
  })
}