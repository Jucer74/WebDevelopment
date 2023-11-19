import React from 'react';
import Pepperoni_Img from "../../Assets/Images/Menu/Pepperoni_Img.png"
import Carnes_Img from "../../Assets/Images/Menu/Carnes_Img.jpg"
import Hawaiana_Img from "../../Assets/Images/Menu/Hawaiana_Img.jpg"
import CuatroQuesos_Img from "../../Assets/Images/Menu/CuatroQuesos_Img.jpg"

export const Menu = () => {


  const cards = [
    {
      name: "Pepperoni",
      img: Pepperoni_Img,
      desc: "Deliciosa pizza de pepperoni con queso mozzarella y salsa de tomate.",
      precio: 10,
      quantity: false,
    },
    {
      name: "Carnes",
      img: Carnes_Img,
      desc: "Sabrosa pizza con jamón, salchicha y carne de res.",
      precio: 12,
      quantity: false,
    },
    {
      name: "Hawaiana",
      img: Hawaiana_Img,
      desc: "Pizza tropical con jamón y piña, una combinación dulce y salada.",
      precio: 15,
      quantity: false,
    },
    {
      name: "Cuatro Quesos",
      img: CuatroQuesos_Img,
      desc: "Pizza de queso, con mozzarella, cheddar, parmesano y queso azul.",
      precio: 14,
      quantity: false,
    },
  ];



  return (
    <div className="container col d-flex justify-content-center" style={{ backgroundColor: "#007a53" }}>
      <div className="row">
        {cards.map((card, index) => (
          <div key={index} className="col-sm-12 col-md-6 col-lg-4 d-flex align-items-stretch">
            <div className="card" style={{ width: '18rem', margin: '1rem' }}>
              <img src={card.img} className="card-img-top" alt={card.name} />
              <div className="card-body">
                <h5 className="card-title">{card.name}</h5>
                <p className="card-text">{card.desc}</p>
                <p className="card-text">Precio: ${card.precio}</p>
                <button className="btn btn-success" style={{ marginBottom: "-0.01rem" }}>Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
