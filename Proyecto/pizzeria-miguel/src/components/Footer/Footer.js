import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="section footer">
      <div className="container">
        <div className="grid-container">
          <div className="footer-grid-item">
            <h3>Sheffield</h3>
            <p>(555) 199 392</p>
            <Link to="#" className="text-white">
              norw@restaurant.com
            </Link>
          </div>

          <div className="footer-grid-item">
            <h3>Cali</h3>
          
            <p>(555) 774 433</p>
            <Link to="#" className="text-white">
              cali@restaurant.com
            </Link>
          </div>

          <div className="footer-grid-item">
            <h3>Singapore</h3>
            <p>(555) 345 888</p>
            <Link to="#" className="text-white">
              sigp@restaurant.com
            </Link>
          </div>

          <div className="footer-grid-item">
            <h3>Social Media</h3>
            <p>Facebook</p>
            <p>Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
