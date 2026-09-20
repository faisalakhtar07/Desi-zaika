import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Search, Filter, ChevronDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('latest')

  const categories = ['All', 'Spices', 'Rice', 'Herbs', 'Tea', 'Oils', 'Grains']

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://desi-zaika-backend.onrender.com/api/products')
        const data = await res.json()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  // Filter & Sort
  useEffect(() => {
    let result = products

    // Search
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category
    if (category && category !== 'All') {
      result = result.filter(p => p.category === category)
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'latest') {
      result.reverse()
    }

    setFiltered(result)
  }, [products, searchTerm, category, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0ebe0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2e0003] border-t-[#D8cfbc] mx-auto mb-4"></div>
          <p className="text-[#2e0003]">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0]">
      <Navbar />

      {/* Search & Filter Bar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
            >
              <option value="latest">Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <p className="text-gray-600">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">No products found</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setCategory('')
              }}
              className="bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
