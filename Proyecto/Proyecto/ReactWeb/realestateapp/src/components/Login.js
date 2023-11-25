import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const user = storedUsers.find(
      (u) => u.email === username && u.password === password
    );

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container p-4 rounded bg-dark text-light">
        <h2 className="text-center">RealEstate Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form onSubmit={login}>
          <FormGroup className="mb-3">
            <Label for="username" className="d-flex align-items-center">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Username
            </Label>
            <Input
              id="username"
              type="text"
              value={username}  
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password" className="d-flex align-items-center">
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
          <Button color="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/register">Register</Link> yourself
        </p>
      </div>
    </div>
  );
};
