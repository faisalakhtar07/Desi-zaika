import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Search, ShoppingCart, UserRound, Menu, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'
const LOGO = '/logo.png'
const HERO_VIDEO = '/hero.mp4'
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85'

const HERO_POSTER = 'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?auto=format&fit=crop&w=2200&q=90'

const CATEGORIES = [
  { name: 'Spices', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Tea', image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=700&q=85' },
  { name: 'Rice', image: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=700&q=85' },
  { name: 'Herbs', image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=700&q=85' },
  { name: 'Oils', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=85' },
  { name: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=85' },
]

const SPOTLIGHT = [
  {
    no: '01', title: 'Pure & Authentic',
    text: 'Carefully selected spices with natural colour, aroma and the familiar taste of an Indian kitchen.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=90',
  },
  {
    no: '02', title: 'Farm to Kitchen',
    text: 'A flavour journey that begins with quality ingredients and ends in the meals you make at home.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=90',
  },
  {
    no: '03', title: 'Made for Every Kitchen',
    text: 'Everyday essentials designed to make home cooking simple, flavourful and enjoyable.',
    image: 'https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=1200&q=90',
  },
  {
    no: '04', title: 'Health & Purity',
    text: 'A thoughtful collection for people who care about ingredients, flavour and what reaches their kitchen.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=90',
  },
]

const STORY = [
  { no: '01', title: 'From Nature', text: 'Every flavour begins with an ingredient. We celebrate the natural colours, textures and aromas that make Indian food special.', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=1100&q=90' },
  { no: '02', title: 'With Care', text: 'From whole spices to aromatic blends, every ingredient deserves care so its character can reach your kitchen.', image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=90' },
  { no: '03', title: 'To Your Kitchen', text: 'The final destination is simple: your kitchen, your recipes and the people around your table.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90' },
  { no: '04', title: 'For a Better You', text: 'Better ingredients help you make food you feel good about sharing every day.', image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=90' },
]

function Image({ src, alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false)
  return <img {...props} src={failed ? FALLBACK_IMAGE : src} alt={alt} onError={() => setFailed(true)} className={className} />
}

function Logo({ className = 'h-10 w-auto', dark = false }) {
  const [failed, setFailed] = useState(false)
  if (failed) return <div className={`${className} flex items-center font-serif text-xl font-semibold ${dark ? 'text-white' : 'text-[#2d0506]'}`}>Desi Zaika</div>
  return <img src={LOGO} alt="Desi Zaika" onError={() => setFailed(true)} className={`${className} object-contain`} />
}

function money(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`
}

function ProductCard({ product, onCart, onWishlist, wished, navigate }) {
  const stock = Number(product.stock ?? 0)
  const discount = product.discount ? Number(product.discount) : (Number(product.originalPrice) > Number(product.price) ? Math.round((1 - Number(product.price) / Number(product.originalPrice)) * 100) : 0)
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#e4d9c8] bg-[#fffdf8] shadow-[0_8px_30px_rgba(60,30,10,.05)]">
      <div className="relative h-52 cursor-pointer overflow-hidden sm:h-60" onClick={() => navigate(`/product/${product._id}`)}>
        <Image src={product.image || FALLBACK_IMAGE} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-[#7e1720] px-3 py-1 text-[10px] font-bold text-white">-{discount}%</span>}
        <button onClick={(e) => { e.stopPropagation(); onWishlist(product) }} className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-[#5b1419] shadow-sm backdrop-blur" aria-label="Wishlist">
          <Heart size={16} className={wished ? 'fill-current' : ''} />
        </button>
        {stock <= 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/45"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold">Out of Stock</span></div>}
      </div>
      <div className="p-4">
        <p className="text-[9px] font-bold uppercase tracking-[.2em] text-[#8a6b59]">{product.category || 'Spices'}</p>
        <h3 onClick={() => navigate(`/product/${product._id}`)} className="mt-1 cursor-pointer truncate font-semibold text-[#2e1715]">{product.name}</h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div><span className="font-bold text-[#2e1715]">{money(product.price)}</span>{Number(product.originalPrice) > Number(product.price) && <span className="ml-2 text-xs text-gray-400 line-through">{money(product.originalPrice)}</span>}</div>
          <button disabled={stock <= 0} onClick={() => onCart(product)} className="rounded-full bg-[#7e1720] p-2.5 text-white transition hover:bg-[#5e1017] disabled:bg-gray-300"><ShoppingCart size={16} /></button>
        </div>
      </div>
    </article>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [spotlight, setSpotlight] = useState(0)
  const [search, setSearch] = useState('')
  const [wishlist, setWishlist] = useState(() => { try { return JSON.parse(localStorage.getItem('wishlist') || '[]') } catch { return [] } })
  const [menu, setMenu] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    fetch(API_URL).then(r => r.json()).then(data => {
      const list = Array.isArray(data) ? data : (Array.isArray(data.products) ? data.products : (Array.isArray(data.data) ? data.data : []))
      setProducts(list)
    }).catch(console.error).finally(() => setLoading(false))
  }, [])

  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)) }, [wishlist])
  useEffect(() => {
    const timer = setInterval(() => setSpotlight(v => (v + 1) % SPOTLIGHT.length), 4200)
    return () => clearInterval(timer)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return products
    return products.filter(p => [p.name, p.category, p.description].some(v => String(v || '').toLowerCase().includes(q)))
  }, [products, search])

  const categoryProducts = (name) => products.filter(p => String(p.category || '').toLowerCase().trim() === name.toLowerCase())
  const bestSellers = filtered.slice(0, 5)

  const addToCart = (p) => {
    if (Number(p.stock ?? 0) <= 0) return
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const item = cart.find(x => x._id === p._id)
    if (item) item.quantity = Number(item.quantity || 0) + 1
    else cart.push({ ...p, quantity: 1 })
    localStorage.setItem('cart', JSON.stringify(cart))
    navigate('/cart')
  }

  const toggleWishlist = (p) => setWishlist(list => list.some(x => x._id === p._id) ? list.filter(x => x._id !== p._id) : [...list, p])
  const openCategory = (name) => navigate(`/products?category=${encodeURIComponent(name)}`)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f1e7] text-[#2d1715]">
      {/* NAVBAR */}
      <header className="absolute left-0 right-0 top-0 z-50 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-6">
          <Logo dark className="h-12 w-36 md:h-14 md:w-44" />
          <nav className="hidden items-center gap-7 text-xs font-medium md:flex">
            <a href="#home" className="hover:opacity-70">Home</a><button onClick={() => navigate('/products')} className="hover:opacity-70">Shop</button><a href="#categories" className="hover:opacity-70">Categories</a><a href="#story" className="hover:opacity-70">About</a><a href="#contact" className="hover:opacity-70">Contact</a>
          </nav>
          <div className="hidden items-center gap-4 md:flex"><button aria-label="Search" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}><Search size={18} /></button><button aria-label="Wishlist" onClick={() => navigate('/wishlist')}><Heart size={18} /></button><button aria-label="Cart" onClick={() => navigate('/cart')}><ShoppingCart size={18} /></button><button aria-label="Profile" onClick={() => navigate('/profile')}><UserRound size={18} /></button></div>
          <button onClick={() => setMenu(v => !v)} className="rounded-full bg-white/10 p-2 backdrop-blur md:hidden" aria-label="Menu">{menu ? <X /> : <Menu />}</button>
        </div>
        {menu && <div className="mx-4 rounded-2xl border border-white/20 bg-[#2d0809]/95 p-5 shadow-xl backdrop-blur md:hidden"><div className="grid gap-4 text-sm"><a href="#home" onClick={() => setMenu(false)}>Home</a><button className="text-left" onClick={() => navigate('/products')}>Shop</button><a href="#categories" onClick={() => setMenu(false)}>Categories</a><a href="#story" onClick={() => setMenu(false)}>About</a><a href="#contact" onClick={() => setMenu(false)}>Contact</a></div></div>}
      </header>

      {/* HERO VIDEO */}
      <section id="home" className="relative min-h-[650px] h-[92vh] overflow-hidden bg-[#180808]">
        <video ref={videoRef} autoPlay muted loop playsInline poster={HERO_POSTER} className="absolute inset-0 h-full w-full object-cover" src={HERO_VIDEO} />
        <div className="absolute inset-0 bg-black/45" /><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/15" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 pt-20 md:px-10">
          <div className="max-w-2xl text-white">
            <p className="mb-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.35em] text-white/75"><Sparkles size={13} /> Desi Zaika</p>
            <h1 className="font-serif text-5xl font-semibold leading-[.95] sm:text-6xl md:text-8xl">Authentic taste,<br /><span className="text-[#ead7bb]">made simple.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">Premium Indian spices made to bring warmth, aroma and real flavour to your everyday cooking.</p>
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#8e1c27] px-6 py-3.5 text-sm font-semibold text-white shadow-lg">Shop Now <ArrowRight size={17} /></button>
          </div>
        </div>
        <div className="absolute bottom-7 left-6 right-6 z-10 flex items-end justify-between text-white md:left-10 md:right-10"><div className="text-xs text-white/70">↓ &nbsp; Scroll to explore</div><div className="flex items-center gap-4 text-xs"><span>01</span><span className="text-white/40">02</span><span className="text-white/40">03</span><span className="text-white/40">04</span><span className="ml-3">Ⅱ</span></div></div>
      </section>

      {/* PRODUCTS FIRST */}
      <section id="products" className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#8a4c4c]">Featured Products</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Our Best Sellers</h2><p className="mt-3 max-w-xl text-sm text-[#6d5c55]">Handpicked spices and essentials, loved by homes across India.</p></div><button onClick={() => navigate('/products')} className="flex items-center gap-2 text-xs font-semibold">View All <ArrowRight size={15} /></button></div>
        <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#e2d5c5] bg-white/70 px-4 py-3"><Search size={17} className="text-[#856d65]" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search spices, tea, rice..." className="w-full bg-transparent text-sm outline-none" />{search && <button onClick={() => setSearch('')}><X size={16} /></button>}</div>
        {loading ? <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">{[1,2,3,4,5].map(x => <div key={x} className="h-80 animate-pulse rounded-2xl bg-white" />)}</div> : <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">{bestSellers.map(p => <ProductCard key={p._id} product={p} onCart={addToCart} onWishlist={toggleWishlist} wished={wishlist.some(x => x._id === p._id)} navigate={navigate} />)}</div>}
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="border-y border-[#e4d9c8] bg-[#f0e7da] py-16 md:py-20"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="flex items-end justify-between gap-5"><div><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#8a4c4c]">Shop by Category</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Explore Our Categories</h2><p className="mt-3 text-sm text-[#6d5c55]">Find exactly what you need, from authentic spices to pure oils and more.</p></div><button onClick={() => navigate('/products')} className="hidden items-center gap-2 text-xs font-semibold sm:flex">View All Categories <ArrowRight size={14} /></button></div><div className="mt-9 flex gap-5 overflow-x-auto pb-3 scrollbar-none">{CATEGORIES.map(c => <button key={c.name} onClick={() => openCategory(c.name)} className="group min-w-[92px] text-center"><div className="mx-auto h-20 w-20 overflow-hidden rounded-full border-4 border-[#f8f2e8] shadow-sm sm:h-24 sm:w-24"><Image src={c.image} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" /></div><span className="mt-3 block text-xs font-semibold">{c.name}</span></button>)}</div></div></section>

      {/* SPOTLIGHT CAROUSEL */}
      <section className="relative overflow-hidden bg-[#17100c] py-20 text-white md:py-28"><Image src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2200&q=80" alt="Spice background" className="absolute inset-0 h-full w-full object-cover opacity-25" /><div className="absolute inset-0 bg-[#120806]/65" /><div className="relative mx-auto max-w-7xl px-5 md:px-10"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#dcc9ad]">Why Choose Desi Zaika</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Pure. Authentic. Trusted.</h2><p className="mt-3 max-w-xl text-sm text-white/60">More than just spices — it is a promise of quality, tradition and real flavour.</p></div><div className="flex gap-2"><button onClick={() => setSpotlight(v => (v - 1 + SPOTLIGHT.length) % SPOTLIGHT.length)} className="rounded-full border border-white/30 p-2"><ChevronLeft size={17} /></button><button onClick={() => setSpotlight(v => (v + 1) % SPOTLIGHT.length)} className="rounded-full border border-white/30 p-2"><ChevronRight size={17} /></button></div></div>
        <div className="relative mt-12 h-[610px] overflow-visible sm:h-[560px]">{SPOTLIGHT.map((card, index) => { const offset = (index - spotlight + SPOTLIGHT.length) % SPOTLIGHT.length; const positions = [{ x: 0, scale: 1, opacity: 1, z: 30 }, { x: 24, scale: .91, opacity: .62, z: 20 }, { x: 48, scale: .82, opacity: .38, z: 10 }, { x: 72, scale: .73, opacity: .22, z: 5 }]; const pos = positions[offset]; return <article key={card.no} className="absolute left-1/2 top-1/2 h-[510px] w-[min(78vw,430px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[28px] border border-white/15 bg-[#f7f0e6] text-[#2d1715] shadow-2xl transition-all duration-700 ease-out" style={{ transform: `translate(calc(-50% + ${pos.x}px), -50%) scale(${pos.scale})`, opacity: pos.opacity, zIndex: pos.z }}><div className="h-[56%] overflow-hidden"><Image src={card.image} alt={card.title} className="h-full w-full object-cover" /></div><div className="flex h-[44%] flex-col justify-between p-6 sm:p-7"><div><span className="text-xs text-[#8a6b59]">{card.no}</span><h3 className="mt-2 font-serif text-3xl">{card.title}</h3><p className="mt-3 text-sm leading-6 text-[#6b5b54]">{card.text}</p></div><span className="text-xs font-semibold text-[#7e1720]">Learn More <ArrowRight className="ml-1 inline" size={13} /></span></div></article> })}</div><div className="mt-2 text-center text-xs text-white/50">{String(spotlight + 1).padStart(2, '0')} / 04</div>
      </div></section>

      {/* STORY */}
      <section id="story" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28"><div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:items-center"><div><p className="text-[10px] font-bold uppercase tracking-[.3em] text-[#8a4c4c]">Our Story</p><h2 className="mt-3 font-serif text-4xl leading-tight sm:text-6xl">The Story Behind<br />Every Spice</h2><p className="mt-5 max-w-md text-sm leading-7 text-[#6d5c55]">From fertile farms to your kitchen, we bring the character of ingredients and traditional flavour to everyday meals.</p><button onClick={() => document.getElementById('story-cards')?.scrollIntoView({ behavior: 'smooth' })} className="mt-7 rounded-full bg-[#7e1720] px-6 py-3 text-xs font-semibold text-white">Our Story <ArrowRight className="ml-2 inline" size={14} /></button></div><div id="story-cards" className="grid grid-cols-2 gap-3 sm:grid-cols-4">{STORY.map(card => <article key={card.no} className="group relative h-[360px] overflow-hidden rounded-xl"><Image src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" /><div className="absolute bottom-0 p-4 text-white sm:p-5"><span className="text-[10px]">{card.no}</span><h3 className="mt-1 font-serif text-xl sm:text-2xl">{card.title}</h3><p className="mt-2 hidden text-xs leading-5 text-white/70 sm:block">{card.text}</p></div></article>)}</div></div></section>

      {/* REAL TASTE HOME */}
      <section className="relative min-h-[520px] overflow-hidden"><Image src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=2200&q=90" alt="Indian food and spices" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-black/55" /><div className="relative mx-auto flex min-h-[520px] max-w-7xl items-center justify-between gap-8 px-6 text-white md:px-10"><div className="max-w-xl"><p className="text-[10px] font-bold uppercase tracking-[.3em] text-white/70">Desi Zaika</p><h2 className="mt-3 font-serif text-5xl leading-[.95] sm:text-6xl">Bringing Real Taste<br />Home</h2><p className="mt-5 text-sm leading-7 text-white/70">Traditional flavours. Modern convenience. Everything you need to make everyday food feel special.</p><button onClick={() => navigate('/products')} className="mt-7 rounded-full bg-[#8e1c27] px-6 py-3 text-xs font-semibold">Shop Now <ArrowRight className="ml-2 inline" size={14} /></button></div><Logo dark className="hidden h-24 w-48 md:block" /></div></section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#f7f1e7] px-5 py-12 md:px-10 md:py-16"><div className="mx-auto max-w-7xl"><div className="flex flex-col items-center justify-between gap-8 border-b border-[#ddd0bf] pb-10 md:flex-row"><Logo className="h-16 w-44" /><div className="flex flex-wrap justify-center gap-6 text-xs text-[#5d4b45]"><button onClick={() => navigate('/products')}>Shop</button><a href="#categories">Categories</a><a href="#story">About</a><a href="#contact">Contact</a></div><div className="flex gap-3 text-[#5d4b45]"><span>f</span><span>◎</span><span>▶</span><span>p</span></div></div><div className="flex flex-col justify-between gap-3 pt-6 text-[10px] text-[#85736b] sm:flex-row"><span>© 2026 Desi Zaika. All rights reserved.</span><div className="flex gap-5"><span>Privacy Policy</span><span>Terms & Conditions</span></div></div></div></footer>
    </main>
  )
}
