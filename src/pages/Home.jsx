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
  ChefHat,
  Sprout,
  PackageCheck,
} from "lucide-react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import TestimonialCarousel from "../components/TestimonialCarousel";


const API_URL = 'https://desi-zaika-backend.onrender.com/api/products'

const heroImages = [
  "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2000&q=85",
  "https://images.unsplash.com/photo-1599909533606-04e4d6b8b7f7?auto=format&fit=crop&w=2000&q=85",
];

const categories = [
  {
    name: "Spices",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rice",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Herbs",
    image:
      "https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Tea",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
  },
];


const whyChoose = [
  {
    number: "01",
    icon: Leaf,
    title: "Pure & Natural",
    description:
      "Carefully selected ingredients that bring authentic taste and natural goodness to your kitchen.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Authentic Flavour",
    description:
      "Traditional Indian flavours preserved so every meal feels rich, familiar and full of character.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "Every product is selected with attention to quality, freshness and consistency.",
  },
  {
    number: "04",
    icon: Heart,
    title: "Made With Care",
    description:
      "We believe great food begins with ingredients chosen with patience, care and passion.",
  },
  {
    number: "05",
    icon: Truck,
    title: "Fresh At Your Door",
    description:
      "From our collection to your kitchen, we focus on keeping your order fresh and carefully packed.",
  },
  {
    number: "06",
    icon: ShoppingBag,
    title: "For Every Kitchen",
    description:
      "From everyday cooking to special occasions, discover something made for every Indian kitchen.",
  },
];

const storyItems = [
  {
    number: "01",
    eyebrow: "THE HEART OF INDIAN COOKING",
    title: "Every dish begins with the right ingredient.",
    description:
      "Indian food is more than a recipe. It is aroma, colour, warmth and memories. Desi Zaika brings together ingredients that help you create those moments in your own kitchen.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1400&q=85",
    icon: ChefHat,
  },
  {
    number: "02",
    eyebrow: "AUTHENTIC INGREDIENTS",
    title: "Selected for flavour, not just appearance.",
    description:
      "From fragrant spices to everyday staples, we focus on products that add real character to your food and help you experience the depth of Indian cooking.",
    image:
      "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1400&q=85",
    icon: Sprout,
  },
  {
    number: "03",
    eyebrow: "RICH FLAVOUR",
    title: "Turn everyday meals into something special.",
    description:
      "A pinch of the right spice can transform a simple meal. Explore flavours that make homemade food more aromatic, colourful and memorable.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1400&q=85",
    icon: Sparkles,
  },
  {
    number: "04",
    eyebrow: "CAREFULLY PACKED",
    title: "From our collection to your kitchen.",
    description:
      "We believe the experience should feel special from the moment you discover a product to the moment you open the package at home.",
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1400&q=85",
    icon: PackageCheck,
  },
  {
    number: "05",
    eyebrow: "BRING DESI ZAIKA HOME",
    title: "Your kitchen. Your recipes. Your flavour.",
    description:
      "Discover ingredients that fit naturally into your everyday cooking and bring a little more Desi Zaika to every plate.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=85",
    icon: Heart,
  },
];

export default function Home() {
  const navigate = useNavigate();

  const [heroIndex, setHeroIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [search, setSearch] = useState("");

  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);

        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/products");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#210b0f]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[720px] md:min-h-[780px] overflow-hidden">
        {/* Background images */}
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{
              opacity: heroIndex === index ? 1 : 0,
              scale: heroIndex === index ? 1 : 1.04,
            }}
            transition={{
              opacity: { duration: 1.2 },
              scale: { duration: 6 },
            }}
            className="absolute inset-0"
          >
            <img
              src={image}
              alt="Desi Zaika spices"
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#210b0f]/90 via-[#210b0f]/55 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 flex min-h-[720px] md:min-h-[780px] items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl text-white"
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                <Leaf size={15} />
                Authentic Indian Flavours
              </div>

              <h1 className="text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Taste the
                <br />
                <span className="italic">real</span> Desi Zaika.
              </h1>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                Discover carefully selected spices, herbs, rice, tea and
                everyday ingredients that bring authentic Indian flavour to
                your kitchen.
              </p>

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="mt-9 flex max-w-2xl flex-col gap-3 sm:flex-row"
              >
                <div className="flex flex-1 items-center rounded-2xl bg-white px-5 py-4 text-[#210b0f] shadow-2xl">
                  <Search size={20} className="mr-3 shrink-0 opacity-60" />

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search spices, rice, herbs..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-black/40 md:text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-[#2e0003] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#420006]"
                >
                  Search
                  <ArrowRight size={18} />
                </button>
              </form>

              {/* CTA */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#210b0f] transition hover:bg-white/90"
                >
                  Shop Now
                  <ArrowRight size={17} />
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Explore Spices
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                heroIndex === index ? "w-10 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          TRUST STRIP
      ========================================================= */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: Leaf,
              title: "Natural Ingredients",
              text: "Selected with care",
            },
            {
              icon: ShieldCheck,
              title: "Quality First",
              text: "Made for your kitchen",
            },
            {
              icon: Truck,
              title: "Reliable Delivery",
              text: "Packed with care",
            },
            {
              icon: Heart,
              title: "Made With Love",
              text: "From us to you",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`flex items-center gap-3 px-5 py-6 md:px-8 ${
                  index < 3 ? "md:border-r md:border-black/5" : ""
                }`}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f4eee8]">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs text-black/45">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2e0003]/60">
              Explore Our Collection
            </p>

            <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
              Made for every
              <br />
              <span className="italic">Indian kitchen.</span>
            </h2>
          </div>

          <button
            onClick={() => navigate("/products")}
            className="flex w-fit items-center gap-2 text-sm font-medium underline underline-offset-4"
          >
            View all products
            <ArrowRight size={17} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {categories.map((category, index) => (
            <motion.button
              key={category.name}
              onClick={() =>
                navigate(
                  `/products?category=${encodeURIComponent(category.name)}`
                )
              }
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              className="group relative h-[260px] overflow-hidden rounded-[28px] text-left md:h-[340px]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="mb-1 text-xs uppercase tracking-[0.18em] text-white/65">
                    0{index + 1}
                  </p>
                  <h3 className="text-2xl font-medium">{category.name}</h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                  <ArrowRight size={18} />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================= */}
      <section className="bg-[#f2eee8]">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2e0003]/60">
                Our Selection
              </p>

              <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
                Featured
                <br />
                <span className="italic">favourites.</span>
              </h2>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="flex w-fit items-center gap-2 text-sm font-medium underline underline-offset-4"
            >
              Shop all
              <ArrowRight size={17} />
            </button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-[360px] animate-pulse rounded-[24px] bg-white/70"
                />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-black/5 bg-white p-10 text-center">
              <p className="text-black/50">
                Products will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE DESI ZAIKA
          6 PLAIN STICKY STACK CARDS
      ========================================================= */}
      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          {/* Heading */}
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#2e0003]/60">
              Why Desi Zaika
            </p>

            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              Simple ingredients.
              <br />
              <span className="italic">Beautiful flavour.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-black/50 md:text-base">
              We keep things simple — authentic ingredients, thoughtful
              selection and the flavours that make Indian food special.
            </p>
          </div>

          {/* Sticky cards */}
          <div className="relative">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className="sticky mb-6 md:mb-8"
                  style={{
                    top: `${95 + index * 18}px`,
                    zIndex: index + 1,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.04,
                    }}
                    className="group min-h-[260px] rounded-[30px] border border-black/8 bg-white p-7 shadow-[0_15px_50px_rgba(33,11,15,0.06)] md:min-h-[285px] md:p-10"
                  >
                    <div className="flex h-full flex-col justify-between gap-12">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-medium tracking-[0.2em] text-black/35">
                          {item.number}
                        </span>

                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3eee7] text-[#2e0003] transition duration-300 group-hover:scale-110">
                          <Icon size={21} strokeWidth={1.6} />
                        </div>
                      </div>

                      <div className="max-w-2xl">
                        <h3 className="text-3xl font-medium tracking-tight md:text-4xl">
                          {item.title}
                        </h3>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-black/50 md:text-base">
                          {item.description}
                        </p>
                      </div>

                      <div className="h-px w-full bg-black/8 transition-all duration-500 group-hover:bg-[#2e0003]/30" />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          STORY / IMAGE SCROLL SECTION
          5 TEXT + IMAGE STICKY CARDS
      ========================================================= */}
      <section className="bg-[#210b0f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          {/* Heading */}
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              The Desi Zaika Story
            </p>

            <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
              From India,
              <br />
              <span className="italic">with flavour.</span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/55 md:text-base">
              Scroll through the story behind the flavours and ingredients we
              bring to your kitchen.
            </p>
          </div>

          {/* Story cards */}
          <div className="relative">
            {storyItems.map((item, index) => {
              const Icon = item.icon;
              const reverse = index % 2 !== 0;

              return (
                <div
                  key={item.number}
                  className="sticky mb-8"
                  style={{
                    top: `${100 + index * 14}px`,
                    zIndex: index + 1,
                  }}
                >
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.7,
                    }}
                    className="overflow-hidden rounded-[32px] bg-[#2e0003] shadow-2xl"
                  >
                    <div
                      className={`grid min-h-[520px] md:grid-cols-2 ${
                        reverse ? "md:[&>*:first-child]:order-2" : ""
                      }`}
                    >
                      {/* Text */}
                      <div className="flex flex-col justify-between p-8 md:p-12 lg:p-16">
                        <div className="flex items-start justify-between">
                          <span className="text-xs font-medium tracking-[0.2em] text-white/35">
                            {item.number}
                          </span>

                          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                            <Icon size={19} strokeWidth={1.5} />
                          </div>
                        </div>

                        <div className="my-14 md:my-0">
                          <p className="mb-5 text-xs font-medium tracking-[0.18em] text-white/45">
                            {item.eyebrow}
                          </p>

                          <h3 className="max-w-lg text-3xl font-medium leading-tight tracking-tight md:text-4xl lg:text-5xl">
                            {item.title}
                          </h3>

                          <p className="mt-6 max-w-lg text-sm leading-7 text-white/55 md:text-base">
                            {item.description}
                          </p>

                          <button
                            onClick={() => navigate("/products")}
                            className="mt-8 flex items-center gap-2 text-sm font-medium"
                          >
                            Explore collection
                            <ArrowRight size={17} />
                          </button>
                        </div>

                        <div className="text-xs text-white/25">
                          DESI ZAIKA
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative min-h-[330px] overflow-hidden md:min-h-full">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          initial={{ scale: 1.08 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2 }}
                        />

                        <div className="absolute inset-0 bg-black/10" />

                        <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs text-white backdrop-blur-md">
                          Authentic • Carefully Selected
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TESTIMONIALS
      ========================================================= */}
      <section className="bg-[#f2eee8]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[#2e0003]/60">
              From Our Customers
            </p>

            <h2 className="text-4xl font-medium tracking-tight md:text-5xl">
              Loved in kitchens
              <br />
              <span className="italic">everywhere.</span>
            </h2>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:px-12">
          <div className="relative overflow-hidden rounded-[35px] bg-[#2e0003] px-7 py-16 text-center text-white md:px-12 md:py-24">
            {/* Decorative circles */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10" />

            <div className="relative z-10 mx-auto max-w-3xl">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                <Star size={22} />
              </div>

              <h2 className="text-4xl font-medium tracking-tight md:text-6xl">
                Bring a little more
                <br />
                <span className="italic">Desi Zaika</span> home.
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-white/55 md:text-base">
                Explore our collection of authentic ingredients and discover
                flavours made for everyday cooking.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mx-auto mt-9 flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-medium text-[#2e0003] transition hover:bg-white/90"
              >
                Start Shopping
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}