import { useState } from 'react';
import axios from 'axios';

export default function CouponInput({ orderAmount, onCouponApply }) {
  const [couponCode, setCouponCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleApply = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/coupons/validate`, {
        code: couponCode,
        orderAmount
      });

      setMessage('Coupon applied!');
      onCouponApply(response.data);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid coupon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-50 rounded-lg p-4 mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter coupon code (e.g., SAVE20)"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          className="flex-1 border p-2 rounded"
        />
        <button
          onClick={handleApply}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {loading ? 'Checking...' : 'Apply'}
        </button>
      </div>
      {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
    </div>
  );
}
