import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  ShieldCheck,
  Truck,
  Sparkles,
  Heart,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import TestimonialCarousel from "../components/TestimonialCarousel";
import api from "../services/api";

const heroImages = [
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2000&q=90",
  "https://images.unsplash.com/photo-1599909533730-f9d7c5d7f7c5?auto=format&fit=crop&w=2000&q=90",
];

const categories = [
  {
    name: "Spices",
    description: "Authentic Indian spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Rice",
    description: "Premium quality rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Herbs",
    description: "Fresh natural herbs",
    image:
      "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=800&q=85",
  },
  {
    name: "Tea",
    description: "Rich & refreshing blends",
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=85",
  },
];

const whyChoose = [
  {
    icon: Leaf,
    title: "Pure & Natural",
    description:
      "Carefully selected ingredients with authentic taste and natural goodness.",
  },
  {
    icon: Sparkles,
    title: "Authentic Flavour",
    description:
      "Traditional Indian flavours that bring the real taste of home to your kitchen.",
  },
  {
    icon: ShieldCheck,
    title: "Quality You Trust",
    description:
      "Every product is selected with quality, freshness and consistency in mind.",
  },
  {
    icon: Truck,
    title: "Freshly Delivered",
    description:
      "Packed carefully and delivered to your doorstep with convenience.",
  },
  {
    icon: Heart,
    title: "Made With Care",
    description:
      "Desi Zaika is built around the love and flavours of Indian kitchens.",
  },
  {
    icon: ShoppingBag,
    title: "Easy Shopping",
    description:
      "Discover your favourites, add them to cart and order in just a few clicks.",
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHero, setCurrentHero] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products?limit=8");
      setProducts(response.data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f0ebe0] text-[#210b0f]">
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative min-h-[680px] md:min-h-[760px] overflow-hidden">
          {/* Background Slider */}

          {heroImages.map((image, index) => (
            <motion.img
              key={image}
              src={image}
              alt="Desi Zaika spices"
              initial={{ opacity: 0 }}
              animate={{
                opacity: currentHero === index ? 1 : 0,
                scale: currentHero === index ? 1 : 1.05,
              }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 6 },
              }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ))}

          {/* Overlay */}

          <div className="absolute inset-0 bg-[#210b0f]/70" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#210b0f]/95 via-[#2e0003]/65 to-[#210b0f]/35" />

          {/* Hero Content */}

          <div className="relative z-10 flex min-h-[680px] md:min-h-[760px] items-center">
            <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl"
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D8cfbc]/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D8cfbc] backdrop-blur-md">
                  <Sparkles size={14} />
                  Authentic Indian Flavours
                </div>

                <h1 className="font-serif text-5xl font-bold leading-[1.05] text-white sm:text-6xl md:text-8xl">
                  Taste the
                  <span className="block text-[#D8cfbc]">Desi Zaika.</span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-xl">
                  Bring authentic Indian flavours to your kitchen with
                  carefully selected spices, herbs, rice and natural products.
                </p>

                {/* Search */}

                <form
                  onSubmit={handleSearch}
                  className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Search
                      size={20}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"
                    />

                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search spices, rice, herbs..."
                      className="h-14 w-full rounded-2xl border border-white/20 bg-white px-5 pl-12 text-[#210b0f] outline-none transition focus:ring-2 focus:ring-[#D8cfbc]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#D8cfbc] px-7 font-bold text-[#2e0003] transition hover:bg-white"
                  >
                    Search
                    <ArrowRight size={18} />
                  </button>
                </form>

                {/* CTA */}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-[#2e0003] transition hover:-translate-y-0.5 hover:bg-[#D8cfbc]"
                  >
                    Shop Now
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() => navigate("/category/Spices")}
                    className="rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    Explore Spices
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Slider Indicators */}

          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHero(index)}
                aria-label={`Show slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  currentHero === index
                    ? "w-10 bg-[#D8cfbc]"
                    : "w-5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </section>

        {/* =====================================================
            TRUST STRIP
        ===================================================== */}

        <section className="border-b border-[#2e0003]/10 bg-[#f0ebe0]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#2e0003]/10 md:grid-cols-4">
            {[
              ["01", "Premium Quality"],
              ["02", "Authentic Taste"],
              ["03", "Freshly Packed"],
              ["04", "Easy Delivery"],
            ].map(([number, text]) => (
              <div
                key={number}
                className="px-4 py-6 text-center md:px-8 md:py-8"
              >
                <p className="text-xs font-bold tracking-[0.2em] text-[#2e0003]/40">
                  {number}
                </p>

                <p className="mt-1 text-sm font-semibold text-[#2e0003] md:text-base">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2e0003]/50">
                  Explore
                </p>

                <h2 className="font-serif text-4xl font-bold text-[#2e0003] md:text-5xl">
                  Shop by Category
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#210b0f]/60 md:text-base">
                  Discover everyday essentials and authentic ingredients
                  selected for your kitchen.
                </p>
              </div>

              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 self-start font-semibold text-[#2e0003] md:self-auto"
              >
                View All
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {categories.map((category, index) => (
                <motion.button
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => navigate(`/category/${category.name}`)}
                  className="group relative h-64 overflow-hidden rounded-[28px] text-left md:h-80"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#210b0f]/90 via-[#210b0f]/20 to-transparent" />

                  <div className="absolute bottom-0 p-5 md:p-6">
                    <h3 className="font-serif text-2xl font-bold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-xs text-white/70 md:text-sm">
                      {category.description}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURED PRODUCTS
        ===================================================== */}

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2e0003]/50">
                Our Selection
              </p>

              <h2 className="font-serif text-4xl font-bold text-[#2e0003] md:text-5xl">
                Featured Products
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-gray-500 md:text-base">
                Handpicked favourites for adding more flavour to your everyday
                meals.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-3xl bg-[#f0ebe0]"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-3xl bg-[#f0ebe0] py-16 text-center">
                <p className="text-gray-600">No products available</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onViewDetails={() =>
                      navigate(`/product/${product._id}`)
                    }
                  />
                ))}
              </div>
            )}

            <div className="mt-12 flex justify-center">
              <button
                onClick={() => navigate("/products")}
                className="flex items-center gap-2 rounded-xl bg-[#2e0003] px-7 py-3.5 font-bold text-white transition hover:bg-[#210b0f]"
              >
                Explore All Products
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            WHY CHOOSE DESI ZAIKA
        ===================================================== */}

        <section className="bg-[#f0ebe0] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2e0003]/50">
                Our Promise
              </p>

              <h2 className="font-serif text-4xl font-bold text-[#2e0003] md:text-5xl">
                Why Choose Desi Zaika?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#210b0f]/60 md:text-base">
                More than ingredients — we bring the authentic warmth and
                flavour of Indian kitchens to your home.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {whyChoose.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="group relative rounded-[26px] border border-[#2e0003]/10 bg-white p-7 shadow-[0_15px_40px_rgba(46,0,3,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(46,0,3,0.1)]"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2e0003] text-[#D8cfbc]">
                        <Icon size={22} strokeWidth={1.8} />
                      </div>

                      <span className="text-4xl font-bold text-[#2e0003]/5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#2e0003]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-gray-500">
                      {item.description}
                    </p>

                    <div className="absolute bottom-0 left-7 right-7 h-0.5 origin-left scale-x-0 bg-[#2e0003] transition-transform duration-300 group-hover:scale-x-100" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =====================================================
            SIMPLE PROCESS
        ===================================================== */}

        <section className="bg-[#210b0f] py-20 text-white md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#D8cfbc]/60">
                Simple & Easy
              </p>

              <h2 className="font-serif text-4xl font-bold md:text-5xl">
                From Our Kitchen to Yours
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                A simple shopping experience designed around your everyday
                needs.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Discover",
                  text: "Explore our collection of authentic Indian products.",
                },
                {
                  number: "02",
                  title: "Choose",
                  text: "Select your favourite spices and natural products.",
                },
                {
                  number: "03",
                  title: "Order",
                  text: "Add to cart and complete your order easily.",
                },
                {
                  number: "04",
                  title: "Enjoy",
                  text: "Receive your products and bring flavour to your meals.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="rounded-[26px] border border-white/10 bg-white/5 p-7 backdrop-blur-sm"
                >
                  <span className="text-sm font-bold tracking-[0.15em] text-[#D8cfbc]/50">
                    {step.number}
                  </span>

                  <h3 className="mt-8 font-serif text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/60">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            TESTIMONIALS
        ===================================================== */}

        <section className="bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="mb-12 text-center">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#2e0003]/50">
                Community
              </p>

              <h2 className="font-serif text-4xl font-bold text-[#2e0003] md:text-5xl">
                Loved by Food Lovers
              </h2>

              <div className="mt-4 flex justify-center gap-1 text-[#2e0003]">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
            </div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden bg-[#2e0003] px-5 py-20 text-center md:py-28"
        >
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#D8cfbc]/70">
              Bring Home the Flavour
            </p>

            <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
              Good Food Begins
              <span className="block text-[#D8cfbc]">with Good Ingredients.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              Explore Desi Zaika and discover authentic flavours made for
              everyday Indian cooking.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D8cfbc] px-8 py-4 font-bold text-[#2e0003] transition hover:bg-white"
            >
              Start Shopping
              <ArrowRight size={19} />
            </button>
          </div>

          {/* Decorative circles */}

          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full border border-[#D8cfbc]/10" />
          <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full border border-[#D8cfbc]/10" />
        </motion.section>
      </main>

      <Footer />
    </>
  );
}