import {
  CheckCircle,
  ClipboardList,
  MessageCircle,
  Bookmark,
  HelpCircle,
  Bell,
} from 'lucide-react'

export type IconType =
  | 'check-circle' // 맞춤형 CS 질문
  | 'clipboard' // 코드 기반 분석
  | 'feedback' // 피드백 시스템
  | 'record' // 학습 기록 관리
  | 'question-circle' // CS 지식 확장
  | 'bell' // 알림 서비스

interface ModernIconProps {
  type: IconType
  color: string
}

const colorMap: Record<string, string> = {
  blue: '#2563eb', // tailwind blue-600
  indigo: '#4f46e5', // tailwind indigo-600
}

export const ModernIcon = ({ type, color }: ModernIconProps) => {
  const iconProps = {
    color: colorMap[color] || color,
    size: 24,
    strokeWidth: 2,
  }
  const icons = {
    'check-circle': <CheckCircle {...iconProps} />,
    clipboard: <ClipboardList {...iconProps} />,
    feedback: <MessageCircle {...iconProps} />,
    record: <Bookmark {...iconProps} />,
    'question-circle': <HelpCircle {...iconProps} />,
    bell: <Bell {...iconProps} />,
  } as const

  return icons[type] || null
}
