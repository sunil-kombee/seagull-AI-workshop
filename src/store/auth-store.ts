import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  email?: string
  mobile?: string
  name?: string
  isAuthenticated: boolean
}

type AuthStore = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
  isAuthenticated: () => boolean
}

export const useAuthStore = create<AuthStore>()(persist(
  (set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => set({
      user: null
    }),
    isAuthenticated: () => {
      const { user } = get()
      return user?.isAuthenticated || false
    }
  }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      user: state.user
    })
  }
))