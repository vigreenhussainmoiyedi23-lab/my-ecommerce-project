import React, { useContext } from 'react'
import ProductCarousel from '../components/HomeComponents/ProductCarousel'
import { Link } from 'react-router-dom'
import HeroHome from '../components/HomeComponents/HeroHome'
import LandingPromo from '../components/HomeComponents/FeaturesHome'
import { LogContext } from '../Context/AuthContext'

const Home = () => {
  const { currentUser, setCurrentUser, products } = useContext(LogContext);
  return (
    <>
    <HeroHome/>
    <ProductCarousel/>
  <LandingPromo products={products}/>
    </>
  )
}

export default Home
