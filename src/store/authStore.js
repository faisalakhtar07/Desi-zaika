import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      userId: null,
      isLoading: false,
      error: null,

      signup: async (name, email, phone, password, confirmPassword) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/signup`, {
            name,
            email,
            phone,
            password,
            confirmPassword
          });

          const { token, user } = response.data;
          set({
            token,
            user,
            userId: user.id,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ error: error.response?.data?.message || 'Signup failed', isLoading: false });
          return false;
        }
      },

      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/auth/login`, { email, password });
          const { token, user } = response.data;

          set({
            token,
            user,
            userId: user.id,
            isLoading: false
          });
          return true;
        } catch (error) {
          set({ error: error.response?.data?.message || 'Login failed', isLoading: false });
          return false;
        }
      },

      logout: () => {
        set({ token: null, user: null, userId: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user, userId: state.userId })
    }
  )
);

export default useAuthStore;
