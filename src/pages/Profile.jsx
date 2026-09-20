import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  if (!user.name) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">My Profile</h1>
        <div className="bg-white rounded-2xl p-8">
          <p className="mb-4"><span className="font-semibold">Name:</span> {user.name}</p>
          <p className="mb-4"><span className="font-semibold">Mobile:</span> {user.mobile}</p>
          <p><span className="font-semibold">Member Since:</span> {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  )
}
