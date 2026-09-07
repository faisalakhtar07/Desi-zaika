import { useCartStore } from '../store/cartStore'

function ProductCard({ product }) {
  const { addToCart } = useCartStore()

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    alert('✅ Added to cart!')
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden hover:transform hover:-translate-y-1">
      <div className="h-48 bg-gradient-to-br from-burgundy-200 to-burgundy-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-6xl">🌶️</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {product.ratings && (
          <div className="flex text-yellow-400 mb-3 text-sm">
            {'⭐'.repeat(Math.floor(product.ratings))}
            {product.reviews && <span className="text-gray-600 ml-2">({product.reviews})</span>}
          </div>
        )}

        <div className="mb-4">
          <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
          {product.originalPrice && product.originalPrice > product.price && (
            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
          )}
        </div>

        {product.stock > 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-burgundy-900 text-white py-2 rounded-lg hover:bg-burgundy-800 transition font-semibold text-sm"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-400 text-white py-2 rounded-lg cursor-not-allowed font-semibold text-sm"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
