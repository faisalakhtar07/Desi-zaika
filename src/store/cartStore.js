import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity = 1) => {
        const existing = get().items.find((item) => item.id === product.id);
        if (existing) {
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...get().items, { ...product, quantity }] });
        }
      },

      removeFromCart: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
        } else {
          set({
            items: get().items.map((item) =>
              item.id === productId ? { ...item, quantity } : item
            )
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.sellingPrice * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    { name: 'cart-storage' }
  )
);

export default useCartStore;
