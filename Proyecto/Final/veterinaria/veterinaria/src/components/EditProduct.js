import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Casa from '../img/Logo.png';

const EditProduct= () => {
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [errores, setErrores] = useState({
    precio: '',
    cantidad: '',
    nombre: '',
    descripcion: '',
  });
  const navigate = useNavigate();

  // Obtener el propertyId almacenado en localStorage
  const productId = localStorage.getItem('product_id');
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los detalles de la propiedad
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/products/${productId}`);
        const data = await response.json();
        console.log('Datos del producto:', data);

        // Actualizar el estado con los detalles de la propiedad
        setPrecio(data.precio);
        setCantidad(data.cantidad);
        setNombre(data.nombre);
        setDescripcion(data.descripcion);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchData();
  }, [productId]);

  const handleSave = async () => {
    let hayErrores = false;

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

    if (!nombre) {
      setErrores(prevErrores => ({ ...prevErrores, nombre: 'Este campo no puede estar vacío' }));
      hayErrores = true;
    } else {
      setErrores(prevErrores => ({ ...prevErrores, nombre: '' }));
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

    const updatedProperty = {
      id: parseInt(productId, 10),
      nombre: nombre,
      precio: precio,
      cantidad: cantidad,
      descripcion: descripcion,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/productos/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProperty),
      });

      if (response.ok) {
        console.log('Propiedad actualizada con éxito');
        navigate('/profile');
      } else {
        console.error('Error al actualizar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

  const handleCancel = () => {
    navigate('/Home');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          <img src={Casa} alt="User" style={{ width: '100%', maxWidth: '150px', height: 'auto', marginTop: '10px' }} />
        </div>
        <div className="forms">
          <div className="inputs">
            <span>Precio</span>
            <input
              type="number"
              value={precio}
              onChange={(e) => setPrecio(parseInt(e.target.value, 10))}
            />
            {errores.precio && <p className="error-message">{errores.precio}</p>}
          </div>
          <div className="inputs">
            <span>Cantidad</span>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
            />
            {errores.cantidad && <p className="error-message">{errores.cantidad}</p>}
          </div>
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
            <span>Descripción</span>
            <input
              type="text"
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

export default EditProduct;
