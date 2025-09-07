import React, { useContext, useState } from "react";
import { LogContext } from "../../Context/AuthContext";
import { motion } from "framer-motion";

const Checkout = ({ setCheckout, setCartItems, users, setUsers }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    cardNumber: "",
  });
  const CheckOutHandler = () => {
    if (!currentUser) return;
    setUsers((prevUsers) => {
      const idx = prevUsers.findIndex((u) => u.email === currentUser.email);
      if (idx === -1) return [...prevUsers, currentUser];
      const updated = [...prevUsers];
      updated[idx] = currentUser;
      console.log(`the checkout handler ran and updated users ${users}`)
      return updated;
    });
  };
  const { currentUser, setCurrentUser } = useContext(LogContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCurrentUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        CheckedOutProducts: [
          ...(prev.CheckedOutProducts ?? []),
          ...prev.CartItems,
        ],
        CartItems: [],
      };
    });

    setCartItems([]);
    setOrderPlaced(true);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <motion.div
        className="w-full max-w-lg p-8 bg-white rounded-3xl shadow-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Checkout
        </h1>

        {!orderPlaced ? (
          <motion.form
            onSubmit={handleSubmit}
            className="grid gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={formData.address}
              onChange={handleChange}
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (dummy)"
              value={formData.cardNumber}
              onChange={handleChange}
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
            />
            <motion.button
              type="submit"
              onClick={() => {
                CheckOutHandler()
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.8 }}
              className="bg-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-emerald-700 transition mt-2"
            >
              Place Order
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            className="text-center p-6 bg-emerald-50 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">
              ✅ Order Placed Successfully!
            </h2>
            <p className="text-gray-700">
              Thank you, <span className="font-semibold">{formData.name}</span>!
            </p>
            <p className="text-gray-800 mt-1">{formData.address}</p>
            <motion.button
              onClick={() => {
                setCheckout(false);
                setOrderPlaced(false);

              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
            >
              Go Back
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Checkout;
