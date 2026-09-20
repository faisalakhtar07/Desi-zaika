import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import api from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1596040680447-9e8e13e7a0e2?w=1600&q=85',
      title: 'Authentic Indian Spices',
      subtitle: 'Pure taste. Rich aroma. Desi Zaika.'
    },
    {
      image: 'https://images.unsplash.com/photo-1582707947697-d97fb110d04d?w=1600&q=85',
      title: 'Taste That Feels Like Home',
      subtitle: 'Carefully selected spices for every kitchen.'
    },
    {
      image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=85',
      title: 'Freshness in Every Pinch',
      subtitle: 'Bring authentic Indian flavour to your table.'
    }
  ]

  const whyCards = [
    {
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=900&q=85',
      title: 'Pure & Authentic',
      description: 'Carefully selected spices with rich natural colour, aroma and authentic Indian taste.'
    },
    {
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=900&q=85',
      title: 'Made for Every Kitchen',
      description: 'From everyday cooking to special occasions, our spices make every meal more flavourful.'
    },
    {
      image: 'https://images.unsplash.com/photo-1599909533730-f9d6b5c5f3a3?w=900&q=85',
      title: 'Fresh Taste',
      description: 'A simple promise — quality ingredients and the delicious taste you expect at home.'
    }
  ]

  useEffect(() => {
    fetchProducts()

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(slideTimer)
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products')
      setProducts(response.data?.products || response.data || [])
    } catch (err) {
      console.error('Failed to fetch products:', err)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    navigate('/cart')
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f0e7] text-[#2e0003]">
        {/* Hero Background Slider */}
        <section className="relative h-[72vh] min-h-[500px] max-h-[760px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
          ))}

          <div className="relative z-10 flex h-full items-center">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
              <div className="max-w-xl text-white">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                  DESI ZAIKA
                </p>
                <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
                  Authentic taste,
                  <br />
                  made simple.
                </h1>
                <p className="mt-5 max-w-md text-sm leading-6 text-white/85 sm:text-base">
                  Premium Indian spices made to bring warmth, aroma and real
                  flavour to your everyday cooking.
                </p>
                <button
                  onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2e0003] transition hover:bg-[#f0e5d5]"
                >
                  Explore Spices
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>

          <button
            aria-label="Previous slide"
            onClick={() =>
              setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
            }
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40"
          >
            <ChevronLeft size={21} />
          </button>

          <button
            aria-label="Next slide"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % slides.length)
            }
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/30 bg-black/20 p-2.5 text-white backdrop-blur-sm transition hover:bg-black/40"
          >
            <ChevronRight size={21} />
          </button>

          <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.image}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>
        </section>

        {/* Small intro */}
        <section className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#8a4b50]">
              OUR COLLECTION
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everyday spices, elevated.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-600">
              Discover carefully selected spices that add authentic colour,
              aroma and flavour to your favourite dishes.
            </p>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-24">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a4b50]">
                FEATURED
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                Featured Products
              </h2>
            </div>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-gray-500">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-12 text-center text-sm text-gray-500">
              No products available
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <article
                  key={product._id}
                  className="group overflow-hidden rounded-2xl bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden bg-[#eee7da]">
                    <img
                      src={product.image || 'https://via.placeholder.com/500'}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5">
                    <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-[#9a6b6f]">
                      {product.category || 'Spices'}
                    </p>
                    <h3 className="truncate text-base font-semibold text-[#2e0003]">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
                        {product.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#2e0003]">
                        ₹{product.price}
                      </span>

                      <button
                        onClick={() => handleAddToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className="rounded-full bg-[#2e0003] p-2.5 text-[#f5f0e7] transition hover:bg-[#4a0a10]"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Why Desi Zaika - Background Image Cards */}
        <section className="bg-[#2e0003] py-16 text-white md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-10 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d8cfbc]">
                WHY DESI ZAIKA
              </p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                More than just spices.
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/65">
                Simple ingredients, thoughtful sourcing and the flavour of
                Indian kitchens in every pack.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {whyCards.map((card) => (
                <div
                  key={card.title}
                  className="group relative min-h-[360px] overflow-hidden rounded-2xl"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                  <div className="relative flex h-full flex-col justify-end p-6">
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Minimal CTA */}
        <section className="px-6 py-16 md:px-10 md:py-24">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-[#d8cfbc] px-7 py-12 text-center sm:px-12">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6e3035]">
              DESI ZAIKA
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#2e0003] sm:text-4xl">
              Bring the real taste home.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-[#5f5150]">
              Explore our collection and make your everyday meals a little
              more special.
            </p>
            <button
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#2e0003] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4a0a10]"
            >
              Shop Now
              <ArrowRight size={17} />
            </button>
          </div>
        </section>
      </main>
    </>
  )
}
