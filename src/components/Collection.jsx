import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';

const CollectionsGrid = () => {
  const { products, loading, getImageUrl } = useContext(ShopContext);
  const [collections, setCollections] = useState([]);

  // Define collection categories with their styling
  const collectionConfigs = [
    {
      category: "men's shoes",
      title: "Men's Shoes",
      subtitle: "Premium Leather & Casual",
      size: "large", // Takes 2 columns
      gradient: "from-amber-900 via-amber-700 to-amber-500"
    },
    {
      category: "boots",
      title: "Boots Collection",
      subtitle: "Rugged & Stylish",
      size: "medium",
      gradient: "from-gray-900 via-gray-700 to-gray-600"
    },
    {
      category: "men's jackets",
      title: "Men's Jackets",
      subtitle: "Leather & Outerwear",
      size: "medium",
      gradient: "from-slate-800 via-slate-600 to-slate-500"
    },
    {
      category: "sneakers",
      title: "Men's Sneakers",
      subtitle: "Sports & Casual",
      size: "large",
      gradient: "from-blue-900 via-blue-700 to-blue-500"
    },
    {
      category: "women's sneakers",
      title: "Women's Sneakers",
      subtitle: "Comfort & Style",
      size: "medium",
      gradient: "from-rose-800 via-rose-600 to-pink-500"
    },
    {
      category: "women's shoes",
      title: "Women's Shoes",
      subtitle: "Elegant & Modern",
      size: "large",
      gradient: "from-purple-900 via-purple-700 to-purple-500"
    },
    {
      category: "shirts",
      title: "Premium Shirts",
      subtitle: "Business & Casual",
      size: "medium",
      gradient: "from-emerald-800 via-emerald-600 to-teal-500"
    },
    {
      category: "pants",
      title: "Trousers",
      subtitle: "Formal & Casual",
      size: "medium",
      gradient: "from-indigo-900 via-indigo-700 to-blue-600"
    },
    {
      category: "accessories",
      title: "Accessories",
      subtitle: "Bags, Watches & More",
      size: "large",
      gradient: "from-orange-800 via-orange-600 to-yellow-500"
    }
  ];

  // Process collections when products are loaded
  useEffect(() => {
    if (products && products.length > 0) {
      const processedCollections = collectionConfigs.map(config => {
        // Find products that match this collection category
        const matchingProducts = products.filter(product => {
          const category = product.category?.toLowerCase() || '';
          const subcategory = product.subcategory?.toLowerCase() || '';
          const name = product.name?.toLowerCase() || '';
          
          return category.includes(config.category.toLowerCase()) ||
                 subcategory.includes(config.category.toLowerCase()) ||
                 name.includes(config.category.toLowerCase());
        });

        // Get a representative image from the first product
        let imageUrl = '';
        if (matchingProducts.length > 0) {
          const firstProduct = matchingProducts[0];
          if (firstProduct.images && firstProduct.images.length > 0) {
            const primaryImage = firstProduct.images.find(img => img.isPrimary) || firstProduct.images[0];
            imageUrl = primaryImage.url || getImageUrl(primaryImage);
          } else if (firstProduct.image && firstProduct.image.length > 0) {
            imageUrl = getImageUrl(firstProduct.image[0]);
          }
        }

        return {
          ...config,
          products: matchingProducts,
          productCount: matchingProducts.length,
          imageUrl: imageUrl || 'https://via.placeholder.com/400x300?text=Collection'
        };
      }).filter(collection => collection.productCount > 0); // Only show collections with products

      setCollections(processedCollections);
    }
  }, [products]);

  const handleCollectionClick = (category) => {
    // You can implement navigation to collection page here
    console.log('Navigate to collection:', category);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 rounded-xl h-64"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Our Collections
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our curated collections of premium fashion and lifestyle products
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {collections.map((collection, index) => {
          // Dynamic sizing based on collection size config
          const sizeClasses = {
            large: 'lg:col-span-2 lg:row-span-2',
            medium: 'lg:col-span-1 lg:row-span-1',
            small: 'lg:col-span-1 lg:row-span-1'
          };

          return (
            <div
              key={collection.category}
              className={`
                group relative overflow-hidden rounded-2xl cursor-pointer
                transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl
                ${sizeClasses[collection.size] || sizeClasses.medium}
                min-h-[280px]
              `}
              onClick={() => handleCollectionClick(collection.category)}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={collection.imageUrl}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-75 group-hover:opacity-60 transition-opacity duration-300`}></div>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <div className="text-white">
                  {/* Product Count Badge */}
                  <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium mb-3">
                    <span>{collection.productCount} Products</span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-2xl lg:text-3xl font-bold mb-2 transform transition-transform group-hover:translate-y-[-4px] duration-300">
                    {collection.title}
                  </h3>
                  
                  {/* Subtitle */}
                  <p className="text-white/90 text-sm lg:text-base mb-4 transform transition-transform group-hover:translate-y-[-4px] duration-300 delay-75">
                    {collection.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="transform transition-all group-hover:translate-y-[-4px] duration-300 delay-100">
                    <div className="inline-flex items-center text-white font-medium">
                      <span className="border-b border-white/50 group-hover:border-white transition-colors">
                        Explore Collection
                      </span>
                      <svg 
                        className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          );
        })}
      </div>

      {/* Featured Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
          <div className="text-gray-600">Products</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
          <div className="text-gray-600">Brands</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">10K+</div>
          <div className="text-gray-600">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
          <div className="text-gray-600">Support</div>
        </div>
      </div>
    </div>
  );
};

export default CollectionsGrid;