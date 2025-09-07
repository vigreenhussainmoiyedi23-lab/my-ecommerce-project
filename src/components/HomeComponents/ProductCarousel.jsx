import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { useContext } from "react";
import { LogContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { currentUser, setCurrentUser, products } = useContext(LogContext);

  const CartIncrement = (product) => {
    if (currentUser?.CartItems?.find((n) => n.id === product.id)) return;
    setCurrentUser({
      ...currentUser,
      CartItems: [...(currentUser.CartItems ?? []), product],
    });
  };
  return (
    <div className="w-full max-w-6xl mx-auto py-10 relative">
      <h2 className="text-3xl font-bold text-center mb-8">
        Featured Products
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {products
          ?.filter((n) => n.id <= 10)
          .map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-stone-200 rounded-xl h-[450px] w-full shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 flex flex-col">
                <img
                  src={product.images[0] || ""}
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-56 object-contain bg-white"
                />
                <div className="p-4 flex flex-col flex-grow items-center text-center">
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <h6 className="text-gray-500 text-sm truncate w-full">
                    {product.description}
                  </h6>
                  <p className="text-lg text-cyan-500 font-bold">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => CartIncrement(product)}
                    className="mt-3 active:bg-emerald-800 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
                  >
                    Add to Cart
                  </button>

                  <Link to={`/ProductsMore/${product.id}`} state={product}>
                    <button className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
                      View Product Details
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
