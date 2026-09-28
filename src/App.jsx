import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import useAuthStore from './store/authStore';
import Layout from './components/Layout';
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

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const token = useAuthStore((state) => state.token);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(err =>
        console.log('Service Worker registration failed:', err)
      );
    }

    // Socket.IO connection
    if (token && userId) {
      const socket = io(API_URL.replace('/api', ''), {
        auth: { token },
        reconnection: true
      });

      socket.on('connect', () => {
        console.log('Connected to socket');
        socket.emit('joinAsUser', { userId });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [token, userId]);

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          {token && (
            <>
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
