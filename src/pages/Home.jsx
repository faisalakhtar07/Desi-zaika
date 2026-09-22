import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Heart, Search, ShoppingCart, Sparkles, X } from 'lucide-react'

const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'

const SLIDES = [
  ['https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=2000&q=90','DESI ZAIKA','Authentic taste,','made simple.','Premium Indian spices made to bring warmth, aroma and real flavour to your everyday cooking.'],
  ['https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=2000&q=90','PURE FLAVOUR','Taste that feels','like home.','Carefully selected spices for everyday meals, family recipes and special occasions.'],
  ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=2000&q=90','INDIAN KITCHEN','A little spice,','a lot of flavour.','Bring colour, aroma and the character of Indian cooking into every plate.'],
  ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=2000&q=90','EVERYDAY ESSENTIALS','From our kitchen','to yours.','Simple ingredients, beautiful flavour and spices made for everyday cooking.'],
]

const WHY = [
  ['https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&q=90','01','Pure & Authentic','Carefully selected spices with natural colour, aroma and the familiar taste of an Indian kitchen.'],
  ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1200&q=90','02','Made for Every Kitchen','Everyday essentials designed to make home cooking simple, flavourful and enjoyable.'],
  ['https://images.unsplash.com/photo-1599909533730-f9d6b5c5f3a3?w=1200&q=90','03','Rich Aroma & Taste','Spices that add depth, warmth and character to curries, snacks, rice dishes and more.'],
]

const STORY = [
  ['https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=1600&q=90','01','The Heart of Indian Cooking','Spices are more than ingredients. They bring colour, aroma and personality to everyday food. Desi Zaika is built around that simple idea — good food starts with good flavour.'],
  ['https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1600&q=90','02','Selected for Everyday Meals','From a quick dal to a weekend biryani, the right spice can change the entire experience. Our collection is designed around the spices people actually reach for in their kitchens.'],
  ['https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=1600&q=90','03','Aroma You Notice','Good spices should make you notice the aroma before the first bite. Desi Zaika focuses on a warm and familiar flavour experience for everyday cooking.'],
  ['https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1600&q=90','04','From Simple Food to Special Moments','Food connects people. A family dinner, a festival, a Sunday lunch or a simple cup of tea — a little Desi Zaika can make ordinary moments feel special.'],
]

export default function Home() {
  const navigate = useNavigate()
  const [products,setProducts]=useState([]),[loading,setLoading]=useState(true),[slide,setSlide]=useState(0)
  const [search,setSearch]=useState(''),[category,setCategory]=useState('All'),[sortBy,setSortBy]=useState('latest')
  const [wishlist,setWishlist]=useState(()=>{try{return JSON.parse(localStorage.getItem('wishlist')||'[]')}catch{return []}})

  useEffect(()=>{fetch(API_URL).then(r=>r.json()).then(data=>setProducts(Array.isArray(data)?data:Array.isArray(data.products)?data.products:Array.isArray(data.data)?data.data:[])).catch(e=>console.error(e)).finally(()=>setLoading(false))},[])
  useEffect(()=>{const t=setInterval(()=>setSlide(s=>(s+1)%SLIDES.length),5000);return()=>clearInterval(t)},[])
  useEffect(()=>{localStorage.setItem('wishlist',JSON.stringify(wishlist))},[wishlist])

  const categories=useMemo(()=>['All',...new Set(products.map(p=>p.category).filter(Boolean))],[products])
  const filtered=useMemo(()=>{let r=[...products],q=search.trim().toLowerCase();if(q)r=r.filter(p=>[p.name,p.description,p.category].some(v=>String(v||'').toLowerCase().includes(q)));if(category!=='All')r=r.filter(p=>p.category===category);if(sortBy==='price-low')r.sort((a,b)=>Number(a.price||0)-Number(b.price||0));else if(sortBy==='price-high')r.sort((a,b)=>Number(b.price||0)-Number(a.price||0));else r.sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));return r},[products,search,category,sortBy])

  const addToCart=p=>{if(Number(p.stock)===0)return;const c=JSON.parse(localStorage.getItem('cart')||'[]'),x=c.find(i=>i._id===p._id);if(x)x.quantity=Number(x.quantity||0)+1;else c.push({...p,quantity:1});localStorage.setItem('cart',JSON.stringify(c));navigate('/cart')}
  const toggleWishlist=p=>setWishlist(c=>c.some(i=>i._id===p._id)?c.filter(i=>i._id!==p._id):[...c,p])
  const discount=p=>p.discount?Number(p.discount):p.originalPrice>p.price?Math.round((1-Number(p.price)/Number(p.originalPrice))*100):0
  const goProducts=()=>navigate('/products')

  return <main className="min-h-screen bg-[#f6f1e8] text-[#2e0003]">
    {/* CINEMATIC HERO */}
    <section className="relative h-[82vh] min-h-[600px] overflow-hidden bg-black">
      {SLIDES.map((s,i)=><div key={s[0]} className={`absolute inset-0 transition-opacity duration-[1200ms] ${i===slide?'opacity-100':'opacity-0'}`}>
        <img src={s[0]} alt={s[2]} className={`h-full w-full object-cover transition-transform duration-[6500ms] ${i===slide?'scale-105':'scale-100'}`}/>
        <div className="absolute inset-0 bg-black/45"/><div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"/>
      </div>)}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10"><div className="max-w-2xl text-white">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold tracking-[.3em] text-white/75"><Sparkles size={14}/>{SLIDES[slide][1]}</p>
        <h1 className="text-5xl font-semibold leading-[.96] tracking-tight sm:text-6xl md:text-8xl">{SLIDES[slide][2]}<br/><span className="text-[#eadcc6]">{SLIDES[slide][3]}</span></h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:text-base">{SLIDES[slide][4]}</p>
        <div className="mt-8 flex gap-3"><button onClick={()=>document.getElementById('collection')?.scrollIntoView({behavior:'smooth'})} className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2e0003]">Explore Spices <ArrowRight size={17}/></button><button onClick={goProducts} className="rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur">View All</button></div>
      </div></div>
      <button onClick={()=>setSlide(s=>(s-1+SLIDES.length)%SLIDES.length)} className="absolute left-4 top-1/2 z-20 rounded-full bg-black/20 p-3 text-white backdrop-blur"><ChevronLeft/></button>
      <button onClick={()=>setSlide(s=>(s+1)%SLIDES.length)} className="absolute right-4 top-1/2 z-20 rounded-full bg-black/20 p-3 text-white backdrop-blur"><ChevronRight/></button>
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">{SLIDES.map((s,i)=><button key={s[0]} onClick={()=>setSlide(i)} className={`h-1.5 rounded-full transition-all ${i===slide?'w-10 bg-white':'w-2 bg-white/40'}`}/>)}</div>
    </section>

    {/* BRAND INTRO */}
    <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"><div className="grid gap-10 md:grid-cols-2 md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">The Desi Zaika way</p><h2 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">Good food starts<br/><span className="text-[#8b4b50]">with good flavour.</span></h2></div><p className="max-w-xl text-sm leading-8 text-gray-600 md:justify-self-end">A minimal collection of familiar Indian spices made for everyday cooking. Explore the flavour, choose your favourites and bring a little more warmth to every plate.</p></div></section>

    {/* WHY */}
    <section className="bg-[#2e0003] py-24 text-white md:py-32"><div className="mx-auto max-w-7xl px-6 md:px-10"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#d8cfbc]">Why Choose Desi Zaika</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-6xl">Simple ingredients.<br/>Real flavour.</h2><div className="mt-14 grid gap-5 md:grid-cols-3">{WHY.map(c=><div key={c[1]} className="group relative min-h-[480px] overflow-hidden rounded-3xl"><img src={c[0]} alt={c[2]} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"/><div className="relative flex h-full flex-col justify-between p-7"><span className="text-sm text-white/60">{c[1]}</span><div><h3 className="text-2xl font-semibold">{c[2]}</h3><p className="mt-3 text-sm leading-7 text-white/75">{c[3]}</p></div></div></div>)}</div></div></section>

    {/* STACKED SCROLL STORY */}
    <section className="bg-[#f6f1e8] px-6 py-28 md:px-10 md:py-36"><div className="mx-auto max-w-7xl"><div className="mb-16 max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">Scroll the story</p><h2 className="mt-4 text-4xl font-semibold sm:text-6xl">A flavour story,<br/><span className="text-[#8b4b50]">one layer at a time.</span></h2></div><div className="space-y-10">{STORY.map((c,i)=><article key={c[1]} className="sticky overflow-hidden rounded-3xl border border-[#ddd2c3] bg-white shadow-2xl" style={{top:`${82+i*12}px`,minHeight:'72vh'}}><div className="grid min-h-[72vh] md:grid-cols-2"><div className="relative min-h-[360px] md:min-h-full"><img src={c[0]} alt={c[2]} className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-black/15"/><span className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-bold tracking-widest">{c[1]}</span></div><div className="flex flex-col justify-center p-8 sm:p-12 md:p-20"><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">DESI ZAIKA</p><h3 className="mt-5 max-w-lg text-3xl font-semibold leading-tight sm:text-5xl">{c[2]}</h3><p className="mt-7 max-w-lg text-sm leading-8 text-gray-600 sm:text-base">{c[3]}</p><div className="mt-10 h-px w-20 bg-[#2e0003]"/><p className="mt-5 text-xs uppercase tracking-[.2em] text-gray-400">Scroll to continue</p></div></div></article>)}</div></div></section>

    {/* PRODUCTS */}
    <section id="collection" className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32"><div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[.3em] text-[#8b4b50]">Our collection</p><h2 className="mt-3 text-4xl font-semibold sm:text-5xl">Everyday spices, elevated.</h2></div><button onClick={goProducts} className="inline-flex w-fit items-center gap-2 text-sm font-semibold hover:underline">View all <ArrowRight size={16}/></button></div>
      <div className="rounded-2xl border border-[#e1d8c9] bg-white p-4 shadow-sm"><div className="flex flex-col gap-3 md:flex-row"><div className="relative flex-1"><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search spices..." className="w-full rounded-xl border border-[#ddd4c6] bg-[#faf8f4] py-3 pl-11 pr-10 text-sm outline-none focus:border-[#2e0003]"/>{search&&<button onClick={()=>setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={17}/></button>}</div><select value={sortBy} onChange={e=>setSortBy(e.target.value)} className="rounded-xl border border-[#ddd4c6] bg-[#faf8f4] px-4 py-3 text-sm"><option value="latest">Latest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select></div><div className="mt-4 flex gap-2 overflow-x-auto pb-1">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold ${category===c?'bg-[#2e0003] text-white':'bg-[#f3eee6] text-[#5c4d4d]'}`}>{c}</button>)}</div></div>
      <div className="mt-10">{loading?<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{[1,2,3,4].map(i=><div key={i} className="h-[330px] animate-pulse rounded-2xl bg-white"/>)}</div>:filtered.length===0?<div className="rounded-2xl bg-white px-6 py-16 text-center"><p className="font-semibold">No products found</p><button onClick={()=>{setSearch('');setCategory('All')}} className="mt-5 rounded-full bg-[#2e0003] px-5 py-2.5 text-sm font-semibold text-white">Clear Filters</button></div>:<div className="grid grid-cols-2 gap-4 lg:grid-cols-4">{filtered.slice(0,8).map(p=>{const d=discount(p),stock=Number(p.stock||0),wish=wishlist.some(i=>i._id===p._id);return <article key={p._id} className="group overflow-hidden rounded-2xl border border-[#e7ded1] bg-white transition hover:-translate-y-1 hover:shadow-lg"><div onClick={()=>navigate(`/product/${p._id}`)} className="relative h-48 cursor-pointer overflow-hidden bg-[#eee7da] sm:h-56"><img src={p.image||'https://images.unsplash.com/photo-1596040447447-9e8e13e7a0e2?w=700&q=80'} alt={p.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105"/><button onClick={e=>{e.stopPropagation();toggleWishlist(p)}} className="absolute right-3 top-3 rounded-full bg-white/90 p-2"><Heart size={17} className={wish?'fill-[#8b111b] text-[#8b111b]':'text-[#3d3333]'}/></button>{d>0&&<span className="absolute bottom-3 left-3 rounded-full bg-[#2e0003] px-2.5 py-1 text-[10px] font-bold text-white">{d}% OFF</span>}{stock===0&&<div className="absolute inset-0 flex items-center justify-center bg-black/45"><span className="rounded-full bg-white px-4 py-2 text-xs font-bold">Out of Stock</span></div>}</div><div className="p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-[#9a6b6f]">{p.category||'Spices'}</p><h3 onClick={()=>navigate(`/product/${p._id}`)} className="mt-1 cursor-pointer truncate text-sm font-semibold sm:text-base">{p.name}</h3><p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{p.description||'Authentic flavour for your everyday kitchen.'}</p><div className="mt-4 flex items-end justify-between"><div><span className="text-lg font-bold">₹{p.price}</span>{Number(p.originalPrice)>Number(p.price)&&<span className="ml-2 text-xs text-gray-400 line-through">₹{p.originalPrice}</span>}</div><button onClick={()=>addToCart(p)} disabled={stock===0} className="rounded-full bg-[#2e0003] p-2.5 text-white disabled:bg-gray-300"><ShoppingCart size={17}/></button></div></div></article>})}</div>}</div>
      {filtered.length>8&&<div className="mt-10 text-center"><button onClick={goProducts} className="rounded-full border border-[#2e0003] px-6 py-3 text-sm font-semibold">View all products</button></div>}
    </section>

    {/* FINAL IMAGE CTA */}
    <section className="relative min-h-[600px] overflow-hidden"><img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=2000&q=90" alt="Desi Zaika spices" className="absolute inset-0 h-full w-full object-cover"/><div className="absolute inset-0 bg-black/55"/><div className="relative flex min-h-[600px] items-center justify-center px-6 text-center text-white"><div><p className="text-xs font-bold uppercase tracking-[.35em] text-white/70">DESI ZAIKA</p><h2 className="mt-5 text-5xl font-semibold sm:text-7xl">Bring the real<br/><span className="text-[#eadcc6]">taste home.</span></h2><button onClick={goProducts} className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#2e0003]">Shop Now <ArrowRight size={17}/></button></div></div></section>
  </main>
}
