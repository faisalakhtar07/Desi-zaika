import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Privacy() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Privacy Policy</h1>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This includes your name, email address, phone number, and shipping address.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">2. How We Use Your Information</h2>
              <p>We use the information we collect to process your orders, send you transactional emails, respond to your inquiries, and improve our services.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">5. Cookies</h2>
              <p>Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">6. Your Rights</h2>
              <p>You have the right to access, update, or delete your personal information by contacting us at info@desizaika.com.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">7. Contact Us</h2>
              <p>If you have questions about this privacy policy, please contact us at: info@desizaika.com</p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-sm text-gray-600">Last updated: January 2024</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
