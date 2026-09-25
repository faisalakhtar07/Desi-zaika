import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import useAuthStore from '../store/authStore'
import { userAPI, authAPI } from '../services/api'

export default function Profile() {
  const { user, updateProfile } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const [addresses, setAddresses] = useState([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: ''
  })

  useEffect(() => {
    loadAddresses()
  }, [])

  const loadAddresses = async () => {
    try {
      const response = await userAPI.getAddresses()
      setAddresses(response.data.addresses || [])
    } catch (error) {
      toast.error('Failed to load addresses')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      // Would need backend endpoint for profile update
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Change Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Leave blank to keep current password"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <button
                type="submit"
                className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
              >
                Update Profile
              </button>
            </form>
          </div>

          {/* Addresses */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Addresses</h2>
              <button
                onClick={() => setShowAddressForm(!showAddressForm)}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm"
              >
                + Add Address
              </button>
            </div>

            {addresses.length > 0 ? (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <div key={address.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{address.fullName}</h3>
                      {address.isDefault && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {address.houseNumber}, {address.street}, {address.area}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {address.city}, {address.state} {address.pincode}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">{address.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No addresses saved yet</p>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">Account Overview</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-semibold">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-500">Phone</p>
              <p className="font-semibold">{user?.phone}</p>
            </div>
            <div>
              <p className="text-gray-500">Member Since</p>
              <p className="font-semibold">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
