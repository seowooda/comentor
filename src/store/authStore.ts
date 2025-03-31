import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import Cookies from 'js-cookie' // 쿠키 사용

type UserRole = 'GUEST' | 'USER' | 'WITHDRAWN'

interface AuthState {
  accessToken: string | null
  role: UserRole | null
  setAccessToken: (token: string) => void
  setRole: (role: UserRole) => void
  clearAuth: () => void
  withdrawUser: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: Cookies.get('accessToken') || null,
      role: (Cookies.get('role') as UserRole) || null,
      setAccessToken: (token) => {
        Cookies.set('accessToken', token, {
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        })
        set({ accessToken: token })
      },
      setRole: (role) => {
        Cookies.set('role', role, { secure: true, sameSite: 'Strict' })
        set({ role })
      },
      clearAuth: () => {
        Cookies.remove('accessToken')
        Cookies.remove('role')
        set({ accessToken: null, role: null })
      },
      withdrawUser: () => {
        Cookies.set('role', 'WITHDRAWN', { secure: true, sameSite: 'Strict' })
        set({ role: 'WITHDRAWN' })
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
)
