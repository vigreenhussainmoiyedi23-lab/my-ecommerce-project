import React, { useContext } from 'react'
import ProductCarousel from '../components/HomeComponents/ProductCarousel'
import { Link } from 'react-router-dom'
import HeroHome from '../components/HomeComponents/HeroHome'
import LandingPromo from '../components/HomeComponents/FeaturesHome'
import { LogContext } from '../Context/AuthContext'

const Home = (props) => {
  const { currentUser, setCurrentUser, products } = props;
  return (
    <>
    <HeroHome/>
    <ProductCarousel/>
  <LandingPromo products={products}/>
    </>
  )
}

export default Home
