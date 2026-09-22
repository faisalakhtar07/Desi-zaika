import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart
} from 'lucide-react'

const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'

export default function Product() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [wishlist, setWishlist] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [id])

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem('wishlist') || '[]'
    )

    setWishlist(
      savedWishlist.some((item) => item._id === id)
    )
  }, [id])

  const fetchProduct = async () => {
    try {
      setLoading(true)

      const response = await fetch(`${API_URL}/${id}`)
      const data = await response.json()

      const item = data.product || data.data || data

      setProduct(item)
    } catch (error) {
      console.error('Product fetch error:', error)
      setProduct(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleWishlist = () => {
    const saved = JSON.parse(
      localStorage.getItem('wishlist') || '[]'
    )

    const exists = saved.some(
      (item) => item._id === product._id
    )

    let updated

    if (exists) {
      updated = saved.filter(
        (item) => item._id !== product._id
      )
      setWishlist(false)
    } else {
      updated = [...saved, product]
      setWishlist(true)
    }

    localStorage.setItem(
      'wishlist',
      JSON.stringify(updated)
    )
  }

  const addToCart = () => {
    if (Number(product.stock) === 0) return

    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    )

    const existing = cart.find(
      (item) => item._id === product._id
    )

    if (existing) {
      existing.quantity += quantity
    } else {
      cart.push({
        ...product,
        quantity
      })
    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1800)
  }

  const buyNow = () => {
    addToCart()
    navigate('/cart')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#2e0003] border-t-transparent" />
          <p className="text-sm text-[#2e0003]">
            Loading product...
          </p>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f0ebe0] px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-[#2e0003]">
          Product not found
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          This product may have been removed or is unavailable.
        </p>

        <button
          onClick={() => navigate('/products')}
          className="mt-6 rounded-full bg-[#2e0003] px-6 py-3 text-sm font-semibold text-white"
        >
          Back to Products
        </button>
      </div>
    )
  }

  const stock = Number(product.stock ?? 0)
  const outOfStock = stock === 0

  const originalPrice = Number(
    product.originalPrice || 0
  )

  const currentPrice = Number(
    product.price || 0
  )

  let discount = Number(product.discount || 0)

  if (
    !discount &&
    originalPrice > currentPrice &&
    currentPrice > 0
  ) {
    discount = Math.round(
      ((originalPrice - currentPrice) /
        originalPrice) *
        100
    )
  }

  return (
    <main className="min-h-screen bg-[#f0ebe0]">
      {/* Back */}
      <div className="mx-auto max-w-7xl px-6 pt-6 md:px-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2e0003] hover:underline"
        >
          <ArrowLeft size={17} />
          Back
        </button>
      </div>

      {/* Product */}
      <section className="mx-auto max-w-7xl px-6 py-8 md:px-10 md:py-14">
        <div className="grid overflow-hidden rounded-3xl border border-[#e2d8ca] bg-white shadow-sm md:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[380px] bg-[#eee7da] md:min-h-[620px]">
            <img
              src={
                product.image ||
                'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=1000&q=85'
              }
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {discount > 0 && (
              <span className="absolute left-5 top-5 rounded-full bg-[#2e0003] px-4 py-2 text-xs font-bold text-white">
                {discount}% OFF
              </span>
            )}

            <button
              onClick={toggleWishlist}
              className="absolute right-5 top-5 rounded-full bg-white p-3 shadow-md transition hover:scale-105"
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                className={
                  wishlist
                    ? 'fill-[#8b111b] text-[#8b111b]'
                    : 'text-[#2e0003]'
                }
              />
            </button>
          </div>

          {/* Details */}
          <div className="flex flex-col p-7 sm:p-10 md:p-12">

            {product.category && (
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9a6b6f]">
                {product.category}
              </p>
            )}

            <h1 className="mt-3 text-3xl font-semibold leading-tight text-[#2e0003] sm:text-4xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-5 text-sm leading-7 text-gray-600">
                {product.description}
              </p>
            )}

            {/* Price */}
            <div className="mt-7">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-[#2e0003]">
                  ₹{currentPrice}
                </span>

                {originalPrice > currentPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ₹{originalPrice}
                  </span>
                )}
              </div>

              {discount > 0 && (
                <p className="mt-1 text-xs font-medium text-green-700">
                  You save ₹
                  {Math.max(
                    0,
                    originalPrice - currentPrice
                  )}
                </p>
              )}
            </div>

            {/* Stock */}
            <div className="mt-6">
              {outOfStock ? (
                <span className="inline-flex rounded-full bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
                  Out of Stock
                </span>
              ) : (
                <span className="inline-flex rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                  {stock} available
                </span>
              )}
            </div>

            {/* Quantity */}
            {!outOfStock && (
              <div className="mt-7">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-full border border-[#d9cec0]">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1)
                      )
                    }
                    className="p-3 text-[#2e0003] hover:bg-[#f5efe7]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      setQuantity(
                        Math.min(
                          stock || 99,
                          quantity + 1
                        )
                      )
                    }
                    className="p-3 text-[#2e0003] hover:bg-[#f5efe7]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={addToCart}
                disabled={outOfStock}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2e0003] px-5 py-3.5 text-sm font-semibold text-[#2e0003] transition hover:bg-[#2e0003] hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
              >
                <ShoppingCart size={18} />

                {added ? 'Added to Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={buyNow}
                disabled={outOfStock}
                className="rounded-full bg-[#2e0003] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#4a0a10] disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Buy Now
              </button>
            </div>

            {/* Extra info */}
            <div className="mt-10 border-t border-[#e5ddd2] pt-7">
              <div className="grid grid-cols-2 gap-5 text-sm">
                <div>
                  <p className="text-xs text-gray-400">
                    Category
                  </p>
                  <p className="mt-1 font-medium text-[#2e0003]">
                    {product.category || 'Spices'}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Availability
                  </p>
                  <p className="mt-1 font-medium text-[#2e0003]">
                    {outOfStock
                      ? 'Currently unavailable'
                      : 'In stock'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related navigation */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="rounded-2xl bg-[#d8cfbc] p-7 sm:p-10">
          <h2 className="text-2xl font-semibold text-[#2e0003]">
            Looking for more?
          </h2>

          <p className="mt-2 text-sm text-[#5f5150]">
            Explore more Desi Zaika spices and discover
            something new for your kitchen.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-5 rounded-full bg-[#2e0003] px-6 py-3 text-sm font-semibold text-white"
          >
            Explore Products
          </button>
        </div>
      </section>
    </main>
  )
}