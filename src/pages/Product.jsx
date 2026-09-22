import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ShoppingCart, Heart, ChevronLeft } from 'lucide-react'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageZoom, setImageZoom] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://desi-zaika-backend.onrender.com/api/products`)
        const data = await response.json()
        const products = Array.isArray(data) ? data : (data.data || [])
        const foundProduct = products.find(p => p._id === id)
        setProduct(foundProduct)
      } catch (err) {
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existingItem = cart.find(item => item._id === product._id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert(`${product.name} added to cart!`)
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-[#2e0003] font-semibold">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-[#2e0003] font-semibold mb-4">Product not found</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10] transition"
          >
            Back to Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-[#2e0003] hover:bg-white/50 px-4 py-2 rounded-lg transition mb-6"
      >
        <ChevronLeft size={20} />
        Back to Products
      </button>

      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10">
            {/* Image Section */}
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div
                className={`relative rounded-xl overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e5dcc8] cursor-zoom-in ${
                  imageZoom ? 'lg:fixed lg:inset-4 lg:z-50' : ''
                }`}
                onClick={() => setImageZoom(!imageZoom)}
              >
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=800&q=85'}
                  alt={product.name}
                  className={`w-full h-96 object-cover transition-transform ${
                    imageZoom ? 'scale-150 cursor-zoom-out' : 'hover:scale-105'
                  }`}
                />
                
                {/* Zoom indicator */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {imageZoom ? 'Click to exit zoom' : 'Click to zoom'}
                </div>
              </div>

              {/* Thumbnail placeholder */}
              <div className="hidden sm:grid grid-cols-4 gap-2">
                {[product.image, product.image, product.image, product.image].map((img, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg overflow-hidden bg-gradient-to-br from-[#f0ebe0] to-[#e5dcc8] cursor-pointer hover:ring-2 hover:ring-[#2e0003] transition"
                  >
                    <img
                      src={img || 'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=150&q=85'}
                      alt={`View ${idx + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col justify-between">
              {/* Header */}
              <div>
                {/* Category */}
                {product.category && (
                  <div className="inline-block bg-[#2e0003]/10 text-[#2e0003] px-4 py-1 rounded-full text-sm font-semibold mb-4">
                    {product.category}
                  </div>
                )}

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-[#2e0003] mb-2">
                  {product.name}
                </h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-lg">
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">({product.rating} rating)</span>
                  </div>
                )}

                {/* Price */}
                <div className="mb-6">
                  <p className="text-4xl font-bold text-[#2e0003] mb-2">₹{product.price}</p>
                  {product.originalPrice && (
                    <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#2e0003] mb-2">About this product</h3>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                  </div>
                )}

                {/* Stock Status */}
                <div className="mb-6">
                  {product.stock > 0 ? (
                    <p className="text-green-600 font-semibold flex items-center gap-2">
                      ✅ In Stock ({product.stock} available)
                    </p>
                  ) : (
                    <p className="text-red-600 font-semibold">Out of Stock</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                {product.stock > 0 && (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                    <div className="flex items-center gap-3 bg-white border-2 border-gray-300 rounded-lg p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-[#2e0003] font-bold hover:bg-[#f0ebe0] rounded transition"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="w-12 text-center font-bold border-0 focus:outline-none"
                      />
                      <button
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        className="px-3 py-1 text-[#2e0003] font-bold hover:bg-[#f0ebe0] rounded transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="bg-[#2e0003] hover:bg-[#4a0a10] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="border-2 border-[#2e0003] text-[#2e0003] hover:bg-[#f0ebe0] font-bold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                  </button>
                </div>

                {/* Shipping Info */}
                <div className="bg-[#f0ebe0] rounded-lg p-4 space-y-2 text-sm text-gray-700">
                  <p>📦 Free shipping on orders above ₹500</p>
                  <p>🔄 Easy returns & exchanges</p>
                  <p>✅ 100% authentic products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-[#2e0003] mb-6">You might also like</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-[#D8cfbc] hover:bg-[#c8bfac] text-[#2e0003] font-semibold py-3 px-8 rounded-lg transition"
          >
            View all products →
          </button>
        </div>
      </div>
    </div>
  )
}
