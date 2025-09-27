import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { assets } from '../assets/assets';

// Online images for categories
const categoryItems = [
  { 
    img: `${assets.hero_img}`,
    title: 'Leather Shoes', 
    desc: 'Formal & Casual Collection' 
  },
  { 
    img: `${assets.jackets}`,
    title: 'Leather Jackets', 
    desc: 'Premium Winter Collection' 
  },
  { 
    img: `${assets.images}`,
    title: 'Leather Boots', 
    desc: 'Rugged & Stylish Designs' 
  },
  { 
    img: `${assets.men}`,
   title: 'Leather Men Jackets', 
    desc: 'Premium Winter Collection' 
  },
  { 
    img: `${assets.men2}`,
    title: 'Artifical Leather Men Jackets', 
    desc: 'Premium Winter Collection'
  },
  { 
    img: `${assets.men3}`,
title: 'Leather Men Jackets', 
    desc: 'Premium Winter Collection' 
  }
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
  /** Slider 1: Single row hero carousel **/
  const singleRowSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots slick-custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          autoplaySpeed: 3000
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          autoplaySpeed: 3000
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          autoplaySpeed: 3000
        }
      }
    ]
  };

  /** Slider 2: Two rows of cards, like a grid carousel **/
  const twoRowSettings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots slick-custom-dots",
    responsive: [
      { 
        breakpoint: 1200,
        settings: { 
          slidesToShow: 3,
          slidesToScroll: 1,
          rows: 2
        } 
      },
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          arrows: false,
          autoplaySpeed: 4000
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          arrows: false,
          autoplaySpeed: 4000
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          arrows: false,
          autoplaySpeed: 4000
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 1,
          arrows: false,
          autoplaySpeed: 4000
        } 
      }
    ]
  };

  const Card = ({ item, index }) => (
    <div className="px-2 sm:px-3 mb-4 sm:mb-5">
      <div className="group cursor-pointer relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 mx-auto max-w-sm lg:max-w-none">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-64 sm:h-56 md:h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Fallback image if the online image fails to load
            e.target.src = 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=' + encodeURIComponent(item.title);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-4 md:p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300 line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm sm:text-sm opacity-90 mb-3 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
            {item.desc}
          </p>
          <Link to="/collection">
            <button className="bg-white text-gray-900 px-4 sm:px-4 md:px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-300 hover:text-black transition-all duration-300 transform group-hover:scale-105 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
        
        {/* Custom badge for featured items */}
        {index === 0 && (
          <div className="absolute top-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            Featured
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* ---------- Slider 1 ---------- */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Featured Categories
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Discover our premium collection of handcrafted leather goods and custom tailored pieces
          </p>
        </div>
        
        <div className="mb-8 sm:mb-12 md:mb-16">
          <Slider {...singleRowSettings}>
            {categoryItems.slice(0, 4).map((item, i) => (
              <Card key={`featured-${i}`} item={item} index={i} />
            ))}
          </Slider>
        </div>

        {/* ---------- Slider 2 ---------- */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Explore Our Collection
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            From classic designs to modern innovations, find the perfect piece for every occasion
          </p>
        </div>
        
        <div className="relative">
          <Slider {...twoRowSettings}>
            {categoryItems.map((item, i) => (
              <Card key={`collection-${i}`} item={item} index={i} />
            ))}
          </Slider>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12 md:mt-16">
         
        </div>
      </div>

      <style jsx>{`
        /* Mobile-first responsive dots */
        .slick-custom-dots {
          bottom: -35px;
          text-align: center;
        }
        
        @media (min-width: 640px) {
          .slick-custom-dots {
            bottom: -50px;
          }
        }
        
        .slick-custom-dots li {
          margin: 0 3px;
        }
        
        @media (min-width: 640px) {
          .slick-custom-dots li {
            margin: 0 5px;
          }
        }
        
        .slick-custom-dots li button:before {
          font-size: 10px;
          color: #CBD5E0;
          opacity: 1;
        }
        
        @media (min-width: 640px) {
          .slick-custom-dots li button:before {
            font-size: 12px;
          }
        }
        
        .slick-custom-dots li.slick-active button:before {
          color: #F59E0B;
        }
        
        .slick-custom-dots li button:hover:before {
          color: #F59E0B;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Mobile single card optimization */
        @media (max-width: 1024px) {
          .slick-slide {
            padding: 0 10px;
          }
          
          .slick-list {
            margin: 0 -10px;
          }
          
          .slick-track {
            display: flex !important;
          }
          
          .slick-slide > div {
            height: 100%;
            display: flex;
            align-items: stretch;
          }
          
          .slick-slide > div > div {
            width: 100%;
          }
        }
        
        /* Ensure cards are centered on mobile */
        @media (max-width: 640px) {
          .slick-slide {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}