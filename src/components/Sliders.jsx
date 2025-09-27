import React from 'react';
import Slider from 'react-slick';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assets } from '../assets/assets';

// Images for sliders
const topSliderImages = [
  `${assets.hero_img}`,
  `${assets.jackets}`,
  `${assets.images}`,
  `${assets.men}`
];

const bottomSliderImages = [
  `${assets.men2}`,
  `${assets.men3}`,
  `${assets.hero_img}`,
  `${assets.jackets}`,
  `${assets.images}`,
  `${assets.men}`
];

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 sm:p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110"
  >
    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-2 sm:p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110"
  >
    <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
  </button>
);

export default function TwoSliders() {
  /** Top Mini Slider Settings **/
  const topSliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots mini-dots",
    fade: true,
    cssEase: 'linear'
  };

  /** Bottom Mini Slider Settings **/
  const bottomSliderSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots mini-dots",
    fade: true,
    cssEase: 'linear'
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 space-y-8 sm:space-y-12 md:space-y-16">
        
        {/* ---------- Top Mini Slider ---------- */}
        <div className="relative">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Featured Collection
            </h2>
          </div>
          
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="h-48 sm:h-56 md:h-64">
              <Slider {...topSliderSettings}>
                {topSliderImages.map((img, index) => (
                  <div key={`top-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x400/4A5568/FFFFFF?text=Slide+${index + 1}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* ---------- Bottom Mini Slider ---------- */}
        <div className="relative">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Latest Arrivals
            </h2>
          </div>
          
          <div className="relative bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            <div className="h-48 sm:h-56 md:h-64">
              <Slider {...bottomSliderSettings}>
                {bottomSliderImages.map((img, index) => (
                  <div key={`bottom-${index}`} className="relative">
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/800x400/4A5568/FFFFFF?text=Slide+${index + 1}`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

      </div>

      <style jsx>{`
        /* Mini dots styling */
        .mini-dots {
          bottom: 15px;
          text-align: center;
        }
        
        .mini-dots li {
          margin: 0 3px;
        }
        
        .mini-dots li button:before {
          font-size: 8px;
          color: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        
        @media (min-width: 640px) {
          .mini-dots li button:before {
            font-size: 10px;
          }
        }
        
        .mini-dots li.slick-active button:before {
          color: #F59E0B;
        }
        
        .mini-dots li button:hover:before {
          color: #F59E0B;
        }
        
        /* Slider container styling */
        .slick-slider {
          position: relative;
        }
        
        .slick-list {
          overflow: hidden;
          border-radius: 0.5rem;
        }
        
        @media (min-width: 640px) {
          .slick-list {
            border-radius: 0.75rem;
          }
        }
        
        /* Fade transition */
        .slick-slide {
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        
        .slick-slide.slick-active {
          opacity: 1;
        }
        
        /* Arrow positioning */
        .slick-prev,
        .slick-next {
          z-index: 10;
        }
        
        .slick-prev:before,
        .slick-next:before {
          display: none;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .mini-dots {
            bottom: 10px;
          }
        }
        
        /* Smooth hover effects */
        .slick-slide img {
          transition: transform 0.3s ease;
        }
        
        .slick-slide:hover img {
          transform: scale(1.02);
        }
      `}</style>
    </section>
  );
}