// // import React, { useContext, useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import { ShopContext } from '../context/ShopContext';
// // import { assets } from '../assets/assets';
// // import RelatedProducts from '../components/RelatedProducts';

// // const Product = () => {
// //   const { productId } = useParams();
// //   const { products, currency, addToCart, getImageUrl } = useContext(ShopContext);
// //   const [productData, setProductData] = useState(null);
// //   const [image, setImage] = useState('');
// //   const [size, setSize] = useState('');
// //   const [selectedMaterial, setSelectedMaterial] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
// //   const [quantity, setQuantity] = useState(1);

// //   const fetchProductData = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       // First try to find in existing products
// //       let product = products.find((item) => item._id === productId);
      
// //       // If not found in context, fetch from API
// //       if (!product && productId) {
// //         console.log('Product not found in context, fetching from API...');
// //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000'}/api/product/${productId}`);
// //         const data = await response.json();
        
// //         if (data.success && data.data) {
// //           product = data.data;
// //         } else {
// //           throw new Error(data.message || 'Product not found');
// //         }
// //       }
      
// //       if (product) {
// //         setProductData(product);
        
// //         // Set primary image or first image
// //         const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
// //         if (primaryImage) {
// //           const imageUrl = getImageUrl(primaryImage.url || primaryImage.filename || primaryImage);
// //           setImage(imageUrl);
// //           setSelectedImageIndex(product.images.findIndex(img => 
// //             (img.isPrimary) || (product.images.indexOf(img) === 0)
// //           ));
// //         }
        
// //         // Set default material for shoes
// //         if (product.subcategory === 'Shoes' && product.shoeDetails?.materials?.length > 0) {
// //           setSelectedMaterial(product.shoeDetails.materials[0]);
// //         }
        
// //         console.log('Product loaded:', product);
// //       } else {
// //         setError('Product not found');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching product:', err);
// //       setError(err.message || 'Failed to load product');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (productId) {
// //       fetchProductData();
// //     }
// //   }, [productId, products]);

// //   // Get available sizes based on subcategory
// //   const getAvailableSizes = () => {
// //     if (!productData) return [];
    
// //     if (productData.subcategory === 'Shoes' && productData.shoeDetails?.sizes) {
// //       return productData.shoeDetails.sizes
// //         .filter(size => size.available && (size.stock > 0))
// //         .map(size => size.sizeLabel);
// //     } else if (productData.subcategory === 'Jackets' && productData.jacketDetails?.sizes) {
// //       return productData.jacketDetails.sizes
// //         .filter(size => size.available && (size.stock > 0))
// //         .map(size => size.sizeLabel);
// //     }
    
// //     return [];
// //   };

// //   // Get available materials for shoes
// //   const getAvailableMaterials = () => {
// //     if (!productData || productData.subcategory !== 'Shoes') return [];
// //     return productData.shoeDetails?.materials || [];
// //   };

// //   // Get product price info
// //   const getPriceInfo = () => {
// //     if (!productData) return { displayPrice: 0, originalPrice: 0, hasDiscount: false };
    
// //     const effectivePrice = productData.effectivePrice || 
// //                           (productData.price?.discount > 0 ? productData.price.discount : productData.price?.base) || 
// //                           productData.price || 0;
    
// //     const originalPrice = productData.price?.base || productData.price || effectivePrice;
// //     const hasDiscount = productData.discountPercent > 0 || 
// //                        (productData.price?.discount > 0 && productData.price?.discount < productData.price?.base);
    
// //     return {
// //       displayPrice: effectivePrice,
// //       originalPrice: originalPrice,
// //       hasDiscount: hasDiscount,
// //       discountPercent: productData.discountPercent || 0
// //     };
// //   };

// //   // Get product images
// //   const getProductImages = () => {
// //     if (!productData?.images || productData.images.length === 0) {
// //       return ['https://via.placeholder.com/500x500?text=No+Image'];
// //     }
    
// //     return productData.images.map(img => {
// //       if (typeof img === 'string') {
// //         return getImageUrl(img);
// //       }
// //       return getImageUrl(img.url || img.filename);
// //     });
// //   };

// //   // Handle add to cart
// //   const handleAddToCart = () => {
// //     const availableSizes = getAvailableSizes();
    
// //     if (availableSizes.length > 0 && !size) {
// //       alert('Please select a size');
// //       return;
// //     }
    
// //     // Add items based on quantity
// //     for (let i = 0; i < quantity; i++) {
// //       addToCart(productData._id, size || 'default', selectedMaterial?._id);
// //     }
// //   };

// //   // Handle image selection
// //   const handleImageSelect = (img, index) => {
// //     setImage(img);
// //     setSelectedImageIndex(index);
// //   };

// //   // Handle material selection
// //   const handleMaterialSelect = (material) => {
// //     setSelectedMaterial(material);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
// //           <p className="text-gray-600">Loading product...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || !productData) {
// //     return (
// //       <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
// //         <div className="text-center">
// //           <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
// //           <button 
// //             onClick={() => window.history.back()}
// //             className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors"
// //           >
// //             Go Back
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const availableSizes = getAvailableSizes();
// //   const availableMaterials = getAvailableMaterials();
// //   const productImages = getProductImages();
// //   const priceInfo = getPriceInfo();

// //   return (
// //     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
// //       {/* Breadcrumb */}
// //       <div className="text-sm text-gray-500 mb-6">
// //         <span 
// //           className="hover:text-gray-700 cursor-pointer" 
// //           onClick={() => window.history.back()}
// //         >
// //           Shop
// //         </span>
// //         <span className="mx-2">›</span>
// //         {productData.category && (
// //           <>
// //             <span className="hover:text-gray-700 cursor-pointer capitalize">
// //               {productData.category}
// //             </span>
// //             <span className="mx-2">›</span>
// //           </>
// //         )}
// //         {productData.subcategory && (
// //           <>
// //             <span className="hover:text-gray-700 cursor-pointer capitalize">
// //               {productData.subcategory}
// //             </span>
// //             <span className="mx-2">›</span>
// //           </>
// //         )}
// //         <span className="text-gray-900">{productData.name}</span>
// //       </div>

// //       {/* Product Section */}
// //       <div className="flex flex-col sm:flex-row gap-12">
// //         {/* Left Section: Images */}
// //         <div className="flex-1 flex flex-col sm:flex-row gap-3">
// //           {/* Thumbnails */}
// //           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18%] w-full gap-2">
// //             {productImages.map((item, index) => (
// //               <img
// //                 key={index}
// //                 onClick={() => handleImageSelect(item, index)}
// //                 src={item}
// //                 className={`w-24 h-24 sm:w-full sm:h-24 object-cover cursor-pointer border-2 rounded flex-shrink-0 transition-all duration-300 hover:scale-105 ${
// //                   selectedImageIndex === index ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
// //                 }`}
// //                 alt={productData.images?.[index]?.altText || `Thumbnail ${index + 1}`}
// //                 onError={(e) => {
// //                   e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
// //                 }}
// //               />
// //             ))}
// //           </div>
          
// //           {/* Main Image */}
// //           <div className="w-full sm:w-[82%]">
// //             <img 
// //               src={image} 
// //               className="w-full h-auto max-h-[600px] object-cover border border-gray-200 rounded shadow-md transition-all duration-300 hover:shadow-lg"
// //               alt={productData.images?.[selectedImageIndex]?.altText || productData.name}
// //               onError={(e) => {
// //                 e.target.src = 'https://via.placeholder.com/500x500?text=Image+Error';
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {/* Right Section: Product Details */}
// //         <div className="flex-1">
// //           {/* Brand */}
// //           {productData.brand && (
// //             <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
// //               {productData.brand}
// //             </p>
// //           )}
          
// //           {/* Product Name */}
// //           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          
// //           {/* Rating */}
// //           <div className="flex items-center gap-1 mt-2">
// //             {[...Array(5)].map((_, i) => (
// //               <img 
// //                 key={i}
// //                 src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
// //                 className="w-3.5" 
// //                 alt="Star" 
// //               />
// //             ))}
// //             <p className="pl-2 text-sm text-gray-600">
// //               ({productData.viewCount || 0} views) • ({productData.purchaseCount || 0} sold)
// //             </p>
// //           </div>
          
// //           {/* Price */}
// //           <div className="mt-5 flex items-baseline gap-3">
// //             {priceInfo.hasDiscount ? (
// //               <>
// //                 <span className="text-3xl font-medium text-red-600">
// //                   {currency}{priceInfo.displayPrice}
// //                 </span>
// //                 <span className="text-xl text-gray-400 line-through">
// //                   {currency}{priceInfo.originalPrice}
// //                 </span>
// //                 {priceInfo.discountPercent > 0 && (
// //                   <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
// //                     -{priceInfo.discountPercent}% OFF
// //                   </span>
// //                 )}
// //               </>
// //             ) : (
// //               <span className="text-3xl font-medium text-gray-900">
// //                 {currency}{priceInfo.displayPrice}
// //               </span>
// //             )}
// //           </div>
          
// //           {/* Stock Status */}
// //           <div className="mt-3">
// //             {productData.stockQuantity > 0 ? (
// //               <p className="text-green-600 text-sm">
// //                 ✓ In Stock ({productData.stockQuantity} available)
// //               </p>
// //             ) : (
// //               <p className="text-red-600 text-sm">✗ Out of Stock</p>
// //             )}
// //           </div>
          
// //           {/* Description */}
// //           <p className="mt-5 text-gray-500 leading-relaxed">
// //             {productData.description}
// //           </p>
          
// //           {/* Product Details */}
// //           <div className="mt-6 space-y-3">
// //             {/* Category & Subcategory */}
// //             <div className="text-sm">
// //               <span className="text-gray-600">Category: </span>
// //               <span className="font-medium capitalize">
// //                 {productData.category} › {productData.subcategory}
// //               </span>
// //             </div>
            
// //             {/* SKU */}
// //             <div className="text-sm">
// //               <span className="text-gray-600">SKU: </span>
// //               <span className="font-medium">{productData.sku}</span>
// //             </div>
            
// //             {/* Style (for shoes) */}
// //             {productData.subcategory === 'Shoes' && productData.shoeDetails?.style && (
// //               <div className="text-sm">
// //                 <span className="text-gray-600">Style: </span>
// //                 <span className="font-medium">{productData.shoeDetails.style}</span>
// //               </div>
// //             )}
            
// //             {/* Season (for jackets) */}
// //             {productData.subcategory === 'Jackets' && productData.jacketDetails?.season && (
// //               <div className="text-sm">
// //                 <span className="text-gray-600">Season: </span>
// //                 <span className="font-medium">{productData.jacketDetails.season}</span>
// //               </div>
// //             )}

// //             {/* Jacket Material */}
// //             {productData.subcategory === 'Jackets' && productData.jacketDetails?.material && (
// //               <div className="text-sm">
// //                 <span className="text-gray-600">Material: </span>
// //                 <span className="font-medium">{productData.jacketDetails.material}</span>
// //               </div>
// //             )}

// //             {/* Tags */}
// //             {productData.tags && productData.tags.length > 0 && (
// //               <div className="text-sm">
// //                 <span className="text-gray-600">Tags: </span>
// //                 <div className="flex flex-wrap gap-1 mt-1">
// //                   {productData.tags.map((tag, index) => (
// //                     <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-sm text-xs">
// //                       {tag}
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
          
// //           {/* Enhanced Material Selection (for shoes) */}
// //           {availableMaterials.length > 0 && (
// //             <div className="flex flex-col gap-4 my-8">
// //               <div>
// //                 <p className="font-medium text-lg mb-1">Color: {selectedMaterial?.colorName || 'Select Color'}</p>
// //                 {selectedMaterial?.leatherType && (
// //                   <p className="text-sm text-gray-500 uppercase tracking-wider">
// //                     {selectedMaterial.leatherType}
// //                   </p>
// //                 )}
// //               </div>
              
// //               <div className="flex flex-wrap gap-3">
// //                 {availableMaterials.map((material, index) => (
// //                   <div
// //                     key={index}
// //                     onClick={() => handleMaterialSelect(material)}
// //                     className="group cursor-pointer transition-all duration-200"
// //                   >
// //                     {/* Material Option - Show actual product image */}
// //                     <div className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
// //                       selectedMaterial?._id === material._id || selectedMaterial === material
// //                         ? 'border-black shadow-lg' 
// //                         : 'border-gray-300 hover:border-gray-400'
// //                     }`}>
// //                       {/* Show actual product image for this material/color */}
// //                       {material.image || material.imageUrl ? (
// //                         <img 
// //                           src={getImageUrl(material.image || material.imageUrl)}
// //                           alt={material.colorName}
// //                           className="w-full h-full object-cover"
// //                           onError={(e) => {
// //                             // Fallback to main product image if material image fails
// //                             e.target.src = image;
// //                           }}
// //                         />
// //                       ) : (
// //                         // Fallback to main product image if no specific material image
// //                         <img 
// //                           src={image}
// //                           alt={material.colorName}
// //                           className="w-full h-full object-cover"
// //                         />
// //                       )}
// //                     </div>
                    
// //                     {/* Material name below image */}
// //                     <div className="text-center mt-1">
// //                       <p className="text-xs text-gray-600 capitalize">
// //                         {material.colorName}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Material Details */}
// //               {selectedMaterial && selectedMaterial.leatherType && (
// //                 <div className="mt-2">
// //                   <p className="text-sm text-gray-600">
// //                     Material: <span className="font-medium">{selectedMaterial.leatherType}</span>
// //                     {selectedMaterial.soleMaterial && (
// //                       <span> • Sole: {selectedMaterial.soleMaterial}</span>
// //                     )}
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Size Selection */}
// //           {availableSizes.length > 0 && (
// //             <div className="flex flex-col gap-4 my-8">
// //               <p className="font-medium">Select Size</p>
// //               <div className="flex gap-2 flex-wrap">
// //                 {availableSizes.map((sizeItem, index) => (
// //                   <button
// //                     key={index}
// //                     onClick={() => setSize(sizeItem)}
// //                     className={`bg-gray-100 py-2 px-4 border transition-all duration-300 hover:shadow-sm transform hover:scale-105 ${
// //                       sizeItem === size 
// //                         ? 'border-orange-500 bg-orange-50 shadow-md scale-105' 
// //                         : 'border-gray-200 hover:border-gray-300'
// //                     }`}
// //                   >
// //                     {sizeItem}
// //                   </button>
// //                 ))}
// //               </div>
// //               {size && (
// //                 <p className="text-sm text-green-600">Selected: {size}</p>
// //               )}
// //             </div>
// //           )}
          
// //           {/* Quantity Selector */}
// //           <div className="flex flex-col gap-4 my-8">
// //             <p className="font-medium">Quantity</p>
// //             <div className="flex items-center gap-3">
// //               <button 
// //                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
// //                 className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
// //               >
// //                 -
// //               </button>
// //               <span className="w-12 text-center font-medium">{quantity}</span>
// //               <button 
// //                 onClick={() => setQuantity(Math.min(productData.stockQuantity, quantity + 1))}
// //                 className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
// //               >
// //                 +
// //               </button>
// //             </div>
// //           </div>
          
// //           {/* Add to Cart Button */}
// //           <button 
// //             onClick={handleAddToCart}
// //             disabled={productData.stockQuantity === 0 || productData.status !== 'Active'}
// //             className={`px-8 py-3 text-sm transition-all duration-300 w-full sm:w-auto transform hover:scale-105 ${
// //               productData.stockQuantity === 0 || productData.status !== 'Active'
// //                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                 : 'bg-black text-white active:bg-gray-700 hover:bg-gray-800 shadow-lg hover:shadow-xl'
// //             }`}
// //           >
// //             {productData.stockQuantity === 0 ? 'OUT OF STOCK' : 
// //              productData.status !== 'Active' ? 'UNAVAILABLE' : 'ADD TO CART'}
// //             {quantity > 1 && ` (${quantity})`}
// //           </button>
          
// //           <hr className="mt-8 sm:w-4/5" />
          
// //           {/* Additional Info */}
// //           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
// //             <p>✓ 100% Original product.</p>
// //             <p>✓ Cash on delivery is available on this product.</p>
// //             <p>✓ Easy return & exchange policy within 7 days.</p>
// //             <p>✓ Free shipping on orders above {currency}1000</p>
// //             {productData.createdBy && (
// //               <p className="text-xs mt-2">Listed by: {productData.createdBy}</p>
// //             )}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Description and Reviews */}
// //       <div className="mt-20">
// //         <div className="flex">
// //           <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
// //           <p className="border px-5 py-3 text-sm text-gray-500 cursor-pointer">Reviews</p>
// //           <p className="border px-5 py-3 text-sm text-gray-500 cursor-pointer">Details</p>
// //         </div>
// //         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
// //           <div dangerouslySetInnerHTML={{ __html: productData.description }} />
          
// //           {/* Additional product details based on subcategory */}
// //           {productData.subcategory === 'Shoes' && productData.shoeDetails && (
// //             <div className="mt-6">
// //               <h4 className="font-medium text-gray-700 mb-3">Shoe Specifications:</h4>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <h5 className="font-medium text-gray-600 mb-2">General Details:</h5>
// //                   <ul className="list-disc list-inside space-y-1 text-xs">
// //                     <li>Style: {productData.shoeDetails.style}</li>
// //                     <li>Available Sizes: {availableSizes.join(', ')}</li>
// //                     <li>Total Stock: {productData.stockQuantity} pairs</li>
// //                   </ul>
// //                 </div>
                
// //                 {availableMaterials.length > 0 && (
// //                   <div>
// //                     <h5 className="font-medium text-gray-600 mb-2">Available Materials:</h5>
// //                     <ul className="list-disc list-inside space-y-1 text-xs">
// //                       {availableMaterials.map((material, idx) => (
// //                         <li key={idx}>
// //                           {material.colorName} 
// //                           {material.leatherType && ` - ${material.leatherType}`}
// //                           {material.soleMaterial && ` (${material.soleMaterial} sole)`}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}
          
// //           {productData.subcategory === 'Jackets' && productData.jacketDetails && (
// //             <div className="mt-6">
// //               <h4 className="font-medium text-gray-700 mb-3">Jacket Specifications:</h4>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <div>
// //                   <h5 className="font-medium text-gray-600 mb-2">General Details:</h5>
// //                   <ul className="list-disc list-inside space-y-1 text-xs">
// //                     <li>Season: {productData.jacketDetails.season}</li>
// //                     {productData.jacketDetails.material && (
// //                       <li>Material: {productData.jacketDetails.material}</li>
// //                     )}
// //                     <li>Available Sizes: {availableSizes.join(', ')}</li>
// //                     <li>Total Stock: {productData.stockQuantity} pieces</li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Size Chart Information */}
// //           {availableSizes.length > 0 && (
// //             <div className="mt-6">
// //               <h4 className="font-medium text-gray-700 mb-3">Size Information:</h4>
// //               <div className="bg-gray-50 p-4 rounded">
// //                 <p className="text-xs text-gray-600 mb-2">Available sizes and stock:</p>
// //                 <div className="flex flex-wrap gap-2">
// //                   {(productData.subcategory === 'Shoes' ? productData.shoeDetails?.sizes : productData.jacketDetails?.sizes)
// //                     ?.filter(s => s.available && s.stock > 0)
// //                     .map((sizeObj, idx) => (
// //                     <span key={idx} className="bg-white px-2 py-1 rounded text-xs">
// //                       {sizeObj.sizeLabel} ({sizeObj.stock} left)
// //                     </span>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       {/* Related Products Section */}
// //       <RelatedProducts
// //         category={productData.category}
// //         subCategory={productData.subcategory}
// //       />
// //     </div>
// //   );
// // };

// // export default Product;
// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContext';
// import { assets } from '../assets/assets';
// import RelatedProducts from '../components/RelatedProducts';
// import MeasurementModal from '../components/MeasurementModel';

// const Product = () => {
//   const { productId } = useParams();
//   const { products, currency, addToCart, getImageUrl, backendUrl, token } = useContext(ShopContext);
//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState('');
//   const [size, setSize] = useState('');
//   const [selectedMaterial, setSelectedMaterial] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   // Measurement modal states
//   const [showMeasurementModal, setShowMeasurementModal] = useState(false);
//   const [measurementLoading, setMeasurementLoading] = useState(false);
//   const [existingMeasurements, setExistingMeasurements] = useState(null);

//   const fetchProductData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       // First try to find in existing products
//       let product = products.find((item) => item._id === productId);
      
//       // If not found in context, fetch from API
//       if (!product && productId) {
//         console.log('Product not found in context, fetching from API...');
//         const response = await fetch(`${backendUrl || 'http://localhost:5000'}/api/product/${productId}`);
//         const data = await response.json();
        
//         if (data.success && data.data) {
//           product = data.data;
//         } else {
//           throw new Error(data.message || 'Product not found');
//         }
//       }
      
//       if (product) {
//         setProductData(product);
        
//         // Set primary image or first image
//         const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
//         if (primaryImage) {
//           const imageUrl = getImageUrl(primaryImage.url || primaryImage.filename || primaryImage);
//           setImage(imageUrl);
//           setSelectedImageIndex(product.images.findIndex(img => 
//             (img.isPrimary) || (product.images.indexOf(img) === 0)
//           ));
//         }
        
//         // Set default material for shoes
//         if (product.subcategory === 'Shoes' && product.shoeDetails?.materials?.length > 0) {
//           setSelectedMaterial(product.shoeDetails.materials[0]);
//         }
        
//         console.log('Product loaded:', product);
//       } else {
//         setError('Product not found');
//       }
//     } catch (err) {
//       console.error('Error fetching product:', err);
//       setError(err.message || 'Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (productId) {
//       fetchProductData();
//     }
//   }, [productId, products]);

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

//   // Get available sizes based on subcategory
//   const getAvailableSizes = () => {
//     if (!productData) return [];
    
//     if (productData.subcategory === 'Shoes' && productData.shoeDetails?.sizes) {
//       return productData.shoeDetails.sizes
//         .filter(size => size.available && (size.stock > 0))
//         .map(size => size.sizeLabel);
//     } else if (productData.subcategory === 'Jackets' && productData.jacketDetails?.sizes) {
//       return productData.jacketDetails.sizes
//         .filter(size => size.available && (size.stock > 0))
//         .map(size => size.sizeLabel);
//     }
    
//     return [];
//   };

//   // Get available materials for shoes
//   const getAvailableMaterials = () => {
//     if (!productData || productData.subcategory !== 'Shoes') return [];
//     return productData.shoeDetails?.materials || [];
//   };

//   // Get product price info
//   const getPriceInfo = () => {
//     if (!productData) return { displayPrice: 0, originalPrice: 0, hasDiscount: false };
    
//     const effectivePrice = productData.effectivePrice || 
//                           (productData.price?.discount > 0 ? productData.price.discount : productData.price?.base) || 
//                           productData.price || 0;
    
//     const originalPrice = productData.price?.base || productData.price || effectivePrice;
//     const hasDiscount = productData.discountPercent > 0 || 
//                        (productData.price?.discount > 0 && productData.price?.discount < productData.price?.base);
    
//     return {
//       displayPrice: effectivePrice,
//       originalPrice: originalPrice,
//       hasDiscount: hasDiscount,
//       discountPercent: productData.discountPercent || 0
//     };
//   };

//   // Get product images
//   const getProductImages = () => {
//     if (!productData?.images || productData.images.length === 0) {
//       return ['https://via.placeholder.com/500x500?text=No+Image'];
//     }
    
//     return productData.images.map(img => {
//       if (typeof img === 'string') {
//         return getImageUrl(img);
//       }
//       return getImageUrl(img.url || img.filename);
//     });
//   };

//   // Handle add to cart with measurement check
//   const handleAddToCart = async () => {
//     // Check if user is logged in
//     if (!token) {
//       alert('Please login to add items to cart');
//       return;
//     }

//     // Check if product is out of stock
//     if (productData.stockQuantity === 0 || productData.status !== 'Active') {
//       alert('This product is currently unavailable');
//       return;
//     }

//     const availableSizes = getAvailableSizes();
    
//     // Check if measurements are required for this product
//     const requiresMeasurements = productData.subcategory === 'Shoes' || productData.subcategory === 'Jackets';
    
//     // If measurements required but don't exist, open modal (regardless of size selection)
//     if (requiresMeasurements && !existingMeasurements) {
//       setShowMeasurementModal(true);
//       return;
//     }

//     // Check size selection after measurement check
//     if (availableSizes.length > 0 && !size) {
//       alert('Please select a size');
//       return;
//     }
    
//     // All checks passed, add to cart
//     await proceedToAddToCart();
//   };

//   // Actually add to cart after measurements are confirmed
//   const proceedToAddToCart = async () => {
//     try {
//       // Add items based on quantity
//       for (let i = 0; i < quantity; i++) {
//         addToCart(productData._id, size || 'default', selectedMaterial?._id);
//       }
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('Failed to add item to cart. Please try again.');
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
//         alert('Measurements saved successfully!');
        
//         // Check if size is selected, if not prompt user
//         setTimeout(() => {
//           const availableSizes = getAvailableSizes();
//           if (availableSizes.length > 0 && !size) {
//             alert('Now please select a size to continue');
//           } else {
//             // If size already selected, add to cart automatically
//             proceedToAddToCart();
//           }
//         }, 500);
//       } else {
//         throw new Error(data.message || 'Failed to save measurements');
//       }
//     } catch (error) {
//       console.error('Error saving measurements:', error);
//       alert('Failed to save measurements. Please try again.');
//     } finally {
//       setMeasurementLoading(false);
//     }
//   };

//   // Handle image selection
//   const handleImageSelect = (img, index) => {
//     setImage(img);
//     setSelectedImageIndex(index);
//   };

//   // Handle material selection
//   const handleMaterialSelect = (material) => {
//     setSelectedMaterial(material);
//   };

//   if (loading) {
//     return (
//       <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading product...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !productData) {
//     return (
//       <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
//         <div className="text-center">
//           <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
//           <button 
//             onClick={() => window.history.back()}
//             className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors"
//           >
//             Go Back
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const availableSizes = getAvailableSizes();
//   const availableMaterials = getAvailableMaterials();
//   const productImages = getProductImages();
//   const priceInfo = getPriceInfo();
//   const requiresMeasurements = productData.subcategory === 'Shoes' || productData.subcategory === 'Jackets';

//   return (
//     <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
//       {/* Measurement Modal */}
//       <MeasurementModal
//         isOpen={showMeasurementModal}
//         onClose={() => setShowMeasurementModal(false)}
//         onSave={handleMeasurementSave}
//         productCategory={productData.category}
//         productSubcategory={productData.subcategory}
//         loading={measurementLoading}
//         existingMeasurements={existingMeasurements}
//       />

//       {/* Breadcrumb */}
//       <div className="text-sm text-gray-500 mb-6">
//         <span 
//           className="hover:text-gray-700 cursor-pointer" 
//           onClick={() => window.history.back()}
//         >
//           Shop
//         </span>
//         <span className="mx-2">›</span>
//         {productData.category && (
//           <>
//             <span className="hover:text-gray-700 cursor-pointer capitalize">
//               {productData.category}
//             </span>
//             <span className="mx-2">›</span>
//           </>
//         )}
//         {productData.subcategory && (
//           <>
//             <span className="hover:text-gray-700 cursor-pointer capitalize">
//               {productData.subcategory}
//             </span>
//             <span className="mx-2">›</span>
//           </>
//         )}
//         <span className="text-gray-900">{productData.name}</span>
//       </div>

//       {/* Product Section */}
//       <div className="flex flex-col sm:flex-row gap-12">
//         {/* Left Section: Images */}
//         <div className="flex-1 flex flex-col sm:flex-row gap-3">
//           {/* Thumbnails */}
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18%] w-full gap-2">
//             {productImages.map((item, index) => (
//               <img
//                 key={index}
//                 onClick={() => handleImageSelect(item, index)}
//                 src={item}
//                 className={`w-24 h-24 sm:w-full sm:h-24 object-cover cursor-pointer border-2 rounded flex-shrink-0 transition-all duration-300 hover:scale-105 ${
//                   selectedImageIndex === index ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
//                 }`}
//                 alt={productData.images?.[index]?.altText || `Thumbnail ${index + 1}`}
//                 onError={(e) => {
//                   e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error';
//                 }}
//               />
//             ))}
//           </div>
          
//           {/* Main Image */}
//           <div className="w-full sm:w-[82%]">
//             <img 
//               src={image} 
//               className="w-full h-auto max-h-[600px] object-cover border border-gray-200 rounded shadow-md transition-all duration-300 hover:shadow-lg"
//               alt={productData.images?.[selectedImageIndex]?.altText || productData.name}
//               onError={(e) => {
//                 e.target.src = 'https://via.placeholder.com/500x500?text=Image+Error';
//               }}
//             />
//           </div>
//         </div>

//         {/* Right Section: Product Details */}
//         <div className="flex-1">
//           {/* Brand */}
//           {productData.brand && (
//             <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
//               {productData.brand}
//             </p>
//           )}
          
//           {/* Product Name */}
//           <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          
//           {/* Rating */}
//           <div className="flex items-center gap-1 mt-2">
//             {[...Array(5)].map((_, i) => (
//               <img 
//                 key={i}
//                 src={i < 4 ? assets.star_icon : assets.star_dull_icon} 
//                 className="w-3.5" 
//                 alt="Star" 
//               />
//             ))}
//             <p className="pl-2 text-sm text-gray-600">
//               ({productData.viewCount || 0} views) • ({productData.purchaseCount || 0} sold)
//             </p>
//           </div>
          
//           {/* Price */}
//           <div className="mt-5 flex items-baseline gap-3">
//             {priceInfo.hasDiscount ? (
//               <>
//                 <span className="text-3xl font-medium text-red-600">
//                   {currency}{priceInfo.displayPrice}
//                 </span>
//                 <span className="text-xl text-gray-400 line-through">
//                   {currency}{priceInfo.originalPrice}
//                 </span>
//                 {priceInfo.discountPercent > 0 && (
//                   <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
//                     -{priceInfo.discountPercent}% OFF
//                   </span>
//                 )}
//               </>
//             ) : (
//               <span className="text-3xl font-medium text-gray-900">
//                 {currency}{priceInfo.displayPrice}
//               </span>
//             )}
//           </div>

//           {/* Measurement Requirement Notice */}
//           {requiresMeasurements && !existingMeasurements && (
//             <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
//               <p className="text-sm text-blue-800">
//                 📏 Body measurements required for best fit
//               </p>
//             </div>
//           )}
          
//           {/* Stock Status */}
//           <div className="mt-3">
//             {productData.stockQuantity > 0 ? (
//               <p className="text-green-600 text-sm">
//                 ✓ In Stock ({productData.stockQuantity} available)
//               </p>
//             ) : (
//               <p className="text-red-600 text-sm">✗ Out of Stock</p>
//             )}
//           </div>
          
//           {/* Description */}
//           <p className="mt-5 text-gray-500 leading-relaxed">
//             {productData.description}
//           </p>
          
//           {/* Product Details */}
//           <div className="mt-6 space-y-3">
//             {/* Category & Subcategory */}
//             <div className="text-sm">
//               <span className="text-gray-600">Category: </span>
//               <span className="font-medium capitalize">
//                 {productData.category} › {productData.subcategory}
//               </span>
//             </div>
            
//             {/* SKU */}
//             <div className="text-sm">
//               <span className="text-gray-600">SKU: </span>
//               <span className="font-medium">{productData.sku}</span>
//             </div>
            
//             {/* Style (for shoes) */}
//             {productData.subcategory === 'Shoes' && productData.shoeDetails?.style && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Style: </span>
//                 <span className="font-medium">{productData.shoeDetails.style}</span>
//               </div>
//             )}
            
//             {/* Season (for jackets) */}
//             {productData.subcategory === 'Jackets' && productData.jacketDetails?.season && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Season: </span>
//                 <span className="font-medium">{productData.jacketDetails.season}</span>
//               </div>
//             )}

//             {/* Jacket Material */}
//             {productData.subcategory === 'Jackets' && productData.jacketDetails?.material && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Material: </span>
//                 <span className="font-medium">{productData.jacketDetails.material}</span>
//               </div>
//             )}

//             {/* Tags */}
//             {productData.tags && productData.tags.length > 0 && (
//               <div className="text-sm">
//                 <span className="text-gray-600">Tags: </span>
//                 <div className="flex flex-wrap gap-1 mt-1">
//                   {productData.tags.map((tag, index) => (
//                     <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-sm text-xs">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
          
//           {/* Enhanced Material Selection (for shoes) */}
//           {availableMaterials.length > 0 && (
//             <div className="flex flex-col gap-4 my-8">
//               <div>
//                 <p className="font-medium text-lg mb-1">Color: {selectedMaterial?.colorName || 'Select Color'}</p>
//                 {selectedMaterial?.leatherType && (
//                   <p className="text-sm text-gray-500 uppercase tracking-wider">
//                     {selectedMaterial.leatherType}
//                   </p>
//                 )}
//               </div>
              
//               <div className="flex flex-wrap gap-3">
//                 {availableMaterials.map((material, index) => (
//                   <div
//                     key={index}
//                     onClick={() => handleMaterialSelect(material)}
//                     className="group cursor-pointer transition-all duration-200"
//                   >
//                     {/* Material Option - Show actual product image */}
//                     <div className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
//                       selectedMaterial?._id === material._id || selectedMaterial === material
//                         ? 'border-black shadow-lg' 
//                         : 'border-gray-300 hover:border-gray-400'
//                     }`}>
//                       {/* Show actual product image for this material/color */}
//                       {material.image || material.imageUrl ? (
//                         <img 
//                           src={getImageUrl(material.image || material.imageUrl)}
//                           alt={material.colorName}
//                           className="w-full h-full object-cover"
//                           onError={(e) => {
//                             // Fallback to main product image if material image fails
//                             e.target.src = image;
//                           }}
//                         />
//                       ) : (
//                         // Fallback to main product image if no specific material image
//                         <img 
//                           src={image}
//                           alt={material.colorName}
//                           className="w-full h-full object-cover"
//                         />
//                       )}
//                     </div>
                    
//                     {/* Material name below image */}
//                     <div className="text-center mt-1">
//                       <p className="text-xs text-gray-600 capitalize">
//                         {material.colorName}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Material Details */}
//               {selectedMaterial && selectedMaterial.leatherType && (
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-600">
//                     Material: <span className="font-medium">{selectedMaterial.leatherType}</span>
//                     {selectedMaterial.soleMaterial && (
//                       <span> • Sole: {selectedMaterial.soleMaterial}</span>
//                     )}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Size Selection */}
//           {availableSizes.length > 0 && (
//             <div className="flex flex-col gap-4 my-8">
//               <p className="font-medium">Select Size</p>
//               <div className="flex gap-2 flex-wrap">
//                 {availableSizes.map((sizeItem, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSize(sizeItem)}
//                     className={`bg-gray-100 py-2 px-4 border transition-all duration-300 hover:shadow-sm transform hover:scale-105 ${
//                       sizeItem === size 
//                         ? 'border-orange-500 bg-orange-50 shadow-md scale-105' 
//                         : 'border-gray-200 hover:border-gray-300'
//                     }`}
//                   >
//                     {sizeItem}
//                   </button>
//                 ))}
//               </div>
//               {size && (
//                 <p className="text-sm text-green-600">Selected: {size}</p>
//               )}
//             </div>
//           )}
          
//           {/* Quantity Selector */}
//           <div className="flex flex-col gap-4 my-8">
//             <p className="font-medium">Quantity</p>
//             <div className="flex items-center gap-3">
//               <button 
//                 onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//               >
//                 -
//               </button>
//               <span className="w-12 text-center font-medium">{quantity}</span>
//               <button 
//                 onClick={() => setQuantity(Math.min(productData.stockQuantity, quantity + 1))}
//                 className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
//               >
//                 +
//               </button>
//             </div>
//           </div>
          
//           {/* Add to Cart Button */}
//           <button 
//             onClick={handleAddToCart}
//             disabled={productData.stockQuantity === 0 || productData.status !== 'Active'}
//             className={`px-8 py-3 text-sm transition-all duration-300 w-full sm:w-auto transform hover:scale-105 ${
//               productData.stockQuantity === 0 || productData.status !== 'Active'
//                 ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                 : 'bg-black text-white active:bg-gray-700 hover:bg-gray-800 shadow-lg hover:shadow-xl'
//             }`}
//           >
//             {productData.stockQuantity === 0 ? 'OUT OF STOCK' : 
//              productData.status !== 'Active' ? 'UNAVAILABLE' : 
//              requiresMeasurements && !existingMeasurements ? 'ADD MEASUREMENTS & TO CART' : 'ADD TO CART'}
//             {quantity > 1 && ` (${quantity})`}
//           </button>
          
//           <hr className="mt-8 sm:w-4/5" />
          
//           {/* Additional Info */}
//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>✓ 100% Original product.</p>
//             <p>✓ Cash on delivery is available on this product.</p>
//             <p>✓ Easy return & exchange policy within 7 days.</p>
//             <p>✓ Free shipping on orders above {currency}1000</p>
//             {productData.createdBy && (
//               <p className="text-xs mt-2">Listed by: {productData.createdBy}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Description and Reviews - continuing from previous part... */}
//       <div className="mt-20">
//         <div className="flex">
//           <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
//           <p className="border px-5 py-3 text-sm text-gray-500 cursor-pointer">Reviews</p>
//           <p className="border px-5 py-3 text-sm text-gray-500 cursor-pointer">Details</p>
//         </div>
//         <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
//           <div dangerouslySetInnerHTML={{ __html: productData.description }} />
          
//           {/* Additional product details based on subcategory */}
//           {productData.subcategory === 'Shoes' && productData.shoeDetails && (
//             <div className="mt-6">
//               <h4 className="font-medium text-gray-700 mb-3">Shoe Specifications:</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h5 className="font-medium text-gray-600 mb-2">General Details:</h5>
//                   <ul className="list-disc list-inside space-y-1 text-xs">
//                     <li>Style: {productData.shoeDetails.style}</li>
//                     <li>Available Sizes: {availableSizes.join(', ')}</li>
//                     <li>Total Stock: {productData.stockQuantity} pairs</li>
//                   </ul>
//                 </div>
                
//                 {availableMaterials.length > 0 && (
//                   <div>
//                     <h5 className="font-medium text-gray-600 mb-2">Available Materials:</h5>
//                     <ul className="list-disc list-inside space-y-1 text-xs">
//                       {availableMaterials.map((material, idx) => (
//                         <li key={idx}>
//                           {material.colorName} 
//                           {material.leatherType && ` - ${material.leatherType}`}
//                           {material.soleMaterial && ` (${material.soleMaterial} sole)`}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
          
//           {productData.subcategory === 'Jackets' && productData.jacketDetails && (
//             <div className="mt-6">
//               <h4 className="font-medium text-gray-700 mb-3">Jacket Specifications:</h4>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <h5 className="font-medium text-gray-600 mb-2">General Details:</h5>
//                   <ul className="list-disc list-inside space-y-1 text-xs">
//                     <li>Season: {productData.jacketDetails.season}</li>
//                     {productData.jacketDetails.material && (
//                       <li>Material: {productData.jacketDetails.material}</li>
//                     )}
//                     <li>Available Sizes: {availableSizes.join(', ')}</li>
//                     <li>Total Stock: {productData.stockQuantity} pieces</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Size Chart Information */}
//           {availableSizes.length > 0 && (
//             <div className="mt-6">
//               <h4 className="font-medium text-gray-700 mb-3">Size Information:</h4>
//               <div className="bg-gray-50 p-4 rounded">
//                 <p className="text-xs text-gray-600 mb-2">Available sizes and stock:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {(productData.subcategory === 'Shoes' ? productData.shoeDetails?.sizes : productData.jacketDetails?.sizes)
//                     ?.filter(s => s.available && s.stock > 0)
//                     .map((sizeObj, idx) => (
//                     <span key={idx} className="bg-white px-2 py-1 rounded text-xs">
//                       {sizeObj.sizeLabel} ({sizeObj.stock} left)
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Related Products Section */}
//       <RelatedProducts
//         category={productData.category}
//         subCategory={productData.subcategory}
//       />
//     </div>
//   );
// };

// export default Product;


import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import MeasurementModal from '../components/MeasurementModel';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, getImageUrl, backendUrl, token } = useContext(ShopContext);
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showMeasurementModal, setShowMeasurementModal] = useState(false);
  const [measurementLoading, setMeasurementLoading] = useState(false);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let product = products.find((item) => item._id === productId);
      
      if (!product && productId) {
        const response = await fetch(`${backendUrl || 'http://localhost:5000'}/api/product/${productId}`);
        const data = await response.json();
        
        if (data.success && data.data) {
          product = data.data;
        } else {
          throw new Error(data.message || 'Product not found');
        }
      }
      
      if (product) {
        setProductData(product);
        
        const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
        if (primaryImage) {
          const imageUrl = getImageUrl(primaryImage.url || primaryImage.filename || primaryImage);
          setImage(imageUrl);
          setSelectedImageIndex(product.images.findIndex(img => 
            (img.isPrimary) || (product.images.indexOf(img) === 0)
          ));
        }
        
        if (product.subcategory === 'Shoes' && product.shoeDetails?.materials?.length > 0) {
          setSelectedMaterial(product.shoeDetails.materials[0]);
        }
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductData();
    }
  }, [productId, products]);

  const getAvailableSizes = () => {
    if (!productData) return [];
    
    if (productData.subcategory === 'Shoes' && productData.shoeDetails?.sizes) {
      return productData.shoeDetails.sizes
        .filter(size => size.available && (size.stock > 0))
        .map(size => size.sizeLabel);
    } else if (productData.subcategory === 'Jackets' && productData.jacketDetails?.sizes) {
      return productData.jacketDetails.sizes
        .filter(size => size.available && (size.stock > 0))
        .map(size => size.sizeLabel);
    }
    
    return [];
  };

  const getAvailableMaterials = () => {
    if (!productData || productData.subcategory !== 'Shoes') return [];
    return productData.shoeDetails?.materials || [];
  };

  const getPriceInfo = () => {
    if (!productData) return { displayPrice: 0, originalPrice: 0, hasDiscount: false };
    
    const effectivePrice = productData.effectivePrice || 
                          (productData.price?.discount > 0 ? productData.price.discount : productData.price?.base) || 
                          productData.price || 0;
    
    const originalPrice = productData.price?.base || productData.price || effectivePrice;
    const hasDiscount = productData.discountPercent > 0 || 
                       (productData.price?.discount > 0 && productData.price?.discount < productData.price?.base);
    
    return {
      displayPrice: effectivePrice,
      originalPrice: originalPrice,
      hasDiscount: hasDiscount,
      discountPercent: productData.discountPercent || 0
    };
  };

  const getProductImages = () => {
    if (!productData?.images || productData.images.length === 0) {
      return ['https://via.placeholder.com/500x500?text=No+Image'];
    }
    
    return productData.images.map(img => {
      if (typeof img === 'string') {
        return getImageUrl(img);
      }
      return getImageUrl(img.url || img.filename);
    });
  };

  // Calculate recommended size
  const calculateRecommendedSize = (measurements) => {
    if (!measurements || !productData) return null;

    const sizeCharts = {
      Shoes: {
        '6': { footLength: [23, 23.5] },
        '7': { footLength: [23.5, 24.1] },
        '8': { footLength: [24.1, 24.8] },
        '9': { footLength: [24.8, 25.4] },
        '10': { footLength: [25.4, 26] },
        '11': { footLength: [26, 26.7] },
        '12': { footLength: [26.7, 27.3] }
      },
      Jackets: {
        XS: { chest: [81, 86], shoulder: [40, 42] },
        S: { chest: [86, 91], shoulder: [42, 44] },
        M: { chest: [91, 97], shoulder: [44, 46] },
        L: { chest: [97, 102], shoulder: [46, 48] },
        XL: { chest: [102, 109], shoulder: [48, 51] },
        XXL: { chest: [109, 117], shoulder: [51, 54] }
      }
    };

    const sizeChart = sizeCharts[productData.subcategory];
    if (!sizeChart) return null;

    let bestSize = null;
    let bestScore = -1;

    Object.entries(sizeChart).forEach(([sizeLabel, ranges]) => {
      let matchScore = 0;
      let totalFields = 0;

      Object.entries(ranges).forEach(([measurement, [min, max]]) => {
        const value = measurements[measurement];
        if (value) {
          totalFields++;
          const numValue = parseFloat(value);
          
          if (numValue >= min && numValue <= max) {
            matchScore += 2;
          } else if (numValue < min && numValue >= min - 3) {
            matchScore += 1;
          } else if (numValue > max && numValue <= max + 3) {
            matchScore += 1;
          }
        }
      });

      const normalizedScore = totalFields > 0 ? matchScore / (totalFields * 2) : 0;
      if (normalizedScore > bestScore) {
        bestSize = sizeLabel;
        bestScore = normalizedScore;
      }
    });

    return bestSize;
  };

  // Handle add to cart - SIMPLE FLOW
  const handleAddToCart = async () => {
    if (!token) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (productData.stockQuantity === 0 || productData.status !== 'Active') {
      toast.error('This product is currently unavailable');
      return;
    }

    const availableSizes = getAvailableSizes();
    const requiresMeasurements = productData.subcategory === 'Shoes' || productData.subcategory === 'Jackets';
    
    // Agar size select nahi kiya
    if (availableSizes.length > 0 && !size) {
      // Agar measurements required hai
      if (requiresMeasurements) {
        setShowMeasurementModal(true);
        return;
      }
      
      toast.error('Please select a size');
      return;
    }

    // Size selected hai, add to cart
    await proceedToAddToCart();
  };

  const proceedToAddToCart = async () => {
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id, size || 'default', selectedMaterial?._id);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const proceedToAddToCartWithSize = async (selectedSize) => {
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id, selectedSize, selectedMaterial?._id);
      }
      toast.success(`Added to cart with size ${selectedSize}!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  // Handle measurement save - DIRECT ADD TO CART
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
        setShowMeasurementModal(false);
        toast.success('Measurements saved successfully!');
        
        // Calculate recommended size and add to cart
        const recommended = calculateRecommendedSize(data.data);
        if (recommended) {
          setTimeout(() => {
            proceedToAddToCartWithSize(recommended);
          }, 500);
        } else {
          toast.error('Could not calculate size, please select manually');
        }
      } else {
        throw new Error(data.message || 'Failed to save measurements');
      }
    } catch (error) {
      console.error('Error saving measurements:', error);
      toast.error(error.message || 'Failed to save measurements');
    } finally {
      setMeasurementLoading(false);
    }
  };

  const handleImageSelect = (img, index) => {
    setImage(img);
    setSelectedImageIndex(index);
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
  };

  if (loading) {
    return (
      <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="border-t-2 pt-10 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Product not found'}</p>
          <button 
            onClick={() => window.history.back()}
            className="bg-black text-white px-6 py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const availableSizes = getAvailableSizes();
  const availableMaterials = getAvailableMaterials();
  const productImages = getProductImages();
  const priceInfo = getPriceInfo();
  const requiresMeasurements = productData.subcategory === 'Shoes' || productData.subcategory === 'Jackets';

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <MeasurementModal
        isOpen={showMeasurementModal}
        onClose={() => setShowMeasurementModal(false)}
        onSave={handleMeasurementSave}
        productCategory={productData.category}
        productSubcategory={productData.subcategory}
        loading={measurementLoading}
        existingMeasurements={null}
      />

      <div className="text-sm text-gray-500 mb-6">
        <span className="hover:text-gray-700 cursor-pointer" onClick={() => window.history.back()}>
          Shop
        </span>
        <span className="mx-2">›</span>
        {productData.category && (
          <>
            <span className="hover:text-gray-700 cursor-pointer capitalize">{productData.category}</span>
            <span className="mx-2">›</span>
          </>
        )}
        {productData.subcategory && (
          <>
            <span className="hover:text-gray-700 cursor-pointer capitalize">{productData.subcategory}</span>
            <span className="mx-2">›</span>
          </>
        )}
        <span className="text-gray-900">{productData.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[18%] w-full gap-2">
            {productImages.map((item, index) => (
              <img
                key={index}
                onClick={() => handleImageSelect(item, index)}
                src={item}
                className={`w-24 h-24 sm:w-full sm:h-24 object-cover cursor-pointer border-2 rounded flex-shrink-0 transition-all duration-300 hover:scale-105 ${
                  selectedImageIndex === index ? 'border-orange-500 shadow-lg' : 'border-gray-200 hover:border-gray-300'
                }`}
                alt={productData.images?.[index]?.altText || `Thumbnail ${index + 1}`}
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=Image+Error'; }}
              />
            ))}
          </div>
          
          <div className="w-full sm:w-[82%]">
            <img 
              src={image} 
              className="w-full h-auto max-h-[600px] object-cover border border-gray-200 rounded shadow-md transition-all duration-300 hover:shadow-lg"
              alt={productData.images?.[selectedImageIndex]?.altText || productData.name}
              onError={(e) => { e.target.src = 'https://via.placeholder.com/500x500?text=Image+Error'; }}
            />
          </div>
        </div>

        <div className="flex-1">
          {productData.brand && (
            <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">{productData.brand}</p>
          )}
          
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < 4 ? assets.star_icon : assets.star_dull_icon} className="w-3.5" alt="Star" />
            ))}
            <p className="pl-2 text-sm text-gray-600">
              ({productData.viewCount || 0} views) • ({productData.purchaseCount || 0} sold)
            </p>
          </div>
          
          <div className="mt-5 flex items-baseline gap-3">
            {priceInfo.hasDiscount ? (
              <>
                <span className="text-3xl font-medium text-red-600">{currency}{priceInfo.displayPrice}</span>
                <span className="text-xl text-gray-400 line-through">{currency}{priceInfo.originalPrice}</span>
                {priceInfo.discountPercent > 0 && (
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">
                    -{priceInfo.discountPercent}% OFF
                  </span>
                )}
              </>
            ) : (
              <span className="text-3xl font-medium text-gray-900">{currency}{priceInfo.displayPrice}</span>
            )}
          </div>
          
          <div className="mt-3">
            {productData.stockQuantity > 0 ? (
              <p className="text-green-600 text-sm">✓ In Stock ({productData.stockQuantity} available)</p>
            ) : (
              <p className="text-red-600 text-sm">✗ Out of Stock</p>
            )}
          </div>
          
          <p className="mt-5 text-gray-500 leading-relaxed">{productData.description}</p>
          
          {availableMaterials.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <div>
                <p className="font-medium text-lg mb-1">Color: {selectedMaterial?.colorName || 'Select Color'}</p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {availableMaterials.map((material, index) => (
                  <div key={index} onClick={() => handleMaterialSelect(material)} className="group cursor-pointer transition-all duration-200">
                    <div className={`w-16 h-16 rounded-lg border-2 transition-all duration-200 overflow-hidden ${
                      selectedMaterial?._id === material._id || selectedMaterial === material ? 'border-black shadow-lg' : 'border-gray-300 hover:border-gray-400'
                    }`}>
                      <img 
                        src={material.image || material.imageUrl ? getImageUrl(material.image || material.imageUrl) : image}
                        alt={material.colorName}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = image; }}
                      />
                    </div>
                    <div className="text-center mt-1">
                      <p className="text-xs text-gray-600 capitalize">{material.colorName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p className="font-medium">Select Size</p>
              <div className="flex gap-2 flex-wrap">
                {availableSizes.map((sizeItem, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(sizeItem)}
                    className={`bg-gray-100 py-2 px-4 border transition-all duration-300 hover:shadow-sm transform hover:scale-105 ${
                      sizeItem === size ? 'border-orange-500 bg-orange-50 shadow-md scale-105' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {sizeItem}
                  </button>
                ))}
              </div>
              {size && <p className="text-sm text-green-600">Selected: {size}</p>}
            </div>
          )}
          
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Quantity</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(productData.stockQuantity, quantity + 1))} className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            disabled={productData.stockQuantity === 0 || productData.status !== 'Active'}
            className={`px-8 py-3 text-sm transition-all duration-300 w-full sm:w-auto transform hover:scale-105 ${
              productData.stockQuantity === 0 || productData.status !== 'Active'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white active:bg-gray-700 hover:bg-gray-800 shadow-lg hover:shadow-xl'
            }`}
          >
            {productData.stockQuantity === 0 ? 'OUT OF STOCK' : productData.status !== 'Active' ? 'UNAVAILABLE' : 'ADD TO CART'}
            {quantity > 1 && ` (${quantity})`}
          </button>
          
          <hr className="mt-8 sm:w-4/5" />
          
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✓ 100% Original product.</p>
            <p>✓ Cash on delivery is available on this product.</p>
            <p>✓ Easy return & exchange policy within 7 days.</p>
            <p>✓ Free shipping on orders above {currency}1000</p>
          </div>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subcategory} />
    </div>
  );
};

export default Product;