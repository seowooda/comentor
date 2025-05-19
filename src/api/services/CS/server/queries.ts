import { serverFetcher } from '@/api/lib/serverFetcher'
import { CSQuestionDetailResponse } from '../model'

export const fetchCSQuestion = async (questionId: number) => {
  return await serverFetcher<CSQuestionDetailResponse>(
    `/question?csQuestionId=${questionId}`,
  )
}
