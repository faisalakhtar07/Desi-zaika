import { useState } from 'react'
import { Menu, X, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Layout({ children }) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Products', path: '/products', icon: '🛍️' },
    { label: 'Cart', path: '/cart', icon: '🛒' },
    { label: 'Orders', path: '/orders', icon: '📦' },
    { label: 'Profile', path: '/profile', icon: '👤' },
  ]

  return (
    <div className="min-h-screen bg-[#f0ebe0]">
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

      {/* Mobile Menu - Sidebar */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="absolute left-0 top-0 h-screen w-64 bg-[#2e0003] text-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-[#4a0a10] rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="space-y-4 mb-8">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-[#4a0a10] transition flex items-center gap-3"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {user && (
              <div className="border-t border-[#4a0a10] pt-4">
                <p className="text-sm text-gray-300 mb-4">Logged in as: {user.name}</p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-50 bg-white shadow-sm border-b-2 border-[#2e0003]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#2e0003]">Desi Zaika</h1>
          <nav className="flex gap-8">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-[#2e0003] font-medium transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {children}
      </main>
    </div>
  )
}
