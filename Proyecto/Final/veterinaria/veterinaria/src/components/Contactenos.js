import '../css/Contactenos.css';
import { useNavigate } from "react-router-dom";
import React from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Contactenos = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/Home");
  };

    return (
      <div className="contact_form">
        <div className="formulario">
          <h1>!CONTACTENOS!</h1>
          <h3>Queremos conocer tus impresiones, sugerencias o si quieres trabajar con nosotros</h3>
          <form action="submeter-formulario.php" method="post">
            <p>
              <label htmlFor="nombre" className="colocar_nombre">
                Nombre
                <span className="obligatorio">*</span>
              </label>
              <input
                type="text"
                name="introducir_nombre"
                id="nombre"
                required="obligatorio"
                placeholder="JohnDoe"
              />
            </p>

            {/* ... (resto del formulario) ... */}
            <p>
              <label htmlFor="asunto" className="colocar_asunto">
               Porque
                <span className="obligatorio">*</span>
              </label>
              <input
                type="text"
                name="introducir_asunto"
                id="asunto"
                required="obligatorio"
                placeholder="Porque..."
              />
            </p>

            <p>
              <label htmlFor="mensaje" className="colocar_mensaje">
                Mensaje Final
                <span className="obligatorio">*</span>
              </label>
              <textarea
                name="introducir_mensaje"
                className="texto_mensaje"
                id="mensaje"
                required="obligatorio"
                placeholder="Quiero agradecer..."
              ></textarea>
            </p>

            <div className="map-container">
              <iframe
                title="Google Maps"
                width="100%"
                height="300"s
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAvgKmlWIxghqb_G6Mc95xf8tp_TOj1_oM&q=Hall+des+Lumières,+49+Chambers+St,+New+York,+NY+10007,+Estados+Unidos&zoom=15"
                allowFullScreen
              ></iframe>
            </div>
            <Button class="btn btn-success" variant="submit" onClick={handleLogout}>Enviar</Button>

            <p className="aviso">
              <span className="obligatorio"> *</span>los campos son obligatorios.
            </p>
          </form>
        </div>
      </div>
    );
  }



export default Contactenos;
