import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({
  id,
  name,
  price,
  effectivePrice,
  discountPercent,
  images,
  brand,
  category,
  subcategory,
  rating = 0,
  reviewCount = 0
}) => {
  const { currency } = useContext(ShopContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get primary and secondary images for hover effect
  const getProductImages = () => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return {
        primary: 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&h=500&fit=crop',
        secondary: null
      };
    }

    const primaryImg = images.find(img => img.isPrimary) || images[0];
    const secondaryImg = images.length > 1 ? images[1] : null;

    const getPrimaryUrl = () => {
      return typeof primaryImg === 'string'
        ? primaryImg
        : primaryImg?.url || 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&h=500&fit=crop';
    };

    const getSecondaryUrl = () => {
      if (!secondaryImg) return null;
      return typeof secondaryImg === 'string'
        ? secondaryImg
        : secondaryImg?.url || null;
    };

    return {
      primary: getPrimaryUrl(),
      secondary: getSecondaryUrl()
    };
  };

  const getPricingInfo = () => {
    let displayPrice, originalPrice, discountedPrice, hasDiscount;
    
    if (effectivePrice) {
      displayPrice = effectivePrice;
      hasDiscount = discountPercent > 0;
      originalPrice = hasDiscount && price?.base ? price.base : displayPrice;
      discountedPrice = hasDiscount ? effectivePrice : null;
    } else if (price && typeof price === 'object') {
      hasDiscount = price.discount > 0 && price.discount < price.base;
      displayPrice = hasDiscount ? price.discount : price.base || 0;
      originalPrice = price.base || displayPrice;
      discountedPrice = hasDiscount ? price.discount : null;
    } else {
      displayPrice = price || 0;
      originalPrice = displayPrice;
      hasDiscount = false;
    }

    return {
      displayPrice: Number(displayPrice).toFixed(2),
      originalPrice: Number(originalPrice).toFixed(2),
      discountedPrice: discountedPrice ? Number(discountedPrice).toFixed(2) : null,
      hasDiscount,
      discountPercent: hasDiscount
        ? Math.round(
            discountPercent ||
              ((originalPrice - displayPrice) / originalPrice) * 100
          )
        : 0
    };
  };

  const formatTitle = (str) =>
    str?.replace(/\b\w/g, char => char.toUpperCase()) || 'Product Name';

  const pricing = getPricingInfo();
  const productImages = getProductImages();

  // Star Rating Component
  const StarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className="text-yellow-400 text-sm">
          ★
        </span>
      );
    }
    return <div className="flex items-center gap-0.5">{stars}</div>;
  };

  return (
    <div
      className="group relative flex flex-col w-full h-full bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <Link
        to={id ? `/product/${id}` : undefined}
        className="relative bg-white w-full aspect-square overflow-hidden flex-shrink-0 mb-4"
      >
        {/* Primary Image */}
        <img
          src={productImages.primary}
          alt={`${brand} ${name}` || 'Product'}
          onLoad={() => {
            setImageLoaded(true);
            setImageError(false);
          }}
          onError={() => {
            setImageError(true);
            setImageLoaded(false);
          }}
          className={`
            absolute inset-0
            w-full h-full 
            object-contain
            transition-all duration-500 ease-out
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered && productImages.secondary ? 'opacity-0' : 'opacity-100'}
          `}
        />

        {/* Secondary Image (Hover) */}
        {productImages.secondary && (
          <img
            src={productImages.secondary}
            alt={`${brand} ${name} - alternate view` || 'Product alternate view'}
            className={`
              absolute inset-0
              w-full h-full 
              object-contain
              transition-all duration-500 ease-out
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          />
        )}

        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gray-100" />
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 text-gray-400 text-sm">
            No Image
          </div>
        )}

        {/* Discount Badge */}
        {pricing.hasDiscount && pricing.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md z-10">
            -{pricing.discountPercent}%
          </div>
        )}
      </Link>

      {/* Product Info - Flex container to push button to bottom */}
      <div className="flex flex-col items-center text-center flex-1">
        {/* Product Name - Fixed Height with 2 lines */}
        <Link
          to={id ? `/product/${id}` : undefined}
          className="block w-full mb-3"
        >
          <h3 className="font-normal text-gray-900 text-base leading-tight line-clamp-2 h-12 hover:text-gray-600 transition-colors">
            {formatTitle(name)}
          </h3>
        </Link>

        {/* Price - Fixed Height */}
        <div className="flex items-center justify-center gap-2 mb-3 h-6">
          {pricing.hasDiscount && (
            <span className="text-base text-gray-400 line-through font-normal">
              {currency}{pricing.originalPrice}
            </span>
          )}
          <span className="text-lg font-semibold text-gray-900">
            {currency}{pricing.displayPrice}
          </span>
        </div>

        {/* Star Rating - Fixed Height */}
        <div className="flex items-center justify-center gap-2 mb-4 h-6">
          <StarRating />
          <span className="text-sm text-gray-500">
            {reviewCount > 0 ? `${reviewCount} reviews` : 'No reviews'}
          </span>
        </div>

        {/* Quick View Button - Pushed to bottom with mt-auto */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Add your quick view logic here
            console.log('Quick view clicked for product:', id);
          }}
          className="w-full bg-black text-white text-sm font-semibold py-3 px-6 uppercase tracking-wider hover:bg-gray-800 transition-colors duration-300 mt-auto"
        >
          Quick View
        </button>
      </div>
    </div>
  );
};

export default ProductItem;