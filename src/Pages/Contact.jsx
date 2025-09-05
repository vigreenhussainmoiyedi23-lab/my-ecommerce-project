import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    alert(`Request submitted, ${name}`);
    setEmail("");
    setMessage("");
    setName("");
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffffff2e] via-[#ffffff2a] to-transparent p-4">
      <motion.div
        className="max-w-3xl w-full  p-8 rounded-3xl shadow-2xl space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl font-bold text-gray-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-gray-600 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Have questions or need help? Reach out to{" "}
          <span className="font-semibold">Basket Filler</span>, we’re always here
          to assist you!
        </motion.p>

        {/* Contact Form */}
        <motion.div
          className="bg-stone-200 p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <form className="grid gap-4" onSubmit={onSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              rows="4"
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            ></textarea>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-xl font-semibold text-gray-700">Our Contact Info</h2>
          <p className="text-gray-600">📧 support@basketfiller.com</p>
          <p className="text-gray-600">📞 +91 XXXXX XXXXX</p>
          <p className="text-gray-600">🏢 Basket Filler Pvt. Ltd, Mumbai, India</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
