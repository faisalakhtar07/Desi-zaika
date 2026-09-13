import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Menu, X, LogOut, ShoppingCart, User } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const { user, token, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#2e0003] text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Desi Zaika</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 hover:bg-[#4a0a10] rounded-lg transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-screen w-64 bg-[#2e0003] text-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-[#4a0a10] rounded-lg">
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-4 mb-8">
              <button
                onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition"
              >
                🏠 Home
              </button>
              
              {token ? (
                <>
                  <button
                    onClick={() => { navigate('/cart'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition flex items-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Cart
                  </button>
                  <button
                    onClick={() => { navigate('/orders'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition"
                  >
                    📦 My Orders
                  </button>
                  <button
                    onClick={() => { navigate('/profile'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition flex items-center gap-2"
                  >
                    <User size={18} />
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition flex items-center gap-2 text-red-400"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition"
                  >
                    🔐 Login
                  </button>
                  <button
                    onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition"
                  >
                    ✨ Sign Up
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-white shadow-sm border-b-2 border-[#2e0003]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2e0003]">Desi Zaika</h1>
          
          <nav className="flex gap-6 items-center">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-[#2e0003] font-medium transition"
            >
              Home
            </button>

            {token ? (
              <>
                <button
                  onClick={() => navigate('/cart')}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#2e0003] font-medium transition"
                >
                  <ShoppingCart size={20} />
                  Cart
                </button>
                <button
                  onClick={() => navigate('/orders')}
                  className="text-gray-700 hover:text-[#2e0003] font-medium transition"
                >
                  Orders
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 text-gray-700 hover:text-[#2e0003] font-medium transition"
                >
                  <User size={20} />
                  {user?.name || 'Profile'}
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-[#2e0003] font-medium transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-[#2e0003] text-[#D8cfbc] px-6 py-2 rounded-lg hover:bg-[#4a0a10] transition font-medium"
                >
                  Sign Up
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
