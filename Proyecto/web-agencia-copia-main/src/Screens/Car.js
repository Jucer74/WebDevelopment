import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import styles from "./HowWeWork.module.css";
import car1 from "../images/car1.jpg";
import car2 from "../images/car2.jpg";
import car3 from "../images/car3.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';

const HowWeWork = () => {
  return (
    <div name="HowWeWork" className={`${styles.howWeWork} text-center`}>
      <h2 className={styles.title}>Featured Cars</h2>
      <Row className="justify-content-center">
        {/* Card para el primer beneficio */}
        <Col xs={12} md={4}>
          <Card className={`${styles.card} mx-auto`}>
            <Card.Img variant="top" src={car1} alt="First slide" />
            <Card.Body>
              <Card.Title>Primer Beneficio</Card.Title>
              <Card.Text>
                Descripción del primer beneficio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card para el segundo beneficio */}
        <Col xs={12} md={4}>
          <Card className={`${styles.card} mx-auto`}>
            <Card.Img variant="top" src={car2} alt="Second slide" />
            <Card.Body>
              <Card.Title>Segundo Beneficio</Card.Title>
              <Card.Text>
                Descripción del segundo beneficio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Card para el tercer beneficio */}
        <Col xs={12} md={4}>
          <Card className={`${styles.card} mx-auto`}>
            <Card.Img variant="top" src={car3} alt="Third slide" />
            <Card.Body>
              <Card.Title>Tercer Beneficio</Card.Title>
              <Card.Text>
                Descripción del tercer beneficio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HowWeWork;
