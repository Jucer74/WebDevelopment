import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaSignInAlt } from "react-icons/fa";

function App() {
  return (
    <div className="App">
      <nav class="navbar navbar-expand-sm bg-light mb-3">
          <div class="container">
          <a class="navbar-brand" href="#">
            LOGO
           </a>
              <div class="navbar-collapse">
                  <ul class="navbar-nav">
                      <li class="nav-item">
                          <a class="nav-link" href="#">Menu</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link" href="#">Usuarios</a>
                      </li>
                  </ul>
              </div>
              <div class="text-right">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                          <FaShoppingCart /> Carrito
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                          <FaSignInAlt /> Login
                        </a>
                    </li>
                  </ul>
              </div>
          </div>
      </nav>
    </div>
  );
}

export default App;
