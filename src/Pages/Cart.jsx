import React, { useContext, useEffect, useState } from "react";
import { LogContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Checkout from "../components/ProductGrid/Checkout";
import ProductsInCart from "../components/Cartcomponenets.jsx/ProductsInCart";
import EmptyCart from "../components/Cartcomponenets.jsx/EmptyCart";

const Cart = () => {

  const { currentUser, setCurrentUser,users,setUsers } = useContext(LogContext);

  const [cartItems, setCartItems] = useState(() => {
    const base = currentUser?.CartItems ?? [];
    return base.map((it) => ({ ...it, quantity: it.quantity ?? 1 }));
  });

  const [checkout, setCheckout] = useState(false);

  // Keep currentUser.CartItems in sync when cart changes
  useEffect(() => {
    setCurrentUser((prev) => (prev ? { ...prev, CartItems: cartItems } : prev));
  }, [cartItems, setCurrentUser]);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity ?? 1),
    0
  );

  if (!cartItems || cartItems.length === 0) {
    return (
    <EmptyCart/>
    );
  }

  if (checkout) {
    return (
      <section className="relative w-full h-max">
        <Checkout setCheckout={setCheckout} users={users} setUsers={setUsers} setCartItems={setCartItems} />
      </section>
    );
  }

  return (
    <section className="w-full mx-auto sm:p-6 relative flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6 rounded-full bg-slate-900 text-stone-200 w-max px-3 py-4">
        Your Cart
      </h1>
      <div className="space-y-4">
        <ProductsInCart cartItems={cartItems} setCartItems={setCartItems} setCheckout={setCheckout}/>
      </div>
    </section>
  );
};

export default Cart;
