import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'

function Header() {
  const { user, logout } = useAuthStore()
  const { getItemCount } = useCartStore()
  const navigate = useNavigate()
  const cartCount = getItemCount()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-3xl">🌶️</span>
            <div className="text-2xl font-bold text-burgundy-900">Desi Zaika</div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-burgundy-600 font-medium transition">
              Home
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-burgundy-600 font-medium transition">
              🛒 Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/orders" className="text-gray-700 hover:text-burgundy-600 font-medium transition">
              📦 Orders
            </Link>

            <Link to="/profile" className="text-gray-700 hover:text-burgundy-600 font-medium transition">
              👤 {user?.name || 'Profile'}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-burgundy-900 text-white px-4 py-2 rounded-lg hover:bg-burgundy-800 transition font-medium"
            >
              Logout
            </button>
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative text-burgundy-600 text-2xl">
              🛒
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="bg-burgundy-900 text-white px-3 py-1 rounded text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
