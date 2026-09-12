import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut } from 'lucide-react'
import api from '../services/api'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
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
      await api.put('/auth/profile', formData)
      alert('Profile updated successfully!')
    } catch (err) {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">My Profile</h1>

        <div className="bg-white rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2e0003]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2e0003] text-[#D8cfbc] font-semibold py-3 rounded-lg hover:bg-[#4a0a10] transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
