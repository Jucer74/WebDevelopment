import { useState } from "react";
import { UserLogin } from "../services/dto/user-login";
import { AuthService } from "../services/auth-service";
import { LocalStorageService } from "../services/local-storage-service";

const initialCredentials: UserLogin = {
  email: "",
  password: "",
};

export const Login = ({ setUser }) => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [loginError, setLoginError] = useState("");
  const authService: AuthService = new AuthService();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authService
      .login(credentials)
      .then((user) => {
        if (user) {
          console.log("Usuario:", user);
          LocalStorageService.setItem("user", JSON.stringify(user));
          setUser(user);
          window.location.reload();
          setLoginError("");
        } else {
          setLoginError("Credenciales erroneas");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleLogin}>
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
      {loginError && (
        <div className="text-center mb-3">
          <small className="text-danger">{loginError}</small>
        </div>
      )}
      <div className="text-center">
        <button type="submit" className="btn btn-dark">
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};
