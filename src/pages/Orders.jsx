import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { orderAPI } from '../services/api'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const response = await orderAPI.getAll()
      setOrders(response.data.orders || [])
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      placed: 'bg-blue-100 text-blue-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800',
      packed: 'bg-yellow-100 text-yellow-800',
      shipped: 'bg-purple-100 text-purple-800',
      out_for_delivery: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Package size={48} className="mx-auto mb-4 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">My Orders</h1>
        <p className="text-gray-600 mb-8">You haven't placed any orders yet</p>
        <Link to="/shop" className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition block"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg">{order.orderId}</h3>
                <p className="text-gray-600 text-sm">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-600">₹{order.totalAmount}</p>
                <span className={`inline-block px-3 py-1 rounded text-sm font-semibold capitalize ${getStatusColor(order.orderStatus)}`}>
                  {order.orderStatus.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pb-4 border-t">
              <div>
                <p className="text-gray-600 text-sm">Items</p>
                <p className="font-semibold">{order.items?.length || 0}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Subtotal</p>
                <p className="font-semibold">₹{order.subtotal}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Delivery</p>
                <p className="font-semibold">₹{order.deliveryCharge}</p>
              </div>
              <div className="text-right">
                <ChevronRight className="ml-auto text-gray-400" />
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex space-x-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-sm font-semibold">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
