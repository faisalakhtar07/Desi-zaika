import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function About() {
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0]">
        {/* Hero Section */}
        <div className="bg-[#2e0003] text-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Desi Zaika</h1>
            <p className="text-lg text-[#D8cfbc]">Premium Indian Spices & Natural Products</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Our Story */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#2e0003] mb-4">Our Story</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Desi Zaika was founded with a simple mission: to bring authentic, premium Indian spices to your kitchen. 
              We believe that the true essence of Indian cuisine lies in the quality of spices used.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Starting from humble beginnings, we've grown to become a trusted name in premium spices. 
              Our commitment to quality, purity, and customer satisfaction remains unchanged.
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-3xl font-bold text-[#2e0003] mb-6">Why Choose Desi Zaika?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#2e0003] mb-2">✨ Premium Quality</h3>
                <p className="text-gray-700">Sourced directly from farmers in India's fertile valleys. We ensure every spice meets our strict quality standards.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2e0003] mb-2">🌿 100% Natural</h3>
                <p className="text-gray-700">No additives, no preservatives, no fillers. Just pure, natural spices as nature intended.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2e0003] mb-2">🚚 Fast Delivery</h3>
                <p className="text-gray-700">Quick and reliable shipping across India. We ensure your spices reach you fresh and intact.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2e0003] mb-2">💯 Guaranteed Freshness</h3>
                <p className="text-gray-700">Fresh inventory, proper storage, and quick turnover ensure you get the freshest spices.</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#2e0003] mb-4">Our Mission</h2>
              <p className="text-gray-700">To provide the finest, most authentic Indian spices to people worldwide, maintaining the highest standards of quality and purity.</p>
            </div>
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-[#2e0003] mb-4">Our Vision</h2>
              <p className="text-gray-700">To become the most trusted brand for premium Indian spices globally, while supporting sustainable farming practices.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-[#2e0003] text-white rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Experience Authentic Flavor</h3>
            <p className="mb-6">Explore our collection of premium spices and transform your cooking.</p>
            <button
              onClick={() => navigate('/')}
              className="bg-[#D8cfbc] text-[#2e0003] px-8 py-3 rounded-lg font-bold hover:bg-white"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
