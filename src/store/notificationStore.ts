import { create } from 'zustand'

interface NotificationState {
  permission: NotificationPermission | null
  setPermission: (permission: NotificationPermission) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  permission: null,
  setPermission: (permission: NotificationPermission) => set({ permission }),
}))
