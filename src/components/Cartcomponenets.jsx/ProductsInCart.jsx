import React from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

const ProductsInCart = ({ cartItems, setCartItems,setCheckout }) => {
  const inc = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : { ...item, quantity: item.quantity ?? 1 }
      )
    );
  };

  const dec = (id) => {
    setCartItems((prev) =>
      prev.flatMap((item) => {
        if (item.id !== id) return { ...item, quantity: item.quantity ?? 1 };
        const q = (item.quantity ?? 1) - 1;
        return q <= 0 ? [] : { ...item, quantity: q };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (item.quantity ?? 1),
    0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* LEFT SECTION: Products List */}
      <div className="flex-1 space-y-4">
        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        {cartItems.map((item) => {
          const qty = item.quantity ?? 1;
          const price = Number(item.price) || 0;
          const lineTotal = (price * qty).toFixed(2);

          return (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center justify-between p-4 border border-emerald-300 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex-1 flex items-center gap-4">
                <img
                  src={item.images[0] || "https://via.placeholder.com/80"}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-600">${price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center mt-3 sm:mt-0 space-x-3">
                <button
                  onClick={() => dec(item.id)}
                  className="p-2 bg-emerald-200 text-emerald-800 rounded hover:bg-emerald-300 transition"
                >
                  <FiMinus />
                </button>
                <span className="font-medium text-gray-700 w-6 text-center">
                  {qty}
                </span>
                <button
                  onClick={() => inc(item.id)}
                  className="p-2 bg-emerald-200 text-emerald-800 rounded hover:bg-emerald-300 transition"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="flex items-center mt-3 sm:mt-0 space-x-4 min-w-[120px] justify-end">
                <span className="font-semibold">${lineTotal}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* RIGHT SECTION: Summary & Checkout */}
      <div className="w-full lg:w-[350px] p-6 border border-gray-200 rounded-lg shadow-md bg-white h-fit">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Items:</span>
          <span>{cartItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0)}</span>
        </div>
        <div className="flex justify-between mb-4 font-semibold text-lg">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>
        <button 
          onClick={() => setCheckout((prev) => !prev)}
        className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition font-semibold">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductsInCart;
