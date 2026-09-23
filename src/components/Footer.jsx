import { useNavigate } from 'react-router-dom'
import {
  Facebook,
  Twitter,
  Instagram,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { useState } from 'react'

const LOGO = '/logo-maskable.png'

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  const [email, setEmail] = useState('')

  const goTo = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()

    if (!email.trim()) return

    alert('Thank you for subscribing to Desi Zaika!')
    setEmail('')
  }

  return (
    <footer className="mt-16 bg-[#2e0003] text-white">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div>
            <button
              onClick={() => goTo('/')}
              className="group flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white p-1.5">
                <img
                  src={LOGO}
                  alt="Desi Zaika"
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = '/logo-512.png'
                  }}
                />
              </span>

              <span className="text-xl font-semibold tracking-tight">
                Desi Zaika
              </span>
            </button>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              Premium Indian spices delivered fresh to your doorstep.
              Authentic flavours, carefully sourced for your everyday kitchen.
            </p>

            {/* Social */}
            <div className="mt-7 flex gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8cfbc] hover:bg-[#d8cfbc] hover:text-[#2e0003]"
              >
                <Facebook size={17} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8cfbc] hover:bg-[#d8cfbc] hover:text-[#2e0003]"
              >
                <Twitter size={17} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:border-[#d8cfbc] hover:bg-[#d8cfbc] hover:text-[#2e0003]"
              >
                <Instagram size={17} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8cfbc]">
              Shop
            </h3>

            <div className="space-y-3 text-sm text-white/60">

              <button
                onClick={() => goTo('/')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Home
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/products')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Shop Spices
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/cart')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Cart
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/wishlist')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Wishlist
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/orders')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                My Orders
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8cfbc]">
              Company
            </h3>

            <div className="space-y-3 text-sm text-white/60">

              <button
                onClick={() => goTo('/about')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                About Us
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/contact')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Contact Us
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/privacy')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Privacy Policy
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

              <button
                onClick={() => goTo('/terms')}
                className="group flex items-center gap-1 transition hover:text-white"
              >
                Terms & Conditions
                <ArrowUpRight
                  size={13}
                  className="opacity-0 transition group-hover:opacity-100"
                />
              </button>

            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#d8cfbc]">
              Support
            </h3>

            <div className="space-y-4 text-sm text-white/60">

              <a
                href="mailto:support@desizaika.com"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Mail size={16} />
                support@desizaika.com
              </a>

              <a
                href="tel:+919155134926"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <Phone size={16} />
                +91 9155134926
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>
                  India
                </span>
              </div>

              <button
                onClick={() => goTo('/contact')}
                className="mt-3 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition hover:border-[#d8cfbc] hover:bg-[#d8cfbc] hover:text-[#2e0003]"
              >
                Contact Support
              </button>

            </div>
          </div>

        </div>

        {/* Newsletter */}
        <div className="mt-14 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 md:p-8">

          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#d8cfbc]">
                Stay in the loop
              </p>

              <h3 className="mt-2 text-2xl font-semibold">
                Get fresh updates from Desi Zaika.
              </h3>

              <p className="mt-2 text-sm text-white/50">
                New products, special offers and delicious updates.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full max-w-md gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#d8cfbc]"
              />

              <button
                type="submit"
                className="rounded-full bg-[#d8cfbc] px-5 py-3 text-sm font-semibold text-[#2e0003] transition hover:scale-[1.02]"
              >
                Subscribe
              </button>
            </form>

          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-white/40 md:flex-row md:items-center md:justify-between">

          <p>
            © {currentYear} Desi Zaika. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-5">
            <button
              onClick={() => goTo('/privacy')}
              className="transition hover:text-white"
            >
              Privacy
            </button>

            <button
              onClick={() => goTo('/terms')}
              className="transition hover:text-white"
            >
              Terms
            </button>

            <button
              onClick={() => goTo('/refund')}
              className="transition hover:text-white"
            >
              Returns & Refunds
            </button>
          </div>

          <div className="flex items-center gap-4">
            <span>Secure Payments</span>
            <span>UPI</span>
            <span>Card</span>
          </div>

        </div>

      </div>
    </footer>
  )
}