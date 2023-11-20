import React, { useState } from 'react';
import PizzaImg from "../../Assets/Images/PizzaRegister.jpg";
import { Link } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que todos los campos estén llenos
    if (!formData.name || !formData.email || !formData.birthDate || !formData.password || !formData.confirmPassword) {
      alert("Por favor, completa todos los campos.");
      return; // Detener el envío del formulario
    }

    // Validar que la contraseña y la confirmación de contraseña sean iguales
    if (formData.password !== formData.confirmPassword) {
      alert("La contraseña y la confirmación de contraseña no coinciden.");
      return; // Detener el envío del formulario
    }

    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log(formData); // Muestra los datos en la consola (para demostración)

    // Mostrar el modal de confirmación
    setShowModal(true);
  };

  return (
    <div className="container">
      <div className="col col-xl-12">
        <div className="card" style={{ borderRadius: '1rem' }}>
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={PizzaImg} // Reemplaza esto con la ruta de tu imagen
                alt="registration form"
                className="img-fluid"
                style={{
                  borderRadius: '1rem 0 0 1rem',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                  </div>

                  <h5 className="h2 fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                    Regístrate en tu cuenta
                  </h5>

                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control form-control-lg"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="name">
                      Nombre
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control form-control-lg"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="email">
                      Correo electrónico
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      className="form-control form-control-lg"
                      value={formData.birthDate}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="birthDate">
                      Fecha de Nacimiento
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
                      required
                    />
                    <label className="form-label" htmlFor="password">
                      Contraseña
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      className="form-control form-control-lg"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <label className="form-label" htmlFor="confirmPassword">
                      Confirmar Contraseña
                    </label>
                  </div>

                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                      Crear Perfil
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* Modal */}
       <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Perfil Creado</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Tu perfil ha sido creado exitosamente.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
              <Link type="button" className="btn btn-primary" to="/LoginPage">Volver a Login</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Fin del Modal */}
    </div>

    
  );
}

export default Register;
