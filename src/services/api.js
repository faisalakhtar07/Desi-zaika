import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
  getProfile: () => apiClient.get('/auth/profile'),
  changePassword: (data) => apiClient.post('/auth/change-password', data),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (data) => apiClient.post('/auth/reset-password', data)
}

export const productAPI = {
  getAll: (params) => apiClient.get('/products', { params }),
  getById: (id) => apiClient.get(`/products/${id}`),
  getFeatured: () => apiClient.get('/products/featured'),
  getBestSellers: () => apiClient.get('/products/bestsellers'),
  getNewArrivals: () => apiClient.get('/products/new'),
  search: (query) => apiClient.get('/products/search', { params: { q: query } })
}

export const cartAPI = {
  getCart: () => apiClient.get('/cart'),
  addItem: (data) => apiClient.post('/cart/add', data),
  updateItem: (id, data) => apiClient.put(`/cart/item/${id}`, data),
  removeItem: (id) => apiClient.delete(`/cart/item/${id}`),
  clearCart: () => apiClient.delete('/cart'),
  getCount: () => apiClient.get('/cart/count')
}

export const orderAPI = {
  place: (data) => apiClient.post('/orders/place', data),
  getAll: (params) => apiClient.get('/orders', { params }),
  getById: (id) => apiClient.get(`/orders/${id}`),
  track: (orderId) => apiClient.get(`/orders/track/${orderId}`),
  cancel: (id, data) => apiClient.post(`/orders/${id}/cancel`, data)
}

export const userAPI = {
  getAddresses: () => apiClient.get('/users/addresses'),
  addAddress: (data) => apiClient.post('/users/addresses', data),
  updateAddress: (id, data) => apiClient.put(`/users/addresses/${id}`, data),
  deleteAddress: (id) => apiClient.delete(`/users/addresses/${id}`)
}

export default apiClient
