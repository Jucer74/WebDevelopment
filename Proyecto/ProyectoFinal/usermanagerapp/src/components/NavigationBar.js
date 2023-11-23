import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../style/Header.css";

export const NavigationBar = () => {
  const primerclick = () => {
    window.location.href = "/Home";
  };
  const segundoclick = () => {
    window.location.href = "/Consult";
  };
  const tercerclick = () => {
    window.location.href = "/Contact";
  };


  return (
    <div className="typesimple">
      <div className="brand">
        <img
          className="icon"
          alt=""
          src="https://th.bing.com/th/id/R.d19a3555ea724faee6ce058809c7b2ac?rik=Y%2fKIvC71QjHjpA&riu=http%3a%2f%2fprofesionalhoreca.com%2fwp-content%2fuploads%2f2013%2f04%2f02E77723.gif&ehk=Yz2rps84N82m9v8ASi4Qh9tildc%2fJBJ0I8wD33vR1Oo%3d&risl=&pid=ImgRaw&r=0"
        />
        <div className="brandname">Recetas Colombianas</div>
      </div>
      <div className="nav-links">
        <div className="nav-link">
          <div className="nav-label" onClick={() => primerclick()}>
            Home
          </div>  
        </div>
        </div>
        <div className="nav-link">
        <div className="nav-label" onClick={() => segundoclick()}>
            Consult
          </div>  
        </div>
        <div className="nav-link">
          <div className="nav-label" onClick={() => tercerclick()}>
            Contact
          </div>
        </div>
      </div>
  );
};

export default NavigationBar;
