import { useState, useEffect } from 'react'
import { Package, Truck, CheckCircle } from 'lucide-react'
import api from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      setOrders(response.orders || [])
    } catch (err) {
      console.error('Failed to fetch orders:', err)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Package className="text-yellow-500" />
      case 'shipped':
        return <Truck className="text-blue-500" />
      case 'delivered':
        return <CheckCircle className="text-green-500" />
      default:
        return <Package />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center">
        <p>Loading orders...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-600 mb-4">No orders yet</p>
            <p className="text-gray-500">Start shopping to create your first order!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-[#2e0003]">Order #{order._id?.slice(-6)}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="font-semibold capitalize">{order.status}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600 mb-2">Items: {order.items?.length || 0}</p>
                  <p className="font-bold text-[#2e0003]">₹{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
