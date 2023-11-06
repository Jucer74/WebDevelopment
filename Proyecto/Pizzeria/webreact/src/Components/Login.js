import React, { useState } from 'react';
import "./Login.css";
import Info from "./Info"; // Opcionalmente, puedes usar "./Info" si prefieres omitir las llaves


function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthDate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    console.log(formData); // Muestra los datos en la consola (para demostración)
  };

  return (
    <section className="container d-flex justify-content-center" style={{ backgroundColor: '#007a53' }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-12">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="./Images/Banner1.png" // Reemplaza esto con la ruta de tu imagen
                    alt="registration form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
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
        </div>

        <div className='footerInfo'>
        <Info />
        </div>

      </div>
      

    </section>
  );
}

export default Registration;
