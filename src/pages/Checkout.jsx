import { useNavigate } from 'react-router-dom'

export default function Checkout() {
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]')
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.push({
      id: Date.now(),
      items: cart,
      total: total,
      date: new Date().toLocaleDateString()
    })
    localStorage.setItem('orders', JSON.stringify(orders))
    localStorage.setItem('cart', JSON.stringify([]))
    alert('✅ Order placed successfully!')
    navigate('/orders')
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Checkout</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Delivery Address</h3>
            <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
            <p><span className="font-semibold">Phone:</span> {user.mobile}</p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between">
                  <p>{item.name} × {item.quantity}</p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold mb-6">
                <p>Total:</p>
                <p className="text-[#2e0003]">₹{total}</p>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#2e0003] text-white py-3 rounded-lg hover:bg-[#4a0a10] font-semibold"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
