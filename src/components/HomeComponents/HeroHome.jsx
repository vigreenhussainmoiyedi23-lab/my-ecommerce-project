import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroHome = () => {
  return (
    <div
      className='w-screen min-h-screen bg-[url(https://images.unsplash.com/photo-1672632826501-f0b82532fc52?w=1500&auto=format&fit=crop&q=80)]
      bg-no-repeat bg-center bg-cover flex items-center justify-center relative'
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Confidence in Every Purchase
        </motion.h1>
        <motion.p
          className="mt-4 text-lg md:text-xl text-gray-200 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Shop with trust and discover products that define your lifestyle.
        </motion.p>
     <Link to='/products' className='w-full flex items-center justify-center'>
        <motion.button
          className="mt-8 px-8 py-3 rounded-2xl bg-white/90 text-gray-900 font-semibold hover:bg-white transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          >
          Shop Now
        </motion.button>
            </Link>
      </div>
      {/* Gradient Fade at bottom */}

<div className="absolute bottom-0 left-0 w-full h-[10%]
bg-gradient-to-b from-[#63755B] to-[#4A967C]
"
/>
    </div>
  )
}

export default HeroHome
