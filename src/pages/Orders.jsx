import Navbar from '../components/Navbar'

export default function Orders() {
  const orders = []

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2e0003] mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-600 text-lg">No orders yet</p>
              <p className="text-gray-500 text-sm mt-2">Your orders will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Orders will be listed here */}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
