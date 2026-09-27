import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { initializeSocket, joinAsUser } from './utils/socketClient';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Layout from './components/Layout';

export default function App() {
  const { token, userId } = useAuthStore();

  useEffect(() => {
    // Register Service Worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('✅ Service Worker registered'))
        .catch((err) => console.error('❌ SW failed:', err));
    }

    // Initialize Socket.IO if logged in
    if (token && userId) {
      const socketUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      initializeSocket(socketUrl);
      joinAsUser(userId);
      console.log('🔌 Socket connected for user:', userId);
    }
  }, [token, userId]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
          <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
          <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        </Route>
      </Routes>
    </Router>
  );
}
