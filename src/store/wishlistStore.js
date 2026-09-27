import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        const exists = get().items.find((item) => item.id === product.id);
        if (!exists) {
          set({ items: [...get().items, product] });
        }
      },

      removeFromWishlist: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      toggleWishlist: (product) => {
        const exists = get().items.find((item) => item.id === product.id);
        if (exists) {
          get().removeFromWishlist(product.id);
        } else {
          get().addToWishlist(product);
        }
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      }
    }),
    { name: 'wishlist-storage' }
  )
);

export default useWishlistStore;
