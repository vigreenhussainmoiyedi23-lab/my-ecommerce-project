

import React, { useState, useContext } from "react";
import { LogContext } from "../../Context/AuthContext";

const FilterProducts = ({ setFinalFilter, setToFilter ,finalFilter }) => {

  const { products } = useContext(LogContext);

  // Unique brands & categories
  const BrandArray = products.filter(n => n.brand).map(n => n.brand);
  const uniqueBrands = [...new Set(BrandArray)];

  const categoryArray = products.filter(n => n.category).map(n => n.category);
  const uniqueCategory = [...new Set(categoryArray)];

  // States
  const [instock, setInstock] = useState(true);
  const [priceRange, setPriceRange] = useState("");
  const [sortby, setSortby] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [category, setCategory] = useState("");

  // Brand toggle handler
  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // Apply filters
  const applyFilters = () => {
    const FinalFilters={
      instock,
      priceRange,
      sortby,
      brands: selectedBrands,
      category,
    }
    setFinalFilter(FinalFilters);
    setToFilter(false);
  };
 


  return (
    <div className="flex w-full min-h-[100vh] max-h-max">
      {/* Overlay for mobile */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 z-40 flex"
        onClick={() => setToFilter(false)}
      >
        <div
          className="bg-emerald-900 text-white w-full p-5 space-y-4 shadow-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-bold border-b border-emerald-700 pb-2">
            Filters
          </h2>

          {/* Sort */}
          <select
            value={sortby}
            onChange={(e) => setSortby(e.target.value)}
            className="w-full border border-emerald-600 bg-emerald-800 text-white px-3 py-2 rounded-lg"
          >
            <option value="">Sort By</option>
            <option value="lowtohigh">Price: Low to High</option>
            <option value="hightolow">Price: High to Low</option>
          </select>

          {/* Price Range */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full border border-emerald-600 bg-emerald-800 text-white px-3 py-2 rounded-lg"
          >
            <option value="">Price Range</option>
            <option value="0-50">Under $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-5000">$1000-$5000</option>
            <option value="5000-25000">$5000-$25000</option>
            <option value="25000-Infinity">above $25000</option>
          </select>

          {/* Brands */}
          <h1 className="font-semibold">All Brands</h1>
          <div className="grid sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-6 grid-cols-2">
          {uniqueBrands.map((b, i) => (
            <label className="flex items-center gap-2 min-w-[25%] min-h-max max-w-max" key={i}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="accent-emerald-500"
                />
              {b}
            </label>
          ))}
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-emerald-600 bg-emerald-800 text-white px-3 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            {uniqueCategory.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-2">Features</h4>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={instock}
                onChange={() => setInstock((prev) => !prev)}
                className="accent-emerald-500"
              />
              In Stock
            </label>
          </div>

          {/* Apply Button */}
          <button
            onClick={applyFilters}
            className="w-full bg-emerald-600 py-2 rounded-lg hover:bg-emerald-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterProducts;
