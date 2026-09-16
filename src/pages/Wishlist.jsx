import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wishlist')) || []
    setWishlist(saved)
  }, [])

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item._id !== id)
    setWishlist(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const exists = cart.find(item => item._id === product._id)
    
    if (exists) {
      exists.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    removeFromWishlist(product._id)
    alert('Added to cart!')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2e0003] mb-8">My Wishlist</h1>

          {wishlist.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">Your wishlist is empty</p>
              <button
                onClick={() => navigate('/')}
                className="bg-[#2e0003] text-[#D8cfbc] px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <div key={product._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
                  <div className="h-48 bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#2e0003]">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                    <p className="text-xl font-bold text-[#2e0003] mb-4">₹{product.price}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-[#2e0003] text-[#D8cfbc] py-2 rounded-lg hover:bg-[#4a0a10] flex items-center justify-center gap-2 text-sm"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product._id)}
                        className="bg-red-100 text-red-600 p-2 rounded-lg hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
