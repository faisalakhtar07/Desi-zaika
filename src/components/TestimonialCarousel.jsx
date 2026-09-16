import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Mumbai',
      text: 'Amazing quality spices! My cooking has completely transformed. Highly recommend Desi Zaika.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Priya Sharma',
      location: 'Delhi',
      text: 'Fresh, authentic, and pure spices. The delivery was quick and the customer service is excellent.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'Arun Singh',
      location: 'Bangalore',
      text: 'Best spices I have ever purchased online. Great prices and fantastic quality!',
      rating: 5,
      image: '👨‍💻'
    },
    {
      name: 'Neha Patel',
      location: 'Ahmedabad',
      text: 'My family loves the taste of food made with Desi Zaika spices. Worth every penny!',
      rating: 5,
      image: '👩‍🍳'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="bg-white rounded-2xl p-8 relative overflow-hidden">
      <h2 className="text-3xl font-bold text-[#2e0003] mb-8 text-center">What Our Customers Say</h2>

      <div className="relative h-80 flex items-center">
        {testimonials.map((testimonial, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="h-full flex flex-col justify-center items-center text-center px-8">
              <div className="text-6xl mb-4">{testimonial.image}</div>
              
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#FFD700" className="text-yellow-400" />
                ))}
              </div>

              <p className="text-lg text-gray-700 mb-4 max-w-2xl italic">"{testimonial.text}"</p>

              <div>
                <h4 className="font-bold text-[#2e0003]">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={prevTestimonial}
          className="bg-[#2e0003] text-white p-2 rounded-full hover:bg-[#4a0a10]"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Dots */}
        <div className="flex gap-2 items-center">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition ${
                idx === currentIndex ? 'bg-[#2e0003]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="bg-[#2e0003] text-white p-2 rounded-full hover:bg-[#4a0a10]"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}
