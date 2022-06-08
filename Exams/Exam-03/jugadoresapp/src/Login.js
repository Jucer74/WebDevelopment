import React, { useState } from "react";
import {Button, ButtonGroup, Form} from "react-bootstrap";
import "./Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="mb-3">
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <ButtonGroup>
        <Button style={{marginTop:"20px", marginRight:"5px"}}block="true" variant="outline-primary"  type="submit" disabled={validateForm()}>
          Inciar Sesion
        </Button>
        <Button style={{marginTop:"20px", marginRight:"5px"}}block="true" variant="outline-danger" type="submit" disabled={validateForm()}>
          Registrarse
        </Button>
        </ButtonGroup>
      </Form>
    </div>
    </div>
  );
}
