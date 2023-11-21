import React from 'react'
import HeroImage from "../../components/HeroImage/HeroImage";
import bgImage from "../../assets/cake.jpg";
import DeliveryInfo from './DeliveryInfo/DeliveryInfo';
import AddToCart from './AddToCart/AddToCart'

const Delivery = () => {
  return (
    <div>
      <HeroImage
        bgImage={bgImage}
      />
      <DeliveryInfo />
      <AddToCart />
    </div>
  )
}

export default Delivery