import { create } from 'zustand'
import { productAPI } from '../services/api'

const useProductStore = create((set) => ({
  products: [],
  featured: [],
  bestSellers: [],
  loading: false,
  error: null,

  getProducts: async (params = {}) => {
    set({ loading: true, error: null })
    try {
      const response = await productAPI.getAll(params)
      set({ products: response.data.products, loading: false })
      return response.data
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  getProductById: async (id) => {
    set({ loading: true })
    try {
      const response = await productAPI.getById(id)
      set({ loading: false })
      return response.data.product
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  getFeatured: async () => {
    try {
      const response = await productAPI.getFeatured()
      set({ featured: response.data.products })
      return response.data.products
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  getBestSellers: async () => {
    try {
      const response = await productAPI.getBestSellers()
      set({ bestSellers: response.data.products })
      return response.data.products
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  search: async (query) => {
    if (!query) return []
    try {
      const response = await productAPI.search(query)
      return response.data.products
    } catch (error) {
      set({ error: error.message })
      return []
    }
  }
}))

export default useProductStore
