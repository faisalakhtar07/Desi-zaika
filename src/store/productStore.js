import { create } from 'zustand'

export const useProductStore = create((set, get) => ({
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  searchTerm: '',

  setProducts: (products) => set({ products }),
  
  setFilteredProducts: (products) => set({ filteredProducts: products }),

  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  setSearchTerm: (term) => {
    set({ searchTerm: term })
    const state = get()
    const filtered = state.products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase())
    )
    set({ filteredProducts: filtered })
  },

  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  })),

  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(p => p._id === id ? updatedProduct : p)
  })),

  removeProduct: (id) => set((state) => ({
    products: state.products.filter(p => p._id !== id)
  }))
}))
