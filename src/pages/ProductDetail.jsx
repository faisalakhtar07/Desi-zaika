import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const addToCart = useCartStore((state) => state.addToCart);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Product not found');
      navigate('/shop');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert('Product added to cart!');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    alert(isInWishlist(product.id) ? 'Removed from wishlist' : 'Added to wishlist');
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  const discount = Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow p-6">
            <img
              src={product.image || 'https://via.placeholder.com/400'}
              alt={product.name}
              className="w-full h-96 object-cover rounded"
              onError={(e) => e.target.src = 'https://via.placeholder.com/400'}
            />
          </div>

          {/* Product Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <p className="text-sm text-gray-600">{product.category}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-3xl font-bold text-green-600">₹{product.sellingPrice}</span>
                <span className="text-lg text-gray-400 line-through">₹{product.mrp}</span>
                {discount > 0 && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-bold">
                    {discount}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Stock */}
            <div className="mb-6 pb-6 border-b">
              <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} items in stock` : 'Out of stock'}
              </p>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border rounded hover:bg-gray-200"
                >
                  −
                </button>
                <span className="text-xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`px-6 py-3 rounded-lg font-bold border-2 ${
                  isInWishlist(product.id)
                    ? 'bg-red-100 border-red-600 text-red-600'
                    : 'bg-white border-gray-300 text-gray-700'
                }`}
              >
                ❤️ Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t space-y-3">
              <div className="flex gap-2">
                <span>✓</span>
                <span>Free Shipping on orders above ₹500</span>
              </div>
              <div className="flex gap-2">
                <span>✓</span>
                <span>30 Days Return Policy</span>
              </div>
              <div className="flex gap-2">
                <span>✓</span>
                <span>100% Authentic Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
