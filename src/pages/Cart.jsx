import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

export default function Cart() {
  const navigate = useNavigate()
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem('cart') || '[]'))

  const removeFromCart = (id) => {
    const updated = cart.filter(item => item._id !== id)
    setCart(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-[#2e0003] mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Shopping Cart</h1>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 bg-white rounded-2xl p-8">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600">₹{item.price} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-semibold">₹{item.price * item.quantity}</p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>₹{total}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping:</p>
                <p>₹0 (Free)</p>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between text-lg font-bold mb-6">
              <p>Total:</p>
              <p className="text-[#2e0003]">₹{total}</p>
            </div>
            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-[#2e0003] text-white py-3 rounded-lg hover:bg-[#4a0a10] font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
