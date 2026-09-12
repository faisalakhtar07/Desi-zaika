import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  token: localStorage.getItem('auth_token') || null,
  user: JSON.parse(localStorage.getItem('auth_user') || 'null'),

  setToken: (token) => {
    localStorage.setItem('auth_token', token)
    set({ token })
  },

  setUser: (user) => {
    localStorage.setItem('auth_user', JSON.stringify(user))
    set({ user })
  },

  logout: () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    set({ token: null, user: null })
  },
}))
