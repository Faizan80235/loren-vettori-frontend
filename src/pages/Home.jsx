
import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from '../context/ShopContext';
import { Star, ChevronLeft, ChevronRight, Award, Truck, Shield, Headphones, RefreshCw, ArrowRight, Package, Zap, CheckCircle, Crown, Target } from 'lucide-react';
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Features from "../components/Featues";
import LifestyleSection from "../components/Story";
import CollectionsGrid from "../components/Collection";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import TwoSliders from "../components/Sliders";
const Home = () => {
  const images = assets.heroes2;
  const logoes = assets.hero_img;
  const jacket = assets.jacket;
  const categories = assets.category;
  const { products, loading, currency } = useContext(ShopContext);
  
  // Simple filter state
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Testimonial carousel state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Category slider state
  const [currentCategorySlide, setCurrentCategorySlide] = useState(0);
  
  // Category buttons
  const categoryButtons = [
    { id: 'all', label: 'All Products', color: 'bg-gray-900 hover:bg-gray-800' },
    { id: 'shoes', label: 'Leather Shoes', color: 'bg-amber-600 hover:bg-amber-700' },
    { id: 'jackets', label: 'Leather Jackets', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { id: 'boots', label: 'Boots', color: 'bg-emerald-600 hover:bg-emerald-700' }
  ];

  // Extended category data for slider
  const categorySlides = [
    {
      id: 1,
      title: "Leather Shoes",
      subtitle: "Formal & Casual Collection",
      description: "Premium handcrafted leather shoes for every occasion",
      image: logoes,
      link: "/collection?category=shoes",
      bgColor: "from-amber-900 to-amber-700"
    },
    {
      id: 2,
      title: "Leather Jackets",
      subtitle: "Premium Winter Collection",
      description: "Stylish and warm leather jackets for the modern wardrobe",
      image: jacket,
      link: "/collection?category=jackets",
      bgColor: "from-indigo-900 to-indigo-700"
    },
    {
      id: 3,
      title: "Leather Boots",
      subtitle: "Rugged & Stylish Designs",
      description: "Durable boots crafted for adventure and style",
      image: categories,
      link: "/collection?category=boots",
      bgColor: "from-emerald-900 to-emerald-700"
    },
    {
      id: 4,
      title: "Accessories",
      subtitle: "Complete Your Look",
      description: "Premium leather accessories and small goods",
      image: images,
      link: "/collection?category=accessories",
      bgColor: "from-purple-900 to-purple-700"
    },
    {
      id: 5,
      title: "Custom Orders",
      subtitle: "Made to Measure",
      description: "Personalized leather goods crafted just for you",
      image: logoes,
      link: "/custom-orders",
      bgColor: "from-rose-900 to-rose-700"
    }
  ];

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      text: "The leather jacket I bought is absolutely stunning! The craftsmanship is exceptional and it fits perfectly. Worth every penny.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Muhammad Ali",
      location: "London, UK", 
      rating: 5,
      text: "Best leather boots I've ever owned. The quality is unmatched and they're incredibly comfortable for daily wear.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Emma Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "Amazing shopping experience! The leather shoes arrived quickly and exceeded my expectations. Definitely ordering again.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  // Apply simple category filter and limit to 6 products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        product.subcategory?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        product.name?.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Limit to 6 products only
    filtered = filtered.slice(0, 6);

    setFilteredProducts(filtered);
  }, [products, activeCategory]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle testimonial carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Category slider navigation
  const nextCategorySlide = () => {
    setCurrentCategorySlide((prev) => (prev + 1) % 3);
  };

  const prevCategorySlide = () => {
    setCurrentCategorySlide((prev) => 
      prev === 0 ? 2 : prev - 1
    );
  };

  // Auto-slide for categories
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategorySlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <Hero />
      
      {/* Our Craftsmanship */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Handcrafted Excellence in Every <span className="text-amber-600">Stitch</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Each of our leather products is meticulously crafted by skilled artisans using traditional techniques passed down through generations. We combine time-honored methods with modern innovation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Hand-Selected Premium Leather</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Traditional Crafting Methods</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700">Quality Tested for Durability</span>
                </div>
              </div>
              <button className="mt-8 bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                Learn Our Process
              </button>
            </div>
            <div className="relative">
              <img 
                src={images}
                alt="Leather craftsmanship process"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg border">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-amber-600" />
                  <div>
                    <div className="font-semibold text-gray-900">Master Craftsmen</div>
                    <div className="text-sm text-gray-600">15+ Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
<TwoSliders></TwoSliders>
      <LifestyleSection />

      {/* Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium leather goods
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categoryButtons.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 aspect-[4/5] rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
              {filteredProducts.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  effectivePrice={product.effectivePrice}
                  discountPercent={product.discountPercent || 0}
                  images={product.images}
                  brand={product.brand}
                  category={product.category}
                  subcategory={product.subcategory}
                />
              ))}
            </div>

            <div className="text-center">
              <Link to='/collection'>
              
                <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 mx-auto">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
              </Link>
            
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Package className="w-16 h-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try selecting a different category to see products.
            </p>
            <button
              onClick={() => handleCategoryChange('all')}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>

      {/* Care Instructions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Leather Care Made Simple
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Keep your leather products looking new with our expert care tips
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                <Shield className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Clean Regularly</h3>
              <p className="text-gray-600">Use a soft cloth to remove dust and dirt. Apply leather cleaner monthly for best results.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                <Headphones className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Condition & Protect</h3>
              <p className="text-gray-600">Apply leather conditioner every 3-6 months to maintain flexibility and prevent cracking.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-200 group-hover:border-gray-300 transition-colors">
                <RefreshCw className="w-10 h-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proper Storage</h3>
              <p className="text-gray-600">Store in cool, dry places. Use shoe trees for boots and hang jackets properly.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
              Download Care Guide
            </button>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who love our leather products
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="mb-8">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTestimonial 
                          ? 'bg-amber-600' 
                          : 'bg-gray-300 hover:bg-amber-300'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentTestimonial(prev => 
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )}
                    className="p-2 rounded-full bg-white hover:bg-amber-50 transition-colors shadow-md border border-amber-200"
                  >
                    <ChevronLeft className="w-5 h-5 text-amber-600" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
                    className="p-2 rounded-full bg-white hover:bg-amber-50 transition-colors shadow-md border border-amber-200"
                  >
                    <ChevronRight className="w-5 h-5 text-amber-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BestSeller />
      <Features />

      <NewsletterBox />
    </div>
  );
};

export default Home;