import React from "react";
import {
  Shield,
  ShoppingCart,
  ListOrdered,
  Truck,
  Sliders,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// import styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
const features = [
  {
    title: "Admin Dashboard",
    description:
      "A secure dashboard accessible only through /admin. Admins can view products, manage checkouts, and mark orders as delivered.",
    icon: Shield,
    images: ["/Images/AdminDashboard1.png", "/Images/AdminDashboard2.png"],
    to: '/admin'
  },
  {
    title: "Dynamic Product Details",
    description:
      "Clicking a product’s title or description opens the ProductsMore page with full product properties using dynamic routing.",
    icon: ListOrdered,
    images: ["/Images/Products.png", "/Images/ProductsMore.png"],
    to: '/products'

  },
  {
    title: "Cart Management",
    description:
      "Users can increase, decrease, or remove items from the cart, and checkout with updated totals.",
    icon: ShoppingCart,
    images: ["/Images/cart.png"],
    to: '/cart'

  },
  {
    title: "Product Swipers",
    description:
      "Interactive swiper carousels showcase premium and normal products with smooth navigation.",
    icon: Sliders,
    images: ["/Images/FeaturedCarousal.png", "/Images/PremiumCarousal.png"],
    to: '/'

  },
];

const Guide = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400 text-white px-6 py-12">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Project Guide</h1>
        <p className="text-lg text-emerald-100">
          This is my second React project — a complete e-commerce experience with
          both user and admin functionality.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:scale-105 transform transition duration-300 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="w-10 h-10 text-yellow-300" />
                <h2 className="text-2xl font-semibold">{f.title}</h2>
              </div>
              <p className="text-emerald-100 text-sm mb-4">{f.description}</p>
              {/* Image Preview */}
              <div className="mt-auto">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-full rounded-xl"
                >
                  {f.images.map(n =>
                    <SwiperSlide>
                      <img
                        src={n}
                        alt={f.title}
                        className="w-full h-40 object-cover rounded-xl shadow-md border border-white/20"
                      />
                    </SwiperSlide>
                  )}
                </Swiper>
              </div>
              <Link to={f.to}
              className="w-full h-max text-center hover:text-slate-900"
              >
              View Details 
              </Link>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-emerald-200">
          🚀 Built with React, Tailwind, GSAP, and lots of ☕
        </p>
      </div>
    </div>
  );
};

export default Guide;
