import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, Heart, Share2, ShoppingCart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductGallery from '../components/ProductGallery'
import ReviewSection from '../components/ReviewSection'
import api from '../services/api'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [inWishlist, setInWishlist] = useState(false)
  const [relatedProducts, setRelatedProducts] = useState([])

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)
      setLoading(false)
      
      // Fetch related products (same category)
      const relatedRes = await api.get(`/products?category=${response.data.category}&limit=4`)
      setRelatedProducts(relatedRes.data.products.filter(p => p._id !== id))
    } catch (err) {
      console.error('Failed to fetch product:', err)
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    // Store in localStorage or state management
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existingItem = cart.find(item => item._id === product._id)
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({ ...product, quantity })
    }
    
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Added to cart!')
  }

  const handleWishlist = () => {
    setInWishlist(!inWishlist)
    alert(inWishlist ? 'Removed from wishlist' : 'Added to wishlist')
  }

  if (loading) return <div className="min-h-screen bg-[#f0ebe0] p-4 flex items-center justify-center"><p>Loading...</p></div>
  if (!product) return <div className="min-h-screen bg-[#f0ebe0] p-4 flex items-center justify-center"><p>Product not found</p></div>

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-8">
            <span onClick={() => navigate('/')} className="cursor-pointer hover:text-[#2e0003]">Home</span>
            {' > '}
            <span onClick={() => navigate(`/category/${product.category}`)} className="cursor-pointer hover:text-[#2e0003]">{product.category}</span>
            {' > '}
            <span>{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Product Gallery */}
            <ProductGallery images={[product.image]} productName={product.name} />

            {/* Product Info */}
            <div className="bg-white rounded-2xl p-6">
              <h1 className="text-3xl font-bold text-[#2e0003] mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <span className="text-gray-600">(127 reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#2e0003]">₹{product.price}</span>
                <span className="text-gray-500 line-through ml-3">₹{Math.round(product.price * 1.2)}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Category & Stock */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Stock</p>
                  <p className="font-semibold">{product.stock > 0 ? `${product.stock} Available` : 'Out of Stock'}</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <label className="text-gray-700 font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2">−</button>
                  <span className="px-6 py-2">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">+</button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#2e0003] text-[#D8cfbc] font-bold py-3 rounded-lg hover:bg-[#4a0a10] flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={handleWishlist}
                  className={`px-6 py-3 rounded-lg border-2 font-bold ${inWishlist ? 'bg-red-100 border-red-600 text-red-600' : 'border-gray-300 hover:border-red-600'}`}
                >
                  <Heart size={20} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
                <button className="px-6 py-3 rounded-lg border-2 border-gray-300 hover:border-gray-600">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold mb-3">Why Choose This Product?</h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>✅ 100% Pure & Natural</li>
                  <li>✅ No Additives or Preservatives</li>
                  <li>✅ Direct from Farmers</li>
                  <li>✅ Fresh & Quality Guaranteed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewSection productId={id} />

          {/* Related Products */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-[#2e0003] mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <div key={prod._id} onClick={() => navigate(`/product/${prod._id}`)} className="bg-white rounded-2xl overflow-hidden hover:shadow-lg transition cursor-pointer">
                  <div className="h-48 bg-gray-200">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#2e0003]">{prod.name}</h3>
                    <p className="text-xl font-bold text-[#2e0003]">₹{prod.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
