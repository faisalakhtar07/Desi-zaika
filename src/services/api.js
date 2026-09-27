import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000
});

// Add token to every request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  signup: (data) => instance.post('/auth/signup', data),
  login: (email, password) => instance.post('/auth/login', { email, password }),
  getProfile: () => instance.get('/auth/profile'),
  changePassword: (data) => instance.put('/auth/change-password', data)
};

export const productAPI = {
  getProducts: (params) => instance.get('/products', { params }),
  getProductById: (id) => instance.get(`/products/${id}`),
  getFeatured: () => instance.get('/products/featured'),
  getBestSellers: () => instance.get('/products/bestsellers'),
  getNewArrivals: () => instance.get('/products/new-arrivals'),
  search: (query) => instance.get(`/products/search/${query}`)
};

export const cartAPI = {
  getCart: () => instance.get('/cart'),
  addToCart: (productId, quantity) => instance.post('/cart/add', { productId, quantity }),
  removeFromCart: (productId) => instance.delete(`/cart/item/${productId}`),
  updateCartItem: (productId, quantity) => instance.put(`/cart/item/${productId}`, { quantity }),
  clearCart: () => instance.delete('/cart')
};

export const orderAPI = {
  placeOrder: (data) => instance.post('/orders/place', data),
  getOrders: () => instance.get('/orders'),
  getOrderById: (orderId) => instance.get(`/orders/${orderId}`),
  trackOrder: (orderId) => instance.get(`/orders/track/${orderId}`),
  cancelOrder: (orderId) => instance.post(`/orders/${orderId}/cancel`)
};

export const wishlistAPI = {
  getWishlist: () => instance.get('/wishlist'),
  addToWishlist: (productId) => instance.post('/wishlist/add', { productId }),
  removeFromWishlist: (productId) => instance.delete(`/wishlist/${productId}`)
};

export const reviewAPI = {
  getReviews: (productId) => instance.get(`/reviews/product/${productId}`),
  createReview: (data) => instance.post('/reviews', data),
  updateReview: (id, data) => instance.put(`/reviews/${id}`, data),
  deleteReview: (id) => instance.delete(`/reviews/${id}`)
};

export const couponAPI = {
  validateCoupon: (code, orderAmount) => instance.post('/coupons/validate', { code, orderAmount })
};

export default instance;
