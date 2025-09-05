import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center bg-[url('https://cdn.pixabay.com/photo/2012/05/07/02/13/cancel-47588_1280.png')] bg-no-repeat bg-center bg-contain">
      
      <motion.div
        className="flex flex-col items-center gap-6 bg-white/70 p-8 rounded-2xl shadow-lg backdrop-blur-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-slate-900 text-4xl sm:text-5xl font-bold text-center">
          Your Cart is Empty
        </p>

        <Link to="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-emerald-600 text-white font-semibold px-6 py-3 rounded-full text-xl sm:text-2xl shadow-lg hover:bg-emerald-700 transition"
          >
            Add Products
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
