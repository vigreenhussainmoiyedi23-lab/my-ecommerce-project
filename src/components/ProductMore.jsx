import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams, useLocation } from "react-router-dom";
import { LogContext } from "../Context/AuthContext";
import { Navigation, Pagination, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";

export default function ProductMore() {
  const { id } = useParams();
  const data = useContext(LogContext);
  const [userDets, setUserDets] = useState(data.UserDets || []);
  const location = useLocation();
  const [product, setProduct] = useState(location.state);

  useEffect(() => {
    if (!product) {
      const found = data.products.find((n) => String(n.id) === String(id));
      if (found) setProduct(found);
    }
  }, [product, id, data.products]);

  const CartIncrement = () => {
    if (userDets.find((n) => n.id === product.id)) return;
    const UpdateduserDets = [...userDets, product];
    setUserDets(UpdateduserDets);
    localStorage.setItem("UserDets", JSON.stringify(UpdateduserDets));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="w-full min-h-screen  px-4 py-8 md:py-12">
      {/* Main container */}
      <div className="max-w-6xl mx-auto bg-stone-200 rounded-2xl shadow-lg p-6 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Left: Image gallery */}
        <div className="md:w-1/2">
          <Swiper
            modules={[Navigation, Pagination, Zoom]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            zoom={true}
            className="w-full h-[400px] md:h-[500px]"
          >
            {product.images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full rounded-xl overflow-hidden shadow-inner">
                  <img
                    src={img}
                    alt={product.title}
                    className="w-full h-full object-contain bg-white"
                    loading="lazy"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Right: Product info */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-emerald-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-gray-600">{product.description}</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm">
              {product.brand}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
              Stock: {product.stock}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm">
              Category: {product.category}
            </span>
          </div>

          <button
            onClick={CartIncrement}
            className="mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition w-full md:w-auto"
          >
            Add to Cart
          </button>

          {/* Additional info */}
          <div className="mt-4 text-gray-500 space-y-1 text-sm">
            <p>Return Policy: {product.returnPolicy}</p>
            <p>Warranty: {product.warrantyInformation}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Availability: {product.availabilityStatus}</p>
            <p>
              Dimensions: {product.dimensions.width} x {product.dimensions.height} x{" "}
              {product.dimensions.depth}
            </p>
            <p>Weight: {product.weight}g</p>
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Customer Reviews
        </h2>
        <div className="flex flex-col gap-4">
          {product.reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex flex-col">
                <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
                <p className="text-gray-500 text-sm">{review.reviewerEmail}</p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <span className="text-yellow-500 font-semibold">⭐ {review.rating}</span>
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
