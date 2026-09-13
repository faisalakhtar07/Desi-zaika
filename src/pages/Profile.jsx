import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuthStore } from '../store/authStore'
import { LogOut } from 'lucide-react'

export default function Profile() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || ''
  })

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2e0003] mb-8">My Profile</h1>

          <div className="bg-white rounded-2xl p-8">
            <div className="space-y-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Name</label>
                <p className="text-gray-600">{user?.name}</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Phone</label>
                <p className="text-gray-600">{user?.phone}</p>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Email</label>
                <p className="text-gray-600">{user?.email || 'Not provided'}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-8 flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
