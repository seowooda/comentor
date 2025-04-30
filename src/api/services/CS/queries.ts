import { useGetQuery } from '@/api/lib/fetcher'
import { CSQuestionDetailResponse, CSQuestionResponse } from './model'

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
