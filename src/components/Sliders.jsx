// import React from 'react';
// import Slider from 'react-slick';
// import { Link } from 'react-router-dom';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { assets } from '../assets/assets';
//  const images = assets.heroes2;
//   const logoes = assets.hero_img;
//   const jacket = assets.jacket;
// const categoryItems = [
//   { img: images, title: 'Leather Shoes', desc: 'Formal & Casual Collection' },
//   { img: jacket, title: 'Leather Jackets', desc: 'Premium Winter Collection' },
//   { img:logoes, title: 'Leather Boots', desc: 'Rugged & Stylish Designs' },
//   // Add more if you like
// ];

// const NextArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg z-10"
//   >
//     <ChevronRight className="w-6 h-6 text-gray-800" />
//   </button>
// );
// const PrevArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg z-10"
//   >
//     <ChevronLeft className="w-6 h-6 text-gray-800" />
//   </button>
// );

// export default function TwoSliders() {
//   /** Slider 1: Single row hero carousel **/
//   const singleRowSettings = {
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     dots: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   /** Slider 2: Two rows of cards, like a grid carousel **/
//   const twoRowSettings = {
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     rows: 2,            // ✅ 2 rows
//     dots: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   const Card = ({ item }) => (
//     <div className="px-3 mb-5">
//       <div className="group cursor-pointer relative overflow-hidden rounded-2xl">
//         <img
//           src={item.img}
//           alt={item.title}
//           className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all"></div>
//         <div className="absolute bottom-6 left-6 text-white">
//           <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
//           <p className="text-sm opacity-90">{item.desc}</p>
//           <Link to="/collection">
//             <button className="mt-3 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
//               Shop Now
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <section className="py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* ---------- Slider 1 ---------- */}
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
//           Featured Category
//         </h2>
//         <Slider {...singleRowSettings}>
//           {categoryItems.map((item, i) => (
//             <Card key={`single-${i}`} item={item} />
//           ))}
//         </Slider>

//         {/* ---------- Slider 2 ---------- */}
//         <h2 className="text-3xl font-bold text-center text-gray-900 mt-16 mb-8">
//           Explore More
//         </h2>
//         <Slider {...twoRowSettings}>
//           {categoryItems.concat(categoryItems).map((item, i) => (
//             <Card key={`double-${i}`} item={item} />
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// }
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
    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110"
  >
    <ChevronRight className="w-6 h-6 text-gray-800" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg z-10 transition-all duration-200 hover:scale-110"
  >
    <ChevronLeft className="w-6 h-6 text-gray-800" />
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
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
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
    rows: 2,            // 2 rows
    dots: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots slick-custom-dots",
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2,
          arrows: false 
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 1,
          rows: 1,
          arrows: false 
        } 
      },
    ],
  };

  const Card = ({ item, index }) => (
    <div className="px-3 mb-5">
      <div className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          onError={(e) => {
            // Fallback image if the online image fails to load
            e.target.src = 'https://via.placeholder.com/800x600/4A5568/FFFFFF?text=' + encodeURIComponent(item.title);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-300 transition-colors duration-300">
            {item.title}
          </h3>
          <p className="text-sm opacity-90 mb-3 group-hover:opacity-100 transition-opacity duration-300">
            {item.desc}
          </p>
          <Link to="/collection">
            <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-medium hover:bg-amber-300 hover:text-black transition-all duration-300 transform group-hover:scale-105 shadow-lg">
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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ---------- Slider 1 ---------- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of handcrafted leather goods and custom tailored pieces
          </p>
        </div>
        
        <div className="mb-16">
          <Slider {...singleRowSettings}>
            {categoryItems.slice(0, 4).map((item, i) => (
              <Card key={`featured-${i}`} item={item} index={i} />
            ))}
          </Slider>
        </div>

        {/* ---------- Slider 2 ---------- */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Collection
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
        <div className="text-center mt-16">
         
        </div>
      </div>

      <style jsx>{`
        .slick-custom-dots {
          bottom: -50px;
        }
        
        .slick-custom-dots li button:before {
          font-size: 12px;
          color: #CBD5E0;
          opacity: 1;
        }
        
        .slick-custom-dots li.slick-active button:before {
          color: #F59E0B;
        }
        
        .slick-custom-dots li button:hover:before {
          color: #F59E0B;
        }
      `}</style>
    </section>
  );
}   