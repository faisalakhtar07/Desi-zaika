import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../store/authStore';

export default function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state) => state.token);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!token) {
      alert('Please login to submit a review');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/reviews`, {
        productId, rating, title, comment
      }, { headers: { Authorization: `Bearer ${token}` } });

      alert('Review submitted for approval!');
      setTitle('');
      setComment('');
      setRating(5);
      onReviewAdded?.();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Write a Review</h3>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border p-2 rounded mb-4"
      />

      <textarea
        placeholder="Your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={4}
        className="w-full border p-2 rounded mb-4"
      />

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
