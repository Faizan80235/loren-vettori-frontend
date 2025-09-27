import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      
      // Filter by category first
      if (category) {
        productsCopy = productsCopy.filter((item) => 
          item.category === category
        );
      }
      
      // Then filter by subcategory
      if (subCategory) {
        productsCopy = productsCopy.filter((item) => 
          item.subcategory === subCategory
        );
      }
      
      // If we have enough products with same subcategory, use those
      // Otherwise, fall back to same category
      if (productsCopy.length < 4 && category) {
        productsCopy = products.filter((item) => 
          item.category === category
        );
      }
      
      // Shuffle and limit to 5 products
      productsCopy.sort(() => Math.random() - 0.5);
      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
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
    </div>
  );
};

export default RelatedProducts;