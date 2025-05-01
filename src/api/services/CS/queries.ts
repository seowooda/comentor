import { fetcher, useGetQuery, usePostMutation } from '@/api/lib/fetcher'
import {
  CSFeedback,
  CSFeedbackResponse,
  CSQuestionDetailResponse,
  CSQuestionResponse,
} from './model'
import { useInfiniteQuery } from '@tanstack/react-query'
import { CSCategory } from '@/api/types/common'

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

export const useInfiniteQuestions = (category?: CSCategory | null) => {
  return useInfiniteQuery<CSQuestionResponse>({
    queryKey: ['cs-question-infinite', category],
    queryFn: async ({ pageParam = 0 }) => {
      const query = new URLSearchParams({
        page: pageParam as string,
      })
      if (category) query.append('csCategory', category)

      return await fetcher<CSQuestionResponse>(
        `/question/list?${query}`,
        { method: 'GET' },
      )
    },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.result
      return currentPage < totalPages - 1 ? currentPage + 1 : undefined
    },
    initialPageParam: 0,
    staleTime: 1000 * 60 * 5,
  })
}

export const useCSFeedback = () => {
  return usePostMutation<CSFeedbackResponse, CSFeedback>('/feedback/CS')
}
