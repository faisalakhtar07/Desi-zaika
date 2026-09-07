import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-12">
          <p className="text-2xl text-gray-600 mb-4">🛒 Your cart is empty</p>
          <Link
            to="/"
            className="bg-burgundy-900 text-white px-6 py-2 rounded-lg hover:bg-burgundy-800 transition font-semibold inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map(item => (
              <div key={item.productId} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                <div className="w-24 h-24 bg-burgundy-100 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🌶️</span>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-green-600 font-semibold mb-2">₹{item.price}</p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value))}
                      className="w-12 text-center border border-gray-300 rounded"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-gray-900 mb-2">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4 pb-4 border-b">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>₹{total}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping:</span>
              <span className="text-green-600">FREE</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Discount:</span>
              <span>-₹0</span>
            </div>
          </div>

          <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-burgundy-900 text-white py-3 rounded-lg hover:bg-burgundy-800 transition font-semibold text-center block mb-2"
          >
            Proceed to Checkout
          </Link>

          <button
            onClick={clearCart}
            className="w-full text-burgundy-900 border-2 border-burgundy-900 py-3 rounded-lg hover:bg-burgundy-50 transition font-semibold"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart
