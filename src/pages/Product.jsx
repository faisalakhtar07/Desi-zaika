import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [inWishlist, setInWishlist] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await fetch(`https://desi-zaika-backend.onrender.com/api/products/${id}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  const addToCart = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('/login')
      return
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const exists = cart.find(item => item._id === product._id)
    
    if (exists) {
      exists.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    alert('✅ Added to cart!')
    navigate('/cart')
  }

  const addToWishlist = () => {
    const user = localStorage.getItem('user')
    if (!user) {
      navigate('/login')
      return
    }

    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    const exists = wishlist.find(item => item._id === product._id)
    
    if (exists) {
      setInWishlist(false)
      localStorage.setItem('wishlist', JSON.stringify(wishlist.filter(item => item._id !== product._id)))
    } else {
      setInWishlist(true)
      wishlist.push(product)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0ebe0]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2e0003] border-t-[#D8cfbc] mx-auto mb-4"></div>
          <p className="text-[#2e0003]">Loading product...</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0ebe0]">
        <div className="text-center">
          <p className="text-[#2e0003] text-lg">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-[#2e0003] text-white px-6 py-2 rounded-lg hover:bg-[#4a0a10]"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe0] py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2e0003] mb-8 hover:text-[#4a0a10]"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Product Container */}
        <div className="bg-white rounded-2xl p-8 grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-[#f0ebe0] rounded-xl p-8">
            <div className="text-6xl">🌶️</div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-[#2e0003] mb-4">{product.name}</h1>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-[#2e0003]">₹{product.price}</span>
                {product.stock > 0 ? (
                  <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-6 space-y-3">
              <p><span className="font-semibold">Category:</span> {product.category}</p>
              <p><span className="font-semibold">Stock Available:</span> {product.stock}</p>
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-[#2e0003] text-white py-3 rounded-lg hover:bg-[#4a0a10] disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button
                onClick={addToWishlist}
                className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 ${
                  inWishlist
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}