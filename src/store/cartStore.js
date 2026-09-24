import { create } from 'zustand'
import { cartAPI } from '../services/api'

const useCartStore = create((set, get) => ({
  items: [],
  subtotal: 0,
  loading: false,
  error: null,

  getCart: async () => {
    set({ loading: true })
    try {
      const response = await cartAPI.getCart()
      set({
        items: response.data.cart.items,
        subtotal: response.data.cart.subtotal,
        loading: false
      })
      return response.data.cart
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  addItem: async (productId, quantity = 1) => {
    set({ loading: true })
    try {
      await cartAPI.addItem({ productId, quantity })
      await get().getCart()
      return true
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false })
      throw error
    }
  },

  removeItem: async (itemId) => {
    set({ loading: true })
    try {
      await cartAPI.removeItem(itemId)
      await get().getCart()
      return true
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  updateItem: async (itemId, quantity) => {
    try {
      await cartAPI.updateItem(itemId, { quantity })
      await get().getCart()
      return true
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  clearCart: async () => {
    try {
      await cartAPI.clearCart()
      set({ items: [], subtotal: 0 })
      return true
    } catch (error) {
      set({ error: error.message })
      throw error
    }
  },

  getItemCount: () => {
    return get().items.length
  }
}))

export default useCartStore
