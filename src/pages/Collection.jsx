

import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch, loading, error, searchProducts } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);
  const [productType, setProductType] = useState([]); // New filter for jackets waigara
  const [sortType, setSortType] = useState('relevant');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Toggle category filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  }

  // Toggle subcategory filter
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    if (subcategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  }

  // Toggle product type filter (jackets waigara)
  const toggleProductType = (e) => {
    const value = e.target.value;
    if (productType.includes(value)) {
      setProductType(prev => prev.filter(item => item !== value));
    } else {
      setProductType(prev => [...prev, value]);
    }
  }

  // Apply all filters
  const applyFilter = () => {
    let productsCopy = products?.slice() || [];

    // Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.brand?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.productType?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Subcategory filter
    if (subcategory.length > 0) {
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory));
    }

    // Product Type filter (jackets waigara)
    if (productType.length > 0) {
      productsCopy = productsCopy.filter(item => {
        const itemType = item.productType || item.type || '';
        return productType.some(type => 
          itemType.toLowerCase().includes(type.toLowerCase()) ||
          item.name?.toLowerCase().includes(type.toLowerCase()) ||
          item.subcategory?.toLowerCase().includes(type.toLowerCase())
        );
      });
    }

    // Price range filter
    if (priceRange.min || priceRange.max) {
      productsCopy = productsCopy.filter(item => {
        const price = item.effectivePrice || item.price?.discount || item.price?.base || item.price || 0;
        const min = parseFloat(priceRange.min) || 0;
        const max = parseFloat(priceRange.max) || Infinity;
        return price >= min && price <= max;
      });
    }

    setFilterProducts(productsCopy);
  }

  // Sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => {
          const priceA = a.effectivePrice || a.price?.discount || a.price?.base || a.price || 0;
          const priceB = b.effectivePrice || b.price?.discount || b.price?.base || b.price || 0;
          return priceA - priceB;
        }));
        break;
        
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => {
          const priceA = a.effectivePrice || a.price?.discount || a.price?.base || a.price || 0;
          const priceB = b.effectivePrice || b.price?.discount || b.price?.base || b.price || 0;
          return priceB - priceA;
        }));
        break;
        
      case 'name':
        setFilterProducts(fpCopy.sort((a, b) => 
          (a.name || '').localeCompare(b.name || '')
        ));
        break;

      case 'newest':
        setFilterProducts(fpCopy.sort((a, b) => 
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        ));
        break;

      case 'popular':
        setFilterProducts(fpCopy.sort((a, b) => 
          (b.viewCount || 0) - (a.viewCount || 0)
        ));
        break;
        
      default:
        applyFilter();
        break;
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setProductType([]);
    setPriceRange({ min: '', max: '' });
    setSortType('relevant');
  };

  // Handle price range change
  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Get unique categories and subcategories from products
  const getUniqueValues = (field) => {
    return [...new Set(products?.map(product => product[field]).filter(Boolean))];
  };

  // Get product types for jackets filter
  const getProductTypes = () => {
    const types = ['Jackets', 'Coats', 'Blazers', 'Hoodies', 'Sweaters', 'Cardigans', 'Vests', 'Outerwear'];
    
    // Also extract from actual product data if available
    const extractedTypes = products?.reduce((acc, product) => {
      const productType = product.productType || product.type || '';
      const name = product.name || '';
      const subcategory = product.subcategory || '';
      
      // Check if product contains jacket-like keywords
      const keywords = ['jacket', 'coat', 'blazer', 'hoodie', 'sweater', 'cardigan', 'vest'];
      keywords.forEach(keyword => {
        if (
          productType.toLowerCase().includes(keyword) ||
          name.toLowerCase().includes(keyword) ||
          subcategory.toLowerCase().includes(keyword)
        ) {
          const formattedType = keyword.charAt(0).toUpperCase() + keyword.slice(1) + 's';
          if (!acc.includes(formattedType)) {
            acc.push(formattedType);
          }
        }
      });
      
      return acc;
    }, []) || [];

    return [...new Set([...types, ...extractedTypes])];
  };

  // Count products for each type
  const getTypeCount = (type) => {
    return products?.filter(product => {
      const itemType = product.productType || product.type || '';
      return itemType.toLowerCase().includes(type.toLowerCase()) ||
             product.name?.toLowerCase().includes(type.toLowerCase()) ||
             product.subcategory?.toLowerCase().includes(type.toLowerCase());
    }).length || 0;
  };

  useEffect(() => {
    applyFilter();
  }, [category, subcategory, productType, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Loading component
  const LoadingComponent = () => (
    <div className='text-center py-12'>
      <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'></div>
      <p className='mt-4 text-gray-600'>Loading products...</p>
    </div>
  );

  // Error component
  const ErrorComponent = () => (
    <div className='text-center py-12'>
      <div className='text-red-500 mb-4'>
        <svg className='mx-auto h-16 w-16 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
        </svg>
        <p className='text-xl font-medium'>Error loading products</p>
        <p className='text-sm mt-2 text-gray-600'>{error}</p>
      </div>
      <button 
        onClick={() => window.location.reload()} 
        className='mt-4 px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded'
      >
        Try Again
      </button>
    </div>
  );

  // No products component
  const NoProductsComponent = () => (
    <div className='text-center py-12'>
      <svg className='mx-auto h-16 w-16 text-gray-400 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-3.5M4 13h3.5'></path>
      </svg>
      <p className='text-xl font-medium text-gray-600 mb-2'>No products available</p>
      <p className='text-sm text-gray-500'>Check back later for new arrivals</p>
    </div>
  );

  // No filtered products component
  const NoFilteredProductsComponent = () => (
    <div className='text-center py-12 '>
      <svg className='mx-auto h-16 w-16 text-gray-400 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
      </svg>
      <p className='text-xl font-medium text-gray-600 mb-2'>No products found</p>
      <p className='text-sm text-gray-500 mb-4'>Try adjusting your filters or search terms</p>
      <button 
        onClick={clearFilters} 
        className='px-6 py-2 bg-black text-white text-sm hover:bg-gray-800 transition-colors rounded'
      >
        Clear all filters
      </button>
    </div>
  );

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options */}
      <div className='min-w-60'>
        <div className='flex items-center justify-between'>
          <p 
            onClick={() => setShowFilter(!showFilter)} 
            className='my-2 text-xl flex items-center cursor-pointer gap-2'
          >
            FILTERS
            <img 
              className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`} 
              src={assets.dropdown_icon} 
              alt="" 
            />
          </p>
          
          {/* Clear filters button */}
          {(category.length > 0 || subcategory.length > 0 || productType.length > 0 || priceRange.min || priceRange.max) && (
            <button 
              onClick={clearFilters}
              className='text-xs text-red-500 hover:text-red-700 underline'
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {getUniqueValues('category').map(cat => (
              <label key={cat} className='flex gap-2 cursor-pointer'>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  onChange={toggleCategory} 
                  value={cat}
                  checked={category.includes(cat)}
                />
                {cat} ({products?.filter(p => p.category === cat).length || 0})
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {getUniqueValues('subcategory').map(subcat => (
              <label key={subcat} className='flex gap-2 cursor-pointer'>
                <input 
                  className='w-3' 
                  type="checkbox" 
                  onChange={toggleSubCategory} 
                  value={subcat}
                  checked={subcategory.includes(subcat)}
                />
                {subcat} ({products?.filter(p => p.subcategory === subcat).length || 0})
              </label>
            ))}
          </div>
        </div>

        {/* Jackets Waigara Filter - NEW */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>JACKETS & OUTERWEAR</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {getProductTypes().map(type => {
              const count = getTypeCount(type);
              return count > 0 ? (
                <label key={type} className='flex gap-2 cursor-pointer'>
                  <input 
                    className='w-3' 
                    type="checkbox" 
                    onChange={toggleProductType} 
                    value={type}
                    checked={productType.includes(type)}
                  />
                  {type} ({count})
                </label>
              ) : null;
            })}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>PRICE RANGE</p>
          <div className='flex flex-col gap-2'>
            <input
              type="number"
              placeholder="Min Price"
              className='w-full px-2 py-1 border border-gray-300 text-sm rounded'
              value={priceRange.min}
              onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className='w-full px-2 py-1 border border-gray-300 text-sm rounded'
              value={priceRange.max}
              onChange={(e) => handlePriceRangeChange('max', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className='flex-1'>
        <br></br>
        <br></br>
        <div className='flex justify-between text-base sm:text-2xl mb-4 '>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          
          {/* Product Sort */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className="border-2 border-gray-300 text-sm px-2 rounded"
            value={sortType}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
            <option value="name">Sort by: Name</option>
            <option value="newest">Sort by: Newest</option>
            <option value="popular">Sort by: Popular</option>
          </select>
        </div>

        {/* Main Content */}
        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorComponent />
        ) : !products || products.length === 0 ? (
          <NoProductsComponent />
        ) : filterProducts.length === 0 ? (
          <NoFilteredProductsComponent />
        ) : (
          <>
            {/* Products Info */}
            <div className='flex justify-between items-center mb-4'>
              <p className='text-sm text-gray-600'>
                Showing {filterProducts.length} of {products.length} products
              </p>
              
              {/* Active filters display */}
              {(category.length > 0 || subcategory.length > 0 || productType.length > 0 || priceRange.min || priceRange.max) && (
                <div className='flex flex-wrap gap-1'>
                  {category.map(cat => (
                    <span key={cat} className='px-2 py-1 bg-gray-200 text-xs rounded-full'>
                      {cat}
                      <button 
                        onClick={() => setCategory(prev => prev.filter(c => c !== cat))}
                        className='ml-1 text-red-500 hover:text-red-700'
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {subcategory.map(sub => (
                    <span key={sub} className='px-2 py-1 bg-gray-200 text-xs rounded-full'>
                      {sub}
                      <button 
                        onClick={() => setSubCategory(prev => prev.filter(s => s !== sub))}
                        className='ml-1 text-red-500 hover:text-red-700'
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {productType.map(type => (
                    <span key={type} className='px-2 py-1 bg-blue-200 text-xs rounded-full'>
                      {type}
                      <button 
                        onClick={() => setProductType(prev => prev.filter(t => t !== type))}
                        className='ml-1 text-red-500 hover:text-red-700'
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {(priceRange.min || priceRange.max) && (
                    <span className='px-2 py-1 bg-gray-200 text-xs rounded-full'>
                      ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                      <button 
                        onClick={() => setPriceRange({ min: '', max: '' })}
                        className='ml-1 text-red-500 hover:text-red-700'
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filterProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  effectivePrice={item.effectivePrice}
                  discountPercent={item.discountPercent || 0}
                  images={item.images}
                  brand={item.brand}
                  category={item.category}
                  subcategory={item.subcategory}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;