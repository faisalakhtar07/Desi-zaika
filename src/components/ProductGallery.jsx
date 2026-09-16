import { useState } from 'react'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export default function ProductGallery({ images = [], productName }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [zoomActive, setZoomActive] = useState(false)

  const images_array = images && images.length > 0 ? images : ['https://via.placeholder.com/500']

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images_array.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images_array.length) % images_array.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative bg-gray-200 rounded-2xl overflow-hidden"
        onMouseEnter={() => setZoomActive(true)}
        onMouseLeave={() => setZoomActive(false)}
      >
        <img
          src={images_array[currentImageIndex]}
          alt={productName}
          className={`w-full aspect-square object-cover transition ${zoomActive ? 'scale-150' : ''}`}
          style={zoomActive ? { cursor: 'zoom-in' } : {}}
        />
        
        {/* Navigation Buttons */}
        {images_array.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Zoom Badge */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <ZoomIn size={16} />
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails */}
      {images_array.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images_array.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                idx === currentImageIndex ? 'border-[#2e0003]' : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <img src={img} alt={`${productName} ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
