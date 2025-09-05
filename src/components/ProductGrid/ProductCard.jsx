import React, { useContext, useEffect, useState } from 'react'
import { LogContext } from '../../Context/AuthContext'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from 'react-router-dom';
import NoResults from './Noresults';

const ProductCard = ({search,PropsProducts}) => {
  
     const { currentUser, setCurrentUser } = useContext(LogContext)
    const CartIncreament = (product) => {
    if (currentUser.CartItems.find(n => n.id === product.id)) return
    const UpdateduserDets = { ...currentUser, CartItems: [...currentUser.CartItems, product] }
    setCurrentUser(UpdateduserDets)
  }

    const filteredProducts = search
        ? PropsProducts.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : PropsProducts



    return (
        <>
            {(filteredProducts.length > 0) ? `` :
           
                <NoResults/>}
               
            {filteredProducts.map((product) => (
                <div
                key={product.id}
                className="bg-stone-300 flex-shrink-0 [-webkit] rounded-xl sm:h-[450px] w-full h-[min(300px,max-content)] sm:w-[100%]  flex justify-evenly items-center shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
                    <img
                        src={product.images[0] || null}
                        alt={product.title}
                        loading="lazy"
                        className='w-[30%] h-[100%] object-center object-contain'
                        />
                    <div className="p-4 flex flex-col items-center w-[70%]">
                <Link to={`/ProductsMore/${product.id}`} state={product} className='relative z-10'>
                        <h3 className=" pointer-events-none text-xl font-semibold">{product.title}</h3>
                        <h6 className=" pointer-events-none font-semibold text-slate-800 min-h-[50px] max-h-[100px] overflow-hidden overflow-ellipsis w-[100%]">{product.description}</h6>
                        <p className="text-lg text-cyan-700 font-bold pointer-events-none ">${product.price}</p>
                        <p className='text-cyan-900 font-medium text-xs'>{product.availabilityStatus}</p>
                        <p className='text-cyan-900 font-medium text-xs'>{product.shippingInformation}</p>
                        <p className='text-cyan-900 font-medium text-xs'> {product.warrantyInformation}</p>
                        </Link>
                        <button
                            onClick={() => { CartIncreament(product) }}
                            className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg  hover:bg-emerald-700 transition">
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
            </>
    )
}

export default ProductCard
