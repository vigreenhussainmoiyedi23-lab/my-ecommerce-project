import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NoResults = () => {
  return (
    <div className="relative w-screen h-screen bg-[url('https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696467.jpg?t=st=1756483902~exp=1756487502~hmac=fcb998588438a8402ca114a56f268f27ab60915da4235fd0d4b09f4365bbe3fc&w=2000')] bg-cover bg-center flex items-center justify-center">
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        className="relative text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          No Results Found
        </h1>
        <p className="text-white/80 mb-6 text-lg sm:text-xl">
          Sorry, we couldn’t find any items matching your search.
        </p>
        <Link
          to="/"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NoResults;
