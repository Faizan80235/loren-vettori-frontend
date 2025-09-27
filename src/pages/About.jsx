
// export default About;
import React from 'react'
import Title from '../components/Title';
import NewsletterBox from '../components/NewsletterBox';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.logo} alt="About Us" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20 gap-4'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>

      {/* Leather Workshop Section with Images */}
      <div className='mb-20'>
        <Title text1={'OUR'} text2={'CRAFTSMANSHIP'} />
        
        {/* Shoe Making Workshop Image */}
        <div className='my-10 flex flex-col lg:flex-row gap-8 items-center'>
          <div className='lg:w-1/2'>
            <img 
              src={assets.maked} // First image - shoe making tools
              alt="Shoe Making Workshop" 
              className='w-full h-64 lg:h-80 object-cover rounded-lg shadow-md'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Shoe+Making+Workshop';
              }}
            />
          </div>
          <div className='lg:w-1/2 space-y-4'>
            <h3 className='text-2xl font-bold text-gray-800'>Precision in Every Stitch</h3>
            <p className='text-gray-700 leading-relaxed'>
              Our master craftsmen use traditional shoe-making techniques passed down through generations. 
              Each pair begins with carefully selected leather and precision-cut patterns, ensuring the 
              perfect fit and exceptional durability that our customers expect.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              From hand-stitched uppers to carefully molded soles, every step in our process reflects 
              our commitment to creating footwear that combines timeless style with modern comfort.
            </p>
          </div>
        </div>

        {/* Leather Selection and Tanning */}
        <div className='my-10 flex flex-col lg:flex-row-reverse gap-8 items-center'>
          <div className='lg:w-1/2'>
            <img 
              src={assets.leather} // Second image - leather rolls
              alt="Premium Leather Selection" 
              className='w-full h-64 lg:h-80 object-cover rounded-lg shadow-md'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Premium+Leather+Selection';
              }}
            />
          </div>
          <div className='lg:w-1/2 space-y-4'>
            <h3 className='text-2xl font-bold text-gray-800'>Premium Materials</h3>
            <p className='text-gray-700 leading-relaxed'>
              We source only the finest leather from trusted suppliers who share our commitment to 
              quality and sustainability. Our leather selection process involves careful inspection 
              of each hide for grain quality, thickness, and natural characteristics.
            </p>
            <p className='text-gray-700 leading-relaxed'>
              The tanning process uses traditional methods combined with modern techniques to ensure 
              the leather develops the perfect balance of suppleness and strength, creating products 
              that age beautifully and last for years.
            </p>
          </div>
        </div>

        {/* Original Product Making Process */}
        <div className='text-gray-700 space-y-6 mt-12 max-w-4xl mx-auto px-4'>
          <div>
            <b className='text-lg'>How a Leather Jacket is Made</b>
            <p>Leather jackets are crafted through a meticulous process that starts with selecting the finest hides. The hides are then tanned to preserve the leather and give it a soft yet durable finish. Skilled artisans cut the leather into precise pieces that form the jacket's panels. These pieces are stitched together with care, often adding linings, zippers, and other details. The jacket is then treated to enhance color and protect against wear, resulting in a stylish and long-lasting product.</p>
          </div>

          <div>
            <b className='text-lg'>The Shoe-Making Process (Brief)</b>
            <p>Shoes begin their life as patterns designed for style and comfort. High-quality materials such as leather, rubber, and textiles are selected and cut to match the patterns. These parts are assembled by hand or machine, starting with stitching uppers to soles. Shoes undergo shaping and finishing to ensure the perfect fit and durability. Finally, they are polished and inspected to meet quality standards before reaching customers.</p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default About;