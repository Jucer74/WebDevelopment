import React, { useState, useEffect } from "react";
import { Button, Container, Form, Card, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your images
import backgroundImage from '../images/loginback.jpg';
import logoImage from '../icons/soundscape negro.png';
import studioImage from '../images/estudio casero.jpg';

const baseUrl = "http://localhost:8000/api";

export function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    CorreoElectronico: "",
    Contrasena: "",
  });

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerCredentials, setRegisterCredentials] = useState({
    Nombre: "",
    CorreoElectronico: "",
    Contrasena: "",
    ConfirmarContraseña: "", // Added missing field
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/Home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    // Verificar si los campos de usuario y contraseña están llenos
    if (!credentials.CorreoElectronico || !credentials.Contrasena) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, credentials);
      const user = response.data;

      // Almacena el token en el almacenamiento local para mantener al usuario autenticado
      localStorage.setItem("token", user.token);

      // Redirigir a la página de inicio
      navigate("/Home");

      // Mostrar el mensaje de bienvenida u otras acciones necesarias
    } catch (error) {
      alert("Login failed", error);
      alert(
        "Error de inicio de sesión. Por favor, verifique sus credenciales."
      );
    }
  };

  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleRegister = async () => {
    const { Nombre, CorreoElectronico, Contrasena, ConfirmarContraseña } =
      registerCredentials;

    if (!Nombre || !CorreoElectronico || !Contrasena || !ConfirmarContraseña) {
      alert("Por favor, complete todos los campos de registro.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerCredentials.CorreoElectronico)) {
      alert("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (
      registerCredentials.Contrasena !== registerCredentials.ConfirmarContraseña
    ) {
      alert(
        "Las contraseñas no coinciden. Por favor, inténtelo de nuevo."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/signup`,
        registerCredentials
      );
      alert("Registration successful", response.data);

      handleCloseRegisterModal();
    } catch (error) {
      alert("Registro fallido", error);

      // Mostrar mensaje de alerta si el usuario ya existe
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Nombre de usuario ya registrado"
      ) {
        // Usuario ya existe en la base de datos
        alert(
          "El usuario ya existe. Por favor, elija otro nombre de usuario."
        );
      } else {
        alert("Registro fallido. Por favor, inténtelo de nuevo.");
      }
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterCredentials((prevRegisterCredentials) => ({
      ...prevRegisterCredentials,
      [name]: value,
    }));
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center" style={{ maxWidth: "100%", backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <Card className="bg-white p-2 rounded-3 text-secondary">
        <div className="row">
          <div className="col-md-6">
            <img src={studioImage} alt="Imagen de fondo" className="img-fluid rounded-start" />
          </div>
          <div className="col-md-6">
            <Form className="g-3 mt-3">

              <h2 className="text-center fs-1">
                <img src={logoImage} alt="logo" width="200px" />
              </h2>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="CorreoElectronico"
                  type="email" className="form-control" placeholder="User or Email" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="Contrasena"
                  type="password" className="form-control" placeholder="Ingrese aquí su contraseña" onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="checkterms" />
                  <label className="form-check-label" htmlFor="checkterms">Acepto términos y condiciones</label>
                </div>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" onClick={handleLogin}>Ingresar</Button>
              </div>

              <div className="my-3">
                <span>¿Aún no tienes una cuenta? <Button variant="link" onClick={handleShowRegisterModal}>Regístrate</Button></span>
                <span><Button variant="link" href="">Recuperar contraseña</Button></span>
              </div>

            </Form>
          </div>
        </div>
      </Card>

      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              placeholder="Ingresa tu nombre de usuario..."
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Correo Electronico:</Form.Label>
            <Form.Control
              type="email"
              name="CorreoElectronico"
              placeholder="Ingresa tu nombre de usuario..."
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="Contrasena"
              placeholder="Ingresa tu nombre de usuario..."
              onChange={handleRegisterChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirmar Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="ConfirmarContraseña"
              placeholder="Ingresa tu nombre de usuario..."
              onChange={handleRegisterChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegisterModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
