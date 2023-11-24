import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    Email: '',
    Name: '',
    LastName: '',
    Password: '',
    ConfirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      // Crear un objeto con los campos específicos que deseas enviar
      const requestData = {
        Email: formData.Email,
        Name: formData.Name,
        LastName: formData.LastName,
        Password: formData.Password,
      };

      // Hacer la solicitud para guardar los datos en tu endpoint
      const response = await axios.post('https://localhost:5001/api/users', requestData);

      // Si la solicitud es exitosa, redirigir al usuario a la página de inicio de sesión
      if (response.status === 200) {
        window.location.href = '/Login';
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Manejar errores, mostrar mensajes, etc.
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
              <h2>Registrarse</h2>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      name="Email"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    Nombre
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="Name"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Apellido
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="LastName"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
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
                      name="Password"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="ConfirmPassword"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="text-center">
                  <a
                    href="/Login"
                    className="boton btn btn-primary"
                    onClick={handleRegister}
                  >
                    Registrarse
                  </a>
                </div>
                <div className="text-center">
                  <a href="/Login">¿Ya tienes una cuenta?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
