import React, { useState } from 'react';
import { Form, Button, Col, Row, Modal } from 'react-bootstrap';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    console.log({ name, email, message });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '300px', border: '1px solid #ccc', padding: '5px' }}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label for="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '300px', border: '1px solid #ccc', padding: '5px' }}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label for="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: '300px', border: '1px solid #ccc', padding: '5px' }}
            className="form-control"
          />
        </div>

        <Button type="submit" className="btn btn-primary">
          Enviar
        </Button>
      </form>

      <br></br>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63734.17793477185!2d-76.5394944!3d3.2538623999999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sco!4v1700613295070!5m2!1ses!2sco"
        width="400"
        height="300"
        style={{ border: "0" }}
        allowfullscreen=""
        loading="lazy"
        referrerio="no-referrer-when-downgrade"
      >
      </iframe>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Mensaje enviado</Modal.Title>
        </Modal.Header>
        <Modal.Body>Su mensaje ha sido enviado con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactForm;
