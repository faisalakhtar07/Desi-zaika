import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const slides = [
    { image: 'https://images.unsplash.com/photo-1596040680447-9e8e13e7a0e2?w=800', title: 'Premium Spices' },
    { image: 'https://images.unsplash.com/photo-1582707947697-d97fb110d04d?w=800', title: 'Authentic Blend' },
    { image: 'https://images.unsplash.com/photo-1596040680447-9e8e13e7a0e2?w=800', title: 'Fresh Quality' },
  ]

  useEffect(() => {
    fetchProducts()
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(slideTimer)
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data?.products || response.data || [])
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    navigate('/cart')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0]">
        {/* Slider */}
        <div className="relative h-80 md:h-96 bg-gray-200 overflow-hidden">
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-[#2e0003] mb-8">Featured Products</h2>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#2e0003] text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#2e0003]">₹{product.price}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-[#2e0003] text-[#D8cfbc] p-2 rounded-lg hover:bg-[#4a0a10] transition"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Why Choose Us */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#2e0003] mb-8 text-center">Why Choose Desi Zaika?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="font-bold text-[#2e0003] mb-2">Premium Quality</h3>
                <p className="text-gray-600">Sourced directly from farmers for authentic taste</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="font-bold text-[#2e0003] mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick & reliable shipping across India</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💯</div>
                <h3 className="font-bold text-[#2e0003] mb-2">100% Pure</h3>
                <p className="text-gray-600">No additives, no preservatives, just pure spices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
