import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';

import image1 from './img/eddy-billard-Y8lhl6j_OUU-unsplash.jpg';
import image2 from './img/glenn-carstens-peters-ZWD3Dx6aUJg-unsplash.jpg';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-3">
        <div className="container">
          <a className="navbar-brand" href="#">
            UserManagerApp
          </a>
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Home
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Destino 1</h3>
            <p>Lugar acogedor para pasar con amigos o familia.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={image2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Destino 2</h3>
            <p>Viaja a cualquier parte del mundo.</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Agrega más items según sea necesario */}
      </Carousel>
    </div>
  );
}

export default App;
