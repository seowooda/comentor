import { create } from 'zustand'

interface NotificationState {
  permission: NotificationPermission | null
  isRegistering: boolean
  setPermission: (permission: NotificationPermission) => void
  setIsRegistering: (isRegistering: boolean) => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  permission: null,
  isRegistering: false,
  setPermission: (permission: NotificationPermission) => set({ permission }),
  setIsRegistering: (isRegistering: boolean) => set({ isRegistering }),
}))
