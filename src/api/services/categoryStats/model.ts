export interface CategoryQuestionCountResponse {
  code: number
  message: string
  result: Record<string, number>
}

export interface CategoryCorrectStat {
  category: string
  correctCount: number
  incorrectCount: number
}

export interface CategoryCorrectStatsResponse {
  code: number
  message: string
  result: CategoryCorrectStat[]
}
