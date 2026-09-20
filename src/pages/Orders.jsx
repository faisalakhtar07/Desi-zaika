export default function Orders() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]')

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-[#2e0003] mb-4">No orders yet</p>
          <p className="text-gray-600">Start shopping to place your first order!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">My Orders</h1>
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4">
              <p className="font-semibold">Order #{idx + 1}</p>
              <p className="text-gray-600">Status: Pending</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
