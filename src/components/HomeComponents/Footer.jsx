import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-400 text-sm">
              We provide the best products online with fast shipping and excellent customer service.
            </p>
            <h2 className="text-lg font-semibold mb-4 mt-4">Created by</h2>
            <p className="text-gray-400 text-sm">
             <b> Hussain Moiyedi </b> a frontend web devloper
            </p>
            <h2 className="text-lg font-semibold mb-4 mt-4">Credits</h2>
            <p className="text-gray-400 text-sm">
             <b> Unsplash.com , DUMMY.json </b> and all the people who posted this amazing photos and pics.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/products" className="hover:text-white">Products</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
            <div className="flex sm:flex-row md:flex-col  flex-row space-x-4">
              <a href="#" className="hover:text-white">Facebook</a>
              <a href="#" className="hover:text-white">Instagram</a>
              <a href="#" className="hover:text-white">Twitter</a>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} BasketFiller Hussain Moiyedi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
