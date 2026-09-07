# Desi Zaika - Frontend

Premium Indian Spices E-Commerce Platform - Frontend Application

## 🚀 Quick Start

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
src/
├── pages/           # All page components
├── components/      # Reusable components
├── store/          # Zustand state management
├── services/       # API services
├── App.jsx         # Main app component
├── main.jsx        # Entry point
└── index.css       # Global styles
```

## 🎨 Theme Colors

- Primary: `#2e0003` (Burgundy)
- Accent: `#D8cfbc` (Cream)
- Font: Inter

## 📝 Environment Variables

Create `.env.local` file:
```
VITE_API_URL=http://localhost:5000/api
```

## ✨ Features

- User Authentication (Signup/Login)
- Product Listing
- Shopping Cart
- Checkout Process
- Order Management
- User Profiles
- Responsive Design
- Mobile Friendly

## 🔗 API Base URL

All API calls use the base URL from `VITE_API_URL` environment variable.

## 📦 Dependencies

- React 18
- React Router v6
- Axios (HTTP requests)
- Zustand (State Management)
- Tailwind CSS (Styling)
- Vite (Build tool)

## 🔐 Authentication

- Mobile + Password login
- JWT token based
- Auto logout on token expiry

## 🎯 Routes

- `/` - Home page
- `/login` - Login/Signup
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/orders` - Order history
- `/profile` - User profile

---

**Ready to run!**
```bash
npm install && npm run dev
```
