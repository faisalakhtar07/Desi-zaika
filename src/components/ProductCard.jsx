import { useState } from 'react'
import { Star, Heart, Eye } from 'lucide-react'

export default function ProductCard({ product, onViewDetails }) {
  const [inWishlist, setInWishlist] = useState(false)

  const handleWishlist = (e) => {
    e.stopPropagation()
    setInWishlist(!inWishlist)
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-200 group">
        <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
          <button
            onClick={onViewDetails}
            className="bg-[#2e0003] text-[#D8cfbc] p-3 rounded-full hover:bg-[#4a0a10] transition"
          >
            <Eye size={20} />
          </button>
          <button
            onClick={handleWishlist}
            className={`p-3 rounded-full transition ${inWishlist ? 'bg-red-600 text-white' : 'bg-white text-[#2e0003] hover:bg-red-600 hover:text-white'}`}
          >
            <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            Out of Stock
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-[#2e0003] truncate">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 my-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < (product.rating || 4) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-gray-600 ml-1">(12)</span>
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-[#2e0003] mb-3">₹{product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={onViewDetails}
          className="w-full bg-[#2e0003] text-[#D8cfbc] font-semibold py-2 rounded-lg hover:bg-[#4a0a10] transition text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  )
}
