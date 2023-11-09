import React, { useState } from 'react';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div className="container">
      <h2 className="text-center my-4">Carrito de comprass</h2>
      {carrito.map((producto, index) => (
        <div key={index} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={producto.img} alt={producto.name} className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{producto.name}</h5>
                <p className="card-text">{producto.desc}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrito;