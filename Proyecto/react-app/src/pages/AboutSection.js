import React from 'react'
import { Container, Row, Col } from "reactstrap";
import card3 from "../images/card/card3.png";
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa los estilos de los iconos


const AboutSection = () => {
  return (

    <section style={{ paddingTop: '50px' }}>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to car rent service</h2>
              <p className="section__description">
                Introducing [Rental Car Company], your gateway to convenience, freedom, and adventure on wheels. Born from a passion for seamless travel experiences,
                we are dedicated to providing you with the perfect vehicle for any journey, ensuring that every mile is a pleasure.</p>
              <p>
              At [Rental Car Company], we understand that no two journeys are alike. That's why our diverse fleet offers a wide range of options, from sleek sedans for urban exploration to spacious SUVs for family getaways and rugged off-road vehicles for the adventurous spirit. 
                Whether you're embarking on a business trip, a scenic road trip, or simply need a reliable set of wheels, we have the perfect vehicle to suit your needs.
              </p>

              <p>
              Our commitment to customer satisfaction extends beyond the keys. We pride ourselves on offering a seamless rental experience, from easy online reservations to friendly in-person service. Our dedicated team is here to assist you at every step, ensuring that your rental process is as smooth as the ride in one of our well-maintained vehicles.
              </p>
              <p>
              Safety is our top priority, and our fleet is regularly inspected and maintained to the highest standards. Enjoy peace of mind knowing that you're driving a reliable and well-cared-for vehicle. Additionally, we offer optional add-ons, such as GPS navigation and child seats, to enhance your travel experience and meet your specific needs.
              </p>
                

            

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                <i class="bi bi-hand-thumbs-up-fill"></i> We are reliable.
                </p>

                <p className="section__description d-flex align-items-center gap-2 ms-4">
                <i class="bi bi-emoji-sunglasses-fill"></i> We are great.
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                <i class="bi bi-gitlab"></i> We are friendly to the environment.
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={card3} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>













  )
}

export default AboutSection