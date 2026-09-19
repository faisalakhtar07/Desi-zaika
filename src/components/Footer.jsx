import { useNavigate } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2e0003] text-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#D8cfbc]">
              🌶️ Desi Zaika
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Premium Indian spices delivered fresh to your doorstep. Authentic flavors, 
              authentic quality.
            </p>
            <div className="flex gap-4">
              <button className="text-gray-300 hover:text-[#D8cfbc] transition">
                <Facebook size={20} />
              </button>
              <button className="text-gray-300 hover:text-[#D8cfbc] transition">
                <Twitter size={20} />
              </button>
              <button className="text-gray-300 hover:text-[#D8cfbc] transition">
                <Instagram size={20} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button 
                  onClick={() => navigate('/')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/cart')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Cart
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/orders')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a 
                  href="mailto:support@desizaika.com" 
                  className="hover:text-[#D8cfbc] transition"
                >
                  Email Support
                </a>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/contact')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/about')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/refund')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Shipping Info
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button 
                  onClick={() => navigate('/privacy')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/refund')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Return Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/refund')}
                  className="hover:text-[#D8cfbc] transition cursor-pointer"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-[#4a0a10] rounded-lg p-6 mb-8">
          <h3 className="text-lg font-bold text-white mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Get exclusive offers and updates on new spices!
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D8cfbc]"
            />
            <button className="bg-[#D8cfbc] text-[#2e0003] px-6 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {currentYear} Desi Zaika. All rights reserved.
            </div>

            {/* Trust Badges */}
            <div className="text-sm text-gray-300 text-center flex justify-center gap-6">
              <span>✓ 100% Natural</span>
              <span>✓ Free Shipping</span>
              <span>✓ Money Back</span>
            </div>

            {/* Payment Methods */}
            <div className="text-sm text-gray-300 text-right flex justify-end gap-2">
              <span>Secure Payments:</span>
              <span>💳 Card</span>
              <span>📱 UPI</span>
              <span>🏦 Bank</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}