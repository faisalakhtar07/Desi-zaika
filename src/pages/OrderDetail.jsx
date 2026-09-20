import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ArrowLeft, Check, Package, Truck, Home } from 'lucide-react'

export default function OrderDetail() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`https://desi-zaika-backend.onrender.com/api/orders/${orderId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        setOrder(data)
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2e0003] border-t-[#D8cfbc] mx-auto mb-4"></div>
          <p className="text-[#2e0003]">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600">Order not found</p>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
          >
            Back to Orders
          </button>
        </div>
      </div>
    )
  }

  const statusSteps = [
    { label: 'Order Placed', status: 'pending' },
    { label: 'Confirmed', status: 'confirmed' },
    { label: 'Shipped', status: 'shipped' },
    { label: 'Delivered', status: 'delivered' }
  ]

  const currentStatusIndex = statusSteps.findIndex(s => s.status === order.status)

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/orders')}
          className="flex items-center gap-2 text-[#2e0003] mb-8 hover:text-[#4a0a10]"
        >
          <ArrowLeft size={20} />
          Back to Orders
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-[#2e0003] mb-4">Order #{order._id.slice(-8)}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Order Date</p>
              <p className="font-semibold text-[#2e0003]">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="font-semibold text-[#2e0003]">₹{order.total}</p>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-[#2e0003] mb-6">Tracking</h2>
          <div className="relative">
            {/* Timeline */}
            <div className="flex justify-between">
              {statusSteps.map((step, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-3 ${
                      idx <= currentStatusIndex ? 'bg-[#2e0003]' : 'bg-gray-300'
                    }`}
                  >
                    {idx <= currentStatusIndex ? <Check size={24} /> : idx + 1}
                  </div>

                  {/* Label */}
                  <p className={`text-sm font-medium text-center ${
                    idx <= currentStatusIndex ? 'text-[#2e0003]' : 'text-gray-600'
                  }`}>
                    {step.label}
                  </p>

                  {/* Line */}
                  {idx < statusSteps.length - 1 && (
                    <div
                      className={`absolute top-6 left-[calc(25%*${idx}+12.5%)] w-[calc(25%-24px)] h-1 ${
                        idx < currentStatusIndex ? 'bg-[#2e0003]' : 'bg-gray-300'
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl p-8 mb-6">
          <h2 className="text-xl font-bold text-[#2e0003] mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex gap-4 pb-4 border-b last:border-b-0">
                <div className="text-4xl">🌶️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[#2e0003]">{item.name}</h3>
                  <p className="text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#2e0003]">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white rounded-2xl p-8">
          <h2 className="text-xl font-bold text-[#2e0003] mb-4">Shipping Address</h2>
          <div className="text-gray-700">
            <p className="font-semibold">{order.shippingAddress?.fullName}</p>
            <p>{order.shippingAddress?.address}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.pincode}</p>
            <p>{order.shippingAddress?.phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
