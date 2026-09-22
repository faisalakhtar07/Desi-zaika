import { useEffect, useState } from 'react'
import { Heart, ShoppingCart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProductCard({ product }) {
  const navigate = useNavigate()

  const [wishlist, setWishlist] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    const savedWishlist = JSON.parse(
      localStorage.getItem('wishlist') || '[]'
    )

    setWishlist(
      savedWishlist.some(
        (item) => item._id === product?._id
      )
    )
  }, [product?._id])

  if (!product) return null

  const stock = Number(product.stock ?? 0)
  const outOfStock = stock === 0

  const price = Number(product.price || 0)
  const originalPrice = Number(
    product.originalPrice || 0
  )

  let discount = Number(product.discount || 0)

  if (
    !discount &&
    originalPrice > price &&
    price > 0
  ) {
    discount = Math.round(
      ((originalPrice - price) / originalPrice) * 100
    )
  }

  const image =
    product.image ||
    product.imageUrl ||
    product.photo ||
    'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=700&q=80'

  const toggleWishlist = (event) => {
    event.stopPropagation()

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

  const addToCart = (event) => {
    event.stopPropagation()

    if (outOfStock) return

    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    )

    const existing = cart.find(
      (item) => item._id === product._id
    )

    if (existing) {
      existing.quantity =
        Number(existing.quantity || 0) + 1
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    )

    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 1500)
  }

  const openProduct = () => {
    navigate(`/product/${product._id}`)
  }

  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e5ddd1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <div
        onClick={openProduct}
        className="relative h-56 cursor-pointer overflow-hidden bg-[#eee7da]"
      >
        <img
          src={image}
          alt={product.name || 'Product'}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=700&q=80'
          }}
        />

        {/* Category */}
        {product.category && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2e0003] backdrop-blur-sm">
            {product.category}
          </span>
        )}

        {/* Discount */}
        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-[#2e0003] px-2.5 py-1 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={toggleWishlist}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2.5 shadow-sm backdrop-blur-sm transition hover:bg-white"
        >
          <Heart
            size={17}
            className={
              wishlist
                ? 'fill-[#8b111b] text-[#8b111b]'
                : 'text-[#2e0003]'
            }
          />
        </button>

        {/* Out of Stock */}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#2e0003]">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">

        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a6b6f]">
          {product.category || 'Spices'}
        </p>

        <h3
          onClick={openProduct}
          className="mt-1 cursor-pointer truncate text-base font-semibold text-[#2e0003] hover:underline"
        >
          {product.name || 'Unnamed Product'}
        </h3>

        {product.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
            {product.description}
          </p>
        )}

        {/* Price + Cart */}
        <div className="mt-4 flex items-end justify-between gap-3">

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-[#2e0003]">
                ₹{price}
              </span>

              {originalPrice > price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{originalPrice}
                </span>
              )}
            </div>

            {stock > 0 && (
              <p className="mt-1 text-[10px] text-gray-500">
                {stock} available
              </p>
            )}
          </div>

          <button
            onClick={addToCart}
            disabled={outOfStock}
            aria-label="Add to cart"
            className={`rounded-full p-2.5 text-white transition ${
              outOfStock
                ? 'cursor-not-allowed bg-gray-300'
                : added
                ? 'bg-green-700'
                : 'bg-[#2e0003] hover:bg-[#4a0a10]'
            }`}
          >
            <ShoppingCart size={17} />
          </button>

        </div>

        {added && (
          <p className="mt-2 text-center text-[11px] font-semibold text-green-700">
            Added to cart
          </p>
        )}
      </div>
    </article>
  )
}