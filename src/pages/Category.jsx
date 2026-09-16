import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import CategoryFilter from '../components/CategoryFilter'
import api from '../services/api'

export default function Category() {
  const { category } = useParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    rating: 0,
    sortBy: 'newest'
  })

  useEffect(() => {
    fetchProducts()
  }, [category])

  useEffect(() => {
    applyFilters()
  }, [filters, products])

  const fetchProducts = async () => {
    try {
      const res = await api.get(`/products?category=${category}`)
      setProducts(res.data.products || [])
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...products]

    // Price filter
    filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= filters.rating)
    }

    // Sorting
    if (filters.sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
    if (filters.sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
    if (filters.sortBy === 'rating') filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))

    setFilteredProducts(filtered)
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-2 capitalize">{category}</h1>
          <p className="text-gray-600 mb-8">Showing {filteredProducts.length} products</p>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Filters */}
            <CategoryFilter filters={filters} setFilters={setFilters} />

            {/* Products */}
            <div className="md:col-span-3">
              {loading ? (
                <p>Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="text-gray-600">No products found</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} onViewDetails={() => navigate(`/product/${product._id}`)} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
