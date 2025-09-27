import React from 'react';
import { assets } from "../assets/assets";


const Features = () => {
  const featureItems = [
    {
      icon: assets.exchange_icon,
      title: "Easy Exchange",
      desc: "Hassle-free exchange within 30 days",
    },
    {
      icon: assets.quality_icon,
      title: "Top Quality",
      desc: "All products meet the highest standards",
    },
    {
      icon: assets.support_img,
      title: "24/7 Support",
      desc: "Our team is ready to help anytime",
    },
    {
      icon: assets.cart_icon,
      title: "Secure Checkout",
      desc: "Safe and quick payment process",
    },
    {
      icon: assets.profile_icon,
      title: "Personalized Account",
      desc: "Manage orders and preferences easily",
    },
    {
      icon: assets.search_icon,
      title: "Smart Search",
      desc: "Find your favorite products quickly",
    },
  ];

  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      {featureItems.map((item, index) => (
        <div key={index} className='hover:scale-105 transition-transform duration-300'>
          <img src={item.icon} className='w-12 m-auto mb-5' alt={item.title} />
          <p className='font-semibold'>{item.title}</p>
          <p className='text-gray-400'>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default Features;
