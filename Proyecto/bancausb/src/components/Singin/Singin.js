import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { login } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './Singin.css';


export const SignIn = () => {
  const baseUrlUser = "https://localhost:5001/api/Users";
  const [userData, setUserData] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();


    const user = userData.find((user) => user.userEmail === username & user.password === password);

    if (user) {
      dispatch(login());
      navigate('/Home');
    } else {
      setError("Usuario o contraseña incorrecta. Por favor, verifica tu nombre de usuario y contraseña.");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(baseUrlUser);
        setUserData(response.data);
      } catch (error) {
        console.log(error);
        setError("Error al obtener los usuarios. Por favor, inténtalo de nuevo más tarde.");
      }
    };

    getUsers();
  }, [baseUrlUser]);

  return (
    <div className="bg-white login-container d-flex align-items-center justify-content-center border py-5">
      <div className="login-card col-sm-12 col-md-4 col-lg-4  bg-white rounded-5 text-secondary shadow d-flex flex-column p-5">
        <div className="row justify-content-center">
          <div className="login-title fs-1 fw-bold">Ingresar</div>
        </div>

        <form className="py-4" onSubmit={handleLogin}>
          <div className="text-danger">{error}</div>
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-circle text-secondary"></i></span>
              <input
                type="email"
                className="form-control bg-light"
                placeholder="UserName"
                name="UserName"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <span className="text-danger"></span>
          </div>
          <div className="mb-2">
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-lock-fill text-secondary"></i></span>
              <input
                type="password"
                className="form-control bg-light"
                placeholder="Password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <span className="text-danger"></span>
          </div>

          <div className="d-flex justify-content-between mb-4 col-auto">
            <p className="mb-0 text-end texto-responsivo">No tienes cuenta?&nbsp;</p>
            <Link
              to="/Singup"
              id="linkRegister"
              className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mb-0 text-start texto-responsivo"
            >
              Crear una cuenta
            </Link>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-login col-12  py-3 my-2 px-4">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
