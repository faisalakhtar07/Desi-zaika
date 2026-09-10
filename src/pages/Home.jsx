import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { ChevronLeft, ChevronRight, Menu, X, Home, ShoppingCart, User, LogOut } from 'lucide-react'

export default function HomePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Background images for slider
  const backgroundImages = [
    'https://images.unsplash.com/photo-1596040936212-77a31c5fa033?w=1200&h=600&fit=crop', // Turmeric
    'https://images.unsplash.com/photo-1596491916398-5eb8c20f2e26?w=1200&h=600&fit=crop', // Spices
    'https://images.unsplash.com/photo-1596489516375-3f50dd08a621?w=1200&h=600&fit=crop', // Chili
    'https://images.unsplash.com/photo-1596040936213-76a31c5fa033?w=1200&h=600&fit=crop', // Cumin
  ]

  // Auto rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] overflow-hidden">
      {/* Background Image Slider */}
      <div className="relative h-96 overflow-hidden">
        {/* Images */}
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(46, 0, 3, 0.4), rgba(90, 10, 21, 0.4)), url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
        >
          <ChevronLeft className="w-6 h-6 text-[#2e0003]" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition z-10"
        >
          <ChevronRight className="w-6 h-6 text-[#2e0003]" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {backgroundImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition ${
                idx === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Header with Menu Button */}
        <header className="absolute top-0 left-0 right-0 z-20">
          <div className="flex items-center justify-between p-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#D8cfbc]">Desi Zaika</h1>
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg bg-white/90 hover:bg-white transition"
            >
              {menuOpen ? (
                <X className="w-6 h-6 text-[#2e0003]" />
              ) : (
                <Menu className="w-6 h-6 text-[#2e0003]" />
              )}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-6 bg-white rounded-lg shadow-lg overflow-hidden z-20 w-48">
            <nav className="flex flex-col">
              <button
                onClick={() => {
                  navigate('/')
                  setMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#f0ebe0] transition text-[#2e0003]"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/products')
                  setMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#f0ebe0] transition text-[#2e0003]"
              >
                <ShoppingCart className="w-5 h-5" />
                Products
              </button>
              <button
                onClick={() => {
                  navigate('/profile')
                  setMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#f0ebe0] transition text-[#2e0003]"
              >
                <User className="w-5 h-5" />
                Profile
              </button>
              <div className="border-t border-gray-200" />
              <button
                onClick={() => {
                  handleLogout()
                  setMenuOpen(false)
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition text-red-600"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </nav>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#D8cfbc] mb-4">Premium Indian Spices</h2>
          <p className="text-lg md:text-xl text-[#D8cfbc]/80 mb-8">Authentic flavors, sourced fresh</p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full max-w-md">
            <div className="flex gap-2 bg-white/95 rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spices..."
                className="flex-1 px-4 py-3 outline-none text-gray-800"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#2e0003] text-[#D8cfbc] font-semibold hover:bg-[#4a0a10] transition"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        {user && (
          <div className="bg-white rounded-lg p-8 shadow-sm mb-12">
            <h3 className="text-2xl font-bold text-[#2e0003] mb-2">Welcome, {user.name}!</h3>
            <p className="text-gray-600">Explore our collection of authentic Indian spices</p>
          </div>
        )}

        {/* Featured Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2e0003] mb-6">Shop by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Turmeric', 'Chili Powder', 'Cumin', 'Coriander'].map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/products?category=${category.toLowerCase()}`)}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition border-2 border-[#D8cfbc]"
              >
                <p className="font-semibold text-[#2e0003]">{category}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-[#2e0003] to-[#5a0a15] rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#D8cfbc] mb-4">Discover Premium Quality</h3>
          <p className="text-[#D8cfbc]/80 mb-6">
            Fresh, aromatic, and authentic Indian spices delivered to your doorstep
          </p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#D8cfbc] text-[#2e0003] px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2e0003] text-[#D8cfbc] text-center py-6 mt-12">
        <p>© 2024 Desi Zaika. Premium Indian Spices.</p>
      </footer>
    </div>
  )
}
