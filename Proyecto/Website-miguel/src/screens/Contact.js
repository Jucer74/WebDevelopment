import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import '../styles.css/Contact.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYourIconName } from '@fortawesome/free-solid-svg-icons';

// Estado para almacenar los datos del formulario
const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    mensaje: '',
  });


  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);

    // Simulando una respuesta exitosa del servidor
    // En tu aplicación real, reemplaza esto con la lógica de llamada a la API
    // y muestra la alerta solo si la llamada es exitosa.
    simulateSubmitSuccess();
  };

  const simulateSubmitSuccess = () => {
    // Lógica de simulación de éxito (reemplaza esto con tu lógica de llamada a la API)
    const success = areAllFieldsFilled();

    if (success) {
      // Mostrar SweetAlert si todos los campos están llenos
      Swal.fire({
        icon: 'success',
        title: 'Message Sent Successfully',
      });

      // Limpiar el formulario o realizar otras acciones después del envío exitoso
      setFormData({
        nombre: '',
        correo: '',
        mensaje: '',
      });
    } else {
      // Mostrar un mensaje de error si no todos los campos están llenos
      Swal.fire({
        icon: 'error',
        title: 'Please fill in all fields',
      });
    }
  };

  const areAllFieldsFilled = () => {
    return formData.nombre.trim() !== '' && formData.correo.trim() !== '' && formData.mensaje.trim() !== '';
  };

  // Estructura del componente con el formulario y la tarjeta de Google Maps
  
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 style={{ color: 'white', textAlign: 'center' }}>Contact Us</h2>
        <form onSubmit={handleSubmit} className="form-horizontal">
          <label htmlFor="nombre">Name</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name"
          />

          <label htmlFor="correo">Email</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter a valid email address"
          />

          <label htmlFor="mensaje">Message</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="form-input"
            placeholder="Write a message"
          />

          <button type="submit" className="submit-button">
            Send
          </button>
        </form>
      </div>

      <div className="map-card" style={{ marginTop: '20px' }}>
        <Card>
          <Card.Body>
            <Card.Title>Google Maps</Card.Title>
            <Card.Text>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d304524.00058471283!2d-1.829087101054806!3d53.39526275721332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48790aa9fae8be15%3A0x3e2827f5af06b078!2sSheffield%2C%20Reino%20Unido!5e0!3m2!1ses!2sco!4v1700599197797!5m2!1ses!2sco"
                title="Google Maps"
                width="100%"
                height="538"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              ></iframe>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <footer className="footer mt-4">
        <div className="container">
          <div className="row">
            {/* Redes Sociales */}
            <div className="col-md-4">
              <h4>Social Media</h4>
              <div className="social-icons">
                <FontAwesomeIcon icon={faInstagram} className="icon" />
                <FontAwesomeIcon icon={faFacebook} className="icon" />
                <FontAwesomeIcon icon={faWhatsapp} className="icon" />
              </div>
            </div>

            {/* Restaurants */}
            <div className="col-md-4">
              <h4>Restaurants</h4>
              <ul>
                <li>Sheffield</li>
                <li>Cali</li>
                <li>Singapore</li>
              </ul>
            </div>

            {/* Soporte */}
            <div className="col-md-4">
              <h4>Support</h4>
              <ul>
                <li>Help and Frequently Asked Questions (FAQ)</li>
                <li>Terms and Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
    
  );
};

export default Contact;
