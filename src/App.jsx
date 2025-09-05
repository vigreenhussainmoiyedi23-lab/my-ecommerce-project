import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/HomeComponents/Navbar";
import Footer from "./components/HomeComponents/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Products from "./Pages/Products";
import ProductMore from "./components/ProductMore.jsx";
import Login from "./Pages/Login.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import { LogContext } from "./Context/AuthContext";
import Guide from "./Pages/Guide.jsx";

const App = () => {
  const { currentUser } = useContext(LogContext);

  if (!currentUser?.email) {
    return <Login />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/ProductsMore/:id" element={<ProductMore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
