
// // import React, { useState, useEffect, useContext } from 'react';
// // import { Star, Check, Heart, ShoppingCart, ArrowLeft, Loader2, X, CheckCircle } from 'lucide-react';
// // import { ShopContext } from '../context/ShopContext';

// // const ProductPage = ({ productId, onBack }) => {
// //   const { 
// //     fetchProduct, 
// //     addToCart, 
// //     currency, 
// //     getImageUrl,
// //     loading: contextLoading 
// //   } = useContext(ShopContext);

// //   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedImage, setSelectedImage] = useState(0);
// //   const [selectedColor, setSelectedColor] = useState('');
// //   const [selectedSize, setSelectedSize] = useState('');
// //   const [selectedMaterial, setSelectedMaterial] = useState('');
// //   const [selectedWidth, setSelectedWidth] = useState('standard');
// //   const [quantity, setQuantity] = useState(1);

// //   // Alert states
// //   const [showAlert, setShowAlert] = useState(false);
// //   const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
// //   const [alertMessage, setAlertMessage] = useState('');

// //   // Fetch product data
// //   useEffect(() => {
// //     const loadProduct = async () => {
// //       if (!productId) {
// //         setError('Product ID not found');
// //         setLoading(false);
// //         return;
// //       }

// //       try {
// //         setLoading(true);
// //         setError(null);
// //         console.log('Loading product with ID:', productId);
        
// //         const productData = await fetchProduct(productId);
        
// //         if (productData) {
// //           setProduct(productData);
          
// //           // Set initial selections
// //           if (productData.colors && productData.colors.length > 0) {
// //             setSelectedColor(productData.colors[0]);
// //           }
// //           if (productData.materials && productData.materials.length > 0) {
// //             setSelectedMaterial(productData.materials[0]);
// //           }
// //           if (productData.sizes && productData.sizes.length > 0) {
// //             // Don't auto-select size - let user choose
// //           }
          
// //           console.log('Product loaded successfully:', productData.name);
// //         } else {
// //           setError('Product not found');
// //         }
// //       } catch (err) {
// //         console.error('Error loading product:', err);
// //         setError('Failed to load product');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadProduct();
// //   }, [productId, fetchProduct]);

// //   // Show alert function
// //   const showAlertMessage = (message, type = 'success') => {
// //     setAlertMessage(message);
// //     setAlertType(type);
// //     setShowAlert(true);
    
// //     // Auto hide after 3 seconds
// //     setTimeout(() => {
// //       setShowAlert(false);
// //     }, 3000);
// //   };

// //   // Close alert function
// //   const closeAlert = () => {
// //     setShowAlert(false);
// //   };

// //   // Handle add to cart
// //   const handleAddToCart = () => {
// //     // Check if size is required but not selected
// //     if (!selectedSize && product.sizes && product.sizes.length > 0) {
// //       showAlertMessage('Please select a size before adding to cart', 'error');
// //       return;
// //     }

// //     // Check if product is out of stock
// //     if (product.stock !== undefined && product.stock === 0) {
// //       showAlertMessage('This product is currently out of stock', 'error');
// //       return;
// //     }

// //     try {
// //       // Add to cart
// //       for (let i = 0; i < quantity; i++) {
// //         addToCart(product._id, selectedSize || 'default');
// //       }

// //       // Show success message
// //       const quantityText = quantity > 1 ? `${quantity} items` : '1 item';
// //       const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
// //       showAlertMessage(`✓ ${quantityText} added to cart${sizeText}`, 'success');

// //     } catch (error) {
// //       console.error('Error adding to cart:', error);
// //       showAlertMessage('Failed to add item to cart. Please try again.', 'error');
// //     }
// //   };

// //   // Get product images
// //   const getProductImages = () => {
// //     if (!product?.images || product.images.length === 0) {
// //       return ['https://via.placeholder.com/500x500?text=No+Image'];
// //     }
    
// //     return product.images.map(img => {
// //       if (typeof img === 'string') {
// //         return getImageUrl(img);
// //       }
// //       return img.url || getImageUrl(img.path || '');
// //     });
// //   };

// //   // Get pricing information
// //   const getPricingInfo = () => {
// //     if (!product) return { displayPrice: '0.00', hasDiscount: false };

// //     let displayPrice, originalPrice, hasDiscount = false, discountPercent = 0;

// //     if (product.effectivePrice) {
// //       displayPrice = product.effectivePrice;
// //       hasDiscount = product.discountPercent > 0;
// //       if (hasDiscount && product.price?.base) {
// //         originalPrice = product.price.base;
// //         discountPercent = product.discountPercent;
// //       }
// //     } else if (product.price && typeof product.price === 'object') {
// //       hasDiscount = product.price.discount > 0 && product.price.discount < product.price.base;
// //       if (hasDiscount) {
// //         displayPrice = product.price.discount;
// //         originalPrice = product.price.base;
// //         discountPercent = Math.round(((originalPrice - displayPrice) / originalPrice) * 100);
// //       } else {
// //         displayPrice = product.price.base || product.price.discount;
// //       }
// //     } else {
// //       displayPrice = product.price || 0;
// //     }

// //     return {
// //       displayPrice: Number(displayPrice).toFixed(2),
// //       originalPrice: originalPrice ? Number(originalPrice).toFixed(2) : null,
// //       hasDiscount,
// //       discountPercent
// //     };
// //   };

// //   // Custom Alert Component
// //   const CustomAlert = () => {
// //     if (!showAlert) return null;

// //     return (
// //       <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
// //         <div className={`
// //           rounded-lg p-4 shadow-lg border transform transition-all duration-300 ease-out
// //           ${alertType === 'success' 
// //             ? 'bg-green-50 border-green-200 text-green-800' 
// //             : 'bg-red-50 border-red-200 text-red-800'
// //           }
// //           ${showAlert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
// //         `}>
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-2">
// //               {alertType === 'success' ? (
// //                 <CheckCircle className="w-5 h-5 text-green-600" />
// //               ) : (
// //                 <X className="w-5 h-5 text-red-600" />
// //               )}
// //               <span className="font-medium text-sm">{alertMessage}</span>
// //             </div>
// //             <button 
// //               onClick={closeAlert}
// //               className={`
// //                 ml-2 p-1 rounded-full hover:opacity-75 transition-opacity
// //                 ${alertType === 'success' ? 'text-green-600' : 'text-red-600'}
// //               `}
// //             >
// //               <X className="w-4 h-4" />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Loading state
// //   if (loading || contextLoading) {
// //     return (
// //       <div className="min-h-screen bg-white flex items-center justify-center">
// //         <div className="text-center">
// //           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
// //           <p className="text-gray-600">Loading product...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Error state
// //   if (error || !product) {
// //     return (
// //       <div className="min-h-screen bg-white flex items-center justify-center">
// //         <div className="text-center">
// //           <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
// //           <button 
// //             onClick={onBack}
// //             className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
// //           >
// //             Back to Shop
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const productImages = getProductImages();
// //   const pricing = getPricingInfo();

// //   return (
// //     <div className="bg-white min-h-screen">
// //       {/* Custom Alert */}
// //       <CustomAlert />

// //       {/* Back Button */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
// //         {onBack && (
// //           <button 
// //             onClick={onBack}
// //             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
// //           >
// //             <ArrowLeft className="w-4 h-4" />
// //             Back
// //           </button>
// //         )}

// //         {/* Breadcrumb */}
// //         <div className="text-sm text-gray-500 mb-4 lg:mb-6">
// //           <span className="hover:text-gray-700 cursor-pointer">Shop</span>
// //           <span className="mx-2">›</span>
// //           {product.category && (
// //             <>
// //               <span className="hover:text-gray-700 cursor-pointer capitalize">{product.category}</span>
// //               <span className="mx-2">›</span>
// //             </>
// //           )}
// //           {product.subcategory && (
// //             <>
// //               <span className="hover:text-gray-700 cursor-pointer capitalize">{product.subcategory}</span>
// //               <span className="mx-2">›</span>
// //             </>
// //           )}
// //           <span className="text-gray-900">{product.name}</span>
// //         </div>

// //         {/* Mobile Layout */}
// //         <div className="lg:hidden">
// //           {/* Mobile Main Image */}
// //           <div className="mb-6">
// //             <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
// //               <img 
// //                 src={productImages[selectedImage]}
// //                 alt={product.name}
// //                 className="w-full h-full object-cover"
// //               />
// //             </div>
            
// //             {/* Mobile Thumbnail Carousel */}
// //             {productImages.length > 1 && (
// //               <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
// //                 {productImages.map((img, index) => (
// //                   <button
// //                     key={index}
// //                     onClick={() => setSelectedImage(index)}
// //                     className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
// //                       selectedImage === index 
// //                         ? 'border-gray-900' 
// //                         : 'border-gray-200'
// //                     }`}
// //                   >
// //                     <img 
// //                       src={img} 
// //                       alt={`Product view ${index + 1}`}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   </button>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           {/* Mobile Product Details */}
// //           <div className="space-y-6">
// //             {/* Product Title and Price */}
// //             <div>
// //               {product.brand && (
// //                 <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
// //               )}
// //               <h1 className="text-3xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
// //               <div className="flex items-baseline gap-2 mb-3">
// //                 {pricing.hasDiscount ? (
// //                   <>
// //                     <span className="text-xl text-red-600 font-semibold">
// //                       {currency}{pricing.displayPrice}
// //                     </span>
// //                     <span className="text-lg text-gray-400 line-through">
// //                       {currency}{pricing.originalPrice}
// //                     </span>
// //                     <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
// //                       -{pricing.discountPercent}% OFF
// //                     </span>
// //                   </>
// //                 ) : (
// //                   <span className="text-xl text-gray-900 font-semibold">
// //                     {currency}{pricing.displayPrice}
// //                   </span>
// //                 )}
// //               </div>

// //               {/* Stock Status */}
// //               {product.stock !== undefined && (
// //                 <div className="mb-3">
// //                   {product.stock > 0 ? (
// //                     <span className="text-sm text-green-600 flex items-center gap-1">
// //                       <Check className="w-3 h-3" />
// //                       In Stock ({product.stock} available)
// //                     </span>
// //                   ) : (
// //                     <span className="text-sm text-red-600">Out of Stock</span>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Rating (if available) */}
// //               {product.rating && (
// //                 <div className="flex items-center gap-2 mb-4">
// //                   <div className="flex">
// //                     {[...Array(5)].map((_, i) => (
// //                       <Star 
// //                         key={i} 
// //                         className={`w-4 h-4 ${
// //                           i < Math.floor(product.rating) 
// //                             ? 'fill-current text-yellow-400' 
// //                             : 'text-gray-300'
// //                         }`} 
// //                       />
// //                     ))}
// //                   </div>
// //                   <span className="text-sm text-gray-600">
// //                     {product.rating} ({product.reviewCount || 0} reviews)
// //                   </span>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Product Description */}
// //             {product.description && (
// //               <div className="border-t border-gray-200 pt-6">
// //                 <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
// //                 <p className="text-gray-600 text-sm leading-relaxed">
// //                   {product.description}
// //                 </p>
// //               </div>
// //             )}

// //             {/* Materials */}
// //             {product.materials && product.materials.length > 0 && (
// //               <div>
// //                 <div className="flex items-center gap-2 mb-3">
// //                   <span className="text-sm text-gray-700">Material:</span>
// //                   <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
// //                 </div>
// //                 <div className="flex gap-0 border-b border-gray-200">
// //                   {product.materials.map((material) => (
// //                     <button
// //                       key={material}
// //                       onClick={() => setSelectedMaterial(material)}
// //                       className={`px-0 py-2 text-sm border-b-2 mr-6 transition-colors capitalize ${
// //                         selectedMaterial === material 
// //                           ? 'border-gray-900 text-gray-900 font-medium' 
// //                           : 'border-transparent text-gray-500'
// //                       }`}
// //                     >
// //                       {material}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Colors */}
// //             {product.colors && product.colors.length > 0 && (
// //               <div>
// //                 <div className="flex items-center gap-2 mb-3">
// //                   <span className="text-sm text-gray-700">Color:</span>
// //                   <span className="text-sm font-medium capitalize">{selectedColor}</span>
// //                 </div>
// //                 <div className="flex gap-2 flex-wrap">
// //                   {product.colors.map((color) => (
// //                     <button
// //                       key={color}
// //                       onClick={() => setSelectedColor(color)}
// //                       className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
// //                         selectedColor === color 
// //                           ? 'border-gray-900 bg-gray-900 text-white' 
// //                           : 'border-gray-300 text-gray-700'
// //                       }`}
// //                     >
// //                       {color}
// //                     </button>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}

// //             {/* Sizes */}
// //             {product.sizes && product.sizes.length > 0 && (
// //               <div>
// //                 <div className="flex items-center gap-2 mb-3">
// //                   <span className="text-sm text-gray-700">Size:</span>
// //                   {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
// //                 </div>
// //                 <div className="grid grid-cols-4 gap-2">
// //                   {product.sizes.map((size) => (
// //                     <button
// //                       key={size}
// //                       onClick={() => setSelectedSize(size)}
// //                       className={`py-2 px-3 text-sm border transition-all ${
// //                         selectedSize === size
// //                           ? 'border-gray-900 bg-gray-900 text-white'
// //                           : 'border-gray-300 text-gray-700'
// //                       }`}
// //                     >
// //                       {size}
// //                     </button>
// //                   ))}
// //                 </div>
// //                 <p className="text-xs text-gray-500 mt-2">
// //                   Please select a size to continue
// //                 </p>
// //               </div>
// //             )}

// //             {/* Quantity */}
// //             <div>
// //               <div className="flex items-center gap-2 mb-3">
// //                 <span className="text-sm text-gray-700">Quantity:</span>
// //                 <span className="text-sm font-medium">{quantity}</span>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <button 
// //                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                   className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
// //                 >
// //                   -
// //                 </button>
// //                 <span className="w-12 text-center font-medium">{quantity}</span>
// //                 <button 
// //                   onClick={() => setQuantity(quantity + 1)}
// //                   className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
// //                 >
// //                   +
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="space-y-3 pb-6">
// //               <button 
// //                 onClick={handleAddToCart}
// //                 disabled={product.stock !== undefined && product.stock === 0}
// //                 className={`w-full py-3 px-6 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
// //                   (product.stock === undefined || product.stock > 0)
// //                     ? 'bg-gray-900 text-white hover:bg-gray-800' 
// //                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                 }`}
// //               >
// //                 <ShoppingCart className="w-4 h-4" />
// //                 {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
// //                 {quantity > 1 && ` (${quantity})`}
// //               </button>

// //               <button className="w-full text-center text-gray-700 py-2 border border-gray-300 transition-colors flex items-center justify-center gap-2 hover:bg-gray-50">
// //                 <Heart className="w-4 h-4" />
// //                 Add to Wishlist
// //               </button>

// //               <div className="text-center text-gray-600 text-sm">
// //                 Free shipping & returns on all orders
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Desktop Layout */}
// //         <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
// //           {/* Desktop Left - Thumbnail Images */}
// //           {productImages.length > 1 && (
// //             <div className="lg:col-span-1">
// //               <div className="space-y-3 sticky top-6">
// //                 {productImages.map((img, index) => (
// //                   <button
// //                     key={index}
// //                     onClick={() => setSelectedImage(index)}
// //                     className={`w-full aspect-square border-2 rounded-sm overflow-hidden transition-all ${
// //                       selectedImage === index 
// //                         ? 'border-gray-900 shadow-sm' 
// //                         : 'border-gray-200 hover:border-gray-300'
// //                     }`}
// //                   >
// //                     <img 
// //                       src={img} 
// //                       alt={`Product view ${index + 1}`}
// //                       className="w-full h-full object-cover"
// //                     />
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Desktop Center - Main Image */}
// //           <div className={`${productImages.length > 1 ? 'lg:col-span-6' : 'lg:col-span-7'} flex items-center justify-center`}>
// //             <div className="w-full max-w-lg">
// //               <img 
// //                 src={productImages[selectedImage]}
// //                 alt={product.name}
// //                 className="w-full h-auto object-cover rounded-lg"
// //               />
// //             </div>
// //           </div>

// //           {/* Desktop Right - Product Details */}
// //           <div className="lg:col-span-5">
// //             <div className="max-w-md sticky top-6">
// //               {/* Product Title and Price */}
// //               {product.brand && (
// //                 <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
// //               )}
// //               <h1 className="text-4xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
// //               <div className="flex items-baseline gap-2 mb-4">
// //                 {pricing.hasDiscount ? (
// //                   <>
// //                     <span className="text-xl text-red-600 font-semibold">
// //                       {currency}{pricing.displayPrice}
// //                     </span>
// //                     <span className="text-lg text-gray-400 line-through">
// //                       {currency}{pricing.originalPrice}
// //                     </span>
// //                     <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
// //                       -{pricing.discountPercent}% OFF
// //                     </span>
// //                   </>
// //                 ) : (
// //                   <span className="text-xl text-gray-900 font-semibold">
// //                     {currency}{pricing.displayPrice}
// //                   </span>
// //                 )}
// //               </div>

// //               {/* Stock Status */}
// //               {product.stock !== undefined && (
// //                 <div className="mb-4">
// //                   {product.stock > 0 ? (
// //                     <span className="text-sm text-green-600 flex items-center gap-1">
// //                       <Check className="w-3 h-3" />
// //                       In Stock ({product.stock} available)
// //                     </span>
// //                   ) : (
// //                     <span className="text-sm text-red-600">Out of Stock</span>
// //                   )}
// //                 </div>
// //               )}

// //               {/* Rating */}
// //               {product.rating && (
// //                 <div className="flex items-center gap-2 mb-6">
// //                   <div className="flex">
// //                     {[...Array(5)].map((_, i) => (
// //                       <Star 
// //                         key={i} 
// //                         className={`w-4 h-4 ${
// //                           i < Math.floor(product.rating) 
// //                             ? 'fill-current text-yellow-400' 
// //                             : 'text-gray-300'
// //                         }`} 
// //                       />
// //                     ))}
// //                   </div>
// //                   <span className="text-sm text-gray-600">
// //                     {product.rating} ({product.reviewCount || 0} reviews)
// //                   </span>
// //                 </div>
// //               )}

// //               {/* Description */}
// //               {product.description && (
// //                 <div className="mb-6 pb-6 border-b border-gray-200">
// //                   <p className="text-gray-600 leading-relaxed">
// //                     {product.description}
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Materials */}
// //               {product.materials && product.materials.length > 0 && (
// //                 <div className="mb-6">
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="text-sm text-gray-700">Material:</span>
// //                     <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
// //                   </div>
// //                   <div className="flex gap-0 border-b border-gray-200">
// //                     {product.materials.map((material) => (
// //                       <button
// //                         key={material}
// //                         onClick={() => setSelectedMaterial(material)}
// //                         className={`px-0 py-2 text-sm border-b-2 mr-8 transition-colors capitalize ${
// //                           selectedMaterial === material 
// //                             ? 'border-gray-900 text-gray-900 font-medium' 
// //                             : 'border-transparent text-gray-500 hover:text-gray-700'
// //                         }`}
// //                       >
// //                         {material}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Colors */}
// //               {product.colors && product.colors.length > 0 && (
// //                 <div className="mb-6">
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="text-sm text-gray-700">Color:</span>
// //                     <span className="text-sm font-medium capitalize">{selectedColor}</span>
// //                   </div>
// //                   <div className="flex gap-2 flex-wrap">
// //                     {product.colors.map((color) => (
// //                       <button
// //                         key={color}
// //                         onClick={() => setSelectedColor(color)}
// //                         className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
// //                           selectedColor === color 
// //                             ? 'border-gray-900 bg-gray-900 text-white' 
// //                             : 'border-gray-300 text-gray-700 hover:border-gray-400'
// //                         }`}
// //                       >
// //                         {color}
// //                       </button>
// //                     ))}
// //                   </div>
// //                 </div>
// //               )}

// //               {/* Sizes */}
// //               {product.sizes && product.sizes.length > 0 && (
// //                 <div className="mb-6">
// //                   <div className="flex items-center gap-2 mb-3">
// //                     <span className="text-sm text-gray-700">Size:</span>
// //                     {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
// //                   </div>
// //                   <div className="grid grid-cols-6 gap-2">
// //                     {product.sizes.map((size) => (
// //                       <button
// //                         key={size}
// //                         onClick={() => setSelectedSize(size)}
// //                         className={`py-2 px-3 text-sm border transition-all ${
// //                           selectedSize === size
// //                             ? 'border-gray-900 bg-gray-900 text-white'
// //                             : 'border-gray-300 text-gray-700 hover:border-gray-400'
// //                         }`}
// //                       >
// //                         {size}
// //                       </button>
// //                     ))}
// //                   </div>
// //                   <p className="text-xs text-gray-500 mt-2">
// //                     Please select a size to continue
// //                   </p>
// //                 </div>
// //               )}

// //               {/* Quantity */}
// //               <div className="mb-6">
// //                 <div className="flex items-center gap-2 mb-3">
// //                   <span className="text-sm text-gray-700">Quantity:</span>
// //                   <span className="text-sm font-medium">{quantity}</span>
// //                 </div>
// //                 <div className="flex items-center gap-2">
// //                   <button 
// //                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                     className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
// //                   >
// //                     -
// //                   </button>
// //                   <span className="w-12 text-center font-medium">{quantity}</span>
// //                   <button 
// //                     onClick={() => setQuantity(quantity + 1)}
// //                     className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Free shipping info */}
// //               <div className="text-sm text-gray-600 mb-6">
// //                 <p>Free shipping & returns on all orders</p>
// //               </div>

// //               {/* Add to Cart Button */}
// //               <button 
// //                 onClick={handleAddToCart}
// //                 disabled={product.stock !== undefined && product.stock === 0}
// //                 className={`w-full py-3 px-6 text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2 ${
// //                   (product.stock === undefined || product.stock > 0)
// //                     ? 'bg-gray-900 text-white hover:bg-gray-800' 
// //                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                 }`}
// //               >
// //                 <ShoppingCart className="w-4 h-4" />
// //                 {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
// //                 {quantity > 1 && ` (${quantity})`}
// //               </button>

// //               {/* Wishlist Button */}
// //               <button className="w-full text-center text-gray-700 hover:text-gray-900 py-2 border border-gray-300 hover:border-gray-400 transition-colors mb-4 flex items-center justify-center gap-2">
// //                 <Heart className="w-4 h-4" />
// //                 Add to Wishlist
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductPage;





// import React, { useState, useEffect, useContext } from 'react';
// import { Star, Check, Heart, ShoppingCart, ArrowLeft, Loader2, X, CheckCircle } from 'lucide-react';
// import { ShopContext } from '../context/ShopContext';
// import MeasurementModal from './MeasurementModel';

// const ProductPage = ({ productId, onBack }) => {
//   const { 
//     fetchProduct, 
//     addToCart, 
//     currency, 
//     getImageUrl,
//     loading: contextLoading,
//     backendUrl,
//     token
//   } = useContext(ShopContext);

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedMaterial, setSelectedMaterial] = useState('');
//   const [selectedWidth, setSelectedWidth] = useState('standard');
//   const [quantity, setQuantity] = useState(1);

//   // Alert states
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertType, setAlertType] = useState('success');
//   const [alertMessage, setAlertMessage] = useState('');

//   // Measurement modal states
//   const [showMeasurementModal, setShowMeasurementModal] = useState(false);
//   const [measurementLoading, setMeasurementLoading] = useState(false);
//   const [existingMeasurements, setExistingMeasurements] = useState(null);

//   // Fetch product data
//   useEffect(() => {
//     const loadProduct = async () => {
//       if (!productId) {
//         setError('Product ID not found');
//         setLoading(false);
//         return;
//       }

//       try {
//         setLoading(true);
//         setError(null);
//         console.log('Loading product with ID:', productId);
        
//         const productData = await fetchProduct(productId);
        
//         if (productData) {
//           setProduct(productData);
          
//           // Set initial selections
//           if (productData.colors && productData.colors.length > 0) {
//             setSelectedColor(productData.colors[0]);
//           }
//           if (productData.materials && productData.materials.length > 0) {
//             setSelectedMaterial(productData.materials[0]);
//           }
          
//           console.log('Product loaded successfully:', productData.name);
//         } else {
//           setError('Product not found');
//         }
//       } catch (err) {
//         console.error('Error loading product:', err);
//         setError('Failed to load product');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadProduct();
//   }, [productId, fetchProduct]);

//   // Fetch existing measurements when component mounts
//   useEffect(() => {
//     const fetchExistingMeasurements = async () => {
//       if (!token) return;

//       try {
//         const response = await fetch(`${backendUrl}/api/measurements`, {
//           headers: {
//             'token': token
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           if (data.success) {
//             setExistingMeasurements(data.data);
//             console.log('Existing measurements loaded');
//           }
//         }
//       } catch (error) {
//         console.log('No existing measurements found or error fetching:', error);
//       }
//     };

//     fetchExistingMeasurements();
//   }, [token, backendUrl]);

//   // Show alert function
//   const showAlertMessage = (message, type = 'success') => {
//     setAlertMessage(message);
//     setAlertType(type);
//     setShowAlert(true);
    
//     // Auto hide after 3 seconds
//     setTimeout(() => {
//       setShowAlert(false);
//     }, 3000);
//   };

//   // Close alert function
//   const closeAlert = () => {
//     setShowAlert(false);
//   };

//   // Check if all required selections are made
//   const areRequiredSelectionsMade = () => {
//     if (!selectedSize && product.sizes && product.sizes.length > 0) {
//       return false;
//     }
//     return true;
//   };

//   // Handle add to cart with measurement check
//   const handleAddToCart = async () => {
//     // First check if user is logged in
//     if (!token) {
//       showAlertMessage('Please login to add items to cart', 'error');
//       return;
//     }

//     // Check if required selections are made
//     if (!areRequiredSelectionsMade()) {
//       showAlertMessage('Please select a size before adding to cart', 'error');
//       return;
//     }

//     // Check if product is out of stock
//     if (product.stock !== undefined && product.stock === 0) {
//       showAlertMessage('This product is currently out of stock', 'error');
//       return;
//     }

//     // Check if measurements are required and not available
//     const requiresMeasurements = product.subcategory === 'Shoes' || product.subcategory === 'Jackets';
    
//     if (requiresMeasurements && !existingMeasurements) {
//       // Show measurement modal
//       setShowMeasurementModal(true);
//       return;
//     }

//     // Proceed with adding to cart
//     await proceedToAddToCart();
//   };

//   // Actually add to cart after measurements are confirmed
//   const proceedToAddToCart = async () => {
//     try {
//       // Add to cart
//       for (let i = 0; i < quantity; i++) {
//         addToCart(product._id, selectedSize || 'default');
//       }

//       // Show success message
//       const quantityText = quantity > 1 ? `${quantity} items` : '1 item';
//       const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
//       showAlertMessage(`✓ ${quantityText} added to cart${sizeText}`, 'success');

//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       showAlertMessage('Failed to add item to cart. Please try again.', 'error');
//     }
//   };

//   // Handle measurement save
//   const handleMeasurementSave = async (measurementData) => {
//     setMeasurementLoading(true);
    
//     try {
//       const response = await fetch(`${backendUrl}/api/measurements`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'token': token
//         },
//         body: JSON.stringify(measurementData)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setExistingMeasurements(data.data);
//         setShowMeasurementModal(false);
//         showAlertMessage('Measurements saved successfully!', 'success');
        
//         // Now proceed with adding to cart
//         setTimeout(async () => {
//           await proceedToAddToCart();
//         }, 1000);
//       } else {
//         throw new Error(data.message || 'Failed to save measurements');
//       }
//     } catch (error) {
//       console.error('Error saving measurements:', error);
//       showAlertMessage('Failed to save measurements. Please try again.', 'error');
//     } finally {
//       setMeasurementLoading(false);
//     }
//   };

//   // Get product images
//   const getProductImages = () => {
//     if (!product?.images || product.images.length === 0) {
//       return ['https://via.placeholder.com/500x500?text=No+Image'];
//     }
    
//     return product.images.map(img => {
//       if (typeof img === 'string') {
//         return getImageUrl(img);
//       }
//       return img.url || getImageUrl(img.path || '');
//     });
//   };

//   // Get pricing information
//   const getPricingInfo = () => {
//     if (!product) return { displayPrice: '0.00', hasDiscount: false };

//     let displayPrice, originalPrice, hasDiscount = false, discountPercent = 0;

//     if (product.effectivePrice) {
//       displayPrice = product.effectivePrice;
//       hasDiscount = product.discountPercent > 0;
//       if (hasDiscount && product.price?.base) {
//         originalPrice = product.price.base;
//         discountPercent = product.discountPercent;
//       }
//     } else if (product.price && typeof product.price === 'object') {
//       hasDiscount = product.price.discount > 0 && product.price.discount < product.price.base;
//       if (hasDiscount) {
//         displayPrice = product.price.discount;
//         originalPrice = product.price.base;
//         discountPercent = Math.round(((originalPrice - displayPrice) / originalPrice) * 100);
//       } else {
//         displayPrice = product.price.base || product.price.discount;
//       }
//     } else {
//       displayPrice = product.price || 0;
//     }

//     return {
//       displayPrice: Number(displayPrice).toFixed(2),
//       originalPrice: originalPrice ? Number(originalPrice).toFixed(2) : null,
//       hasDiscount,
//       discountPercent
//     };
//   };

//   // Custom Alert Component
//   const CustomAlert = () => {
//     if (!showAlert) return null;

//     return (
//       <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
//         <div className={`
//           rounded-lg p-4 shadow-lg border transform transition-all duration-300 ease-out
//           ${alertType === 'success' 
//             ? 'bg-green-50 border-green-200 text-green-800' 
//             : 'bg-red-50 border-red-200 text-red-800'
//           }
//           ${showAlert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
//         `}>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               {alertType === 'success' ? (
//                 <CheckCircle className="w-5 h-5 text-green-600" />
//               ) : (
//                 <X className="w-5 h-5 text-red-600" />
//               )}
//               <span className="font-medium text-sm">{alertMessage}</span>
//             </div>
//             <button 
//               onClick={closeAlert}
//               className={`
//                 ml-2 p-1 rounded-full hover:opacity-75 transition-opacity
//                 ${alertType === 'success' ? 'text-green-600' : 'text-red-600'}
//               `}
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Loading state
//   if (loading || contextLoading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
//           <p className="text-gray-600">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (error || !product) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
//           <button 
//             onClick={onBack}
//             className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
//           >
//             Back to Shop
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const productImages = getProductImages();
//   const pricing = getPricingInfo();
//   const requiresMeasurements = product.subcategory === 'Shoes' || product.subcategory === 'Jackets';

//   return (
//     <div className="bg-white min-h-screen">
//       {/* Custom Alert */}
//       <CustomAlert />

//       {/* Measurement Modal */}
//       <MeasurementModal
//         isOpen={showMeasurementModal}
//         onClose={() => setShowMeasurementModal(false)}
//         onSave={handleMeasurementSave}
//         productCategory={product.category}
//         productSubcategory={product.subcategory}
//         loading={measurementLoading}
//         existingMeasurements={existingMeasurements}
//       />

//       {/* Back Button */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         {onBack && (
//           <button 
//             onClick={onBack}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </button>
//         )}

//         {/* Breadcrumb */}
//         <div className="text-sm text-gray-500 mb-4 lg:mb-6">
//           <span className="hover:text-gray-700 cursor-pointer">Shop</span>
//           <span className="mx-2">›</span>
//           {product.category && (
//             <>
//               <span className="hover:text-gray-700 cursor-pointer capitalize">{product.category}</span>
//               <span className="mx-2">›</span>
//             </>
//           )}
//           {product.subcategory && (
//             <>
//               <span className="hover:text-gray-700 cursor-pointer capitalize">{product.subcategory}</span>
//               <span className="mx-2">›</span>
//             </>
//           )}
//           <span className="text-gray-900">{product.name}</span>
//         </div>

//         {/* Mobile Layout */}
//         <div className="lg:hidden">
//           {/* Mobile Main Image */}
//           <div className="mb-6">
//             <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
//               <img 
//                 src={productImages[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             {/* Mobile Thumbnail Carousel */}
//             {productImages.length > 1 && (
//               <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
//                 {productImages.map((img, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
//                       selectedImage === index 
//                         ? 'border-gray-900' 
//                         : 'border-gray-200'
//                     }`}
//                   >
//                     <img 
//                       src={img} 
//                       alt={`Product view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Mobile Product Details */}
//           <div className="space-y-6">
//             {/* Product Title and Price */}
//             <div>
//               {product.brand && (
//                 <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
//               )}
//               <h1 className="text-3xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
//               <div className="flex items-baseline gap-2 mb-3">
//                 {pricing.hasDiscount ? (
//                   <>
//                     <span className="text-xl text-red-600 font-semibold">
//                       {currency}{pricing.displayPrice}
//                     </span>
//                     <span className="text-lg text-gray-400 line-through">
//                       {currency}{pricing.originalPrice}
//                     </span>
//                     <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
//                       -{pricing.discountPercent}% OFF
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-xl text-gray-900 font-semibold">
//                     {currency}{pricing.displayPrice}
//                   </span>
//                 )}
//               </div>

//               {/* Measurement Requirement Notice */}
//               {requiresMeasurements && !existingMeasurements && (
//                 <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-sm text-blue-800">
//                     📏 Body measurements required for best fit
//                   </p>
//                 </div>
//               )}

//               {/* Stock Status */}
//               {product.stock !== undefined && (
//                 <div className="mb-3">
//                   {product.stock > 0 ? (
//                     <span className="text-sm text-green-600 flex items-center gap-1">
//                       <Check className="w-3 h-3" />
//                       In Stock ({product.stock} available)
//                     </span>
//                   ) : (
//                     <span className="text-sm text-red-600">Out of Stock</span>
//                   )}
//                 </div>
//               )}

//               {/* Rating (if available) */}
//               {product.rating && (
//                 <div className="flex items-center gap-2 mb-4">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`w-4 h-4 ${
//                           i < Math.floor(product.rating) 
//                             ? 'fill-current text-yellow-400' 
//                             : 'text-gray-300'
//                         }`} 
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {product.rating} ({product.reviewCount || 0} reviews)
//                   </span>
//                 </div>
//               )}
//             </div>

//             {/* Product Description */}
//             {product.description && (
//               <div className="border-t border-gray-200 pt-6">
//                 <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {product.description}
//                 </p>
//               </div>
//             )}

//             {/* Materials */}
//             {product.materials && product.materials.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-sm text-gray-700">Material:</span>
//                   <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
//                 </div>
//                 <div className="flex gap-0 border-b border-gray-200">
//                   {product.materials.map((material) => (
//                     <button
//                       key={material}
//                       onClick={() => setSelectedMaterial(material)}
//                       className={`px-0 py-2 text-sm border-b-2 mr-6 transition-colors capitalize ${
//                         selectedMaterial === material 
//                           ? 'border-gray-900 text-gray-900 font-medium' 
//                           : 'border-transparent text-gray-500'
//                       }`}
//                     >
//                       {material}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Colors */}
//             {product.colors && product.colors.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-sm text-gray-700">Color:</span>
//                   <span className="text-sm font-medium capitalize">{selectedColor}</span>
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                   {product.colors.map((color) => (
//                     <button
//                       key={color}
//                       onClick={() => setSelectedColor(color)}
//                       className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
//                         selectedColor === color 
//                           ? 'border-gray-900 bg-gray-900 text-white' 
//                           : 'border-gray-300 text-gray-700'
//                       }`}
//                     >
//                       {color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Sizes */}
//             {product.sizes && product.sizes.length > 0 && (
//               <div>
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-sm text-gray-700">Size:</span>
//                   {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
//                 </div>
//                 <div className="grid grid-cols-4 gap-2">
//                   {product.sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => setSelectedSize(size)}
//                       className={`py-2 px-3 text-sm border transition-all ${
//                         selectedSize === size
//                           ? 'border-gray-900 bg-gray-900 text-white'
//                           : 'border-gray-300 text-gray-700'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">
//                   Please select a size to continue
//                 </p>
//               </div>
//             )}

//             {/* Quantity */}
//             <div>
//               <div className="flex items-center gap-2 mb-3">
//                 <span className="text-sm text-gray-700">Quantity:</span>
//                 <span className="text-sm font-medium">{quantity}</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                 >
//                   -
//                 </button>
//                 <span className="w-12 text-center font-medium">{quantity}</span>
//                 <button 
//                   onClick={() => setQuantity(quantity + 1)}
//                   className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="space-y-3 pb-6">
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={product.stock !== undefined && product.stock === 0}
//                 className={`w-full py-3 px-6 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
//                   (product.stock === undefined || product.stock > 0)
//                     ? 'bg-gray-900 text-white hover:bg-gray-800' 
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 <ShoppingCart className="w-4 h-4" />
//                 {product.stock === 0 ? 'OUT OF STOCK' : 
//                  requiresMeasurements && !existingMeasurements ? 'ADD MEASUREMENTS & TO CART' : 'ADD TO CART'}
//                 {quantity > 1 && ` (${quantity})`}
//               </button>

//               <button className="w-full text-center text-gray-700 py-2 border border-gray-300 transition-colors flex items-center justify-center gap-2 hover:bg-gray-50">
//                 <Heart className="w-4 h-4" />
//                 Add to Wishlist
//               </button>

//               <div className="text-center text-gray-600 text-sm">
//                 Free shipping & returns on all orders
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
//           {/* Desktop Left - Thumbnail Images */}
//           {productImages.length > 1 && (
//             <div className="lg:col-span-1">
//               <div className="space-y-3 sticky top-6">
//                 {productImages.map((img, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`w-full aspect-square border-2 rounded-sm overflow-hidden transition-all ${
//                       selectedImage === index 
//                         ? 'border-gray-900 shadow-sm' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     <img 
//                       src={img} 
//                       alt={`Product view ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Desktop Center - Main Image */}
//           <div className={`${productImages.length > 1 ? 'lg:col-span-6' : 'lg:col-span-7'} flex items-center justify-center`}>
//             <div className="w-full max-w-lg">
//               <img 
//                 src={productImages[selectedImage]}
//                 alt={product.name}
//                 className="w-full h-auto object-cover rounded-lg"
//               />
//             </div>
//           </div>

//           {/* Desktop Right - Product Details */}
//           <div className="lg:col-span-5">
//             <div className="max-w-md sticky top-6">
//               {/* Product Title and Price */}
//               {product.brand && (
//                 <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
//               )}
//               <h1 className="text-4xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
//               <div className="flex items-baseline gap-2 mb-4">
//                 {pricing.hasDiscount ? (
//                   <>
//                     <span className="text-xl text-red-600 font-semibold">
//                       {currency}{pricing.displayPrice}
//                     </span>
//                     <span className="text-lg text-gray-400 line-through">
//                       {currency}{pricing.originalPrice}
//                     </span>
//                     <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
//                       -{pricing.discountPercent}% OFF
//                     </span>
//                   </>
//                 ) : (
//                   <span className="text-xl text-gray-900 font-semibold">
//                     {currency}{pricing.displayPrice}
//                   </span>
//                 )}
//               </div>

//               {/* Measurement Requirement Notice */}
//               {requiresMeasurements && !existingMeasurements && (
//                 <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//                   <p className="text-sm text-blue-800">
//                     📏 Body measurements required for best fit
//                   </p>
//                 </div>
//               )}

//               {/* Stock Status */}
//               {product.stock !== undefined && (
//                 <div className="mb-4">
//                   {product.stock > 0 ? (
//                     <span className="text-sm text-green-600 flex items-center gap-1">
//                       <Check className="w-3 h-3" />
//                       In Stock ({product.stock} available)
//                     </span>
//                   ) : (
//                     <span className="text-sm text-red-600">Out of Stock</span>
//                   )}
//                 </div>
//               )}

//               {/* Rating */}
//               {product.rating && (
//                 <div className="flex items-center gap-2 mb-6">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star 
//                         key={i} 
//                         className={`w-4 h-4 ${
//                           i < Math.floor(product.rating) 
//                             ? 'fill-current text-yellow-400' 
//                             : 'text-gray-300'
//                         }`} 
//                       />
//                     ))}
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {product.rating} ({product.reviewCount || 0} reviews)
//                   </span>
//                 </div>
//               )}

//               {/* Description */}
//               {product.description && (
//                 <div className="mb-6 pb-6 border-b border-gray-200">
//                   <p className="text-gray-600 leading-relaxed">
//                     {product.description}
//                   </p>
//                 </div>
//               )}

//               {/* Materials */}
//               {product.materials && product.materials.length > 0 && (
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-sm text-gray-700">Material:</span>
//                     <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
//                   </div>
//                   <div className="flex gap-0 border-b border-gray-200">
//                     {product.materials.map((material) => (
//                       <button
//                         key={material}
//                         onClick={() => setSelectedMaterial(material)}
//                         className={`px-0 py-2 text-sm border-b-2 mr-8 transition-colors capitalize ${
//                           selectedMaterial === material 
//                             ? 'border-gray-900 text-gray-900 font-medium' 
//                             : 'border-transparent text-gray-500 hover:text-gray-700'
//                         }`}
//                       >
//                         {material}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Colors */}
//               {product.colors && product.colors.length > 0 && (
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-sm text-gray-700">Color:</span>
//                     <span className="text-sm font-medium capitalize">{selectedColor}</span>
//                   </div>
//                   <div className="flex gap-2 flex-wrap">
//                     {product.colors.map((color) => (
//                       <button
//                         key={color}
//                         onClick={() => setSelectedColor(color)}
//                         className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
//                           selectedColor === color 
//                             ? 'border-gray-900 bg-gray-900 text-white' 
//                             : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                         }`}
//                       >
//                         {color}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Sizes */}
//               {product.sizes && product.sizes.length > 0 && (
//                 <div className="mb-6">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-sm text-gray-700">Size:</span>
//                     {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
//                   </div>
//                   <div className="grid grid-cols-6 gap-2">
//                     {product.sizes.map((size) => (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`py-2 px-3 text-sm border transition-all ${
//                           selectedSize === size
//                             ? 'border-gray-900 bg-gray-900 text-white'
//                             : 'border-gray-300 text-gray-700 hover:border-gray-400'
//                         }`}
//                       >
//                         {size}
//                       </button>
//                     ))}
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Please select a size to continue
//                   </p>
//                 </div>
//               )}

//               {/* Quantity */}
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-sm text-gray-700">Quantity:</span>
//                   <span className="text-sm font-medium">{quantity}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <button 
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                   >
//                     -
//                   </button>
//                   <span className="w-12 text-center font-medium">{quantity}</span>
//                   <button 
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Free shipping info */}
//               <div className="text-sm text-gray-600 mb-6">
//                 <p>Free shipping & returns on all orders</p>
//               </div>

//               {/* Add to Cart Button */}
//               <button 
//                 onClick={handleAddToCart}
//                 disabled={product.stock !== undefined && product.stock === 0}
//                 className={`w-full py-3 px-6 text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2 ${
//                   (product.stock === undefined || product.stock > 0)
//                     ? 'bg-gray-900 text-white hover:bg-gray-800' 
//                     : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 }`}
//               >
//                 <ShoppingCart className="w-4 h-4" />
//                 {product.stock === 0 ? 'OUT OF STOCK' : 
//                  requiresMeasurements && !existingMeasurements ? 'ADD MEASUREMENTS & TO CART' : 'ADD TO CART'}
//                 {quantity > 1 && ` (${quantity})`}
//               </button>

//               {/* Wishlist Button */}
//               <button className="w-full text-center text-gray-700 hover:text-gray-900 py-2 border border-gray-300 hover:border-gray-400 transition-colors mb-4 flex items-center justify-center gap-2">
//                 <Heart className="w-4 h-4" />
//                 Add to Wishlist
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;









import React, { useState, useEffect, useContext } from 'react';
import { Star, Check, Heart, ShoppingCart, ArrowLeft, Loader2, X, CheckCircle } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';
import MeasurementModal from './MeasurementModal';

const ProductPage = ({ productId, onBack }) => {
  const { 
    fetchProduct, 
    addToCart, 
    currency, 
    getImageUrl,
    loading: contextLoading,
    backendUrl,
    token
  } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // Measurement modal states
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [measurementLoading, setMeasurementLoading] = useState(false);
  const [existingMeasurements, setExistingMeasurements] = useState(null);

  // Fetch product data
  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setError('Product ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('Loading product with ID:', productId);
        
        const productData = await fetchProduct(productId);
        
        if (productData) {
          setProduct(productData);
          
          // Set initial selections
          if (productData.colors && productData.colors.length > 0) {
            setSelectedColor(productData.colors[0]);
          }
          if (productData.materials && productData.materials.length > 0) {
            setSelectedMaterial(productData.materials[0]);
          }
          
          console.log('Product loaded successfully:', productData.name);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId, fetchProduct]);

  // Fetch existing measurements when component mounts
  useEffect(() => {
    const fetchExistingMeasurements = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${backendUrl}/api/measurements`, {
          headers: {
            'token': token
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setExistingMeasurements(data.data);
            console.log('Existing measurements loaded');
          }
        }
      } catch (error) {
        console.log('No existing measurements found or error fetching:', error);
      }
    };

    fetchExistingMeasurements();
  }, [token, backendUrl]);

  // Show alert function
  const showAlertMessage = (message, type = 'success') => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // Close alert function
  const closeAlert = () => {
    setShowAlert(false);
  };

  // Handle add to cart with measurement check
  const handleAddToCart = async () => {
    // First check if user is logged in
    if (!token) {
      showAlertMessage('Please login to add items to cart', 'error');
      return;
    }

    // Check if product is out of stock
    if (product.stock !== undefined && product.stock === 0) {
      showAlertMessage('This product is currently out of stock', 'error');
      return;
    }

    // Check if measurements are required for this product
    const requiresMeasurements = product.subcategory === 'Shoes' || product.subcategory === 'Jackets';
    
    // If measurements required but don't exist, open modal (regardless of size selection)
    if (requiresMeasurements && !existingMeasurements) {
      setShowMeasurementModal(true);
      return;
    }

    // Now check if size is selected (after measurement check)
    if (!selectedSize && product.sizes && product.sizes.length > 0) {
      showAlertMessage('Please select a size before adding to cart', 'error');
      return;
    }

    // All checks passed, proceed with adding to cart
    await proceedToAddToCart();
  };

  // Actually add to cart after measurements are confirmed
  const proceedToAddToCart = async () => {
    try {
      // Add to cart
      for (let i = 0; i < quantity; i++) {
        addToCart(product._id, selectedSize || 'default');
      }

      // Show success message
      const quantityText = quantity > 1 ? `${quantity} items` : '1 item';
      const sizeText = selectedSize ? ` (Size: ${selectedSize})` : '';
      showAlertMessage(`✓ ${quantityText} added to cart${sizeText}`, 'success');

    } catch (error) {
      console.error('Error adding to cart:', error);
      showAlertMessage('Failed to add item to cart. Please try again.', 'error');
    }
  };

  // Handle measurement save
  const handleMeasurementSave = async (measurementData) => {
    setMeasurementLoading(true);
    
    try {
      const response = await fetch(`${backendUrl}/api/measurements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify(measurementData)
      });

      const data = await response.json();
      
      if (data.success) {
        setExistingMeasurements(data.data);
        setShowMeasurementModal(false);
        showAlertMessage('Measurements saved successfully!', 'success');
        
        // Show message to select size if not selected
        setTimeout(() => {
          if (!selectedSize && product.sizes && product.sizes.length > 0) {
            showAlertMessage('Now please select a size to continue', 'error');
          } else {
            // If size already selected, add to cart automatically
            proceedToAddToCart();
          }
        }, 1000);
      } else {
        throw new Error(data.message || 'Failed to save measurements');
      }
    } catch (error) {
      console.error('Error saving measurements:', error);
      showAlertMessage('Failed to save measurements. Please try again.', 'error');
    } finally {
      setMeasurementLoading(false);
    }
  };

  // Get product images
  const getProductImages = () => {
    if (!product?.images || product.images.length === 0) {
      return ['https://via.placeholder.com/500x500?text=No+Image'];
    }
    
    return product.images.map(img => {
      if (typeof img === 'string') {
        return getImageUrl(img);
      }
      return img.url || getImageUrl(img.path || '');
    });
  };

  // Get pricing information
  const getPricingInfo = () => {
    if (!product) return { displayPrice: '0.00', hasDiscount: false };

    let displayPrice, originalPrice, hasDiscount = false, discountPercent = 0;

    if (product.effectivePrice) {
      displayPrice = product.effectivePrice;
      hasDiscount = product.discountPercent > 0;
      if (hasDiscount && product.price?.base) {
        originalPrice = product.price.base;
        discountPercent = product.discountPercent;
      }
    } else if (product.price && typeof product.price === 'object') {
      hasDiscount = product.price.discount > 0 && product.price.discount < product.price.base;
      if (hasDiscount) {
        displayPrice = product.price.discount;
        originalPrice = product.price.base;
        discountPercent = Math.round(((originalPrice - displayPrice) / originalPrice) * 100);
      } else {
        displayPrice = product.price.base || product.price.discount;
      }
    } else {
      displayPrice = product.price || 0;
    }

    return {
      displayPrice: Number(displayPrice).toFixed(2),
      originalPrice: originalPrice ? Number(originalPrice).toFixed(2) : null,
      hasDiscount,
      discountPercent
    };
  };

  // Custom Alert Component
  const CustomAlert = () => {
    if (!showAlert) return null;

    return (
      <div className="fixed top-4 right-4 z-50 max-w-sm w-full">
        <div className={`
          rounded-lg p-4 shadow-lg border transform transition-all duration-300 ease-out
          ${alertType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
          }
          ${showAlert ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
        `}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {alertType === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-600" />
              )}
              <span className="font-medium text-sm">{alertMessage}</span>
            </div>
            <button 
              onClick={closeAlert}
              className={`
                ml-2 p-1 rounded-full hover:opacity-75 transition-opacity
                ${alertType === 'success' ? 'text-green-600' : 'text-red-600'}
              `}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading || contextLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <button 
            onClick={onBack}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const productImages = getProductImages();
  const pricing = getPricingInfo();
  const requiresMeasurements = product.subcategory === 'Shoes' || product.subcategory === 'Jackets';

  return (
    <div className="bg-white min-h-screen">
      {/* Custom Alert */}
      <CustomAlert />

      {/* Measurement Modal */}
      <MeasurementModal
        isOpen={showMeasurementModal}
        onClose={() => setShowMeasurementModal(false)}
        onSave={handleMeasurementSave}
        productCategory={product.category}
        productSubcategory={product.subcategory}
        loading={measurementLoading}
        existingMeasurements={existingMeasurements}
      />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {onBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}

        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-4 lg:mb-6">
          <span className="hover:text-gray-700 cursor-pointer">Shop</span>
          <span className="mx-2">›</span>
          {product.category && (
            <>
              <span className="hover:text-gray-700 cursor-pointer capitalize">{product.category}</span>
              <span className="mx-2">›</span>
            </>
          )}
          {product.subcategory && (
            <>
              <span className="hover:text-gray-700 cursor-pointer capitalize">{product.subcategory}</span>
              <span className="mx-2">›</span>
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {/* Mobile Main Image */}
          <div className="mb-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-50">
              <img 
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Mobile Thumbnail Carousel */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 border-2 rounded overflow-hidden ${
                      selectedImage === index 
                        ? 'border-gray-900' 
                        : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Product Details */}
          <div className="space-y-6">
            {/* Product Title and Price */}
            <div>
              {product.brand && (
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
              )}
              <h1 className="text-3xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-baseline gap-2 mb-3">
                {pricing.hasDiscount ? (
                  <>
                    <span className="text-xl text-red-600 font-semibold">
                      {currency}{pricing.displayPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {currency}{pricing.originalPrice}
                    </span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                      -{pricing.discountPercent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl text-gray-900 font-semibold">
                    {currency}{pricing.displayPrice}
                  </span>
                )}
              </div>

              {/* Measurement Requirement Notice */}
              {requiresMeasurements && !existingMeasurements && (
                <div className="mb-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📏 Body measurements required for best fit
                  </p>
                </div>
              )}

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className="mb-3">
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-sm text-red-600">Out of Stock</span>
                  )}
                </div>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-current text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">Material:</span>
                  <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
                </div>
                <div className="flex gap-0 border-b border-gray-200">
                  {product.materials.map((material) => (
                    <button
                      key={material}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-0 py-2 text-sm border-b-2 mr-6 transition-colors capitalize ${
                        selectedMaterial === material 
                          ? 'border-gray-900 text-gray-900 font-medium' 
                          : 'border-transparent text-gray-500'
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">Color:</span>
                  <span className="text-sm font-medium capitalize">{selectedColor}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
                        selectedColor === color 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">Size:</span>
                  {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-3 text-sm border transition-all ${
                        selectedSize === size
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please select a size to continue
                </p>
              </div>
            )}

            {/* Quantity */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-700">Quantity:</span>
                <span className="text-sm font-medium">{quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pb-6">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock !== undefined && product.stock === 0}
                className={`w-full py-3 px-6 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  (product.stock === undefined || product.stock > 0)
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.stock === 0 ? 'OUT OF STOCK' : 
                 requiresMeasurements && !existingMeasurements ? 'ADD MEASUREMENTS & TO CART' : 'ADD TO CART'}
                {quantity > 1 && ` (${quantity})`}
              </button>

              <button className="w-full text-center text-gray-700 py-2 border border-gray-300 transition-colors flex items-center justify-center gap-2 hover:bg-gray-50">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button>

              <div className="text-center text-gray-600 text-sm">
                Free shipping & returns on all orders
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Desktop Left - Thumbnail Images */}
          {productImages.length > 1 && (
            <div className="lg:col-span-1">
              <div className="space-y-3 sticky top-6">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-full aspect-square border-2 rounded-sm overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'border-gray-900 shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Center - Main Image */}
          <div className={`${productImages.length > 1 ? 'lg:col-span-6' : 'lg:col-span-7'} flex items-center justify-center`}>
            <div className="w-full max-w-lg">
              <img 
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Right - Product Details */}
          <div className="lg:col-span-5">
            <div className="max-w-md sticky top-6">
              {/* Product Title and Price */}
              {product.brand && (
                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{product.brand}</p>
              )}
              <h1 className="text-4xl font-normal text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-baseline gap-2 mb-4">
                {pricing.hasDiscount ? (
                  <>
                    <span className="text-xl text-red-600 font-semibold">
                      {currency}{pricing.displayPrice}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {currency}{pricing.originalPrice}
                    </span>
                    <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                      -{pricing.discountPercent}% OFF
                    </span>
                  </>
                ) : (
                  <span className="text-xl text-gray-900 font-semibold">
                    {currency}{pricing.displayPrice}
                  </span>
                )}
              </div>

              {/* Measurement Requirement Notice */}
              {requiresMeasurements && !existingMeasurements && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    📏 Body measurements required for best fit
                  </p>
                </div>
              )}

              {/* Stock Status */}
              {product.stock !== undefined && (
                <div className="mb-4">
                  {product.stock > 0 ? (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      In Stock ({product.stock} available)
                    </span>
                  ) : (
                    <span className="text-sm text-red-600">Out of Stock</span>
                  )}
                </div>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) 
                            ? 'fill-current text-yellow-400' 
                            : 'text-gray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount || 0} reviews)
                  </span>
                </div>
              )}

              {/* Description */}
              {product.description && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-700">Material:</span>
                    <span className="text-sm font-medium capitalize">{selectedMaterial}</span>
                  </div>
                  <div className="flex gap-0 border-b border-gray-200">
                    {product.materials.map((material) => (
                      <button
                        key={material}
                        onClick={() => setSelectedMaterial(material)}
                        className={`px-0 py-2 text-sm border-b-2 mr-8 transition-colors capitalize ${
                          selectedMaterial === material 
                            ? 'border-gray-900 text-gray-900 font-medium' 
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {material}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-700">Color:</span>
                    <span className="text-sm font-medium capitalize">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-2 text-sm border rounded capitalize transition-all ${
                          selectedColor === color 
                            ? 'border-gray-900 bg-gray-900 text-white' 
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-gray-700">Size:</span>
                    {selectedSize && <span className="text-sm font-medium">{selectedSize}</span>}
                  </div>
                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 text-sm border transition-all ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Please select a size to continue
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-700">Quantity:</span>
                  <span className="text-sm font-medium">{quantity}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Free shipping info */}
              <div className="text-sm text-gray-600 mb-6">
                <p>Free shipping & returns on all orders</p>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock !== undefined && product.stock === 0}
                className={`w-full py-3 px-6 text-sm font-medium transition-colors mb-3 flex items-center justify-center gap-2 ${
                  (product.stock === undefined || product.stock > 0)
                    ? 'bg-gray-900 text-white hover:bg-gray-800' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {product.stock === 0 ? 'OUT OF STOCK' : 
                 requiresMeasurements && !existingMeasurements ? 'ADD MEASUREMENTS & TO CART' : 'ADD TO CART'}
                {quantity > 1 && ` (${quantity})`}
              </button>

              {/* Wishlist Button */}
              <button className="w-full text-center text-gray-700 hover:text-gray-900 py-2 border border-gray-300 hover:border-gray-400 transition-colors mb-4 flex items-center justify-center gap-2">
                <Heart className="w-4 h-4" />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;