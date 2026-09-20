import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Leaf, ShieldCheck, Truck, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import TestimonialCarousel from '../components/TestimonialCarousel'

const Home = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://desi-zaika-backend.onrender.com/api/products')
        const data = await res.json()
        setProducts(data.slice(0, 8))
        setLoading(false)
      } catch (err) {
        console.error('Error:', err)
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-[#f0ebe0]">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-[#2e0003] text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e0003] via-transparent to-[#2e0003] opacity-80"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
              <p className="text-sm font-semibold">🌶️ Authentic Indian Flavours</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Taste the <span className="italic">real</span> Desi Zaika.
            </h1>

            <p className="text-lg text-gray-200 mb-8 max-w-2xl">
              Discover carefully selected spices, herbs, rice, tea and everyday ingredients that bring authentic Indian flavour to your kitchen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search spices, rice, herbs..."
                onChange={(e) => {
                  if (e.key === 'Enter' || e.currentTarget.value) {
                    navigate(`/products?search=${e.currentTarget.value}`)
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/products?search=${e.currentTarget.value}`)
                  }
                }}
                className="px-6 py-3 rounded-lg text-gray-900 flex-1 max-w-sm focus:outline-none focus:ring-2 focus:ring-[#D8cfbc]"
              />
              <button
                onClick={() => navigate('/products')}
                className="bg-[#D8cfbc] text-[#2e0003] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                Search <ArrowRight size={20} />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => navigate('/products')}
                className="bg-white text-[#2e0003] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/about')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Explore Spices
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <Leaf className="w-12 h-12 text-[#2e0003] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2e0003] mb-2">Natural Ingredients</h3>
              <p className="text-gray-600 text-sm">Selected with care</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <ShieldCheck className="w-12 h-12 text-[#2e0003] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2e0003] mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm">Made for your kitchen</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <Truck className="w-12 h-12 text-[#2e0003] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2e0003] mb-2">Reliable Delivery</h3>
              <p className="text-gray-600 text-sm">Packed with care</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Heart className="w-12 h-12 text-[#2e0003] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2e0003] mb-2">Made With Love</h3>
              <p className="text-gray-600 text-sm">From us to you</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-sm text-gray-600 mb-2">EXPLORE OUR COLLECTION</p>
              <h2 className="text-4xl font-bold text-[#2e0003]">
                Made for every<br />
                <span className="italic">Indian kitchen.</span>
              </h2>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-[#2e0003] font-semibold hover:underline flex items-center gap-2"
            >
              View all products <ArrowRight size={20} />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#2e0003] mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Spices', emoji: '🌶️' },
              { name: 'Rice', emoji: '🌾' },
              { name: 'Herbs', emoji: '🌿' },
              { name: 'Tea', emoji: '☕' }
            ].map(cat => (
              <motion.button
                key={cat.name}
                onClick={() => navigate(`/products?category=${cat.name}`)}
                whileHover={{ scale: 1.05 }}
                className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2e0003]/80 to-[#4a0a10]/80 group-hover:from-[#2e0003] group-hover:to-[#4a0a10] transition"></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white">
                  <span className="text-5xl mb-4">{cat.emoji}</span>
                  <h3 className="text-2xl font-bold">{cat.name}</h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#f0ebe0]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-[#2e0003] mb-12">What Our Customers Say</h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#2e0003] text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to elevate your cooking?</h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of happy customers experiencing authentic Indian flavours
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#D8cfbc] text-[#2e0003] px-8 py-4 rounded-lg font-semibold hover:bg-opacity-90 transition text-lg"
          >
            Start Shopping Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
