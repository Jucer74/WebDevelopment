import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Casa from "../img/Logo.png";

export const CreateProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({
    nombre: '',
    precio: '',
    cantidad: '',
    descripcion: '',
  });
  const navigate = useNavigate();

  const handleSave = async () => {
    let hayErrores = false;

    if (!nombre) {
      setErrores(prevErrores => ({ ...prevErrores, nombre: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, nombre: '' }));
    }

    if (!precio) {
      setErrores(prevErrores => ({ ...prevErrores, precio: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, precio: '' }));
    }

    if (!cantidad) {
      setErrores(prevErrores => ({ ...prevErrores, cantidad: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, cantidad: '' }));
    }

    if (!descripcion) {
      setErrores(prevErrores => ({ ...prevErrores, descripcion: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, descripcion: '' }));
    }

    if (hayErrores) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 0,
          nombre: nombre,
          precio: parseInt(precio, 10),
          cantidad: parseInt(cantidad, 10),
          descripcion: descripcion,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error al crear el producto: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log('Producto creado con éxito:', responseData);
      navigate("/Home");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    navigate("/productos");
  };

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          <img src={Casa} alt="User" style={{ width: '100%', maxWidth: '150px', height: 'auto', marginTop: '10px' }} />
        </div>
        <div className="forms">
          <div className="inputs">
            <span>Nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <p className="error-message">{errores.nombre}</p>}
          </div>
          <div className="inputs">
            <span>Precio</span>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
            />
            {errores.precio && <p className="error-message">{errores.precio}</p>}
          </div>
          <div className="inputs">
            <span>Cantidad</span>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            {errores.cantidad && <p className="error-message">{errores.cantidad}</p>}
          </div>
          <div className="inputs">
            <span>Descripción</span>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            {errores.descripcion && <p className="error-message">{errores.descripcion}</p>}
          </div>
          <div className="info">
            <button id="savebutton" onClick={handleSave}>
              Guardar
            </button>
            <button id="cancelbutton" onClick={handleCancel}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProducto;
