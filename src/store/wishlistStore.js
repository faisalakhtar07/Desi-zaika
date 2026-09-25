import { create } from 'zustand'

const useWishlistStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  
  addItem: (product) => {
    const items = get().items
    if (!items.find(p => p.id === product.id)) {
      const newItems = [...items, product]
      localStorage.setItem('wishlist', JSON.stringify(newItems))
      set({ items: newItems })
      return true
    }
    return false
  },

  removeItem: (productId) => {
    const newItems = get().items.filter(p => p.id !== productId)
    localStorage.setItem('wishlist', JSON.stringify(newItems))
    set({ items: newItems })
  },

  isInWishlist: (productId) => {
    return get().items.some(p => p.id === productId)
  },

  clearWishlist: () => {
    localStorage.removeItem('wishlist')
    set({ items: [] })
  }
}))

export default useWishlistStore
