import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import NotificationHandler from './components/NotificationHandler'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Import your pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'

export default function App() {
  const user = localStorage.getItem('user')

  return (
    <Router>
      <NotificationHandler />
      <Navbar />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<Product />} />

        {/* Protected Routes */}
        <Route 
          path="/cart" 
          element={user ? <Cart /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/checkout" 
          element={user ? <Checkout /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/orders" 
          element={user ? <Orders /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Profile /> : <Navigate to="/login" />} 
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </Router>
  )
}
