import { create } from 'zustand'
import { authAPI } from '../services/api'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  signup: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await authAPI.signup(data)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token, loading: false })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Signup failed'
      set({ error: message, loading: false })
      throw error
    }
  },

  login: async (data) => {
    set({ loading: true, error: null })
    try {
      const response = await authAPI.login(data)
      const { token, user } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token, loading: false })
      return response.data
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed'
      set({ error: message, loading: false })
      throw error
    }
  },

  logout: () => {
    authAPI.logout()
    set({ user: null, token: null })
  },

  isAuthenticated: () => {
    const state = useAuthStore.getState()
    return !!state.token && !!state.user
  }
}))

export default useAuthStore
