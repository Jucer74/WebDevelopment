import { useState } from "react";
import { AuthService } from "../services/auth-service";
import { UserRegister } from "../services/dto/user-register";

const initialCredentials: UserRegister = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export const Register = () => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [registerError, setRegisterError] = useState("");
  const authService: AuthService = new AuthService();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    authService
      .register(credentials)
      .then((user) => {
        if (user) {
          console.log("Usuario:", user);
          setRegisterError("");
        } else {
          setRegisterError("La confirmacion de la contraseña es erronea o el usuario ya existe");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Correo electronico
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Confirma la contraseña
        </label>
        <input
          type="password"
          className="form-control"
          id="passwordConfirm"
          name="passwordConfirm"
          value={credentials.passwordConfirm}
          onChange={handleInputChange}
          required
        />
      </div>
      {registerError && (
        <div className="text-center mb-3">
          <small className="text-danger">{registerError}</small>
        </div>
      )}
      <div className="text-center">
        <button type="submit" className="btn btn-dark">
          Registrarse
        </button>
      </div>
    </form>
  );
};
