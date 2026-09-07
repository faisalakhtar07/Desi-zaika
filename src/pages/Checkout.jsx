import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import api from '../services/api'

function Checkout() {
  const navigate = useNavigate()
  const { cart, getTotal, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: cart,
        shippingAddress: formData,
        totalAmount: getTotal()
      }

      const response = await api.post('/orders', orderData)

      if (response.data.success) {
        alert('✅ Order placed successfully!')
        clearCart()
        navigate('/orders')
      }
    } catch (error) {
      alert('❌ Error placing order: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const total = getTotal()

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Address */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">📍 Delivery Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-900"
                      placeholder="Enter street address"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-900"
                        placeholder="City"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-900"
                        placeholder="State"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-900"
                      placeholder="6-digit zip code"
                      maxLength="6"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">💳 Payment Method</h2>
                <div className="bg-burgundy-50 p-4 rounded-lg text-sm text-gray-600">
                  💰 Cash on Delivery (COD) is currently available
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-burgundy-900 text-white py-3 rounded-lg hover:bg-burgundy-800 transition font-semibold disabled:opacity-50"
              >
                {loading ? 'Processing...' : `Place Order (₹${total})`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4 pb-4 border-b">
            {cart.map(item => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.name} x{item.quantity}
                </span>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax:</span>
              <span>₹0</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-green-600">₹{total}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t text-sm text-gray-600">
            <p className="mb-2">✓ 100% Natural</p>
            <p className="mb-2">✓ Free Shipping</p>
            <p>✓ Money Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
