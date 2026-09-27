import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { featured, bestSellers, getFeatured, getBestSellers } = useProductStore();

  useEffect(() => {
    getFeatured();
    getBestSellers();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Desi Zaika</h1>
          <p className="text-xl mb-8">Premium Indian Spices Delivered to Your Door</p>
          <Link to="/shop" className="bg-white text-amber-800 px-8 py-3 rounded font-bold hover:bg-gray-100">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
