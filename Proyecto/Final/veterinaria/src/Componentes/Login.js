import React, { useState } from 'react';
import axios from 'axios';

function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Usuario y contraseña son requeridos');
      return;
    }

    try {
      // Simulación de la llamada a la API
      const response = await axios.post('/api/login', { username, password });
      setToken(response.data.token);  // Guardar el token en el estado global o local
      console.log('Autenticado con éxito:', username);
    } catch (error) {
      setError('Error en la autenticación');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Contraseña:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Iniciar sesión</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default Login;