import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, X, ShoppingBag, Heart, User } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const user = localStorage.getItem('user')

  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 md:px-10 lg:px-12">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#2e0003] cursor-pointer" onClick={() => navigate('/')}>
            Desi Zaika
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <button onClick={() => navigate('/')} className="text-gray-700 hover:text-[#2e0003]">Home</button>
            <button onClick={() => navigate('/products')} className="text-gray-700 hover:text-[#2e0003]">Products</button>
            <button onClick={() => navigate('/about')} className="text-gray-700 hover:text-[#2e0003]">About</button>
            <button onClick={() => navigate('/contact')} className="text-gray-700 hover:text-[#2e0003]">Contact</button>
            
            {user && (
              <>
                <button onClick={() => navigate('/wishlist')} className="text-gray-700 hover:text-[#2e0003]">
                  <Heart size={20} />
                </button>
                <button onClick={() => navigate('/cart')} className="text-gray-700 hover:text-[#2e0003]">
                  <ShoppingBag size={20} />
                </button>
                <button onClick={() => navigate('/profile')} className="text-gray-700 hover:text-[#2e0003]">
                  <User size={20} />
                </button>
                <button onClick={logout} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Logout
                </button>
              </>
            )}

            {!user && (
              <>
                <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-[#2e0003]">Login</button>
                <button onClick={() => navigate('/signup')} className="bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]">
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 pb-4">
            <button onClick={() => { navigate('/'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Home</button>
            <button onClick={() => { navigate('/products'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Products</button>
            <button onClick={() => { navigate('/about'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">About</button>
            <button onClick={() => { navigate('/contact'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Contact</button>

            {user && (
              <>
                <button onClick={() => { navigate('/wishlist'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Wishlist</button>
                <button onClick={() => { navigate('/cart'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Cart</button>
                <button onClick={() => { navigate('/profile'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Profile</button>
                <button onClick={() => { logout(); setIsOpen(false) }} className="bg-red-600 text-white px-4 py-2 rounded-lg">Logout</button>
              </>
            )}

            {!user && (
              <>
                <button onClick={() => { navigate('/login'); setIsOpen(false) }} className="text-gray-700 hover:text-[#2e0003]">Login</button>
                <button onClick={() => { navigate('/signup'); setIsOpen(false) }} className="bg-[#2e0003] text-white px-6 py-2 rounded-lg">Sign Up</button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
