import React from "react";
import "./Info.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Info() {
  return (
    <div className="info-menu">
      <br></br>
      <h2>Las Mejores Pizzas de La Cuidad</h2>
      <br></br>
      <br></br>
      <div className="info-items">
        <div className="info-item">
          <h3>Pago en línea</h3>
          <p>
            Puedes pagar tu pedido con tarjeta de crédito o PSE.
          </p>
          <div className="info-icon">
            <FontAwesomeIcon icon="credit-card" />
          </div>
        </div>
        <div className="info-item">
          <h3>Domiciliación</h3>
          <p>
            Recibirás tu pedido en la puerta de tu casa.
          </p>
          <div className="info-icon">
            <FontAwesomeIcon icon="truck" />
          </div>
        </div>
        <div className="info-item">
          <h3>Compra segura</h3>
          <p>
            Tu información está protegida por nuestro sitio web seguro.
          </p>
          <div className="info-icon">
            <FontAwesomeIcon icon="lock" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
