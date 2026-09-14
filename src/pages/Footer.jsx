import { useNavigate } from 'react-router-dom'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

export default function Footer() {
  const navigate = useNavigate()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#2e0003] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Desi Zaika</h3>
            <p className="text-gray-300 text-sm">
              Premium Indian spices sourced directly from farmers. 100% pure, no additives, no preservatives.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => navigate('/')} className="hover:text-[#D8cfbc] transition">
                  Home
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#D8cfbc] transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@desizaika.com</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Desi Zaika. All rights reserved.</p>
          <p className="mt-2">Made with ❤️ in India</p>
        </div>
      </div>
    </footer>
  )
}
