import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Search, ShoppingCart, Sparkles, X } from 'lucide-react'

const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'
const LOGO_CANDIDATES = ['/logo.png', '/desi-zaika-logo.png', '/logo.svg']
const VIDEO_CANDIDATES = ['/hero.mp4', '/desi-zaika.mp4', '/video.mp4']

const CATEGORY_META = {
  Spices: { title: 'Spices', text: 'Whole spices, powders and everyday masala essentials.' },
  Tea: { title: 'Tea', text: 'Tea leaves and comforting blends for your daily cup.' },
  Rice: { title: 'Rice', text: 'Everyday rice varieties for simple meals and special occasions.' },
  Herbs: { title: 'Herbs', text: 'Aromatic herbs to finish and lift your recipes.' },
  Oils: { title: 'Oils', text: 'Kitchen oils selected for everyday cooking.' },
  Grains: { title: 'Grains', text: 'Wholesome grains for your everyday pantry.' },
}

const STORY = [
  ['01', 'The heart of Indian cooking', 'Spices bring colour, aroma and personality to everyday food. Desi Zaika is built around that simple idea — good food starts with good flavour.'],
  ['02', 'Selected for everyday meals', 'From a quick dal to a weekend biryani, the right ingredient can change the entire experience. Explore the collection by category and find what belongs in your kitchen.'],
  ['03', 'Aroma you notice', 'The experience starts before the first bite. Rich aroma, familiar ingredients and an easy shopping experience come together in one place.'],
  ['04', 'From simple food to special moments', 'A family dinner, a festival, a Sunday lunch or a simple cup of tea — a little Desi Zaika can make ordinary moments feel special.'],
]

function Logo({ className = 'h-10 w-auto' }) {
  const [index, setIndex] = useState(0)
  return (
    <img
      src={LOGO_CANDIDATES[index]}
      alt="Desi Zaika"
      className={className}
      onError={() => setIndex((i) => (i + 1) % LOGO_CANDIDATES.length)}
    />
  )
}

function ProductImage({ product, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = !failed && product?.image ? product.image : LOGO_CANDIDATES[0]
  return (
    <img
      src={src}
      alt={product?.name || 'Desi Zaika'}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sortBy, setSortBy] = useState('latest')
  const [whyIndex, setWhyIndex] = useState(0)
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] }
  })

  // ✅ Fetch products with better error handling
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`)
        }
        
        const data = await response.json()
        
        // ✅ Validate data format and ensure it's an array
        let result = []
        if (Array.isArray(data)) {
          result = data
        } else if (Array.isArray(data.products)) {
          result = data.products
        } else if (Array.isArray(data.data)) {
          result = data.data
        }
        
        // ✅ Additional validation - ensure all items are objects
        if (!Array.isArray(result)) {
          result = []
        }
        result = result.filter(item => item && typeof item === 'object' && item._id)
        
        setProducts(result)
      } catch (err) {
        console.error('❌ Failed to load products:', err.message)
        setError(err.message)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // ✅ Save wishlist to localStorage whenever it changes
  useEffect(() => { 
    localStorage.setItem('wishlist', JSON.stringify(wishlist)) 
  }, [wishlist])

  // ✅ Preload images for "Why" section
  useEffect(() => {
    const whyProds = products.filter((p) => p.image).slice(0, 6)
    whyProds.forEach(product => {
      if (product.image && typeof product.image === 'string') {
        const img = new Image()
        img.src = product.image
        img.onerror = () => console.warn(`Failed to preload image: ${product.image}`)
      }
    })
  }, [products])

  const categories = useMemo(() => {
    const found = [...new Set(products.map((p) => String(p.category || '').trim()).filter(Boolean))]
    const preferred = Object.keys(CATEGORY_META).filter((name) => found.some((x) => x.toLowerCase() === name.toLowerCase()))
    const other = found.filter((x) => !preferred.some((p) => p.toLowerCase() === x.toLowerCase()))
    return ['All', ...preferred, ...other]
  }, [products])

  const filtered = useMemo(() => {
    let result = [...products]
    const q = search.trim().toLowerCase()
    if (q) result = result.filter((p) => [p.name, p.description, p.category].some((v) => String(v || '').toLowerCase().includes(q)))
    if (category !== 'All') result = result.filter((p) => String(p.category || '').toLowerCase() === category.toLowerCase())
    if (sortBy === 'price-low') result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0))
    else if (sortBy === 'price-high') result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0))
    else result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    return result
  }, [products, search, category, sortBy])

  const categoryProducts = (name) => products.filter((p) => String(p.category || '').toLowerCase() === name.toLowerCase()).slice(0, 4)
  const whyProducts = products.filter((p) => p.image).slice(0, 6)

  const addToCart = (p) => {
    if (Number(p.stock) === 0) return
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const existing = cart.find((i) => i._id === p._id)
    if (existing) existing.quantity = Number(existing.quantity || 0) + 1
    else cart.push({ ...p, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }

  const toggleWishlist = (p) => setWishlist((current) => current.some((i) => i._id === p._id) ? current.filter((i) => i._id !== p._id) : [...current, p])
  const discount = (p) => p.discount ? Number(p.discount) : Number(p.originalPrice) > Number(p.price) ? Math.round((1 - Number(p.price) / Number(p.originalPrice)) * 100) : 0
  const goProducts = (cat = '') => navigate(cat ? `/products?category=${encodeURIComponent(cat)}` : '/products')

  const nextWhy = () => setWhyIndex((i) => (i + 1) % Math.max(whyProducts.length, 1))
  const prevWhy = () => setWhyIndex((i) => (i - 1 + Math.max(whyProducts.length, 1)) % Math.max(whyProducts.length, 1))

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#2e0003]">
      {/* HERO — local public video, no image slider */}
      <section className="relative h-[78vh] min-h-[560px] overflow-hidden bg-[#190003]">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster="/logo.png">
          {VIDEO_CANDIDATES.map((src) => <source key={src} src={src} type="video/mp4" />)}
        </video>
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">
          <div className="max-w-2xl text-white">
            <div className="mb-6"><Logo className="h-14 w-auto object-contain object-left brightness-0 invert sm:h-16" /></div>
            <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[.3em] text-white/75"><Sparkles size={14} /> PURE INDIAN FLAVOUR</p>
            <h1 className="text-5xl font-semibold leading-[.96] tracking-tight sm:text-6xl md:text-8xl">Real taste,<br /><span className="text-[#eadcc6]">made simple.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">Explore spices, tea and everyday pantry essentials — organised by category so customers can reach the right product immediately.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2e0003]">Shop Products <ArrowRight size={17} /></button>
              <button onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })} className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur">Browse Categories</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[.35em] text-white/60">Scroll to explore</div>
      </section>

      {/* PRODUCTS FIRST — immediately after hero */}
      <section id="products" className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">Shop now</p>
            <h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Products first.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600">Your latest products are shown directly below the hero. Use the category buttons to jump into the right collection.</p>
          </div>
          <button onClick={() => goProducts()} className="inline-flex w-fit items-center gap-2 text-sm font-semibold hover:underline">View all products <ArrowRight size={16} /></button>
        </div>
        
        {/* ✅ Error Message Display */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-red-700 text-sm font-semibold">⚠️ Failed to load products: {error}</p>
            <p className="text-red-600 text-xs mt-1">Please refresh the page or check your connection.</p>
          </div>
        )}
        
        <div className="rounded-2xl border border-[#e1d8c9] bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full rounded-xl border border-[#ddd4c6] bg-[#faf8f4] py-3 pl-11 pr-10 text-sm outline-none focus:border-[#2e0003]" />{search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={17} /></button>}</div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="rounded-xl border border-[#ddd4c6] bg-[#faf8f4] px-4 py-3 text-sm"><option value="latest">Latest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select>
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${category === c ? 'bg-[#2e0003] text-white' : 'bg-[#f3eee6] text-[#5c4d4d] hover:bg-[#e8ddd0]'}`}>{c}</button>)}</div>
        </div>
        <div className="mt-8">
          {loading ? (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => <div key={i} className="h-[330px] animate-pulse rounded-2xl bg-white" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center">
              <p className="font-semibold">No products found</p>
              <button onClick={() => { setSearch(''); setCategory('All') }} className="mt-5 rounded-full bg-[#2e0003] px-5 py-2.5 text-sm font-semibold text-white">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {filtered.slice(0, 8).map((p) => { 
                const d = discount(p)
                const stock = Number(p.stock || 0)
                const wish = wishlist.some((i) => i._id === p._id)
                return (
                  <article key={p._id} className="group overflow-hidden rounded-2xl border border-[#e7ded1] bg-white transition hover:-translate-y-1 hover:shadow-lg">
                    <div onClick={() => navigate(`/product/${p._id}`)} className="relative h-48 cursor-pointer overflow-hidden bg-[#eee7da] sm:h-56">
                      <ProductImage product={p} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                      <button onClick={(e) => { e.stopPropagation(); toggleWishlist(p) }} className="absolute right-3 top-3 rounded-full bg-white/90 p-2">
                        <Heart size={17} className={wish ? 'fill-[#8b111b] text-[#8b111b]' : 'text-[#3d3333]'} />
                      </button>
                      {d > 0 && <span className="absolute bottom-3 left-3 rounded-full bg-[#2e0003] px-2.5 py-1 text-[10px] font-bold text-white">{d}% OFF</span>}
                      {stock === 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/45"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold">Out of Stock</span></div>}
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a6b6f]">{p.category || 'General'}</p>
                      <h3 onClick={() => navigate(`/product/${p._id}`)} className="mt-1 cursor-pointer truncate text-sm font-semibold sm:text-base">{p.name}</h3>
                      <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{p.description || 'Authentic flavour for your everyday kitchen.'}</p>
                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <span className="text-lg font-bold">₹{p.price}</span>
                          {Number(p.originalPrice) > Number(p.price) && <span className="ml-2 text-xs text-gray-400 line-through">₹{p.originalPrice}</span>}
                        </div>
                        <button onClick={() => addToCart(p)} disabled={stock === 0} className="rounded-full bg-[#2e0003] p-2.5 text-white disabled:bg-gray-300">
                          <ShoppingCart size={17} />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY COLLECTIONS */}
      <section id="categories" className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-10"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">Shop by category</p><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Everything in its place.</h2></div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {categories.filter((c) => c !== 'All').map((cat) => {
              const items = categoryProducts(cat)
              const meta = CATEGORY_META[cat] || { title: cat, text: `Explore all ${cat} products in one place.` }
              return <button key={cat} onClick={() => goProducts(cat)} className="group overflow-hidden rounded-3xl border border-[#e7ded1] bg-[#f8f4ed] text-left transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden bg-[#eee7da]">
                  {items[0] ? <ProductImage product={items[0]} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center"><Logo className="h-16 w-auto opacity-50" /></div>}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /><span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#2e0003]">{items.length || 0} products</span>
                </div>
                <div className="p-6"><div className="flex items-center justify-between"><h3 className="text-2xl font-semibold">{meta.title}</h3><ArrowRight size={20} className="transition group-hover:translate-x-1" /></div><p className="mt-3 text-sm leading-6 text-gray-600">{meta.text}</p></div>
              </button>
            })}
          </div>
        </div>
      </section>

      {/* CATEGORY PRODUCT ROWS */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        {categories.filter((c) => c !== 'All').slice(0, 6).map((cat) => { const items = categoryProducts(cat); if (!items.length) return null; return <div key={cat} className="mb-20 last:mb-0"><div className="mb-6 flex items-end justify-between"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-[#8b4b50]">{cat}</p><h3 className="mt-2 text-3xl font-semibold">{CATEGORY_META[cat]?.title || cat}</h3></div><button onClick={() => goProducts(cat)} className="text-sm font-semibold hover:underline">See all <ArrowRight size={15} className="ml-1 inline" /></button></div><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{items.map((p) => <article key={p._id} onClick={() => navigate(`/product/${p._id}`)} className="group cursor-pointer overflow-hidden rounded-2xl border border-[#e7ded1] bg-white"><div className="h-52 overflow-hidden bg-[#eee7da]"><ProductImage product={p} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="p-4"><p className="text-[10px] uppercase tracking-wider text-[#9a6b6f]">{cat}</p><h4 className="mt-1 truncate font-semibold">{p.name}</h4><p className="mt-2 font-bold">₹{p.price}</p></div></article>)}</div></div> })}
      </section>

      {/* WHY — spotlight carousel inspired by the referenced Scrolltide component */}
      <section className="overflow-hidden bg-[#2e0003] py-24 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#d8cfbc]">Why choose <span className="inline-flex align-middle"><Logo className="ml-1 h-5 w-auto brightness-0 invert" /></span></p><h2 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-6xl">A closer look at<br />what we care about.</h2></div><div className="flex gap-2"><button onClick={prevWhy} aria-label="Previous" className="rounded-full border border-white/20 p-3 transition hover:bg-white hover:text-[#2e0003]"><ChevronLeft size={19} /></button><button onClick={nextWhy} aria-label="Next" className="rounded-full border border-white/20 p-3 transition hover:bg-white hover:text-[#2e0003]"><ChevronRight size={19} /></button></div></div>
          {whyProducts.length ? <div className="relative mx-auto mt-14 h-[500px] max-w-6xl sm:h-[560px]">{whyProducts.map((p, i) => { const offset = i - whyIndex; const normalized = ((offset + whyProducts.length + Math.floor(whyProducts.length / 2)) % whyProducts.length) - Math.floor(whyProducts.length / 2); const active = normalized === 0; return <div key={p._id} className="absolute left-1/2 top-0 h-full w-[82%] max-w-[720px] overflow-hidden rounded-[2rem] border border-white/10 bg-black transition-all duration-700" style={{ transform: `translateX(-50%) translateX(${normalized * 34}%) scale(${active ? 1 : 0.82})`, opacity: Math.abs(normalized) > 2 ? 0 : active ? 1 : 0.38, zIndex: 20 - Math.abs(normalized) }}><ProductImage product={p} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" /><div className="relative flex h-full flex-col justify-end p-7 sm:p-10"><div className="mb-3 flex items-center gap-3"><span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[.2em]">{p.category || 'Desi Zaika'}</span><span className="text-xs text-white/60">{String(i + 1).padStart(2, '0')}</span></div><h3 className="max-w-xl text-3xl font-semibold sm:text-5xl">{p.name}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-white/75">{p.description || 'Carefully selected products for everyday Indian kitchens.'}</p></div></div> })}</div> : <div className="mt-14 rounded-3xl border border-white/10 p-12 text-center text-white/60">Add products with images from the admin panel to populate this spotlight.</div>}
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"><div className="grid gap-10 md:grid-cols-2 md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">The Desi Zaika way</p><div className="mt-5"><Logo className="h-16 w-auto" /></div><h2 className="mt-6 text-4xl font-semibold leading-tight sm:text-6xl">Good food starts<br /><span className="text-[#8b4b50]">with good flavour.</span></h2></div><p className="max-w-xl text-sm leading-8 text-gray-600 md:justify-self-end">A simple shopping experience built around categories, clear products and the flavours people reach for every day.</p></div></section>

      {/* STACKED STORY */}
      <section className="bg-[#f6f1e8] px-6 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><div className="mb-16 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">Scroll the story</p><div className="mt-5"><Logo className="h-10 w-auto" /></div><h2 className="mt-4 text-4xl font-semibold sm:text-6xl">A flavour story,<br /><span className="text-[#8b4b50]">one layer at a time.</span></h2></div><div className="space-y-10">{STORY.map((c, i) => <article key={c[0]} className="sticky overflow-hidden rounded-3xl border border-[#ddd2c3] bg-white shadow-2xl" style={{ top: `${82 + i * 12}px`, minHeight: '72vh' }}><div className="grid min-h-[72vh] md:grid-cols-2"><div className="relative min-h-[360px] bg-[#2e0003] md:min-h-full"><div className="absolute inset-0 flex items-center justify-center opacity-10"><Logo className="h-32 w-auto brightness-0 invert" /></div><span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold tracking-widest">{c[0]}</span></div><div className="flex flex-col justify-center p-8 sm:p-12 md:p-20"><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]"><Logo className="h-5 w-auto" /></p><h3 className="mt-5 max-w-lg text-3xl font-semibold leading-tight sm:text-5xl">{c[1]}</h3><p className="mt-7 max-w-lg text-sm leading-8 text-gray-600 sm:text-base">{c[2]}</p><div className="mt-10 h-px w-20 bg-[#2e0003]" /><p className="mt-5 text-xs uppercase tracking-[.2em] text-gray-400">Scroll to continue</p></div></div></article>)}</div></div></section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#d8cfbc] px-6 py-24 md:px-10 md:py-32"><div className="mx-auto flex max-w-6xl flex-col items-center text-center"><Logo className="h-20 w-auto" /><h2 className="mt-7 text-4xl font-semibold text-[#2e0003] sm:text-6xl">Bring the real taste home.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#5f5150]">Explore every category and discover your next kitchen essential.</p><button onClick={() => goProducts()} className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#2e0003] px-7 py-3.5 text-sm font-semibold text-white">Shop Now <ArrowRight size={17} /></button></div></section>
    </main>
  )
}
