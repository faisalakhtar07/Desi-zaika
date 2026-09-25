import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import useCartStore from '../store/cartStore'

export default function Cart() {
  const { items, getCart, removeItem, updateItem, clearCart, subtotal } = useCartStore()
  const [loading, setLoading] = useState(true)
  const [deliveryCharge, setDeliveryCharge] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      await getCart()
    } catch (error) {
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (itemId) => {
    try {
      await removeItem(itemId)
      toast.success('Item removed')
    } catch (error) {
      toast.error('Failed to remove item')
    }
  }

  const handleQuantityChange = async (itemId, newQty) => {
    if (newQty < 1) {
      handleRemove(itemId)
      return
    }
    try {
      await updateItem(itemId, newQty)
    } catch (error) {
      toast.error('Failed to update quantity')
    }
  }

  const handleClearCart = async () => {
    if (!window.confirm('Clear entire cart?')) return
    try {
      await clearCart()
      toast.success('Cart cleared')
    } catch (error) {
      toast.error('Failed to clear cart')
    }
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
        <p className="text-gray-600 mb-8">Your cart is empty</p>
        <Link to="/shop" className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const total = subtotal + deliveryCharge

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="p-6 border-b last:border-b-0 hover:bg-gray-50">
                <div className="grid grid-cols-4 gap-4 items-center">
                  {/* Image */}
                  <div>
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>

                  {/* Product Info */}
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-semibold hover:text-orange-600"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-500">{item.product.weight}</p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="text-center">
                    <div className="flex items-center justify-center border rounded">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price & Remove */}
                  <div className="text-right">
                    <div className="font-bold text-lg mb-2">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>₹{deliveryCharge.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 text-lg font-bold">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 font-semibold mb-3"
            >
              Proceed to Checkout
            </button>

            <Link
              to="/shop"
              className="block w-full text-center border-2 border-orange-600 text-orange-600 py-3 rounded-lg hover:bg-orange-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
