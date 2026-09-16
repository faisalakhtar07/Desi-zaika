import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Terms & Conditions</h1>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">1. Terms of Use</h2>
              <p>By accessing and using Desi Zaika website and services, you accept and agree to be bound by these terms and conditions.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">2. Intellectual Property</h2>
              <p>All content on Desi Zaika website, including text, graphics, logos, and images, is the property of Desi Zaika and protected by copyright laws.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">3. Product Information</h2>
              <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, or error-free.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">4. User Accounts</h2>
              <p>You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">5. Orders & Purchase</h2>
              <p>All orders are subject to acceptance and confirmation. Desi Zaika reserves the right to refuse or cancel any order.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">6. Limitation of Liability</h2>
              <p>In no event shall Desi Zaika be liable for any indirect, incidental, special, or consequential damages arising from your use of the website.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">7. Governing Law</h2>
              <p>These terms and conditions are governed by and construed in accordance with the laws of India.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">8. Changes to Terms</h2>
              <p>Desi Zaika reserves the right to modify these terms and conditions at any time. Your continued use of the website constitutes acceptance of any modifications.</p>
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
