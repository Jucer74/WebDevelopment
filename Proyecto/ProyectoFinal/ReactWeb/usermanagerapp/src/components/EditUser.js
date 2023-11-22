import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfileImage from '../img/R.png';

export const EditUser = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}`, {
          method: "GET",
        })
        const data = await response.json();
        console.log('Datos del usuario:', data);

        setNombre(data.nombre_usuario);
        setCorreo(data.correo_electronico);
        setContrasena(data.contrasena);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSave = async () => {

    if (!nombre || !correo) {
      console.error('El nombre y el correo electrónico son campos obligatorios');
      return;
    }

    const updatedUser = {
      nombre_usuario: nombre,
      correo_electronico: correo,
      contrasena: contrasena,
    };
    console.log(updatedUser);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        console.log('Usuario actualizado con éxito');
        navigate('/profile');
      } else {
        console.error('Error al actualizar el usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="info">
          <img
            src={UserProfileImage}
            alt="User"
            style={{ width: '100%', maxWidth: '150px', height: 'auto', marginTop: '10px' }}
          />
        </div>
        <div className="forms">
          <div className="inputs">
            <span>Nombre de usuario</span>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </div>
          <div className="inputs">
            <span>Correo electrónico</span>
            <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
          </div>
          {/* <div className="inputs">
            <span>Contraseña</span>
            <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
          </div> */}
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

export default EditUser;
