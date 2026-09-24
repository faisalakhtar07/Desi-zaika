import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery) {
      navigate(`/shop?search=${searchQuery}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-orange-600">
            Desi Zaika
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <Link to="/shop" className="hover:text-orange-600">Shop</Link>
            <Link to="/wishlist" className="hover:text-orange-600">Wishlist</Link>
            <Link to="/orders" className="hover:text-orange-600">Orders</Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border rounded-l"
              />
              <button type="submit" className="bg-orange-600 text-white px-4 rounded-r">
                <Search size={20} />
              </button>
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  <User size={24} />
                  <span className="text-sm">{user.name}</span>
                </button>
                <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-lg rounded">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-orange-600 font-semibold">
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:text-orange-600">Home</Link>
            <Link to="/shop" className="block py-2 hover:text-orange-600">Shop</Link>
            <Link to="/wishlist" className="block py-2 hover:text-orange-600">Wishlist</Link>
            <Link to="/orders" className="block py-2 hover:text-orange-600">Orders</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
