import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'

export default function Wishlist() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async (product) => {
    setLoading(true)
    try {
      await addItem(product.id, 1)
      toast.success('Added to cart!')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = (productId) => {
    removeItem(productId)
    toast.success('Removed from wishlist')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <Heart size={48} className="mx-auto mb-4 text-gray-300" />
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <p className="text-gray-600 mb-8">Your wishlist is empty</p>
        <Link to="/shop" className="bg-orange-600 text-white px-8 py-3 rounded hover:bg-orange-700">
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <div className="relative">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={() => handleRemove(product.id)}
                className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-4">
              <Link
                to={`/product/${product.id}`}
                className="font-semibold hover:text-orange-600 block truncate"
              >
                {product.name}
              </Link>
              <p className="text-sm text-gray-500 mb-2">{product.weight}</p>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-orange-600 font-bold">₹{product.sellingPrice}</span>
                  <span className="text-gray-400 line-through text-sm ml-2">₹{product.mrp}</span>
                </div>
              </div>

              {product.stock > 0 ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={loading}
                  className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-600 py-2 rounded">
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
