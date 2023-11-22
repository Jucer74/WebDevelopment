import React from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Card } from 'react-bootstrap';
import "../styles/contact.css";
import 'bootstrap/dist/css/bootstrap.min.css';




const Contact = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container>
          <Row>
            <Col lg="7" md="7">
              <h6 className="fw-bold mb-4">Get In Touch</h6>

              <Form>
                <FormGroup className="contact__form">
                  <Input placeholder="Your Name" type="text" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <Input placeholder="Email" type="email" />
                </FormGroup>
                <FormGroup className="contact__form">
                  <textarea
                    rows="5"
                    placeholder="Message"
                    className="textarea"
                  ></textarea>
                </FormGroup>

                <button className=" contact__btn" type="submit">
                  Send Message
                </button>
              </Form>
            </Col>

            <Col lg="5" md="5">
              <div className="contact__info">
                <h6 className="fw-bold">Contact Information</h6>

                <div className='section'>
                  <div className='container grid-container contact-content'>
                    <Card className="mb-4">
                      <Card.Body>
                        <Card.Title>Geolocalización</Card.Title>
                        <Card.Text>
                        <iframe
                        title="Mapa de ubicación"
                        width="450"
                        height="450"
                        frameborder="0"
                        style={{ border: 0 }}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d94977.77825307996!2d-87.77550081061023!3d41.934657250902895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd300bc9357ad%3A0xe3c36432379a5e1a!2sEnterprise%20Rent-A-Car!5e0!3m2!1ses-419!2sco!4v1700540707106!5m2!1ses-419!2sco"
                        allowfullscreen></iframe>
                      </Card.Text>
                      </Card.Body>
                      </Card>
                      </div>
                      </div>    
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
