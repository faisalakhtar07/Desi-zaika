import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Heart, User, Search, ChevronDown } from 'lucide-react'

const LOGO = '/logo-maskable.png'
const LOGO_FALLBACK = '/logo-512.png'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [user, setUser] = useState(() => localStorage.getItem('user'))
  const [cartCount, setCartCount] = useState(0)
  const [wishCount, setWishCount] = useState(0)
  const [profileOpen, setProfileOpen] = useState(false)

  const refreshCounts = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
      setCartCount(cart.reduce((sum, item) => sum + Number(item.quantity || 1), 0))
      setWishCount(wishlist.length)
      setUser(localStorage.getItem('user'))
    } catch {
      setCartCount(0)
      setWishCount(0)
    }
  }

  useEffect(() => {
    refreshCounts()
    const onStorage = () => refreshCounts()
    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', onStorage)
    }
  }, [location.pathname])

  useEffect(() => {
    setIsOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const navItems = useMemo(() => [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ], [])

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const go = (path) => {
    setIsOpen(false)
    setSearchOpen(false)
    setProfileOpen(false)
    navigate(path)
  }

  const submitSearch = (e) => {
    e.preventDefault()
    const value = search.trim()
    if (!value) {
      go('/products')
      return
    }
    go(`/products?search=${encodeURIComponent(value)}`)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
    setProfileOpen(false)
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <nav className="sticky top-0 z-[100] border-b border-[#eadfd1] bg-[#fffdf8]/95 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="flex h-[68px] items-center justify-between gap-4">

          <button onClick={() => go('/')} className="flex shrink-0 items-center gap-2.5 text-left">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white p-1 shadow-sm ring-1 ring-[#eadfd1]">
              <img
                src={LOGO}
                alt="Desi Zaika logo"
                onError={(e) => { e.currentTarget.src = LOGO_FALLBACK }}
                className="h-full w-full object-contain"
              />
            </span>
            <span className="font-serif text-[21px] font-semibold tracking-tight text-[#2e0003] sm:text-[23px]">
              Desi Zaika
            </span>
          </button>

          <div className="hidden items-center gap-1 rounded-full bg-[#f5eee5] p-1 md:flex">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => go(item.path)}
                className={`rounded-full px-4 py-2 text-xs font-medium transition ${
                  isActive(item.path)
                    ? 'bg-white text-[#2e0003] shadow-sm'
                    : 'text-[#705f58] hover:text-[#2e0003]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-1 sm:flex">
            <button
              onClick={() => setSearchOpen((v) => !v)}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full transition ${searchOpen ? 'bg-[#f1e7dc] text-[#2e0003]' : 'text-[#5f504b] hover:bg-[#f6efe7]'}`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button onClick={() => go('/wishlist')} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5f504b] transition hover:bg-[#f6efe7]" aria-label="Wishlist">
              <Heart size={18} />
              {wishCount > 0 && <Badge value={wishCount} />}
            </button>

            <button onClick={() => go('/cart')} className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#5f504b] transition hover:bg-[#f6efe7]" aria-label="Cart">
              <ShoppingBag size={18} />
              {cartCount > 0 && <Badge value={cartCount} />}
            </button>

            {user ? (
              <div className="relative ml-1">
                <button onClick={() => setProfileOpen((v) => !v)} className="flex h-10 items-center gap-1.5 rounded-full border border-[#e7dbcd] bg-white px-3 text-[#2e0003] transition hover:border-[#cdb8a4]">
                  <User size={16} />
                  <ChevronDown size={13} className={`transition ${profileOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 top-12 w-44 overflow-hidden rounded-2xl border border-[#eadfd1] bg-white p-1.5 shadow-[0_18px_50px_rgba(45,23,21,.14)]">
                    <button onClick={() => go('/profile')} className="w-full rounded-xl px-3 py-2.5 text-left text-xs text-[#4e403b] hover:bg-[#f7f0e8]">Profile</button>
                    <button onClick={() => go('/orders')} className="w-full rounded-xl px-3 py-2.5 text-left text-xs text-[#4e403b] hover:bg-[#f7f0e8]">My Orders</button>
                    <button onClick={logout} className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium text-[#8e1c27] hover:bg-[#fff0f0]">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={() => go('/login')} className="ml-1 rounded-full bg-[#2e0003] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4a0a10]">
                Login
              </button>
            )}
          </div>

          <button onClick={() => setIsOpen((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7dbcd] text-[#2e0003] sm:hidden" aria-label="Menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="hidden border-t border-[#eee4d8] py-3 sm:block">
            <div className="mx-auto flex max-w-2xl items-center gap-3 rounded-full border border-[#e1d4c5] bg-white px-4 py-2.5">
              <Search size={16} className="text-[#8a7469]" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} autoFocus placeholder="Search spices, tea, rice..." className="w-full bg-transparent text-sm outline-none" />
              <button type="submit" className="rounded-full bg-[#2e0003] px-4 py-2 text-xs font-semibold text-white">Search</button>
            </div>
          </form>
        )}

        {isOpen && (
          <div className="border-t border-[#eee4d8] py-4 sm:hidden">
            <div className="space-y-1">
              {navItems.map((item) => (
                <button key={item.path} onClick={() => go(item.path)} className={`block w-full rounded-xl px-4 py-3 text-left text-sm ${isActive(item.path) ? 'bg-[#f5eee5] font-semibold text-[#2e0003]' : 'text-[#5f504b]'}`}>
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              <button onClick={() => go('/wishlist')} className="flex items-center justify-center gap-2 rounded-xl border border-[#eadfd1] py-3 text-xs text-[#4e403b]">
                <Heart size={16} /> Wishlist {wishCount > 0 && `(${wishCount})`}
              </button>
              <button onClick={() => go('/cart')} className="flex items-center justify-center gap-2 rounded-xl border border-[#eadfd1] py-3 text-xs text-[#4e403b]">
                <ShoppingBag size={16} /> Cart {cartCount > 0 && `(${cartCount})`}
              </button>
              <button onClick={() => go(user ? '/profile' : '/login')} className="flex items-center justify-center gap-2 rounded-xl border border-[#eadfd1] py-3 text-xs text-[#4e403b]">
                <User size={16} /> {user ? 'Profile' : 'Login'}
              </button>
            </div>

            {user ? (
              <button onClick={logout} className="mt-2 w-full rounded-xl bg-[#fff0f0] py-3 text-xs font-semibold text-[#8e1c27]">Logout</button>
            ) : (
              <button onClick={() => go('/signup')} className="mt-2 w-full rounded-xl bg-[#2e0003] py-3 text-xs font-semibold text-white">Create Account</button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

function Badge({ value }) {
  return (
    <span className="absolute -right-0.5 -top-0.5 flex min-h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#8e1c27] px-1 text-[8px] font-bold text-white">
      {value > 99 ? '99+' : value}
    </span>
  )
}
