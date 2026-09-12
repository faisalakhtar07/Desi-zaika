import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Profile from './pages/Profile'

function App() {
  const { token } = useAuthStore()

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!token ? <Signup /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/cart" element={token ? <Cart /> : <Navigate to="/login" />} />
        <Route path="/checkout" element={token ? <Checkout /> : <Navigate to="/login" />} />
        <Route path="/orders" element={token ? <Orders /> : <Navigate to="/login" />} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login" />} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App
