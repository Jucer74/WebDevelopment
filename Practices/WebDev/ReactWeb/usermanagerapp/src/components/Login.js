import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

export const CitasMedicasLogin = ({ setLogoutUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("response", response);
        localStorage.setItem(
          "login",
          JSON.stringify({
            userLogin: true,
            token: response.data.access_token,
          })
        );
        setError("");
        setEmail("");
        setPassword("");
        navigate('/Home');
      })
      .catch((error) => setError(error.response.data.message));
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container p-4 rounded" style={{ backgroundColor: "#2196F3", color: "white" }}>
        <h2 className="text-center">Sanitas Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={login}>
          <FormGroup className="mb-3">
            <Label for="username" className="d-flex align-items-center" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password" className="d-flex align-items-center" style={{ color: "white" }}>
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button color="light" type="submit" className="w-100" style={{ backgroundColor: "#64B5F6", color: "white" }}>
            Login
          </Button>
        </Form>
        <p className="text-center mt-3" style={{ color: "white" }}>
          Don't have an account? <Link to="/register" style={{ color: "white", textDecoration: "underline" }}>Register</Link> yourself
        </p>
      </div>
    </div>
  );
};

