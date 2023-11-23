import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import './ContactBtn.css';

export const ContactBtn = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar la lógica para enviar los datos del formulario
    handleClose(); // Cerrar el modal después de enviar el formulario
  };

  return (
    <div>
      <Button className="Button" onClick={handleShow}>
        <FontAwesomeIcon icon={faPhone} />
      </Button>
  
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row py-1">
              <div className="col-md-6 my-1">
                <div className="mb-2">
                  <label htmlFor="firstName" className="form-label">Nombre</label>
                  <div className="input-group">
                    <input type="text" className="form-control bg-light" id="firstName" name="firstName" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 my-1">
                <div className="mb-2">
                  <label htmlFor="lastName" className="form-label">Apellido</label>
                  <div className="input-group">
                    <input type="text" className="form-control bg-light" id="lastName" name="lastName" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-1">
              <div className="col-md-6 my-1">
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Correo Electrónico</label>
                  <div className="input-group">
                    <input type="text" className="form-control bg-light" id="email" name="email" />
                  </div>
                </div>
              </div>
              <div className="col-md-6 my-1">
                <div className="mb-2">
                  <label htmlFor="phone" className="form-label">Teléfono</label>
                  <div className="input-group">
                    <input type="text" className="form-control bg-light" id="phone" name="phone" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row py-1">
              <div className="col-md-12">
                <div className="mb-2">
                  <label htmlFor="message" className="form-label">Mensaje</label>
                  <div className="input-group">
                    <textarea className="form-control bg-light" id="message" name="message" rows="4"></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 p-0">
              <button type="submit" className="btn btn-primary mx-2">Submit</button>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactBtn;
