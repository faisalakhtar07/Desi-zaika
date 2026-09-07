function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-cream-400">🌶️ Desi Zaika</h3>
            <p className="text-gray-400 text-sm">
              Premium Indian spices delivered fresh to your doorstep with quality assurance.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-cream-400 transition">Home</a></li>
              <li><a href="/cart" className="hover:text-cream-400 transition">Cart</a></li>
              <li><a href="/orders" className="hover:text-cream-400 transition">Orders</a></li>
              <li><a href="/profile" className="hover:text-cream-400 transition">Profile</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cream-400 transition">Contact</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">Shipping</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-cream-400 transition">Privacy</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">Terms</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">Returns</a></li>
              <li><a href="#" className="hover:text-cream-400 transition">Refunds</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">© 2024 Desi Zaika. All rights reserved.</p>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>✓ 100% Natural</span>
              <span>✓ Free Shipping</span>
              <span>✓ Money Back</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
