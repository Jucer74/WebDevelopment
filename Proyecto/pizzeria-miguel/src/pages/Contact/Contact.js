import React from 'react'

import HeroImage from "../../components/HeroImage/HeroImage";
import bgImage from "../../assets/contactUs.jpg";

import CantactForm from './CantactForm/CantactForm'

const Contact = () => {
  return (
    <div>
      <HeroImage
        bgImage={bgImage}
      />
      <CantactForm />
    </div>
  )
}

export default Contact