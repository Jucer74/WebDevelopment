import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../style/Login.css'; // Ajusta la ruta según tu estructura

export const Login = (props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError('Por favor, complete todos los campos.');
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/login/${username},${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
  
        if (response.status === 401) {
          setError('Usuario o contraseña no son correctos, inténtalo de nuevo');
        } else {
          setError('Error del servidor. Por favor, inténtelo de nuevo.');
        }
  
        console.error('Error del servidor:', errorMessage || 'No se proporcionó un mensaje de error');
        return;
      }
  
      const data = await response.json();
      if (!data.user_id) {
        setError('Usuario no encontrado. Verifica tus credenciales e inténtalo de nuevo.');
        return;
      }
  
      localStorage.setItem('user_id', data.user_id);
      localStorage.setItem('isLoggedIn', 'true');
      const userId = localStorage.getItem('user_id');
      console.log(userId);
  
      navigate('/home');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleRegistroClick = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <Form className="login-form" onSubmit={handleLogin}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
  
        <Button variant="success" type="submit">
          Login
        </Button>
  
        <Button variant="primary" onClick={handleRegistroClick}>
          Registro
        </Button>
  
        {error && <div className="error-message">{error}</div>}
      </Form>
    </div>
  );
};

export default Login;
