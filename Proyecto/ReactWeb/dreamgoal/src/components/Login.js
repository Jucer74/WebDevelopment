import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiAt } from 'react-icons/bi';
import carouselImg from '../Image/carouselImg';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const redirigirAMenu = () => {
    const usuario = username.trim();
    const contraseña = password.trim();

    // For demonstration purposes, assuming the username and password are valid
    if (usuario && contraseña) {
      window.location.href = "/Home"; // Redirect to LandingPage.html
    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="bg-white p-5 rounded-5 text-secondary shadow d-flex flex-column" style={{ width: '25rem', margin: 'auto', marginTop: '5vh' }}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-6 text-center">
            <div className="col-12 ratio ratio-1x1 bg-dark rounded-circle d-flex align-items-center justify-content-center">
              <div className="d-flex align-items-center justify-content-center">
                <img src={carouselImg.Logo} className="w-50 h-50" alt="login-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center fs-1 fw-bold text-dark mt-1">DreamGoal</div>
      <div className="p-3">
        <div className="border-bottom text-center" style={{ height: '0.9rem' }}>
          <span className="bg-white px-3"></span>
        </div>
      </div>
      <div className="text-center fs-1 fw-bold">Login</div>
      <form className="was-validated mt-4">
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark">
            <BiAt />
          </span>
          <input
            type="email"
            className="form-control bg-light"
            placeholder="Email"
            name="usrname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid email.
          </div>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text bg-dark">
            <BiAt />
          </span>
          <input
            type="password"
            className="form-control bg-light"
            placeholder="Password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="invalid-feedback">
            Please enter a valid password.
          </div>
        </div>

        <div className="d-flex justify-content-around mt-1">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe" style={{ fontSize: '0.9rem' }}>
              Remember me
            </label>
          </div>
        </div>
        <div className="btn btn-success text-white w-100 mt-4 fw-semibold shadow-sm" onClick={redirigirAMenu}>
          Log in
        </div>
        <div className="d-flex gap-1 justify-content-center mt-1">
          <div>You do not have an account?</div>
          <a href="./Register" className="text-decoration-none text-dark fw-semibold">Create</a>
        </div>
      </form>
    </div>
  );
};

