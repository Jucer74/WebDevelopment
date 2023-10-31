import React from "react";
import "./Inicio.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Inicio() {
  return (
    <div className="container d-flex justify-content-center">
      <div>
        <div className="carousel-container">
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://picsum.photos/1000/400/?pizza"
                  className="d-block w-100"
                  alt="Image 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://picsum.photos/1000/401/?pizza"
                  className="d-block w-100"
                  alt="Image 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://picsum.photos/1000/402/?pizza"
                  className="d-block w-100"
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
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-primary btn-lg" style={{ backgroundColor: "#e22012", borderColor: "#e22012" }}>Domicilios aquí</button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
