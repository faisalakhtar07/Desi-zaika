import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from '../store/productStore'
import { useAuthStore } from '../store/authStore'
import ProductCard from '../components/ProductCard'
import api from '../services/api'

function Home() {
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const { products, setProducts, setLoading, loading } = useProductStore()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await api.get('/products')
      setProducts(response.data.products || [])
    } catch (error) {
      console.log('Error fetching products:', error)
      // Mock data for demo
      const mockProducts = [
        {
          _id: '1',
          name: 'Kashmiri Red Chilli',
          description: 'Premium quality hand-picked chillies',
          price: 299,
          originalPrice: 399,
          ratings: 4.8,
          reviews: 120,
          stock: 50,
          image: null
        },
        {
          _id: '2',
          name: 'Black Pepper Powder',
          description: 'Pure black pepper with aromatic flavor',
          price: 349,
          ratings: 4.9,
          reviews: 89,
          stock: 30,
          image: null
        },
        {
          _id: '3',
          name: 'Cumin Seeds Organic',
          description: 'Organic cumin seeds with authentic flavor',
          price: 199,
          originalPrice: 249,
          ratings: 4.7,
          reviews: 156,
          stock: 100,
          image: null
        },
        {
          _id: '4',
          name: 'Turmeric Powder',
          description: 'Pure turmeric with health benefits',
          price: 249,
          ratings: 4.8,
          reviews: 201,
          stock: 75,
          image: null
        }
      ]
      setProducts(mockProducts)
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {!token && (
        <>
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-burgundy-900 via-burgundy-800 to-burgundy-700 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Premium Indian Spices</h1>
              <p className="text-xl text-burgundy-100 mb-8">
                Authentic flavors from India, delivered to your doorstep
              </p>
              <button
                onClick={() => navigate('/login')}
                className="bg-cream-400 text-burgundy-900 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white transition"
              >
                Start Shopping 🛒
              </button>
            </div>
          </section>
        </>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {searchTerm ? `Search Results: "${searchTerm}"` : 'Featured Products'}
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search spices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-900"
            />
            <button className="bg-burgundy-900 text-white px-6 py-2 rounded-lg hover:bg-burgundy-800 transition font-semibold">
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filtered.length > 0 ? (
                filtered.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-600 text-lg">No products found</p>
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="bg-white rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-2">✓</div>
                <h3 className="font-bold text-gray-900 mb-2">100% Natural</h3>
                <p className="text-gray-600 text-sm">No artificial additives or preservatives</p>
              </div>
              <div>
                <div className="text-4xl mb-2">🚚</div>
                <h3 className="font-bold text-gray-900 mb-2">Free Shipping</h3>
                <p className="text-gray-600 text-sm">On all orders across India</p>
              </div>
              <div>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="font-bold text-gray-900 mb-2">Money Back</h3>
                <p className="text-gray-600 text-sm">30-day satisfaction guarantee</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
