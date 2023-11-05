import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Inicio.css";
import Banner1 from "./Images/Banner1.png";
import Banner2 from "./Images/Banner2.png";
import Banner3 from "./Images/Banner3.jpg";

function Inicio() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="carousel-container">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={Banner1}
                className="d-block w-100 carousel-image" // Add a class for consistent image size
                alt="Image 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Banner2}
                className="d-block w-100 carousel-image" // Add a class for consistent image size
                alt="Image 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={Banner3}
                className="d-block w-100 carousel-image" // Add a class for consistent image size
                alt="Image 3"
              />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="text-center mt-5 ">
        <button className="btn btn-primary btn-lg w-100" style={{ backgroundColor: "#e22012", borderColor: "#e22012" }}>Domicilios aquí</button>
      </div>
      </div>
      
    </div>
  );
}

export default Inicio;
