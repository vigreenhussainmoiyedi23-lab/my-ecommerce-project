import React from 'react'

export default async function ProductArray() {
  const response = await fetch('https://dummyjson.com/products?limit=194')
  const product = await response.json()
  return product.products
}