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
  const [madeToMeasure, setMadeToMeasure] = useState(false);
  const [autoAddingToCart, setAutoAddingToCart] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeUnit, setSizeUnit] = useState('CM');

  // Size guide data for Women's Jackets
  const womensSizeGuide = [
    { jacketSize: 'XXS', usSize: '0', ukSize: '2', bust: '79 - 83', waist: '63 - 67', hips: '83 - 87', sleeves: '60' },
    { jacketSize: 'XS', usSize: '0 - 2', ukSize: '4 - 6', bust: '84 - 88', waist: '68 - 72', hips: '88 - 92', sleeves: '61' },
    { jacketSize: 'S', usSize: '4 - 6', ukSize: '8 - 10', bust: '89 - 93', waist: '73 - 77', hips: '93 - 97', sleeves: '62' },
    { jacketSize: 'M', usSize: '8 - 10', ukSize: '12 - 14', bust: '94 - 98', waist: '78 - 82', hips: '98 - 105', sleeves: '63.5' },
    { jacketSize: 'L', usSize: '12 - 14', ukSize: '16 - 18', bust: '99 - 103', waist: '83 - 87', hips: '103 - 107', sleeves: '64.5' },
    { jacketSize: 'XL', usSize: '16 - 18', ukSize: '20 - 22', bust: '106 - 112', waist: '91 - 97', hips: '111 - 117', sleeves: '66' },
    { jacketSize: '2XL', usSize: '20 - 22', ukSize: '24 - 26', bust: '116 - 122', waist: '101 - 107', hips: '121 - 127', sleeves: '66' }
  ];

  // Size guide data for Men's Jackets
  const mensSizeGuide = [
    { jacketSize: 'XS', usSize: '34', euSize: '44', chest: '34 - 35', sleeves: '25' },
    { jacketSize: 'S', usSize: '36 - 38', euSize: '46 - 48', chest: '36 - 38', sleeves: '25.5' },
    { jacketSize: 'M', usSize: '40', euSize: '50', chest: '39 - 41', sleeves: '26' },
    { jacketSize: 'L', usSize: '42 - 44', euSize: '52 - 54', chest: '42 - 44', sleeves: '26.5' },
    { jacketSize: 'XL', usSize: '46', euSize: '56', chest: '45 - 47', sleeves: '27' },
    { jacketSize: '2XL', usSize: '48 - 50', euSize: '58 - 60', chest: '48 - 50', sleeves: '27.5' },
    { jacketSize: '3XL', usSize: '52', euSize: '62', chest: '51 - 53', sleeves: '28' },
    { jacketSize: '4XL', usSize: '54 - 56', euSize: '64 - 66', chest: '54 - 56', sleeves: '28.5' }
  ];

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
    
    let effectivePrice = productData.effectivePrice || 
                          (productData.price?.discount > 0 ? productData.price.discount : productData.price?.base) || 
                          productData.price || 0;
    
    if (madeToMeasure && productData.subcategory === 'Jackets' && productData.additionalCharges?.madeToMeasure) {
      effectivePrice += productData.additionalCharges.madeToMeasure;
    }
    
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

  const supportsMadeToMeasure = () => {
    return productData && productData.subcategory === 'Jackets';
  };

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
    
    if (availableSizes.length > 0 && !size) {
      toast.error('Please select a size');
      return;
    }

    await proceedToAddToCart();
  };

  const proceedToAddToCart = async () => {
    try {
      for (let i = 0; i < quantity; i++) {
        addToCart(productData._id, size || 'default', selectedMaterial?._id, madeToMeasure);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

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
        setMadeToMeasure(true);
        toast.success('Measurements saved successfully!');
        
        setAutoAddingToCart(true);
        setTimeout(async () => {
          try {
            const availableSizes = getAvailableSizes();
            
            if (availableSizes.length > 0 && !size) {
              toast.info('Please select a size to add to cart');
              setAutoAddingToCart(false);
              return;
            }

            for (let i = 0; i < quantity; i++) {
              await addToCart(productData._id, size || 'default', selectedMaterial?._id, true);
            }
            
            toast.success(`✅ Added ${quantity} item(s) to cart with your measurements!`);
          } catch (error) {
            console.error('Error auto-adding to cart:', error);
            toast.error('Measurements saved but failed to add to cart. Please try adding manually.');
          } finally {
            setAutoAddingToCart(false);
          }
        }, 500);
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
  const isMadeToMeasureAvailable = supportsMadeToMeasure();

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowSizeGuide(false)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl w-8 h-8 flex items-center justify-center z-10"
            >
              ×
            </button>
            
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                {productData.category === 'Women' ? "WOMEN'S WEAR" : "MEN'S WEAR"}
              </h2>
              
              {/* Unit Toggle */}
              <div className="flex justify-center gap-4 mb-6">
                <button 
                  onClick={() => setSizeUnit('CM')}
                  className={`px-4 py-2 border-b-2 font-medium ${sizeUnit === 'CM' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-400'}`}
                >
                  CM
                </button>
                <button 
                  onClick={() => setSizeUnit('IN')}
                  className={`px-4 py-2 border-b-2 font-medium ${sizeUnit === 'IN' ? 'border-gray-800 text-gray-800' : 'border-transparent text-gray-400'}`}
                >
                  IN
                </button>
              </div>

              {/* Size Table */}
              <div className="overflow-x-auto">
                {productData.category === 'Women' ? (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Jacket Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">US Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">UK Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Bust</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Waist</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Hips</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Sleeves</th>
                      </tr>
                    </thead>
                    <tbody>
                      {womensSizeGuide.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">{row.jacketSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.usSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.ukSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.bust}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.waist}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.hips}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.sleeves}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Jacket Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">US Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">EU Size</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Chest</th>
                        <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Sleeves</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mensSizeGuide.map((row, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 font-medium">{row.jacketSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.usSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.euSize}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.chest}</td>
                          <td className="border border-gray-300 px-4 py-3">{row.sleeves}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* How to Measure Section */}
              <div className="mt-8 pt-6 border-t border-gray-300">
                <h3 className="text-xl font-bold text-center mb-4 text-gray-800">HOW TO MEASURE</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Chest/Bust:</strong> Measure around the fullest part of your chest, keeping the tape horizontal.</p>
                  <p><strong>Waist:</strong> Measure around your natural waistline, keeping the tape comfortably loose.</p>
                  {productData.category === 'Women' && <p><strong>Hips:</strong> Measure around the fullest part of your hips.</p>}
                  <p><strong>Sleeves:</strong> Measure from the center back of your neck to your wrist with arm bent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Measurement Modal - Only shown when product is Jackets */}
      {isMadeToMeasureAvailable && (
        <MeasurementModal
          isOpen={showMeasurementModal}
          onClose={() => setShowMeasurementModal(false)}
          onSave={handleMeasurementSave}
          productCategory={productData.category}
          productSubcategory={productData.subcategory}
          loading={measurementLoading}
          existingMeasurements={null}
        />
      )}

      {/* Breadcrumb */}
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
        {/* Product Images */}
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

        {/* Product Details */}
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
          
          {/* Price */}
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
          
          {/* Made-to-Measure Price Addition */}
          {madeToMeasure && isMadeToMeasureAvailable && productData.additionalCharges?.madeToMeasure > 0 && (
            <div className="mt-2 text-sm text-blue-600">
              + {currency}{productData.additionalCharges.madeToMeasure} (Made-to-Measure)
            </div>
          )}
          
          {/* Stock Status */}
          <div className="mt-3">
            {productData.stockQuantity > 0 ? (
              <p className="text-green-600 text-sm">✓ In Stock ({productData.stockQuantity} available)</p>
            ) : (
              <p className="text-red-600 text-sm">✗ Out of Stock</p>
            )}
          </div>
          
          <p className="mt-5 text-gray-500 leading-relaxed">{productData.description}</p>
          
          {/* Materials (Shoes only) */}
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

          {/* Size Selection with Size Guide */}
          {availableSizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <div className="flex items-center justify-between">
                <p className="font-medium">Select Size</p>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Size Guide
                </button>
              </div>
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

          {/* Made to Measure Section - ONLY FOR JACKETS */}
          {isMadeToMeasureAvailable && (
            <div className="my-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="madeToMeasure"
                  checked={madeToMeasure}
                  onChange={(e) => setMadeToMeasure(e.target.checked)}
                  className="mt-1 w-4 h-4"
                />
                <div className="flex-1">
                  <label htmlFor="madeToMeasure" className="font-medium text-gray-900 cursor-pointer">
                    Made-to-Measure
                    {productData.additionalCharges?.madeToMeasure > 0 && (
                      <span className="ml-2 text-sm text-blue-600">
                        (+{currency}{productData.additionalCharges.madeToMeasure})
                      </span>
                    )}
                  </label>
<p className="text-sm text-gray-600 mt-1">
  Get a perfectly tailored jacket with your custom measurements. Click "Add Measurements" to provide your specifications.
                    Get a perfectly tailored jacket with your custom measurements. Click "Add Measurements" to provide your specifications.
                  </p>
                  {madeToMeasure && (
                    <button
                      onClick={() => setShowMeasurementModal(true)}
                      className="mt-3 bg-blue-600 text-white px-4 py-2 text-sm rounded hover:bg-blue-700 transition-colors"
                    >
                      Add Measurements
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 my-8">
            <p className="font-medium">Quantity:</p>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 min-w-[60px] text-center border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(productData.stockQuantity, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity >= productData.stockQuantity}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={productData.stockQuantity === 0 || autoAddingToCart}
            className={`bg-black text-white px-8 py-3 text-sm active:bg-gray-700 transition-all duration-300 hover:shadow-lg transform hover:scale-105 ${
              productData.stockQuantity === 0 || autoAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {autoAddingToCart ? 'Adding to Cart...' : 'ADD TO CART'}
          </button>

          {/* Additional Product Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✓ 100% Original Product</p>
            <p>✓ Cash on delivery available</p>
            <p>✓ Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-20">
        <div className="flex border-b">
          <button className="border-b-2 border-gray-900 px-5 py-3 text-sm font-medium">
            Description
          </button>
          <button className="px-5 py-3 text-sm text-gray-500">
            Reviews (0)
          </button>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
          {productData.features && productData.features.length > 0 && (
            <div>
              <p className="font-medium text-gray-700 mb-2">Features:</p>
              <ul className="list-disc list-inside space-y-1">
                {productData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {productData && (
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subcategory}
          currentProductId={productData._id}
        />
      )}
    </div>
  );
};

export default Product;