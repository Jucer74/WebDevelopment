import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import YourImage from "../img/Logo.png";
import "../css/Register.css"; 

export const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !username || !password || !confirmPassword) {
      setError("debes llenar todos los campos ");
      return;
    }

    if (password !== confirmPassword) {
      setError("las contaseñas no coinciden");
      return;
    }

    if (!validateEmail(email)) {
      setError("no es un mail valido ");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_usuario: username,
          correo_electronico: email,
          contrasena: password,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage || "Registration failed");
        return;
      }

      console.log("Registration successful");

      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      setError("Error registering. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleRegister}>
      <div className="form__box">
        <div className="form__left">
          <div className="form__padding">
            <img src={YourImage} alt="" className="form__image" />
          </div>
        </div>
        <div className="form__right">
          <div className="form__padding-right">
            <h1 className="form__title">¡REGISTRATE!</h1>
            <input
              type="text"
              placeholder="Email"
              className="form__email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="form__username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form__password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="form__confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className="form__error">{error}</p>}
            <input
              type="submit"
              value={isLoading ? "Registering..." : "Register"}
              className="form__submit-btn"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </form>
  );
};
