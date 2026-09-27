import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useProductStore = create((set) => ({
  products: [],
  featured: [],
  bestSellers: [],
  newArrivals: [],
  loading: false,
  error: null,

  getProducts: async (page = 1, limit = 12, filters = {}) => {
    set({ loading: true });
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      const response = await axios.get(`${API_URL}/products?${params}`);
      set({ products: response.data.products, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  getFeatured: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/featured`);
      set({ featured: response.data.products });
    } catch (error) {
      set({ error: error.message });
    }
  },

  getBestSellers: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/bestsellers`);
      set({ bestSellers: response.data.products });
    } catch (error) {
      set({ error: error.message });
    }
  },

  getNewArrivals: async () => {
    try {
      const response = await axios.get(`${API_URL}/products/new-arrivals`);
      set({ newArrivals: response.data.products });
    } catch (error) {
      set({ error: error.message });
    }
  },

  searchProducts: async (query) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${API_URL}/products/search/${query}`);
      set({ products: response.data.products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  }
}));

export default useProductStore;
