import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products, loading, error } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // newest first, then pick first 10
      const sorted = [...products].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );
      setLatestProducts(sorted.slice(0, 10));
    }
  }, [products]);

  if (loading) {
    return <p className="text-center py-16 text-lg text-gray-500">Loading latest products...</p>;
  }

  if (error) {
    return <p className="text-center py-16 text-red-500 text-lg">Error: {error}</p>;
  }

  return (
    <section className="my-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <Title text1="LATEST" text2="COLLECTIONS" />
          <p className="mt-4 text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Discover our newest arrivals, carefully curated for you. Experience style and quality in every product.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {latestProducts.map((item) => (
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
              className="transform hover:-translate-y-1 hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:shadow-2xl rounded-xl overflow-hidden bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;
