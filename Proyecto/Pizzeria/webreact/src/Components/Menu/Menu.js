import React, { useState } from 'react';
import Pepperoni_Img from "../../Assets/Images/Menu/Pepperoni_Img.png"
import Carnes_Img from "../../Assets/Images/Menu/Carnes_Img.jpg"
import Hawaiana_Img from "../../Assets/Images/Menu/Hawaiana_Img.jpg"
// import CuatroQuesos_Img from "../Assets/Images/Menu/CuatroQuesos_Img.jpg"

const Menu = () => {
  const [carrito, setCarrito] = useState([]);

  const cards = [
    { name: 'Pepperoni', img: Pepperoni_Img, desc: 'Deliciosa pizza de pepperoni con queso mozzarella y salsa de tomate.' },
    { name: 'Carnes', img: Carnes_Img, desc: 'Sabrosa pizza con jamón, salchicha y carne de res.' },
    { name: 'Hawaiana', img: Hawaiana_Img, desc: 'Pizza tropical con jamón y piña, una combinación dulce y salada.' },
    // { name: 'Cuatro Quesos', img: CuatroQuesos_Img, desc: 'Pizza de queso, con mozzarella, cheddar, parmesano y queso azul.' }
  ];

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="row">
      {cards.map((card, index) => (
        <div key={index} className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch">
          <div className="card" style={{ width: '18rem', margin: '1rem' }}>
            <img src={card.img} className="card-img-top" alt={card.name} />
            <div className="card-body">
              <h5 className="card-title">{card.name}</h5>
              <p className="card-text">
                {card.desc}
              </p>
              <button onClick={() => agregarAlCarrito(card)} className="btn btn-success" style={{ "margin-bottom": "-0.01rem" }}>Agregar al carrito</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
