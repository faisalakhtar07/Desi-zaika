import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CartManager from './pages/CartManager'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import ProductDetail from './pages/ProductDetail'
import Category from './pages/Category'
import Search from './pages/Search'
import About from './pages/About'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Refund from './pages/Refund'
import Wishlist from './pages/Wishlist'

// Admin Pages
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminCustomers from './pages/AdminCustomers'
import AdminDeliveries from './pages/AdminDeliveries'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user')
    if (user) setIsAuthenticated(true)

    // Check if admin is logged in
    const admin = localStorage.getItem('adminToken')
    if (admin) setIsAdminAuthenticated(true)
  }, [])

  return (
    <Router>
      <Routes>
        {/* Public Routes - Customer */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Protected Routes - Customer */}
        <Route 
          path="/cart" 
          element={isAuthenticated ? <CartManager /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/checkout" 
          element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/orders" 
          element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
        />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={isAdminAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/products" 
          element={isAdminAuthenticated ? <AdminProducts /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/orders" 
          element={isAdminAuthenticated ? <AdminOrders /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/customers" 
          element={isAdminAuthenticated ? <AdminCustomers /> : <Navigate to="/admin/login" />} 
        />
        <Route 
          path="/admin/deliveries" 
          element={isAdminAuthenticated ? <AdminDeliveries /> : <Navigate to="/admin/login" />} 
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
