import React from "react";
import Info from "../Common/Components/Info";
import Carrito from "../Components/Carrito";

export function CarritoPage() {
  return (
    <div
      className="container col d-flex justify-content-center"
      style={{ backgroundColor: "#007a53" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          
          <div>
            <Carrito />
          </div>

          <div style={{ marginTop: "5rem" }}>
            <Info />
          </div>

        </div>
      </div>
    </div>
  );
}

export default CarritoPage;
