'use client'

import { useEffect } from 'react'
import { Bell, CircleHelp, Info, Sparkle } from 'lucide-react'
import { Switch } from '../ui/switch'

import { NotificationCard } from './NotificationCard'
import { NotificationPermissionButton } from './Permission/Button'
import { NotificationPermissionMessage } from './Permission/Message'
import { useNotificationStore } from '@/store/notificationStore'

export const NotificationForm = () => {
  const { setPermission } = useNotificationStore.getState()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  return (
    <div className="flex w-full max-w-3xl min-w-xl flex-col gap-5 rounded-[10px] border border-slate-300 px-7 py-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-bold">알림 설정</h1>
        <p className="font-light text-slate-600">
          푸시 알림 및 알림 유형을 설정할 수 있습니다.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <h3>푸시 알림 권한</h3>
        <NotificationCard
          icon={<Bell size={24} />}
          title="브라우저 알림"
          description="브라우저에서 푸시 알림을 받을 수 있도록 허용합니다."
          right={<NotificationPermissionButton />}
        />
        <NotificationPermissionMessage />
      </div>

      <div className="flex flex-col gap-2">
        <h3>알림 유형 </h3>
        <p className="text-sm text-slate-600">
          브라우저 알림을 허용하면 아래 항목 모두에 대한 알림을 받습니다.
        </p>
        <NotificationCard
          icon={<CircleHelp size={24} />}
          title="오늘의 질문"
          description="오늘의 CS 질문 생성 알림을 받습니다."
          right={null}
        />
        <NotificationCard
          icon={<Sparkle size={24} />}
          title="학습 리마인드"
          description="48시간 이상 미학습 시, 학습 리마인드 알림을 받습니다."
          right={null}
        />
      </div>

      <div className="flex flex-col gap-2 rounded-sm border border-slate-300 bg-blue-50 p-5 text-blue-700">
        <div className="flex items-center gap-2">
          <Info size={18} />
          <p>알림 정보</p>
        </div>
        <ul className="list-inside list-disc pl-2 text-sm marker:text-xs">
          <li>오늘의 질문: 매일 오전 10시에 생성된 CS 질문</li>
          <li>학습 리마인드: 48시간 이상 학습하지 않은 경우</li>
        </ul>
      </div>
    </div>
  )
}
