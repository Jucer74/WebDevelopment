import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [userData, setUserData] = useState({
    userEmail: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validaciones básicas
    if (!userData.userEmail || !userData.firstName || !userData.lastName || !userData.password) {
      setError('Todos los campos son requeridos');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Simulación de la llamada a la API
      const response = await axios.post('/api/register', userData);
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Campos del formulario */}
        <label>
          Email:
          <input type="email" name="userEmail" value={userData.userEmail} onChange={handleChange} />
        </label>
        <label>
          Nombre:
          <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
        </label>
        <label>
          Apellido:
          <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
        </label>
        <label>
          Contraseña:
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </label>
        <label>
          Confirmar Contraseña:
          <input type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
        </label>
        <button type="submit">Registrar</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Register;