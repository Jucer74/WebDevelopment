import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YourImage from "../img/Portada.jpg";
import "../css/Login10.css";

export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/login/${username},${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        setError("Credenciales inválidas. Por favor, inténtelo de nuevo.");

        if (response.status === 401) {
          setError("Usuario o contraseña no son correctos,intengalo de nuevo");
        }

        console.error(
          "Error del servidor:",
          errorMessage || "No se proporcionó un mensaje de error"
        );
        return;
      }

      const data = await response.json();
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("isLoggedIn", "true");
      const userId = localStorage.getItem("user_id");
      console.log(userId)

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="form__box">
        <div className="form__left">
          <div className="form__padding">
            <img src={YourImage} alt="" className="form__image" />
          </div>
        </div>
        <div className="form__right">
          <div className="form__padding-right">
            <h1 className="form__title">Member Login</h1>
            <input
              type="text"
              placeholder="Username"
              className={`form__email ${error ? "form__email--error" : ""}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="******"
              className={`form__password ${
                error ? "form__password--error" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="form__error">{error}</p>}
            <input
              type="submit"
              value={isLoading ? "Logging in..." : "Login"}
              className="form__submit-btn"
              disabled={isLoading}
            />
            <button
              type="button"
              className="form__register-btn"
              onClick={() => navigate('/Register')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
