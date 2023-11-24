import React from 'react';
import { Link } from 'react-router-dom';

export const Register = () => (
  <div className="bg-white login-container d-flex align-items-center justify-content-center border py-5">
    <div className="login-card col-sm-12 col-md-4 col-lg-5 bg-white rounded-5 text-secondary shadow d-flex flex-column p-5">
      <div className="row justify-content-center">
        <div className="login-title fs-1 fw-bold">Registro</div>
      </div>

      <form className="row py-3" action="/Login">
        <div className="text-danger"></div>
        <div className="col-12 my-1">
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-file-person text-secondary"></i></span>
              <input type="email" className="form-control bg-light" placeholder="Email" name="Email" />
            </div>
            <span className="text-danger"></span>
          </div>
        </div>

        <div className="col-6 my-1">
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-file-person text-secondary"></i></span>
              <input type="text" className="form-control bg-light" placeholder="Nombre" name="FirstName" />
            </div>
            <span className="text-danger"></span>
          </div>
        </div>
        <div className="col-6 my-1">
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-file-person text-secondary"></i></span>
              <input type="text" className="form-control bg-light" placeholder="Apellido" name="LastName" />
            </div>
            <span className="text-danger"></span>
          </div>
        </div>

        <div className="col-6 my-1">
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill text-secondary"></i></span>
              <input type="password" className="form-control bg-light" placeholder="Contraseña" name="Password" />
            </div>
            <span className="text-danger"></span>
          </div>
        </div>
        <div className="col-6 my-1">
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill text-secondary"></i></span>
              <input type="password" className="form-control bg-light" placeholder="Confirmar Contraseña" name="ConfirmPassword" />
            </div>
            <span className="text-danger"></span>
          </div>

        </div>
        <div className="d-flex justify-content-end col-12 mt-4 p-0">
          <button type="submit" className="btn btn-singup py-3 my-2 px-4 fw-bold">register </button>
          <Link to="/" id="btnCancel" className="btn btn-Cancel py-2 my-2 px-4 mx-2 fw-bold d-flex align-items-center justify-content-center">
            Cancel
          </Link>

        </div>
      </form>
    </div>
  </div>
);