import { useGetQuery } from '@/api/lib/fetcher'
import {
  CategoryQuestionCountResponse,
  CategoryCorrectStatsResponse,
  CategoryCorrectStat,
} from './model'
import { CATEGORY_KEYS } from './constants'

// CS 연습 - 카테고리별 풀이 수
export const useCategoryQuestionCount = () => {
  return useGetQuery<CategoryQuestionCountResponse>(
    ['category-question-count'],
    '/question/category',
  )
}

// CS 연습 - 카테고리별 정오답 수
export const useCategoryCorrectStats = () => {
  return useGetQuery<CategoryCorrectStatsResponse>(
    ['category-correct-stats'],
    '/question/category/correct',
  )
}

// 프로젝트 기반 - 카테고리별 풀이 수
export const useProjectCategoryQuestionCount = () => {
  return useGetQuery<CategoryQuestionCountResponse>(
    ['project-category-question-count'],
    '/question/project/category',
  )
}

// 프로젝트 기반 - 카테고리별 정오답 수
export const useProjectCategoryCorrectStats = () => {
  return useGetQuery<CategoryCorrectStatsResponse>(
    ['project-category-correct-stats'],
    '/question/project/category/correct',
  )
}

// 카테고리별 질문 수 가공
export function normalizeCategoryCount(
  raw: Record<string, number>,
): Record<string, number> {
  const result: Record<string, number> = {}
  for (const key of CATEGORY_KEYS) {
    result[key] = raw[key] ?? 0
  }
  return result
}

// 카테고리별 정오답 수 가공
export function normalizeCategoryCorrectStats(
  raw: CategoryCorrectStat[],
): Record<string, { correct: number; incorrect: number }> {
  const result: Record<string, { correct: number; incorrect: number }> = {}
  for (const key of CATEGORY_KEYS) {
    result[key] = { correct: 0, incorrect: 0 }
  }
  for (const stat of raw) {
    if (result[stat.category]) {
      result[stat.category] = {
        correct: stat.correctCount ?? 0,
        incorrect: stat.incorrectCount ?? 0,
      }
    }
  }
  return result
}
