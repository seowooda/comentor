import { create } from 'zustand'
import Cookies from 'js-cookie'

type UserRole = 'GUEST' | 'USER' | 'WITHDRAWN'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  role: UserRole | null
  setAccessToken: (token: string) => void
  setRefreshToken: (token: string) => void
  setRole: (role: UserRole) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: Cookies.get('accessToken') || null,
  refreshToken: Cookies.get('refreshToken') || null,
  role: (Cookies.get('role') as UserRole) || null,

  setAccessToken: (token) => {
    Cookies.set('accessToken', token, {
      secure: true,
      sameSite: 'Strict',
      expires: 1 / 24, // ✅ 1시간 유지
    })
    set({ accessToken: token })
  },

  setRefreshToken: (token) => {
    Cookies.set('refreshToken', token, {
      secure: true,
      sameSite: 'Strict',
      expires: 7, // ✅ 7일 유지
    })
    set({ refreshToken: token })
  },

  setRole: (role) => {
    Cookies.set('role', role, { secure: true, sameSite: 'Strict' })
    set({ role })
  },

  clearAuth: () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('role')
    set({ accessToken: null, refreshToken: null, role: null })
  },
}))
