export interface LearningHistoryItem {
  date: string
  solvedCount: number
}

export interface LearningHistoryResponse {
  code: number
  message: string
  result: LearningHistoryItem[]
}

export interface StreakCountResponse {
  code: number
  message: string
  result: number
}
