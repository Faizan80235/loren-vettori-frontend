import React from 'react';
import { assets } from '../assets/assets'; // adjust path according to your folder structure

const LifestyleSection = () => {
    const image=assets.logo
  return (
    <section className="my-20 px-4 md:px-20 flex flex-col md:flex-row items-center gap-8">
      {/* Image */}
      <div className="md:w-1/2 w-full">
        <img
          src={image}
          alt="Brand Lifestyle"
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Text */}
      <div className="md:w-1/2 w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Crafted for Style & Durability
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
          At our brand, every leather piece tells a story. From hand-selected materials to careful craftsmanship, we create products that are not only stylish but built to last. Our sustainable leather sourcing ensures minimal environmental impact, while our design philosophy guarantees timeless elegance.
        </p>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Whether it’s a jacket that moves with you, boots that carry you forward, or accessories that complete your look, every item is a testament to quality and attention to detail. Experience leather that feels as good as it looks.
        </p>
      </div>
    </section>
  );
};

export default LifestyleSection;
