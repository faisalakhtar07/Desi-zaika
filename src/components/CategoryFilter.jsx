import { ChevronDown } from 'lucide-react'

export default function CategoryFilter({ filters, setFilters }) {
  const handlePriceChange = (e) => {
    const [min, max] = e.target.value.split('-').map(Number)
    setFilters(prev => ({ ...prev, priceRange: [min, max] }))
  }

  return (
    <div className="bg-white rounded-2xl p-6 h-fit md:sticky md:top-4">
      <h3 className="text-xl font-bold text-[#2e0003] mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6 pb-6 border-b">
        <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
        <select
          onChange={handlePriceChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="0-1000">₹0 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
          <option value="0-10000">All Prices</option>
        </select>
      </div>

      {/* Rating */}
      <div className="mb-6 pb-6 border-b">
        <h4 className="font-semibold text-gray-700 mb-3">Rating</h4>
        {[5, 4, 3, 2].map(rating => (
          <label key={rating} className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={rating}
              onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700">★★★★★ {rating} Stars & Up</span>
          </label>
        ))}
      </div>

      {/* Sort By */}
      <div>
        <h4 className="font-semibold text-gray-700 mb-3">Sort By</h4>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  )
}
