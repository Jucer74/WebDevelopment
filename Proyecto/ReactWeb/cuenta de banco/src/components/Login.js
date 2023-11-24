import React, { useState } from 'react';
import axios from 'axios';

const baseUrl = 'https://localhost:5001/api/users';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${baseUrl}/users/login`, {
        username,
        password,
      });

      // Aquí puedes manejar la respuesta de la autenticación si es necesario
      // Redirige o realiza otras acciones después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error during login:', error.message);
      // Maneja el error, muestra un mensaje al usuario, etc.
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="text-center mb-4">
              <img
                src="https://play-lh.googleusercontent.com/zBd7Q4x1OcQbBubjxwrCYzj2bJx8-tpF045EkxWgSDzQ33wOLhoqiHJp0ovSzTdCI54=w240-h480-rw"
                width="100px"
                height="100px"
                alt="Logo de la empresa"
                className="img-fluid"
              />
            </div>
            <div className="card-header text-center">
              <h2>Iniciar Sesión</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Nombre de Usuario
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <span className="text-danger">{/* Puedes mostrar un mensaje de error aquí */}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <span className="text-danger">{/* Puedes mostrar un mensaje de error aquí */}</span>
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleLogin}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              {/* Enlace al formulario de registro */}
              <a href="/register">Registrarse</a>
            </div>
            <div className="card-footer text-center">
              <a href="/forgotpassword">¿Olvidaste tu contraseña?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
