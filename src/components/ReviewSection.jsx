import { useState } from 'react'
import { Star } from 'lucide-react'

export default function ReviewSection({ productId }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Excellent quality! Fresh and authentic spices. Highly recommended!',
      date: '2024-01-10'
    },
    {
      id: 2,
      name: 'Priya Singh',
      rating: 4,
      text: 'Good quality spices. Fast delivery. Will order again.',
      date: '2024-01-05'
    }
  ])

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    text: ''
  })

  const handleSubmitReview = (e) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split('T')[0]
    }
    setReviews([review, ...reviews])
    setNewReview({ name: '', rating: 5, text: '' })
    setShowReviewForm(false)
    alert('Thank you! Your review has been submitted.')
  }

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <div className="bg-white rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-[#2e0003] mb-8">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Rating Summary */}
        <div className="text-center">
          <div className="text-5xl font-bold text-[#2e0003] mb-2">{averageRating}</div>
          <div className="flex justify-center text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" className={i < Math.round(averageRating) ? '' : 'text-gray-300'} />
            ))}
          </div>
          <p className="text-gray-600">Based on {reviews.length} reviews</p>
        </div>

        {/* Add Review Button */}
        <div className="md:col-span-2">
          {!showReviewForm && (
            <button
              onClick={() => setShowReviewForm(true)}
              className="w-full bg-[#2e0003] text-[#D8cfbc] font-bold py-3 rounded-lg hover:bg-[#4a0a10]"
            >
              Write a Review
            </button>
          )}

          {showReviewForm && (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={newReview.name}
                  onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Rating</label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Excellent</option>
                  <option value="4">⭐⭐⭐⭐ 4 Stars - Good</option>
                  <option value="3">⭐⭐⭐ 3 Stars - Average</option>
                  <option value="2">⭐⭐ 2 Stars - Poor</option>
                  <option value="1">⭐ 1 Star - Bad</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Your Review</label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="flex-1 bg-[#2e0003] text-[#D8cfbc] font-bold py-2 rounded-lg hover:bg-[#4a0a10]">
                  Submit Review
                </button>
                <button type="button" onClick={() => setShowReviewForm(false)} className="flex-1 bg-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="border-t pt-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-800">{review.name}</h4>
                <p className="text-sm text-gray-600">{review.date}</p>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill={i < review.rating ? 'currentColor' : 'none'} className={i < review.rating ? '' : 'text-gray-300'} />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
