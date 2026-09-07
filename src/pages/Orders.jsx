import { useEffect, useState } from 'react'
import api from '../services/api'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders')
      setOrders(response.data.orders || [])
    } catch (error) {
      console.log('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800'
      case 'Confirmed': return 'bg-blue-100 text-blue-800'
      case 'Shipped': return 'bg-purple-100 text-purple-800'
      case 'Delivered': return 'bg-green-100 text-green-800'
      case 'Cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">📦 My Orders</h1>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
          <a href="/" className="text-burgundy-900 font-semibold hover:underline">
            Continue Shopping →
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">Order #{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex gap-4 mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                  <span className="font-bold text-green-600">₹{order.totalAmount}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900 mb-2">Items:</p>
                <ul className="space-y-1">
                  {order.items?.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      {item.name} x{item.quantity} = ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t mt-4 pt-4">
                <p className="text-sm text-gray-600">
                  📍 Delivery to: {order.shippingAddress?.city}, {order.shippingAddress?.state}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Orders
