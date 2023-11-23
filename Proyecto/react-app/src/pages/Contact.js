import React from 'react'
import Swal from 'sweetalert2';


import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../styles/home.css";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";



const Contact = () => {
  const handleSendMessage = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Message sent correctly",
      showConfirmButton: false,
      timer: 1500
    });
  };

  
  return (
    <section style={{ paddingTop: '50px' }}>
    <div>
      <h1>Contact</h1>
    </div>
<Container>
  <Row>
    <Col lg="7" md="12"> {/* Modificado para ocupar 100% del ancho en pantallas más pequeñas */}
      <h6 className="fw-bold mb-4">Contact Information</h6>

      <Form>
        <FormGroup className="contact__form">
          <Input placeholder="Your Name" type="text" />
        </FormGroup>
        <FormGroup className="contact__form">
          <Input placeholder="Email" type="email" />
        </FormGroup>

        <FormGroup className="contact__form">
          <textarea
            style={{ width: '100%', maxWidth: '100%', resize: 'vertical' }}
            placeholder="Message"
            className="textarea"
          ></textarea>
        </FormGroup>




        <button
        className="contact__btn btn btn-primary"
        type="button"
        onClick={handleSendMessage}
      >
        Send Message
      </button>



        
      </Form>
    </Col>

    <Col lg="5" md="12" className="mt-4 mt-lg-0"> {/* Modificado para agregar espacio en pantallas más pequeñas */}
      <div className="contact__info">
        <div className='section'>
          <div className='container grid-container contact-content'>
            <iframe
              title="Mapa de ubicación"
              width="100%" // Modificado para ocupar 100% del ancho disponible
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94977.77825307996!2d-87.77550081061023!3d41.934657250902895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd300bc9357ad%3A0xe3c36432379a5e1a!2sEnterprise%20Rent-A-Car!5e0!3m2!1ses-419!2sco!4v1700540707106!5m2!1ses-419!2sco"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </Col>
  </Row>
</Container>
</section>
  )
}

export default Contact