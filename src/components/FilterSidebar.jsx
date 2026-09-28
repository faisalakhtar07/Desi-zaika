import { useState } from 'react';

export default function FilterSidebar({ onFilter }) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const handleFilter = () => {
    onFilter({ priceRange, category: selectedCategory, sort: sortBy });
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
      <h3 className="text-xl font-bold mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          className="w-full"
        />
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Category</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full border p-2 rounded">
          <option value="all">All Categories</option>
          <option value="spices">Spices</option>
          <option value="masala">Masala</option>
          <option value="rice">Rice</option>
        </select>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <label className="block font-semibold mb-2">Sort By</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border p-2 rounded">
          <option value="popularity">Popularity</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <button onClick={handleFilter} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Apply Filters
      </button>
    </div>
  );
}
