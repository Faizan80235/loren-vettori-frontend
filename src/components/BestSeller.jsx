import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext); 
  const [bestSeller, setBestSeller] = useState([]); 

  useEffect(() => { 
    // Filter products marked as bestseller
    const bestProduct = products.filter((item) => item.bestseller); 
    setBestSeller(bestProduct.slice(0, 5)); 
  }, [products]); 

  return (
    <section className="my-20">
      {/* Section Title */}
      <div className="text-center py-12">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed mt-4">
          Explore our most popular leather products — from stylish jackets to durable boots and accessories. Each piece is crafted from premium leather for lasting comfort, timeless style, and unbeatable quality.
        </p>
      </div>

    </section>
  );
};

export default BestSeller;
