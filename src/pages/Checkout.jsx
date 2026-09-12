import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Checkout() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await api.post('/orders', {
        ...formData,
        items: [], // From cart store
        total: 0, // Calculate from cart
      })

      if (response._id) {
        navigate(`/orders/${response._id}`)
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Checkout</h1>

        <div className="bg-white rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
                rows="3"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="Enter zip code"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2e0003] text-[#D8cfbc] font-semibold py-3 rounded-lg hover:bg-[#4a0a10] transition disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
