import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://localhost:5001/api/users';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      // Validaciones simples para verificar que los campos no estén vacíos
      if (!username.trim() || !password.trim()) {
        setError('Username and password are required');
        return;
      }

      const response = await axios.post(`${baseUrl}/login`, {
        username,
        password,
      });

      // Aquí puedes manejar la respuesta de la autenticación si es necesario

      // Redirige o realiza otras acciones después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error during login:', error.message);
      setError('Invalid username or password');
      // Maneja el error, muestra un mensaje al usuario, etc.
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setError('');
                    }}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                  />
                  {error && <div className="invalid-feedback">{error}</div>}
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

