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
            Amazing pizzas <span className="ampersand">&#38;</span>
              <br />
              <span>
                The best <br /> ingredients
              </span>
            </h2>

            <h4>We hope to see you soon!</h4>

            <p>
            In the cozy corner of our pizzeria, each slice is a masterpiece of irresistible flavors.
            From the softness of the dough to the explosion of fresh ingredients, every bite
            It is a culinary adventure.
              <br />
              <br />
              In our menu, you will discover the most exquisite combinations that will make each pizza a feast.
              for the palate. Welcome to the place where the best flavors are
              found in every delicious slice of pizza!
            </p>

            <blockquote>
            Because the perfect moments always include pizza.
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
