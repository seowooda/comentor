import { z } from 'zod'

//이메일
const emailField = z.string().email()

//기술 스택
const stacksField = z.array(z.string()).min(1)

//알림 설정
const notificationOptions = z.enum(['agree', 'deny'])

/**
 * 프로젝트 폼 유효성 검증을 위한 Zod 스키마
 */
export const ProjectSchema = z.object({
  title: z.string().min(1, '프로젝트 제목을 선택해주세요'),
  description: z.string().max(100, '최대 100자까지 입력 가능합니다'),
  role: z.string().max(100, '최대 100자까지 입력 가능합니다'),
  status: z.enum(['in_progress', 'completed']),
})

export const SignupSchema = z.object({
  email: emailField,
  stackNames: stacksField,
  notification: notificationOptions,
})
