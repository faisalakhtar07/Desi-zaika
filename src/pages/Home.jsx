import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useProductStore from '../store/productStore'
import { ShoppingCart, Heart } from 'lucide-react'

export default function Home() {
  const { featured, bestSellers, getFeatured, getBestSellers } = useProductStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([getFeatured(), getBestSellers()])
      } catch (error) {
        console.error('Failed to load products')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Desi Zaika</h1>
          <p className="text-xl mb-8">Authentic Indian spices for your kitchen</p>
          <Link to="/shop" className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
                <img src={product.mainImage} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="font-semibold truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.weight}</p>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-orange-600 font-bold">₹{product.sellingPrice}</span>
                      <span className="text-gray-400 line-through text-sm ml-2">₹{product.mrp}</span>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 inline-block text-center">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bestsellers */}
      <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
        <h2 className="text-3xl font-bold mb-8">Bestsellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition">
              <img src={product.mainImage} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.weight}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-orange-600 font-bold">₹{product.sellingPrice}</span>
                </div>
                <Link to={`/product/${product.id}`} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 inline-block text-center">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
