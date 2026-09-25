import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'react-toastify'
import useProductStore from '../store/productStore'
import useCartStore from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const { getProductById } = useProductStore()
  const { addItem } = useCartStore()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [mainImage, setMainImage] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(id)
        setProduct(data)
        setMainImage(data.mainImage)
      } catch (error) {
        toast.error('Failed to load product')
        navigate('/shop')
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    try {
      await addItem(product.id, quantity)
      toast.success(`${quantity} added to cart!`)
      setQuantity(1)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleAddToWishlist = () => {
    toast.success('Added to wishlist!')
  }

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-8">Loading...</div>
  if (!product) return <div className="max-w-7xl mx-auto px-4 py-8">Product not found</div>

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Images */}
        <div>
          <div className="mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          {product.images && product.images.length > 0 && (
            <div className="flex space-x-2">
              {product.images.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt="thumbnail"
                  className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80"
                  onClick={() => setMainImage(img.image)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.isFeatured && (
            <span className="bg-orange-600 text-white px-3 py-1 rounded text-sm">Featured</span>
          )}
          {product.isBestSeller && (
            <span className="bg-red-600 text-white px-3 py-1 rounded text-sm ml-2">Best Seller</span>
          )}
          {product.isNewArrival && (
            <span className="bg-green-600 text-white px-3 py-1 rounded text-sm ml-2">New</span>
          )}

          <h1 className="text-3xl font-bold my-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < (product.rating || 0) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating?.toFixed(1) || 'No'} ({product.reviewCount || 0} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline space-x-3">
              <span className="text-3xl font-bold text-orange-600">₹{product.sellingPrice}</span>
              <span className="text-xl text-gray-400 line-through">₹{product.mrp}</span>
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                {discount}% OFF
              </span>
            </div>
          </div>

          {/* Weight */}
          <p className="text-gray-600 mb-4">Weight: <span className="font-semibold">{product.weight}</span></p>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    −
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-600 text-white px-6 py-3 rounded hover:bg-orange-700 flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
              </div>
            )}

            <button
              onClick={handleAddToWishlist}
              className="w-full border-2 border-orange-600 text-orange-600 px-6 py-3 rounded hover:bg-orange-50 flex items-center justify-center space-x-2"
            >
              <Heart size={20} />
              <span>Add to Wishlist</span>
            </button>
          </div>

          {/* Description */}
          <div className="mt-8 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600">{product.description || 'No description available'}</p>
          </div>

          {/* SKU */}
          <div className="mt-4 text-sm text-gray-500">
            SKU: {product.sku}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{review.userName}</div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet</p>
        )}
      </div>
    </div>
  )
}
