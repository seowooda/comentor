import { create } from 'zustand'

interface FCMState {
  fcmToken: string | null
  setFCMToken: (token: string) => void
  clearFCMToken: () => void
}

export const useFCMStore = create<FCMState>((set) => ({
  fcmToken: null,
  setFCMToken: (token: string) => set({ fcmToken: token }),
  clearFCMToken: () => set({ fcmToken: null }),
}))
