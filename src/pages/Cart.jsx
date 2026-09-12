import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Turmeric Powder', price: 250, quantity: 2, image: '🌟' },
    { id: 2, name: 'Black Pepper', price: 350, quantity: 1, image: '🌟' },
  ])

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id)
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-gray-600 mb-4">Your cart is empty</p>
                <button
                  onClick={() => navigate('/')}
                  className="bg-[#2e0003] text-[#D8cfbc] px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-6 flex items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#2e0003]">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-bold text-[#2e0003] w-24 text-right">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:bg-red-100 p-2 rounded"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 sticky top-20">
                <h2 className="font-bold text-[#2e0003] mb-6">Order Summary</h2>

                <div className="space-y-3 pb-6 border-b border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                </div>

                <div className="flex justify-between py-6 mb-6">
                  <span className="font-bold text-[#2e0003]">Total</span>
                  <span className="font-bold text-2xl text-[#2e0003]">₹{total}</span>
                </div>

                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#2e0003] text-[#D8cfbc] font-semibold py-3 rounded-lg hover:bg-[#4a0a10] transition"
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
