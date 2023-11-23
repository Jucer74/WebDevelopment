import React from 'react';

export const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de validación y redirección a Menu
    var contraseña = document.getElementsByName("Password")[0].value;
    var ConfirmContraseña = document.getElementsByName("ConfirmPassword")[0].value;
    if (contraseña === ConfirmContraseña) {
        window.location.href = "/Home"; // Redirigir a LandingPage.html
      } else {
        alert("Please passwords must be the same... ");
      } // Puedes ajustar la ruta según tus necesidades
  };

  const cancelRegistration = () => {
    window.location.href = "/"; // Redirigir a Login
  };

  return (
    <body style={{ backgroundColor: '#F0F2F5' }}>
      <div className="bg-white p-5 rounded-5 text-secondary shadow d-flex flex-column" style={{ width: '25rem', margin: 'auto', marginTop: '5vh' }}>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-6 text-center">
              <div className="col-12 ratio ratio-1x1 bg-dark rounded-circle d-flex align-items-center justify-content-center">
                <div className="d-flex align-items-center justify-content-center">
                  <img src="./src/Logo.png" className="w-50 h-50" alt="login-icon" />
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
        <div className="text-center fs-1 fw-bold">Register</div>
        <form className="was-validated mt-4" onSubmit={handleSubmit}>
        <div class="input-group mb-3">
        <span class="input-group-text bg-dark">
          <i class="bi bi-envelope-fill"></i>
        </span>
        <input
          type="text"
          class="form-control bg-light"
          placeholder="Username@gmail.com"
          name="usrname"
          required
        />
        <div class="invalid-feedback">
          Please enter a valid username.
        </div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark">
          <i class="bi bi-lock-fill"></i>
        </span>
        <input
          type="text"
          class="form-control bg-light"
          placeholder="First Name"
          name="First Name"
          required
        />
        <div class="invalid-feedback">
          Please enter a valid firs name.
        </div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark">
          <i class="bi bi-person-fill"></i>
        </span>
        <input
          type="text"
          class="form-control bg-light"
          placeholder="Last Name"
          name="Last Name"
          required
        />
        <div class="invalid-feedback">
          Please enter a valid Last name.
        </div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark">
          <i class="bi bi-lock-fill"></i>
        </span>
        <input
          type="password"
          class="form-control bg-light"
          placeholder="Password"
          name="Password"
          required
        />
        <div class="invalid-feedback">
          Please enter a valid password.
        </div>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text bg-dark">
          <i class="bi bi-lock-fill"></i>
        </span>
        <input
          type="password"
          class="form-control bg-light"
          placeholder="Confirm Password"
          name="ConfirmPassword"
          required
        />
        <div class="invalid-feedback">
          Please confirm your password.
        </div>
      </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-success mt-3">Register</button>
          </div>
          <div className="d-grid">
            <button type="button" className="btn btn-danger mt-3" onClick={cancelRegistration}>Cancel</button>
          </div>
        </form>
      </div>
    </body>
  );
};


