import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LogContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";

export default function PremiumProductsSlider({ products }) {
    // Filter top expensive products (e.g., price > 50)
    const expensiveProducts = products.filter(p => p.price > 2000);
    const { currentUser, setCurrentUser } = useContext(LogContext);
    const CartIncrement = (product) => {
        if (currentUser?.CartItems?.find((n) => n.id === product.id)) return;
        setCurrentUser({
            ...currentUser,
            CartItems: [...(currentUser.CartItems ?? []), product],
        });
    };
    return (
        <section className="w-full bg-[#67b09265] py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12 space-y-4">
                    <span className="inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        Premium Picks
                    </span>
                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900">
                        Top Priced Favorites
                    </h1>
                    <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
                        Discover our premium products — high quality and top rated by our customers.
                    </p>
                </div>

                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="pb-10"
                >
                    {expensiveProducts.map((product) => {
                        const discountedPrice = (product.price * (1 - (product.discountPercentage || 0) / 100)).toFixed(2);
                        return (
                            <SwiperSlide key={product.id}>
                                <div className="bg-stone-200 rounded-2xl shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition">
                                    <div className="w-[min(64,100%)] h-[min(64,100%)] mb-4 flex items-center justify-center overflow-hidden rounded-lg shadow-inner">
                                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain bg-[#ffffff71]" />
                                    </div>

                                    <div className="text-sm text-slate-500">{product.brand}</div>
                                    <div className="font-semibold text-lg text-slate-900">{product.title}</div>

                                    <div className="mt-2 text-emerald-600 font-bold text-xl">
                                        ${discountedPrice}{" "}
                                        {product.discountPercentage > 0 && (
                                            <span className="line-through text-sm text-gray-400 ml-2">
                                                ${product.price.toFixed(2)}
                                            </span>
                                        )}
                                    </div>

                                    <div className="mt-1 text-yellow-500 font-semibold">
                                        ⭐ {product.rating.toFixed(1)}
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => { CartIncrement(product) }}
                                            className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition">
                                            Add to Cart
                                        </button>
                                        <Link to={`/ProductsMore/${product.id}`} state={product} className='relative z-10'>
                                            <button className="px-3 py-2 rounded-md border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition">
                                                View Product
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}
