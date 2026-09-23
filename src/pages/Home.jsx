import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Search,
} from 'lucide-react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import TestimonialCarousel from '../components/TestimonialCarousel'

const API_URL =
  'https://desi-zaika-backend.onrender.com/api/products'

const storyCards = [
  {
    number: '01',
    title: 'Rooted in Tradition',
    description:
      'Inspired by the flavours that have always been a part of Indian kitchens.',
  },
  {
    number: '02',
    title: 'Selected with Care',
    description:
      'Every ingredient is chosen with focus on quality, flavour and everyday use.',
  },
  {
    number: '03',
    title: 'Made for Everyday Cooking',
    description:
      'Simple, authentic ingredients created to become a part of your daily meals.',
  },
  {
    number: '04',
    title: 'From Us to Your Kitchen',
    description:
      'Carefully packed and delivered so authentic Desi Zaika reaches your home.',
  },
]

const Home = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        const res = await fetch(API_URL)

        if (!res.ok) {
          throw new Error('Unable to fetch products')
        }

        const data = await res.json()

        const productList = Array.isArray(data)
          ? data
          : Array.isArray(data?.products)
          ? data.products
          : []

        setProducts(productList.slice(0, 8))
      } catch (error) {
        console.error('Product fetch error:', error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSearch = () => {
    const value = search.trim()

    if (!value) {
      navigate('/products')
      return
    }

    navigate(`/products?search=${encodeURIComponent(value)}`)
  }

  return (
    <main className="min-h-screen bg-[#f0ebe0]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-[#f7f3eb]">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#2e0003]/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#d8cfbc]/60 blur-3xl" />

        <div className="relative mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-20">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2e0003]/10 bg-white px-4 py-2 text-sm font-medium text-[#2e0003] shadow-sm">
              <Leaf size={16} />
              Authentic Indian Flavours
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-[#2e0003] sm:text-6xl lg:text-7xl">
              Simple ingredients.
              <br />
              <span className="font-serif italic font-normal">
                Real desi flavour.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
              Carefully selected spices, herbs, rice, tea and everyday
              ingredients made for the heart of every Indian kitchen.
            </p>

            {/* Search */}

            <div className="mt-8 flex max-w-lg items-center rounded-2xl border border-[#2e0003]/10 bg-white p-2 shadow-[0_12px_40px_rgba(46,0,3,0.07)]">
              <Search
                size={20}
                className="ml-3 shrink-0 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
                placeholder="Search spices, rice, tea..."
                className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-[#2e0003] outline-none placeholder:text-gray-400"
              />

              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center gap-2 rounded-xl bg-[#2e0003] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#47070c]"
              >
                Search
                <ArrowRight size={17} />
              </button>
            </div>

            {/* Buttons */}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="rounded-xl bg-[#2e0003] px-6 py-3.5 font-semibold text-white transition hover:bg-[#47070c]"
              >
                Shop Products
              </button>

              <button
                type="button"
                onClick={() => navigate('/about')}
                className="rounded-xl border border-[#2e0003]/15 bg-white px-6 py-3.5 font-semibold text-[#2e0003] transition hover:border-[#2e0003]/30"
              >
                Our Story
              </button>
            </div>
          </motion.div>

          {/* Right Image */}

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative hidden lg:block"
          >
            <div className="relative ml-auto h-[500px] max-w-[520px] overflow-hidden rounded-[36px]">
              <img
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85"
                alt="Traditional Indian spices"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2e0003]/40 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-white/90 p-5 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Desi Zaika
                </p>

                <p className="mt-1 text-lg font-semibold text-[#2e0003]">
                  Flavours that feel like home.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Leaf className="mx-auto mb-4 h-10 w-10 text-[#2e0003]" />

              <h3 className="mb-2 font-semibold text-[#2e0003]">
                Natural Ingredients
              </h3>

              <p className="text-sm text-gray-600">
                Selected with care
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-center"
            >
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#2e0003]" />

              <h3 className="mb-2 font-semibold text-[#2e0003]">
                Quality First
              </h3>

              <p className="text-sm text-gray-600">
                Made for your kitchen
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="text-center"
            >
              <Truck className="mx-auto mb-4 h-10 w-10 text-[#2e0003]" />

              <h3 className="mb-2 font-semibold text-[#2e0003]">
                Reliable Delivery
              </h3>

              <p className="text-sm text-gray-600">
                Packed with care
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="text-center"
            >
              <Heart className="mx-auto mb-4 h-10 w-10 text-[#2e0003]" />

              <h3 className="mb-2 font-semibold text-[#2e0003]">
                Made With Love
              </h3>

              <p className="text-sm text-gray-600">
                From us to you
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

            <div>
              <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-gray-500">
                EXPLORE OUR COLLECTION
              </p>

              <h2 className="text-4xl font-bold text-[#2e0003]">
                Made for every
                <br />

                <span className="font-serif italic font-normal">
                  Indian kitchen.
                </span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 font-semibold text-[#2e0003] hover:underline"
            >
              View all products
              <ArrowRight size={19} />
            </button>

          </div>

          {loading ? (
            <div className="py-14 text-center text-gray-500">
              Loading products...
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-white py-14 text-center text-gray-500">
              No products available yet.
            </div>
          )}

        </div>
      </section>

      {/* ================= OUR STORY ================= */}

      <section className="bg-[#f7f3eb] py-20">
        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-14 max-w-2xl">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-gray-500">
              OUR STORY
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#2e0003] md:text-5xl">
              Authentic flavours,
              <br />

              <span className="font-serif italic font-normal">
                thoughtfully chosen.
              </span>
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              Desi Zaika is about keeping everyday Indian cooking simple,
              authentic and full of flavour.
            </p>
          </div>

          <div className="relative mx-auto max-w-5xl">

            {storyCards.map((card, index) => (
              <motion.div
                key={card.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
                className="sticky mb-6"
                style={{
                  top: `${100 + index * 16}px`,
                  zIndex: index + 1,
                }}
              >
                <div className="grid min-h-[220px] items-center gap-8 rounded-[28px] border border-[#2e0003]/10 bg-white p-8 shadow-[0_20px_60px_rgba(46,0,3,0.07)] md:grid-cols-[130px_1fr] md:p-10">

                  <div>
                    <span className="font-serif text-5xl italic text-[#2e0003]/20">
                      {card.number}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold text-[#2e0003] md:text-3xl">
                      {card.title}
                    </h3>

                    <p className="mt-4 max-w-2xl leading-7 text-gray-600">
                      {card.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-12 text-4xl font-bold text-[#2e0003]">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                name: 'Spices',
                emoji: '🌶️',
              },
              {
                name: 'Rice',
                emoji: '🌾',
              },
              {
                name: 'Herbs',
                emoji: '🌿',
              },
              {
                name: 'Tea',
                emoji: '☕',
              },
            ].map((category) => (
              <motion.button
                type="button"
                key={category.name}
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(
                      category.name
                    )}`
                  )
                }
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative h-48 overflow-hidden rounded-2xl bg-[#2e0003] text-white"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2e0003] to-[#4a0a10]" />

                <div className="relative flex h-full flex-col items-center justify-center">

                  <span className="mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                    {category.emoji}
                  </span>

                  <h3 className="text-2xl font-bold">
                    {category.name}
                  </h3>

                </div>
              </motion.button>
            ))}

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}

      <section className="bg-[#f0ebe0] py-16">
        <div className="mx-auto max-w-7xl px-6">

          <h2 className="mb-12 text-4xl font-bold text-[#2e0003]">
            What Our Customers Say
          </h2>

          <TestimonialCarousel />

        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="bg-[#2e0003] py-16 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center">

          <h2 className="mb-6 text-4xl font-bold">
            Ready to elevate your cooking?
          </h2>

          <p className="mb-8 text-lg text-gray-200">
            Discover authentic ingredients made for everyday Indian
            kitchens.
          </p>

          <button
            type="button"
            onClick={() => navigate('/products')}
            className="rounded-xl bg-[#D8cfbc] px-8 py-4 text-lg font-semibold text-[#2e0003] transition hover:bg-[#e7dfcf]"
          >
            Start Shopping Now
          </button>

        </div>
      </section>

    </main>
  )
}

export default Home