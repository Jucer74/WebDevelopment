import React, { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
