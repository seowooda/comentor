'use client'

import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Notification, useNotifications, useReadNotification } from '@/api'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

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

export const NotificationDropdown = () => {
  const [open, setOpen] = useState(false)
  const { data: notifications = [], refetch } = useNotifications()
  const { mutate: markAsRead } = useReadNotification()
  const router = useRouter()
  const hasUnread = notifications.some((item) => !item.isRead)

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      refetch()
    }
  }

  const handleNotificationClick = (item: Notification) => {
    if (!item.isRead) {
      markAsRead(item.id)
    }
    // router.push(``)
  }

  return (
    <DropdownMenu onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button className="relative">
          <Bell
            size={20}
            className="cursor-pointer text-slate-800"
            aria-label="notification"
          />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 w-72">
        <DropdownMenuLabel className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <p>알림</p>
          <p className="cursor-pointer text-xs text-blue-500 hover:underline">
            모두 읽음으로 표시
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <DropdownMenuItem disabled className="text-sm text-slate-500">
            알림이 없습니다.
          </DropdownMenuItem>
        ) : (
          notifications.map((item) => (
            <DropdownMenuItem
              key={item.id}
              onClick={() => handleNotificationClick(item)}
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
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
