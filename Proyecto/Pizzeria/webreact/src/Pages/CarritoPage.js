import React, { useState } from 'react';
import Menu from './Menu';
import Carrito from './Carrito';

const App = () => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
  };

  return (
    <div>
      <Menu agregarAlCarrito={agregarAlCarrito} />
      <Carrito carrito={carrito} />
    </div>
  );
};

export default App;
