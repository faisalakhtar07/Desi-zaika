import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Heart,
  Sparkles,
  PackageCheck,
  Utensils,
  ChevronDown,
} from 'lucide-react'
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion'
import ProductCard from '../components/ProductCard'
import TestimonialCarousel from '../components/TestimonialCarousel'

const API_URL =
  'https://desi-zaika-backend.onrender.com/api/products'

const CATEGORY_IMAGES = {
  Spices:
    'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85',

  Tea:
    'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=900&q=85',

  Rice:
    'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85',

  Herbs:
    'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=900&q=85',

  Oils:
    'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=900&q=85',

  Grains:
    'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85',
}

const STORY_CARDS = [
  {
    number: '01',
    title: 'Rooted in Tradition',
    text: 'Indian kitchens have always been about warmth, flavour and memories. Desi Zaika brings that feeling to your everyday cooking.',
    image:
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '02',
    title: 'Selected with Care',
    text: 'From spices and herbs to rice, tea and grains, we focus on everyday ingredients chosen for authentic taste.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '03',
    title: 'Made for Everyday Cooking',
    text: 'Good food does not need to be complicated. Our collection is made to fit naturally into your daily kitchen.',
    image:
      'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1200&q=85',
  },
  {
    number: '04',
    title: 'From Us to Your Kitchen',
    text: 'Our goal is simple — make authentic Indian ingredients easier to discover and bring home.',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=85',
  },
]

const WHY_CHOOSE = [
  {
    icon: Leaf,
    title: 'Authentic Ingredients',
    text: 'Thoughtfully selected ingredients inspired by Indian kitchens.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality First',
    text: 'We keep quality and consistency at the heart of every product.',
  },
  {
    icon: PackageCheck,
    title: 'Careful Packaging',
    text: 'Products are packed with attention so they reach you safely.',
  },
  {
    icon: Truck,
    title: 'Reliable Delivery',
    text: 'A simple shopping experience from our kitchen shelf to your door.',
  },
]

const getCategoryName = (category) => {
  if (!category) return 'Spices'

  if (typeof category === 'object') {
    return category.name || 'Spices'
  }

  return String(category)
}

/* --------------------------------
   STORY CARD
-------------------------------- */

const StoryCard = ({ card, index }) => {
  const { scrollYProgress } = useScroll()

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [index * 8, index * -3]
  )

  return (
    <motion.article
      style={{
        y,
        top: `${90 + index * 18}px`,
        zIndex: index + 1,
      }}
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="sticky mx-auto mb-8 w-full max-w-5xl"
    >
      <div className="group overflow-hidden rounded-[28px] border border-[#d9cdbd] bg-[#f8f4ec] shadow-[0_20px_60px_rgba(46,0,3,0.10)] transition-all duration-500 hover:shadow-[0_28px_75px_rgba(46,0,3,0.16)]">
        <div className="grid min-h-[390px] grid-cols-1 md:grid-cols-2">

          {/* Image */}
          <div className="relative min-h-[250px] overflow-hidden md:min-h-[390px]">
            <motion.img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#2e0003]/50 via-transparent to-transparent" />

            <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-sm font-bold text-[#2e0003] shadow-sm backdrop-blur">
              {card.number}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12">
            <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#7d6d62]">
              OUR STORY
            </p>

            <h3 className="mb-5 text-3xl font-bold leading-tight text-[#2e0003] sm:text-4xl">
              {card.title}
            </h3>

            <p className="max-w-md text-base leading-7 text-[#665b55]">
              {card.text}
            </p>

            <div className="mt-8 h-px w-16 bg-[#2e0003]/30 transition-all duration-500 group-hover:w-28" />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* --------------------------------
   HOME
-------------------------------- */

const Home = () => {
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  /* --------------------------------
     FETCH PRODUCTS + CATEGORIES
  -------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(API_URL),
          fetch(`${API_URL}/categories`),
        ])

        const productsData = await productsRes.json()
        const categoriesData = await categoriesRes.json()

        const productList = Array.isArray(productsData)
          ? productsData
          : productsData.products || []

        const categoryList = Array.isArray(categoriesData)
          ? categoriesData
          : categoriesData.categories || []

        setProducts(productList.slice(0, 8))
        setCategories(categoryList)
      } catch (error) {
        console.error('Error loading home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  /* --------------------------------
     SEARCH
  -------------------------------- */

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const value = e.currentTarget.value.trim()

      if (value) {
        navigate(`/products?search=${encodeURIComponent(value)}`)
      }
    }
  }

  /* --------------------------------
     RENDER
  -------------------------------- */

  return (
    <div className="min-h-screen bg-[#f0ebe0] text-[#2e0003]">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="relative h-[600px] overflow-hidden bg-[#2e0003] text-white">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1800&q=85"
            alt="Indian spices"
            className="h-full w-full object-cover opacity-35"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#2e0003] via-[#2e0003]/75 to-[#2e0003]/40" />
        </div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 py-20">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
              <Sparkles size={15} />
              <span className="text-sm font-medium">
                Authentic Indian Flavours
              </span>
            </div>

            <h1 className="mb-6 max-w-3xl text-5xl font-bold leading-[1.05] md:text-6xl">
              Taste the{' '}
              <span className="italic font-normal">
                real
              </span>{' '}
              Desi Zaika.
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-8 text-gray-200">
              Discover carefully selected spices, herbs, rice, tea and
              everyday ingredients that bring authentic Indian flavour
              to your kitchen.
            </p>

            {/* Search */}
            <div className="flex max-w-2xl flex-col gap-3 sm:flex-row">

              <input
                type="text"
                placeholder="Search spices, rice, herbs..."
                onKeyDown={handleSearch}
                className="h-13 flex-1 rounded-xl border border-white/20 bg-white px-5 text-gray-900 outline-none transition focus:ring-4 focus:ring-[#D8cfbc]/30"
              />

              <button
                onClick={() => navigate('/products')}
                className="flex h-13 items-center justify-center gap-2 rounded-xl bg-[#D8cfbc] px-7 font-semibold text-[#2e0003] transition hover:bg-white"
              >
                Search
                <ArrowRight size={19} />
              </button>

            </div>

            <div className="mt-6 flex flex-wrap gap-3">

              <button
                onClick={() => navigate('/products')}
                className="rounded-xl bg-white px-7 py-3 font-semibold text-[#2e0003] transition hover:-translate-y-0.5"
              >
                Shop Now
              </button>

              <button
                onClick={() => navigate('/about')}
                className="rounded-xl border border-white/50 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Spices
              </button>

            </div>

          </motion.div>

        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
          }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/60"
        >
          <ChevronDown size={22} />
        </motion.div>

      </section>


      {/* =====================================
          WHY CHOOSE
      ===================================== */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 max-w-2xl">

            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#7d6d62]">
              WHY DESI ZAIKA
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#2e0003] md:text-5xl">
              Simple ingredients.
              <br />
              <span className="italic font-normal">
                Honest flavour.
              </span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

            {WHY_CHOOSE.map((item, index) => {

              const Icon = item.icon

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="group rounded-2xl border border-[#e4dcd2] bg-[#faf8f4] p-7 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(46,0,3,0.08)]"
                >

                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#2e0003] text-[#D8cfbc] transition-transform duration-300 group-hover:scale-105">
                    <Icon size={21} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-[#2e0003]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>

                  <div className="mt-6 h-px w-8 bg-[#2e0003]/25 transition-all duration-300 group-hover:w-14" />

                </motion.div>
              )
            })}

          </div>

        </div>

      </section>


      {/* =====================================
          PRODUCTS
      ===================================== */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#7d6d62]">
                EXPLORE OUR COLLECTION
              </p>

              <h2 className="text-4xl font-bold leading-tight text-[#2e0003] md:text-5xl">
                Made for every
                <br />
                <span className="italic font-normal">
                  Indian kitchen.
                </span>
              </h2>

            </div>

            <button
              onClick={() => navigate('/products')}
              className="flex items-center gap-2 font-semibold text-[#2e0003] transition hover:gap-3"
            >
              View all products
              <ArrowRight size={19} />
            </button>

          </div>

          {loading ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-white"
                />
              ))}

            </div>

          ) : products.length > 0 ? (

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={{
                    ...product,
                    category: getCategoryName(product.category),
                  }}
                />
              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-[#ddd2c4] bg-white p-12 text-center">
              <Utensils
                className="mx-auto mb-4 text-[#2e0003]/40"
                size={35}
              />

              <p className="text-gray-500">
                Products coming soon.
              </p>
            </div>

          )}

        </div>

      </section>


      {/* =====================================
          SHOP BY CATEGORY
      ===================================== */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12">

            <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#7d6d62]">
              EXPLORE
            </p>

            <h2 className="text-4xl font-bold text-[#2e0003] md:text-5xl">
              Shop by Category
            </h2>

          </div>

          {categories.length > 0 ? (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {categories.map((category, index) => {

                const categoryName = category.name
                const image =
                  CATEGORY_IMAGES[categoryName] ||
                  CATEGORY_IMAGES.Spices

                return (
                  <motion.button
                    key={category._id || categoryName}
                    onClick={() =>
                      navigate(
                        `/products?category=${encodeURIComponent(
                          categoryName
                        )}`
                      )
                    }
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="group relative h-64 overflow-hidden rounded-[24px] text-left"
                  >

                    <img
                      src={image}
                      alt={categoryName}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#2e0003]/90 via-[#2e0003]/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 p-6">

                      <div className="flex items-end justify-between">

                        <div>
                          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-white/65">
                            Explore
                          </p>

                          <h3 className="text-2xl font-bold text-white">
                            {categoryName}
                          </h3>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-white group-hover:text-[#2e0003]">
                          <ArrowRight size={18} />
                        </div>

                      </div>

                    </div>

                  </motion.button>
                )
              })}

            </div>

          ) : (

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {Object.keys(CATEGORY_IMAGES).map((name) => (
                <div
                  key={name}
                  className="h-64 animate-pulse rounded-[24px] bg-[#f0ebe0]"
                />
              ))}

            </div>

          )}

        </div>

      </section>


      {/* =====================================
          OUR STORY - SCROLL STACK
      ===================================== */}

      <section className="bg-[#f0ebe0] py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-16 max-w-2xl">

            <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[#7d6d62]">
              OUR STORY
            </p>

            <h2 className="text-4xl font-bold leading-tight text-[#2e0003] md:text-5xl">
              More than ingredients.
              <br />
              <span className="italic font-normal">
                It's a feeling.
              </span>
            </h2>

            <p className="mt-5 max-w-xl leading-7 text-[#665b55]">
              Scroll through our story and discover what makes Desi Zaika
              special.
            </p>

          </div>

          {/* STACK */}
          <div className="relative">

            {STORY_CARDS.map((card, index) => (
              <StoryCard
                key={card.number}
                card={card}
                index={index}
              />
            ))}

          </div>

          {/* Space after sticky stack */}
          <div className="h-[35vh]" />

        </div>

      </section>


      {/* =====================================
          TESTIMONIALS
      ===================================== */}

      <section className="bg-white py-20">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-12">

            <p className="mb-2 text-xs font-semibold tracking-[0.22em] text-[#7d6d62]">
              FROM OUR CUSTOMERS
            </p>

            <h2 className="text-4xl font-bold text-[#2e0003] md:text-5xl">
              What Our Customers Say
            </h2>

          </div>

          <TestimonialCarousel />

        </div>

      </section>


      {/* =====================================
          FINAL CTA
      ===================================== */}

      <section className="relative overflow-hidden bg-[#2e0003] py-24 text-white">

        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#D8cfbc]/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#D8cfbc]/10 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="relative mx-auto max-w-4xl px-6 text-center"
        >

          <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#D8cfbc]/70">
            DESI ZAIKA
          </p>

          <h2 className="text-4xl font-bold leading-tight md:text-5xl">
            Bring authentic flavour
            <br />
            <span className="italic font-normal">
              to your kitchen.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-gray-300">
            Discover spices, rice, tea, herbs, oils and grains made
            for everyday Indian cooking.
          </p>

          <button
            onClick={() => navigate('/products')}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D8cfbc] px-8 py-4 font-semibold text-[#2e0003] transition hover:-translate-y-1 hover:bg-white"
          >
            Start Shopping
            <ArrowRight size={19} />
          </button>

        </motion.div>

      </section>

    </div>
  )
}

export default Home