import { useNavigate } from 'react-router-dom'
import { Trash2, ShoppingCart } from 'lucide-react'
import React from 'react'

export default function Wishlist() {
  const navigate = useNavigate()
  const [wishlist, setWishlist] = React.useState(JSON.parse(localStorage.getItem('wishlist') || '[]'))

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item._id !== id)
    setWishlist(updated)
    localStorage.setItem('wishlist', JSON.stringify(updated))
  }

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find(c => c._id === item._id)
    
    if (exists) {
      exists.quantity += 1
    } else {
      cart.push({ ...item, quantity: 1 })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('✅ Added to cart!')
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-[#2e0003] mb-4">Your wishlist is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Wishlist</h1>
        <div className="grid md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div key={item._id} className="bg-white rounded-lg p-4">
              <p className="font-semibold mb-2">{item.name}</p>
              <p className="text-[#2e0003] font-bold mb-4">₹{item.price}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 bg-[#2e0003] text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-[#4a0a10]"
                >
                  <ShoppingCart size={16} />
                  Add
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="px-3 bg-red-100 text-red-600 rounded hover:bg-red-200"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
