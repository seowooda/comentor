'use client'

import { Notification } from '@/api'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

interface Props {
  item: Notification
  onRead: (id: number) => void
  onNavigate?: (id: number) => void
}

const formatSendDate = (sentAt: string) => {
  const date = new Date(sentAt)
  const today = new Date()

  const isToday =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()

  if (isToday) return '오늘'
  return `${date.getMonth() + 1}월 ${date.getDate()}일`
}

export const NotificationItem = ({ item, onRead, onNavigate }: Props) => {
  const handleClick = () => {
    if (!item.isRead) onRead(item.id)
    if (onNavigate) onNavigate(item.id)
  }

  return (
    <DropdownMenuItem
      onClick={handleClick}
      className="flex flex-col items-start gap-1 px-2 py-2"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div
            className={`h-2 w-2 shrink-0 rounded-full ${
              item.isRead ? 'bg-slate-200' : 'bg-blue-500'
            }`}
          />
          <p className="max-w-[160px] truncate text-sm font-medium text-slate-800">
            {item.title}
          </p>
        </div>
        <p className="text-xs whitespace-nowrap text-slate-500">
          {formatSendDate(item.sentAt)}
        </p>
      </div>
      <p className="max-w-[220px] truncate pl-4 text-xs text-slate-600">
        {item.body}
      </p>
    </DropdownMenuItem>
  )
}
