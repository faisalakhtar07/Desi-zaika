import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import Navbar from '../components/Navbar'

export default function Cart() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Turmeric Powder', price: 250, quantity: 1 },
    { id: 2, name: 'Black Pepper', price: 350, quantity: 1 }
  ])

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2e0003] mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <button
                onClick={() => navigate('/')}
                className="bg-[#2e0003] text-[#D8cfbc] px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-[#2e0003]">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                        className="w-12 px-2 py-1 border rounded text-center"
                      />
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-red-600 hover:bg-red-100 p-2 rounded"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 h-fit">
                <h2 className="font-bold text-[#2e0003] mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#2e0003] text-[#D8cfbc] font-bold py-2 rounded-lg hover:bg-[#4a0a10]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
