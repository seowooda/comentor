import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type UserRole = 'GUEST' | 'USER' | 'WITHDRAWN'

interface AuthState {
  accessToken: string | null
  role: UserRole | null
  setAccessToken: (token: string) => void
  setRole: (role: UserRole) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,
      setAccessToken: (token) => set({ accessToken: token }),
      setRole: (role) => set({ role }),
      clearAuth: () => set({ accessToken: null, role: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
)
