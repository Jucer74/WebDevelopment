import React from 'react'
import { Link, NavLink } from 'react-router-dom';


//cambiar a por los Links y los class por los className
const Navbar = () => {
  return (
    <div className="App">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Automoviles Mario</a>
            <div class="navbar-collapse">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Carr</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Rentar</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <div class="text-right">
                <ul class="navbar-nav">
                  <li class="nav-item">
                      <a class="nav-link" href="#">Login</a>
                  </li>
                </ul>
            </div>
        </div>
    </nav>
  </div>
);
}

export default Navbar