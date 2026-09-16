import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import api from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products?limit=8')
      setProducts(response.data.products || [])
      setLoading(false)
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f0ebe0]">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-[#2e0003] to-[#4a0a10] text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Desi Zaika</h1>
            <p className="text-xl text-[#D8cfbc] mb-8">Premium Indian Spices & Natural Products</p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for spices..."
                className="flex-1 px-6 py-3 rounded-lg text-gray-800 focus:outline-none"
              />
              <button type="submit" className="bg-[#D8cfbc] text-[#2e0003] px-8 py-3 rounded-lg font-bold hover:bg-white transition">
                Search
              </button>
            </form>
          </div>
        </div>

        {/* Categories */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#2e0003] mb-8">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Spices', 'Rice', 'Herbs', 'Tea'].map(cat => (
              <button
                key={cat}
                onClick={() => navigate(`/category/${cat}`)}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition text-center font-bold text-[#2e0003] hover:bg-[#D8cfbc]"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#2e0003] mb-8">Featured Products</h2>
          
          {loading ? (
            <p className="text-center text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No products available</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onViewDetails={() => navigate(`/product/${product._id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Testimonials Section - */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <TestimonialCarousel />
        </div>

        {/* CTA Section */}
        <div className="bg-[#2e0003] text-white py-12 px-4 my-12">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Premium Quality Guaranteed</h2>
            <p className="text-lg text-[#D8cfbc] mb-6">Fresh spices delivered to your doorstep</p>
            <button
              onClick={() => navigate('/about')}
              className="bg-[#D8cfbc] text-[#2e0003] px-8 py-3 rounded-lg font-bold hover:bg-white transition"
            >
              Learn More About Us
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
