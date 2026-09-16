import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import api from '../services/api'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const navigate = useNavigate()
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim()) {
      searchProducts()
    }
  }, [query])

  const searchProducts = async () => {
    setLoading(true)
    try {
      const res = await api.get(`/products/search?q=${query}`)
      setResults(res.data.products || [])
    } catch (err) {
      console.error('Search failed:', err)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0ebe0] p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-[#2e0003] mb-2">Search Results</h1>
          <p className="text-gray-600 mb-8">
            {loading ? 'Searching...' : `Found ${results.length} results for "${query}"`}
          </p>

          {loading ? (
            <p>Searching products...</p>
          ) : results.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-600 text-lg mb-4">No products found for "{query}"</p>
              <button onClick={() => navigate('/')} className="text-[#2e0003] hover:underline">
                Go back to home
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map(product => (
                <ProductCard key={product._id} product={product} onViewDetails={() => navigate(`/product/${product._id}`)} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
