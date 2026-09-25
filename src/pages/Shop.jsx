// Shop.jsx
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Filter } from 'lucide-react'
import { toast } from 'react-toastify'
import useProductStore from '../store/productStore'

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { products, getProducts, loading } = useProductStore()
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest'
  })
  const [page, setPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [filters, page])

  const loadProducts = async () => {
    try {
      const params = {
        ...filters,
        page,
        limit: 12
      }
      await getProducts(params)
    } catch (error) {
      toast.error('Failed to load products')
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
    setPage(1)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
    loadProducts()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSearch} className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium mb-2">Search</label>
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleFilterChange}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-3">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="number"
                    name="minPrice"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2">Sort By</label>
                <select
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 text-sm font-medium"
              >
                Apply Filters
              </button>
            </form>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setFilters({ search: '', category: '', minPrice: '', maxPrice: '', sort: 'newest' })
                setPage(1)
              }}
              className="w-full mt-4 text-orange-600 border border-orange-600 py-2 rounded hover:bg-orange-50 text-sm"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products */}
        <div className="lg:col-span-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden mb-6 flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded"
          >
            <Filter size={20} />
            <span>Show Filters</span>
          </button>

          {loading ? (
            <div className="text-center py-12">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">No products found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition"
                  >
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="p-3">
                      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-orange-600 font-bold text-sm">₹{product.sellingPrice}</span>
                          <span className="text-gray-400 line-through text-xs ml-1">₹{product.mrp}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">Page {page}</span>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={products.length < 12}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
