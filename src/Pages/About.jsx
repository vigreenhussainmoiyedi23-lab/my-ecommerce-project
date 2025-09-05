import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto p-8 md:p-16 space-y-16">
      {/* Page title */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-gray-800 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h1>

      {/* Text + Image section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Text */}
        <motion.div
          className="space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <p className="text-gray-600 text-lg leading-relaxed">
            Welcome to <span className="font-semibold">Basket Filler</span>, your one-stop
            ecommerce destination. We are passionate about delivering high-quality products
            that make your everyday life easier and more enjoyable.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Basket Filler, we focus on providing a wide range of products including{" "}
            <span className="font-medium">home essentials, electronics, fashion items, and more</span>.
            Our mission is simple: bring convenience and value straight to your basket.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            With secure payment options and reliable delivery, we aim to give you the best
            online shopping experience.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={cardVariants}
        >
          <img
            src="https://images.unsplash.com/photo-1553531889-56cc480ac5cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2hvcHBpbmclMjBiYXNrZXR8ZW58MHx8MHx8fDA%3D"
            alt="About illustration"
            className="rounded-2xl shadow-lg w-full max-w-md h-auto object-cover"
          />
        </motion.div>
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Wide Product Range",
            desc: "From electronics to fashion, find everything you need in one place.",
            img: "https://img.icons8.com/ios-filled/100/000000/box-important.png",
          },
          {
            title: "Fast & Secure Delivery",
            desc: "Reliable shipping and secure checkout to ensure peace of mind.",
            img: "https://img.icons8.com/ios-filled/100/000000/delivery.png",
          },
          {
            title: "Customer Satisfaction",
            desc: "Our top priority is happy customers with excellent support.",
            img: "https://img.icons8.com/ios-filled/100/000000/happy.png",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            transition={{ delay: idx * 0.2 }}
          >
            <img src={card.img} alt={card.title} className="w-20 h-20" />
            <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
            <p className="text-gray-600">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default About;
