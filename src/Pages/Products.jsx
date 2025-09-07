import React, { useContext, useEffect, useState } from 'react'
import { LogContext } from '../Context/AuthContext'
import ProductCard from '../components/ProductGrid/ProductCard'
import SearchBar from '../components/ProductGrid/SearchBar'

const Products = () => {
  const data = useContext(LogContext)
  const [products, setProducts] = useState(data.products)
  const [searched, setSearched] = useState(null)
  const [finalFilter, setFinalFilter] = useState({})
useEffect(() => {
  const { brands = [], category = '', instock = false, priceRange = '', sortby } = finalFilter;

  const [low, high] = priceRange ? priceRange.split('-').map(Number) : [0, Infinity];
  const min = isNaN(low) ? 0 : low;
  const max = isNaN(high) ? Infinity : high;

  let filteredProducts = data.products.filter(p =>
    (brands.length === 0 || brands.includes(p.brand)) &&
    (category === '' || p.category === category) &&
    p.price >= min && p.price <= max &&
    (!instock || p.stock > 0)
  );
if (sortby === 'lowtohigh') filteredProducts.sort((a, b) => a.price - b.price);
if (sortby === 'hightolow') filteredProducts.sort((a, b) => b.price - a.price);

  setProducts(filteredProducts);

}, [finalFilter, data.products]);


  return (
    <>
      <SearchBar
        products={data.products}
        setProducts={setProducts}
        setSearched={setSearched}
        finalFilter={finalFilter}
        setFinalFilter={setFinalFilter}
      />

      <div className='grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 grid-cols-1 w-screen gap-5 py-2 px-1 items-center justify-center min-h-[100vh]'>
        <ProductCard PropsProducts={products} search={searched} />
      </div>
    </>
  )
}

export default Products
