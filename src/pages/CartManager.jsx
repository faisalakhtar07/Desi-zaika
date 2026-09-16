import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2, Heart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function CartManager() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [saveForLater, setSaveForLater] = useState([])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    setCartItems(cart)
  }, [])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const moveToSaveForLater = (id) => {
    const item = cartItems.find(i => i._id === id)
    if (item) {
      setSaveForLater([...saveForLater, item])
      removeItem(id)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(subtotal * 0.05)
  const total = subtotal + tax

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
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
                  <div key={item._id} className="bg-white rounded-2xl p-4 flex gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2e0003]">{item.name}</h3>
                      <p className="text-gray-600">₹{item.price} each</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-2 py-1 border rounded">−</button>
                        <span className="px-4">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{item.price * item.quantity}</p>
                      <button onClick={() => moveToSaveForLater(item._id)} className="text-gray-600 hover:text-red-600 mt-2">
                        <Heart size={20} />
                      </button>
                      <button onClick={() => removeItem(item._id)} className="text-red-600 hover:text-red-700 mt-2">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl p-6 h-fit">
                <h2 className="font-bold text-[#2e0003] text-lg mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 pb-4 border-b">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-[#2e0003] text-[#D8cfbc] font-bold py-3 rounded-lg hover:bg-[#4a0a10]"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}

          {saveForLater.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[#2e0003] mb-4">Saved for Later</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {saveForLater.map(item => (
                  <div key={item._id} className="bg-white rounded-2xl p-4">
                    <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-2" />
                    <h3 className="font-bold text-[#2e0003]">{item.name}</h3>
                    <p className="text-lg font-bold">₹{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
