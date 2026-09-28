import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReviewsPage({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
      setReviews(response.data.reviews);
      setAvgRating(response.data.avgRating);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  let filteredReviews = reviews;
  if (filter !== 'all') {
    filteredReviews = reviews.filter(r => r.rating.toString() === filter);
  }

  if (sortBy === 'helpful') {
    filteredReviews.sort((a, b) => b.helpful - a.helpful);
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-yellow-500">{avgRating}</div>
            <div className="text-gray-600">out of 5</div>
            <div className="text-sm text-gray-500">{reviews.length} reviews</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ 5 Star</option>
          <option value="4">⭐⭐⭐⭐ 4 Star</option>
          <option value="3">⭐⭐⭐ 3 Star</option>
          <option value="2">⭐⭐ 2 Star</option>
          <option value="1">⭐ 1 Star</option>
        </select>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {filteredReviews.map(review => (
          <div key={review._id} className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-400">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="font-bold">{review.title}</div>
                <div className="text-sm text-gray-600">{review.userId.name}</div>
              </div>
              <div className="text-yellow-500">{'⭐'.repeat(review.rating)}</div>
            </div>
            <p className="text-gray-700 mb-3">{review.comment}</p>
            <div className="flex gap-4 text-sm">
              <button className="text-blue-600 hover:underline">Helpful ({review.helpful})</button>
              <span className="text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
