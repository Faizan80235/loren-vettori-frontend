
import React, { useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
    const heroData = [
        { image: assets.heroes4 },
        { image: assets.heroes3 },
        { image: assets.leathers }
    ]

    const [currentIndex, setCurrentIndex] = useState(0)
    const imgRef = useRef(null) // <-- Add ref here

    // Auto slide effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => 
                prevIndex === heroData.length - 1 ? 0 : prevIndex + 1
            )
        }, 5000)

        return () => clearInterval(interval)
    }, [heroData.length])

    // Log image dimensions whenever the slide changes
    useEffect(() => {
        if (imgRef.current) {
            console.log(`Slide ${currentIndex + 1} dimensions:`)
            console.log('Rendered width:', imgRef.current.clientWidth, 'px')
            console.log('Rendered height:', imgRef.current.clientHeight, 'px')
            console.log('Natural width:', imgRef.current.naturalWidth, 'px')
            console.log('Natural height:', imgRef.current.naturalHeight, 'px')
        }
    }, [currentIndex])

    const currentSlide = heroData[currentIndex]

    return (
        <div className='relative w-screen h-screen overflow-hidden' style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            marginRight: 'calc(-50vw + 50%)'
        }}>
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 transition-all duration-1000 ease-in-out'>
                <img 
                    ref={imgRef} // <-- Attach ref here
                    className='w-full h-full object-cover' 
                    src={currentSlide.image} 
                    alt='image'
                />
                <div className='absolute inset-0 bg-black bg-opacity-40'></div>
            </div>

            {/* Content Overlay */}
            <div className='relative z-10 h-full flex items-center'>
                <div className='container mx-auto px-6 lg:px-12'>
                    <div className='max-w-2xl'>
                        {/* Your headings, buttons, etc. */}
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                className='absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-300 z-20'
                onClick={() => setCurrentIndex(currentIndex === 0 ? heroData.length - 1 : currentIndex - 1)}
            >
                <svg className='w-8 h-8 lg:w-12 lg:h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
            </button>
            
            <button
                className='absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-all duration-300 z-20'
                onClick={() => setCurrentIndex(currentIndex === heroData.length - 1 ? 0 : currentIndex + 1)}
            >
                <svg className='w-8 h-8 lg:w-12 lg:h-12' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20'>
                {heroData.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-white scale-110' 
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>

       
        </div>
    ) 
}

export default Hero
