import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  X
} from 'lucide-react'

const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'

export default function Home() {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('latest')
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('wishlist') || '[]')
    } catch {
      return []
    }
  })

  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=1800&q=85',
      eyebrow: 'DESI ZAIKA',
      title: 'Authentic taste,',
      highlight: 'made simple.',
      subtitle:
        'Premium Indian spices made to bring warmth, aroma and real flavour to your everyday cooking.'
    },
    {
      image:
        'https://images.unsplash.com/photo-1582707947697-d97fb110d04d?w=1800&q=85',
      eyebrow: 'PURE FLAVOUR',
      title: 'Taste that feels',
      highlight: 'like home.',
      subtitle:
        'Carefully selected spices for everyday meals, family recipes and special occasions.'
    },
    {
      image:
        'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1800&q=85',
      eyebrow: 'FRESHNESS',
      title: 'A little spice,',
      highlight: 'a lot of flavour.',
      subtitle:
        'Bring authentic Indian colour, aroma and flavour to your kitchen.'
    }
  ]

  const whyCards = [
    {
      image:
        'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1000&q=85',
      number: '01',
      title: 'Pure & Authentic',
      description:
        'Carefully selected spices with natural colour, aroma and authentic Indian taste.'
    },
    {
      image:
        'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1000&q=85',
      number: '02',
      title: 'Made for Every Kitchen',
      description:
        'Everyday essentials designed to make home cooking simple and flavourful.'
    },
    {
      image:
        'https://images.unsplash.com/photo-1599909533730-f9d6b5c5f3a3?w=1000&q=85',
      number: '03',
      title: 'Fresh Taste',
      description:
        'Quality ingredients and the rich taste you expect from a good Indian kitchen.'
    }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [slides.length])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()

      let list = []

      if (Array.isArray(data)) {
        list = data
      } else if (Array.isArray(data.products)) {
        list = data.products
      } else if (Array.isArray(data.data)) {
        list = data.data
      }

      setProducts(list)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    const unique = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      )
    ]

    return ['All', ...unique]
  }, [products])

  const filteredProducts = useMemo(() => {
    let result = [...products]

    const query = search.trim().toLowerCase()

    if (query) {
      result = result.filter((product) => {
        const name = String(product.name || '').toLowerCase()
        const description = String(product.description || '').toLowerCase()
        const productCategory = String(product.category || '').toLowerCase()

        return (
          name.includes(query) ||
          description.includes(query) ||
          productCategory.includes(query)
        )
      })
    }

    if (category !== 'All') {
      result = result.filter(
        (product) => product.category === category
      )
    }

    if (sortBy === 'price-low') {
      result.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      )
    }

    if (sortBy === 'price-high') {
      result.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      )
    }

    if (sortBy === 'latest') {
      result.sort(
        (a, b) =>
          new Date(b.createdAt || 0) -
          new Date(a.createdAt || 0)
      )
    }

    return result
  }, [products, search, category, sortBy])

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item._id === productId)
  }

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item._id === product._id
      )

      if (exists) {
        return current.filter(
          (item) => item._id !== product._id
        )
      }

      return [...current, product]
    })
  }

  const addToCart = (product) => {
    if (Number(product.stock) === 0) return

    const cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    )

    const existing = cart.find(
      (item) => item._id === product._id
    )

    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({
        ...product,
        quantity: 1
      })
    }

    localStorage.setItem('cart', JSON.stringify(cart))

    navigate('/cart')
  }

  const getDiscount = (product) => {
    if (product.discount) {
      return Number(product.discount)
    }

    if (product.originalPrice && product.price) {
      const original = Number(product.originalPrice)
      const current = Number(product.price)

      if (original > current) {
        return Math.round(
          ((original - current) / original) * 100
        )
      }
    }

    return 0
  }

  const nextSlide = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    )
  }

  const previousSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    )
  }

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2e0003]">

      {/* HERO */}
      <section className="relative h-[70vh] min-h-[520px] max-h-[760px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? 'opacity-100'
                : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="max-w-xl text-white">

              <div className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-white/80">
                <Sparkles size={14} />
                {slides[currentSlide].eyebrow}
              </div>

              <h1 className="text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
                {slides[currentSlide].title}
                <br />
                <span className="text-[#e8d9c1]">
                  {slides[currentSlide].highlight}
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/85 sm:text-base">
                {slides[currentSlide].subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={() =>
                    document
                      .getElementById('products')
                      ?.scrollIntoView({
                        behavior: 'smooth'
                      })
                  }
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2e0003] transition hover:bg-[#eee3d3]"
                >
                  Explore Spices
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => navigate('/products')}
                  className="rounded-full border border-white/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={previousSlide}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                currentSlide === index
                  ? 'w-8 bg-white'
                  : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
        <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8b4b50]">
              OUR COLLECTION
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Everyday spices, elevated.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600">
              Discover carefully selected spices that add
              authentic colour, aroma and flavour to your
              favourite dishes.
            </p>
          </div>

          <button
            onClick={() => navigate('/products')}
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#2e0003] hover:underline"
          >
            View all products
            <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-6 pb-8 md:px-10"
      >
        <div className="rounded-2xl border border-[#e1d8c9] bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row">

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search spices..."
                className="w-full rounded-xl border border-[#ddd4c6] bg-[#faf8f4] py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#2e0003]"
              />

              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2e0003]"
                >
                  <X size={17} />
                </button>
              )}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-[#ddd4c6] bg-[#faf8f4] px-4 py-3 text-sm outline-none focus:border-[#2e0003]"
            >
              <option value="latest">Latest</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
            </select>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                  category === item
                    ? 'bg-[#2e0003] text-white'
                    : 'bg-[#f3eee6] text-[#5c4d4d] hover:bg-[#e9dfd2]'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">

        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b4b50]">
              FEATURED
            </p>

            <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
              Popular picks
            </h2>
          </div>

          <p className="hidden text-xs text-gray-500 sm:block">
            {filteredProducts.length} products
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[330px] animate-pulse rounded-2xl bg-white"
              />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold">
              No products found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try another search or category.
            </p>

            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
              }}
              className="mt-5 rounded-full bg-[#2e0003] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {filteredProducts.slice(0, 8).map((product) => {
              const discount = getDiscount(product)
              const outOfStock =
                Number(product.stock) === 0

              return (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl border border-[#e7ded1] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <div
                    className="relative h-48 cursor-pointer overflow-hidden bg-[#eee7da] sm:h-56"
                    onClick={() =>
                      navigate(`/product/${product._id}`)
                    }
                  >
                    <img
                      src={
                        product.image ||
                        'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=700&q=80'
                      }
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />

                    {product.category && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#2e0003] backdrop-blur-sm">
                        {product.category}
                      </span>
                    )}

                    {discount > 0 && (
                      <span className="absolute bottom-3 left-3 rounded-full bg-[#2e0003] px-2.5 py-1 text-[10px] font-bold text-white">
                        {discount}% OFF
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product)
                      }}
                      aria-label="Add to wishlist"
                      className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition hover:bg-white"
                    >
                      <Heart
                        size={17}
                        className={
                          isWishlisted(product._id)
                            ? 'fill-[#8b111b] text-[#8b111b]'
                            : 'text-[#3d3333]'
                        }
                      />
                    </button>

                    {outOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#2e0003]">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">

                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a6b6f]">
                      {product.category || 'Spices'}
                    </p>

                    <h3
                      onClick={() =>
                        navigate(`/product/${product._id}`)
                      }
                      className="mt-1 cursor-pointer truncate text-sm font-semibold text-[#2e0003] hover:underline sm:text-base"
                    >
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-4 flex items-end justify-between gap-2">
                      <div>
                        <span className="text-lg font-bold text-[#2e0003]">
                          ₹{product.price}
                        </span>

                        {product.originalPrice &&
                          Number(product.originalPrice) >
                            Number(product.price) && (
                            <span className="ml-2 text-xs text-gray-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}

                        {product.stock &&
                          Number(product.stock) > 0 && (
                            <p className="mt-1 text-[10px] text-gray-500">
                              {product.stock} available
                            </p>
                          )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        disabled={outOfStock}
                        aria-label="Add to cart"
                        className="rounded-full bg-[#2e0003] p-2.5 text-white transition hover:bg-[#4a0a10] disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        <ShoppingCart size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        {filteredProducts.length > 8 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 rounded-full border border-[#2e0003] px-6 py-3 text-sm font-semibold text-[#2e0003] transition hover:bg-[#2e0003] hover:text-white"
            >
              View all products
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>

      {/* WHY DESI ZAIKA */}
      <section className="bg-[#2e0003] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">

          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8cfbc]">
              WHY DESI ZAIKA
            </p>

            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Simple ingredients.
              <br />
              Real flavour.
            </h2>

            <p className="mt-4 text-sm leading-6 text-white/65">
              We keep things simple — quality spices,
              thoughtful sourcing and the taste of Indian
              kitchens.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {whyCards.map((card) => (
              <div
                key={card.title}
                className="group relative min-h-[350px] overflow-hidden rounded-2xl"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <span className="text-sm font-semibold text-white/70">
                    {card.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-[#d8cfbc] px-7 py-12 text-center sm:px-12">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6e3035]">
            DESI ZAIKA
          </p>

          <h2 className="mt-3 text-3xl font-semibold text-[#2e0003] sm:text-4xl">
            Bring the real taste home.
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5150]">
            Explore our collection and make your everyday
            meals a little more special.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2e0003] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a0a10]"
          >
            Shop Now
            <ArrowRight size={17} />
          </button>
        </div>
      </section>

    </main>
  )
}