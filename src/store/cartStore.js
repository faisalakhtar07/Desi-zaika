import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.productId === item.productId)
    let newCart

    if (existing) {
      newCart = state.cart.map(i =>
        i.productId === item.productId 
          ? { ...i, quantity: i.quantity + (item.quantity || 1) } 
          : i
      )
    } else {
      newCart = [...state.cart, { ...item, quantity: item.quantity || 1 }]
    }

    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  removeFromCart: (productId) => set((state) => {
    const newCart = state.cart.filter(i => i.productId !== productId)
    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return get().removeFromCart(productId)
    }

    const newCart = state.cart.map(i =>
      i.productId === productId ? { ...i, quantity } : i
    )

    localStorage.setItem('cart', JSON.stringify(newCart))
    return { cart: newCart }
  }),

  getTotal: () => {
    return get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  },

  getItemCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0)
  },

  clearCart: () => {
    localStorage.removeItem('cart')
    set({ cart: [] })
  }
}))
