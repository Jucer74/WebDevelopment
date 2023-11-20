import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar las credenciales
    if (formData.email === 'admin@correo.com' && formData.password === 'Admin123') {
      // Mostrar el modal
      setShowModal(true);
      // Ocultar la advertencia si estaba visible
      setShowWarning(false);
    } else {
      // Mostrar la advertencia
      setShowWarning(true);
      // Ocultar el modal si estaba visible
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    // Cerrar el modal y restablecer el estado del formulario
    setShowModal(false);
    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <div className="container">
      <div className="col col-xl-12">
        <div className="card" style={{ borderRadius: '1rem' }}>
          <div className="row g-0">
            <div className="col-md-12 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                  </div>

                  <h5 className="h2 fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Iniciar Sesión
                  </h5>

                  {showWarning && (
                    <div className="alert alert-danger" role="alert">
                      Credenciales incorrectas. Por favor, inténtelo de nuevo.
                    </div>
                  )}

                  <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Inicio de sesión </h5>
                          <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        ¡Has iniciado sesión satisfactoriamente!
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
                          <Link type="button" className="btn btn-primary" to="/InicioPage">Siguiente</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                      required // Campo obligatorio
                    />
                    <label className="form-label" htmlFor="email">
                      Correo electrónico
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control form-control-lg"
                      value={formData.password}
                      onChange={handleChange}
                      required // Campo obligatorio
                    />
                    <label className="form-label" htmlFor="password">
                      Contraseña
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
