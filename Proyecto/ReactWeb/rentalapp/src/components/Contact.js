import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/home.css';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSendMessage = () => {
    if (validateForm()) {
      // Enviar el mensaje si el formulario es válido
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Message sent correctly',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <section style={{ paddingTop: '50px' }}>
      <Container>
        <Row>
          <Col lg="7" md="12">
            <h1>Contact</h1>
            <h6 className="fw-bold mb-4">Contact Information</h6>

            <Form>
              <FormGroup className="mb-3">
                <Input
                  placeholder="Your Name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '100%',
                    borderRadius: '4px',
                    border: `1px solid ${errors.name ? '#f00' : '#ced4da'}`,
                  }}
                />
                {errors.name && <div style={{ color: '#f00' }}>{errors.name}</div>}
              </FormGroup>

              <FormGroup className="mb-3">
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    padding: '10px',
                    marginBottom: '10px',
                    width: '100%',
                    borderRadius: '4px',
                    border: `1px solid ${errors.email ? '#f00' : '#ced4da'}`,
                  }}
                />
                {errors.email && <div style={{ color: '#f00' }}>{errors.email}</div>}
              </FormGroup>

              <FormGroup className="mb-3">
                <textarea
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    resize: 'vertical',
                    padding: '10px',
                    marginBottom: '10px',
                    borderRadius: '4px',
                    border: `1px solid ${errors.message ? '#f00' : '#ced4da'}`,
                  }}
                  placeholder="Message"
                  className="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {errors.message && <div style={{ color: '#f00' }}>{errors.message}</div>}
              </FormGroup>

              <Button
                className="btn btn-primary"
                type="button"
                onClick={handleSendMessage}
                style={{
                  padding: '10px 20px',
                  borderRadius: '4px',
                  background: '#007bff',
                  color: '#fff',
                  border: 'none',
                }}
              >
                Send Message
              </Button>
            </Form>
          </Col>

          <Col lg="5" md="12" className="mt-4 mt-lg-0">
            <div className="contact__info">
              <div className='section'>
                <div className='container grid-container contact-content'>
                  <iframe
                    title="Mapa de ubicación"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15930.909777982843!2d-76.51453439575049!3d3.416452228192872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6c35ef38a71%3A0x5d55e7f8fc837f78!2sCra.%2039a%20%2330a-55%2C%20Ciudad%20Modelo%2C%20Cali%2C%20Valle%20del%20Cauca!5e0!3m2!1ses-419!2sco!4v1700755333172!5m2!1ses-419!2sco"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
