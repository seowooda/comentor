import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type FCMState = {
  fcmToken: string | null
  setFCMToken: (token: string | null) => void
}

export const useFCMStore = create(
  persist<FCMState>(
    (set) => ({
      fcmToken: null,
      setFCMToken: (token) => set({ fcmToken: token }),
    }),
    {
      name: 'fcm-storage',
    },
  ),
)
