// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Link } from 'react-router-dom';

// const ProductItem = ({
//   id,
//   name,
//   price,
//   effectivePrice,
//   discountPercent,
//   images,
//   brand,
//   category,
//   subcategory
// }) => {
//   const { currency } = useContext(ShopContext);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const getProductImage = () => {
//     if (!images || !Array.isArray(images) || images.length === 0)
//       return 'https://via.placeholder.com/600x600?text=No+Image';

//     const primary = images.find(img => img.isPrimary) || images[0];
//     return typeof primary === 'string'
//       ? primary
//       : primary?.url || 'https://via.placeholder.com/600x600?text=No+Image';
//   };

//   const getPricingInfo = () => {
//     let displayPrice, originalPrice, discountedPrice, hasDiscount;
//     if (effectivePrice) {
//       displayPrice = effectivePrice;
//       hasDiscount = discountPercent > 0;
//       originalPrice = hasDiscount && price?.base ? price.base : displayPrice;
//       discountedPrice = hasDiscount ? effectivePrice : null;
//     } else if (price && typeof price === 'object') {
//       hasDiscount = price.discount > 0 && price.discount < price.base;
//       displayPrice = hasDiscount ? price.discount : price.base || 0;
//       originalPrice = price.base || displayPrice;
//       discountedPrice = hasDiscount ? price.discount : null;
//     } else {
//       displayPrice = price || 0;
//       originalPrice = displayPrice;
//       hasDiscount = false;
//     }

//     return {
//       displayPrice: Number(displayPrice).toFixed(2),
//       originalPrice: Number(originalPrice).toFixed(2),
//       discountedPrice: discountedPrice ? Number(discountedPrice).toFixed(2) : null,
//       hasDiscount,
//       discountPercent: hasDiscount
//         ? Math.round(
//             discountPercent ||
//               ((originalPrice - displayPrice) / originalPrice) * 100
//           )
//         : 0
//     };
//   };

//   const formatTitle = (str) =>
//     str?.replace(/\b\w/g, char => char.toUpperCase()) || 'Product Name';

//   const pricing = getPricingInfo();
//   const productImage = getProductImage();

//   return (
//     <Link
//       to={id ? `/product/${id}` : undefined}
//       className={`
//         group relative block
//         w-full
//         transition-transform duration-300
//         hover:-translate-y-1 hover:scale-105
//         bg-white border border-gray-200
//         rounded-xl shadow-sm hover:shadow-md
//         overflow-hidden
//         ${!id ? 'pointer-events-none opacity-50' : ''}
//       `}
//     >
//       {/* Image */}
//       <div className="relative bg-gray-100 aspect-[3/4] overflow-hidden">
//         <img
//           src={productImage}
//           alt={`${brand} ${name}` || 'Product'}
//           onLoad={() => {
//             setImageLoaded(true);
//             setImageError(false);
//           }}
//           onError={() => {
//             setImageError(true);
//             setImageLoaded(false);
//           }}
//           className={`
//             w-full h-full object-cover
//             transition-transform duration-700 ease-out
//             group-hover:scale-105
//             ${imageLoaded ? 'opacity-100' : 'opacity-0'}
//           `}
//         />

//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 animate-pulse bg-gray-300 flex items-center justify-center" />
//         )}

//         {imageError && (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
//             Image not found
//           </div>
//         )}

//         {pricing.hasDiscount && pricing.discountPercent > 0 && (
//           <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
//             -{pricing.discountPercent}%
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="px-3 py-4 space-y-1.5">
//         {brand && (
//           <p className="text-[11px] text-gray-500 uppercase tracking-wide">{brand}</p>
//         )}

//         <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2">
//           {formatTitle(name)}
//         </h3>

//         {(category || subcategory) && (
//           <p className="text-xs text-gray-400">
//             {[category, subcategory].filter(Boolean).join(' • ')}
//           </p>
//         )}

//         <div className="flex items-baseline gap-2 pt-1">
//           <span
//             className={`text-lg font-bold ${
//               pricing.hasDiscount ? 'text-red-600' : 'text-gray-900'
//             }`}
//           >
//             {currency}
//             {pricing.displayPrice}
//           </span>

//           {pricing.hasDiscount && (
//             <span className="text-sm text-gray-400 line-through">
//               {currency}
//               {pricing.originalPrice}
//             </span>
//           )}
//         </div>

//         {pricing.hasDiscount && (
//           <p className="text-xs text-green-600 font-medium">
//             You save {currency}
//             {(Number(pricing.originalPrice) - Number(pricing.discountedPrice)).toFixed(2)}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default ProductItem;
// import React, { useContext, useState } from 'react';
// import { ShopContext } from '../context/ShopContext';
// import { Link } from 'react-router-dom';

// const ProductItem = ({
//   id,
//   name,
//   price,
//   effectivePrice,
//   discountPercent,
//   images,
//   brand,
//   category,
//   subcategory
// }) => {
//   const { currency } = useContext(ShopContext);
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [imageError, setImageError] = useState(false);

//   const getProductImage = () => {
//     if (!images || !Array.isArray(images) || images.length === 0)
//       return 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&h=500&fit=crop';

//     const primary = images.find(img => img.isPrimary) || images[0];
//     return typeof primary === 'string'
//       ? primary
//       : primary?.url || 'https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400&h=500&fit=crop';
//   };

//   const getPricingInfo = () => {
//     let displayPrice, originalPrice, discountedPrice, hasDiscount;
//     if (effectivePrice) {
//       displayPrice = effectivePrice;
//       hasDiscount = discountPercent > 0;
//       originalPrice = hasDiscount && price?.base ? price.base : displayPrice;
//       discountedPrice = hasDiscount ? effectivePrice : null;
//     } else if (price && typeof price === 'object') {
//       hasDiscount = price.discount > 0 && price.discount < price.base;
//       displayPrice = hasDiscount ? price.discount : price.base || 0;
//       originalPrice = price.base || displayPrice;
//       discountedPrice = hasDiscount ? price.discount : null;
//     } else {
//       displayPrice = price || 0;
//       originalPrice = displayPrice;
//       hasDiscount = false;
//     }

//     return {
//       displayPrice: Number(displayPrice).toFixed(2),
//       originalPrice: Number(originalPrice).toFixed(2),
//       discountedPrice: discountedPrice ? Number(discountedPrice).toFixed(2) : null,
//       hasDiscount,
//       discountPercent: hasDiscount
//         ? Math.round(
//             discountPercent ||
//               ((originalPrice - displayPrice) / originalPrice) * 100
//           )
//         : 0
//     };
//   };

//   const formatTitle = (str) =>
//     str?.replace(/\b\w/g, char => char.toUpperCase()) || 'Product Name';

//   const pricing = getPricingInfo();
//   const productImage = getProductImage();

//   return (
//     <Link
//       to={id ? `/product/${id}` : undefined}
//       className={`
//         group relative block
//         w-full
//         transition-all duration-300
//         hover:-translate-y-1 hover:scale-[1.02]
//         bg-white 
//         overflow-hidden
//         ${!id ? 'pointer-events-none opacity-50' : ''}
//       `}
//     >
//       {/* Image */}
//       <div className="relative bg-gray-50 aspect-[4/5] overflow-hidden mb-3">
//         <img
//           src={productImage}
//           alt={`${brand} ${name}` || 'Product'}
//           onLoad={() => {
//             setImageLoaded(true);
//             setImageError(false);
//           }}
//           onError={() => {
//             setImageError(true);
//             setImageLoaded(false);
//           }}
//           className={`
//             w-full h-full object-cover object-center
//             transition-transform duration-500 ease-out
//             group-hover:scale-105
//             ${imageLoaded ? 'opacity-100' : 'opacity-0'}
//           `}
//         />

//         {!imageLoaded && !imageError && (
//           <div className="absolute inset-0 animate-pulse bg-gray-200" />
//         )}

//         {imageError && (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
//             Image not found
//           </div>
//         )}

//         {pricing.hasDiscount && pricing.discountPercent > 0 && (
//           <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
//             -{pricing.discountPercent}% OFF
//           </div>
//         )}
//       </div>

//       {/* Info */}
//       <div className="space-y-1">
//         {brand && (
//           <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{brand}</p>
//         )}

//         <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 mb-2">
//           {formatTitle(name)}
//         </h3>

//         {(category || subcategory) && (
//           <p className="text-xs text-gray-400 mb-2">
//             {[category, subcategory].filter(Boolean).join(' • ')}
//           </p>
//         )}

//         <div className="flex items-center gap-2">
//           <span
//             className={`text-base font-semibold ${
//               pricing.hasDiscount ? 'text-red-600' : 'text-gray-900'
//             }`}
//           >
//             {currency}
//             {pricing.displayPrice}
//           </span>

//           {pricing.hasDiscount && (
//             <span className="text-sm text-gray-400 line-through">
//               {currency}
//               {pricing.originalPrice}
//             </span>
//           )}
//         </div>

//         {pricing.hasDiscount && (
//           <p className="text-xs text-green-600 font-medium">
//             You save {currency}
//             {(Number(pricing.originalPrice) - Number(pricing.discountedPrice || pricing.displayPrice)).toFixed(2)}
//           </p>
//         )}
//       </div>
//     </Link>
//   );
// };

// export default ProductItem;
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
  subcategory
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

  return (
    <Link
      to={id ? `/product/${id}` : undefined}
      className={`
        group relative block
        w-full
        transition-all duration-300
        hover:-translate-y-1 hover:scale-[1.02]
        bg-white 
        overflow-hidden
        ${!id ? 'pointer-events-none opacity-50' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Hover Effect */}
      <div className="relative bg-gray-50 aspect-[4/5] overflow-hidden mb-3">
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
            w-full h-full object-cover object-center
            transition-opacity duration-500 ease-out
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
              w-full h-full object-cover object-center
              transition-all duration-500 ease-out
              ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
            `}
          />
        )}

        {/* Loading State */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Error State */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
            Image not found
          </div>
        )}

        {/* Discount Badge */}
        {pricing.hasDiscount && pricing.discountPercent > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded z-10">
            -{pricing.discountPercent}% OFF
          </div>
        )}

        {/* Quick View Indicator (optional) */}
        {productImages.secondary && (
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm text-xs text-gray-700 px-2 py-1 rounded shadow-sm">
              Quick View
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        {brand && (
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
            {brand}
          </p>
        )}

        <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 mb-2 group-hover:text-gray-700 transition-colors">
          {formatTitle(name)}
        </h3>

        {(category || subcategory) && (
          <p className="text-xs text-gray-400 mb-2">
            {[category, subcategory].filter(Boolean).join(' • ')}
          </p>
        )}

        <div className="flex items-center gap-2">
          <span
            className={`text-base font-semibold ${
              pricing.hasDiscount ? 'text-red-600' : 'text-gray-900'
            }`}
          >
            {currency}
            {pricing.displayPrice}
          </span>

          {pricing.hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {currency}
              {pricing.originalPrice}
            </span>
          )}
        </div>

        {pricing.hasDiscount && (
          <p className="text-xs text-green-600 font-medium">
            You save {currency}
            {(Number(pricing.originalPrice) - Number(pricing.discountedPrice || pricing.displayPrice)).toFixed(2)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductItem;