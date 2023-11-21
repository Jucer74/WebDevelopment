import React, { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

import "./AmazingMeal.css";

import image1 from "../../../assets/carru2.jpg";
import image2 from "../../../assets/carru1.jpg";
import image3 from "../../../assets/carru3.jpg";
import image4 from "../../../assets/carru4.jpg";
import image5 from "../../../assets/carru5.jpg";

const AmazingMeal = () => {
  const [items] = useState([
    { id: 1, url: image1 },
    { id: 2, url: image2 },
    { id: 3, url: image3 },
    { id: 4, url: image4 },
    { id: 5, url: image5 },
  ]);

  return (
    <div className="section">
      <div className="container">
        <div className="amazing-container">
          <div className="amazing-carousal">
            <div>
              <Carousel>
                {items.map((item) => (
                  <Carousel.Item key={item.id}>
                    <img src={item.url} alt="carousel pic" />
                    <Carousel.Caption>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </div>

          <div className="amazing-content">
            <h2 className="heading-secondary">
              Increibles Pizzas <span className="ampersand">&#38;</span>
              <br />
              <span>
                Los Mejores <br /> Sabores
              </span>
            </h2>

            <h4>¡Esperamos verte pronto!</h4>

            <p>
            En el rincón acogedor de nuestra pizzería, cada porción es una obra maestra de sabores irresistibles. 
            Desde la suavidad de la masa hasta la explosión de ingredientes frescos, cada bocado 
            es una aventura culinaria. 
              <br />
              <br />
              En nuestra carta, descubrirás las combinaciones más exquisitas que harán de cada pizza un festín 
              para el paladar. ¡Bienvenido al lugar donde los mejores sabores se 
              encuentran en cada deliciosa porción de pizza!
            </p>

            <blockquote>
            Porque los momentos perfectos siempre incluyen pizza.
            </blockquote>
          </div>
        </div>

        <div className="amazing-card-container">
          {/* Resto de tu código para las tarjetas */}
        </div>
      </div>
    </div>
  );
};

export default AmazingMeal;
