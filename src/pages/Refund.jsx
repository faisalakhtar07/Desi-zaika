import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Refund() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-8">Refund & Return Policy</h1>

          <div className="space-y-6 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">1. Refund Eligibility</h2>
              <p>Products can be returned within 7 days of delivery if they are unopened and in original condition. Damaged or expired products are eligible for return immediately.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">2. Return Process</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Contact our support team within 7 days of delivery</li>
                <li>Provide order number and reason for return</li>
                <li>Ship the product back to us (prepaid label provided)</li>
                <li>Refund processed within 5-7 business days of receipt</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">3. Non-Returnable Items</h2>
              <p>Products that have been opened, used, or damaged by the customer are not eligible for return.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">4. Refund Method</h2>
              <p>Refunds will be credited to the original payment method used for the purchase.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">5. Damaged Products</h2>
              <p>If your product arrives damaged, please contact us immediately with photos. We will replace the product or issue a full refund.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">6. Shipping Costs</h2>
              <p>Return shipping is free for defective or damaged products. For other returns, shipping costs may apply.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#2e0003] mb-3">7. Exchanges</h2>
              <p>If you wish to exchange a product for a different item, please initiate a return and place a new order.</p>
            </div>

            <div className="bg-blue-100 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-bold text-blue-900 mb-2">Contact Support</h3>
              <p>For refund or return inquiries, contact: support@desizaika.com or call +91 9876543210</p>
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
