import axios from 'axios'
import { useAuthStore } from '../store/authStore'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    'https://desi-zaika-backend.onrender.com/api',

  headers: {
    'Content-Type': 'application/json',
  },
})

// =====================================================
// REQUEST INTERCEPTOR
// Add JWT token to authenticated requests
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// =====================================================
// RESPONSE INTERCEPTOR
// Return response.data directly
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response.data
  },

  (error) => {
    const status = error.response?.status
    const requestUrl = error.config?.url || ''

    /*
      Do NOT logout on login/signup 401.

      Backend returns 401 for:
      - Wrong login password
      - Invalid credentials

      Those errors should be shown on the Login page.

      Logout only when an already-authenticated request
      receives 401.
    */

    const isAuthRequest =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/signup') ||
      requestUrl.includes('/auth/admin/login') ||
      requestUrl.includes('/auth/delivery-login')

    if (status === 401 && !isAuthRequest) {
      useAuthStore.getState().logout()

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  }
)

export default api