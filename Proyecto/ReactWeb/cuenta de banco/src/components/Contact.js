import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    complaint: '',
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
    // Aquí puedes manejar la lógica para enviar la queja
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="text-center mb-4">
              <img
                src="https://bogota.gov.co/sites/default/files/styles/1050px/public/2021-05/logo-banco-de-bogota-2.jpg"
                width="100px"
                height="100px"
                alt="Logo de la empresa"
                className="img-fluid"
              />
            </div>
            <div className="card-header text-center">
              <h2>Contacto</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-person"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-envelope"></i>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="complaint" className="form-label">
                    Queja
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-chat-dots"></i>
                    </span>
                    <textarea
                      className="form-control"
                      id="complaint"
                      name="complaint"
                      rows="4"
                      value={formData.complaint}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          {/* Mapa de Google */}
          <iframe
            title="Map"
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.929156345369!2d-76.51719!3d3.420269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e300f4dbdb8d083%3A0x3c6e4d1ee9bc6b82!2sBancolombia!5e0!3m2!1sen!2sco!4v1605974091529!5m2!1sen!2sco"
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
