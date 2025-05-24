'use client'

import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Notification, useNotifications, useReadNotification } from '@/api'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { NotificationItem } from './NotificationItem'

export const NotificationDropdown = () => {
  const router = useRouter()

  const { data: notifications = [], refetch } = useNotifications()
  const { mutate: markAsRead, mutateAsync: markAsReadAsync } =
    useReadNotification()

  const hasUnread = useMemo(
    () => notifications.some((item) => !item.isRead),
    [notifications],
  )

  const handleNotificationClick = (item: Notification) => {
    if (!item.isRead) {
      markAsRead(item.id, {
        onSuccess: () => {
          refetch()
        },
        onError: (error) => {
          console.error('알림 읽음 처리 실패:', error)
        },
      })
    }

    if (item.title === '📨오늘의 CS 질문 생성') {
      router.push('/cs')
    } else if (item.title === '학습 리마인드') {
      router.push('/')
    }
  }

  const handleMarkAllAsRead = async () => {
    const unReadItems = notifications.filter((item) => !item.isRead)

    if (unReadItems.length === 0) return

    try {
      await Promise.all(unReadItems.map((item) => markAsReadAsync(item.id)))
      await refetch()
    } catch (error) {
      console.error('모두 읽음 처리 실패:', error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative" aria-label="알림 열기">
          <Bell size={20} className="text-slate-800" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-3 max-h-80 w-72 overflow-y-auto">
        <DropdownMenuLabel className="flex items-center justify-between text-sm font-semibold text-slate-700">
          <p>알림</p>
          <p
            className="cursor-pointer text-xs text-blue-500 hover:underline"
            onClick={handleMarkAllAsRead}
          >
            모두 읽음으로 표시
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {notifications.length === 0 ? (
          <div className="px-4 py-2 text-sm text-slate-500">
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((item) => (
            <NotificationItem
              key={item.id}
              item={item}
              onRead={markAsRead}
              onNavigate={() => handleNotificationClick(item)}
            />
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
