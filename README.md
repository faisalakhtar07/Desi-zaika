# Desi Zaika - Frontend

React + Vite frontend for the Desi Zaika e-commerce platform.

## Setup

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

- `src/pages/` - Page components
- `src/components/` - Reusable components
- `src/store/` - Zustand stores (auth, cart, products)
- `src/services/` - API service definitions
- `src/styles/` - Tailwind CSS

## Environment

Copy `.env.example` to `.env` and update with your values:
- VITE_API_URL - Backend API URL
- VITE_RAZORPAY_KEY_ID - Razorpay key
- VITE_CLOUDINARY_CLOUD_NAME - Cloudinary cloud name
