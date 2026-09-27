import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import Notifications from './Notifications';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { cart } = useCartStore();
  const cartCount = cart?.items?.length || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600">
          🌶️ Desi Zaika
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/shop" className="hover:text-red-600">
            Shop
          </Link>
          <Link to="/wishlist" className="hover:text-red-600">
            Wishlist
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          {user && <Notifications />}

          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="hidden sm:inline">{user.name}</span>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 w-48 mt-2 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Orders
                </Link>
                {user.role === 'admin' && (
                  <a
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Panel
                  </a>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 border-t">
          <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
            Home
          </Link>
          <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100">
            Shop
          </Link>
          <Link to="/wishlist" className="block px-4 py-2 hover:bg-gray-100">
            Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}
