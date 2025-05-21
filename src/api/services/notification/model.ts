export interface Notification {
  id: number
  title: string
  body: string
  isRead: boolean
  sendAt: string
}

export interface DefaultResponse {
  code: number
  message: string
  result: null
}
