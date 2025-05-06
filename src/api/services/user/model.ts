export interface User {
  email: string
  notification: boolean
  stackNames: string[]
  avatarUrl?: string
  userName?: string
}

export interface UserResponse {
  code: number
  message: string
  result: User
}
