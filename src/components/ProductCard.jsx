import { ShoppingCart, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item._id === product._id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} added to cart!`)
    navigate('/cart')
  }

  const handleViewProduct = () => {
    navigate(`/product/${product._id}`)
  }

  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div
        className="relative h-56 bg-gradient-to-br from-[#f0ebe0] to-[#e5dcc8] overflow-hidden cursor-pointer"
        onClick={handleViewProduct}
      >
        <img
          src={product.image || 'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=500&q=85'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-3 left-3 bg-[#2e0003]/80 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full transition shadow-md"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Name */}
        <h3 className="font-bold text-[#2e0003] truncate text-base mb-1">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-yellow-400">★</span>
            <span className="text-xs text-gray-600">{product.rating} (reviews)</span>
          </div>
        )}

        {/* Footer - Price & Button */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-3">
          <div className="flex-1">
            <p className="text-lg font-bold text-[#2e0003]">₹{product.price}</p>
            {product.stock && (
              <p className="text-xs text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-[#2e0003] hover:bg-[#4a0a10] disabled:bg-gray-400 text-white p-2.5 rounded-lg transition flex items-center justify-center"
            title="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}
