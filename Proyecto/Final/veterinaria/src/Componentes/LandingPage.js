import React from 'react';
import Slider from 'react-slick';

function LandingPage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div>
      <h2>Bienvenido a Nuestra Veterinaria</h2>
      <Slider {...settings}>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Servicio+1" alt="Servicio 1" />
          <p>Descripción del Servicio 1</p>
        </div>
        <div>
          <img src="https://via.placeholder.com/800x400?text=Servicio+2" alt="Servicio 2" />
          <p>Descripción del Servicio 2</p>
        </div>
        {/* Añade más diapositivas según sea necesario */}
      </Slider>
    </div>
  );
}

export default LandingPage;