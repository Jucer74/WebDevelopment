import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

export const RegistroNuevo = () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegistro = (e) => {
    e.preventDefault();
    // Aquí podrías enviar los datos de registro a tu backend
     axios.post("http://localhost:4000/api/auth/register", { email, nombre, password })
       .then((response) => {
    //     // Manejar la respuesta según lo necesites
         navigate("/Login");
       })
       .catch((error) => {
    //     // Manejar el error si la solicitud falla
       });
    // Por ahora, solo redirigir al usuario de vuelta al login
    navigate("/Login");
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="login-container p-4 rounded" style={{ backgroundColor: "#2196F3", color: "white" }}>
        <h2 className="text-center">Nuevo Registro</h2>
        <Form onSubmit={handleRegistro}>
          <FormGroup className="mb-3">
            <Label for="email" className="d-flex align-items-center" style={{ color: "white" }}>
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="nombre" className="d-flex align-items-center" style={{ color: "white" }}>
              Nombre
            </Label>
            <Input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password" className="d-flex align-items-center" style={{ color: "white" }}>
              Contraseña
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
            Registrarse
          </Button>
        </Form>
      </div>
    </div>
  );
};
