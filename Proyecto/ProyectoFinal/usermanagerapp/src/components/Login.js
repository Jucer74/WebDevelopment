import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Container, Form, Modal, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const baseUrl = "http://localhost:8000/api";

export function Login({ isLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    address: "",
    city: "",
    balance: 0,
    account_type: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(login());
      navigate("/Home");
    }
  }, [dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    if (!credentials.username || !credentials.password) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/login`, credentials);
      const user = response.data;

      dispatch(login(user));

      navigate("/Home");
    } catch (error) {
      console.error("Login failed", error);
      toast.error(
        "Error de inicio de sesion. Por favor, verifique sus credenciales."
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
    const {
      username,
      password,
      name,
      email,
      address,
      city,
      balance,
      account_type,
      confirmPassword,
    } = registerCredentials;

    if (
      !username ||
      !password ||
      !name ||
      !email ||
      !address ||
      !city ||
      balance === null ||
      account_type === "" ||
      confirmPassword === ""
    ) {
      toast.error("Por favor, complete todos los campos de registro.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerCredentials.email)) {
      toast.error("Por favor, ingrese un correo electrónico válido.");
      return;
    }

    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      toast.error(
        "Las contraseñas no coinciden. Por favor, inténtelo de nuevo."
      );
      return;
    }

    try {
      const response = await axios.post(
        `${baseUrl}/signup`,
        registerCredentials
      );
      console.log("Registration successful", response.data);
      toast.success("¡Registro exitoso!");

      handleCloseRegisterModal();
    } catch (error) {
      console.error("Registro fallido", error);

      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Nombre de usuario ya registrado"
      ) {
        toast.error(
          "El usuario ya existe. Por favor, elija otro nombre de usuario."
        );
      } else {
        toast.error("Registro fallido. Por favor, inténtelo de nuevo.");
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
    <Container className="text-center text-md-left">
      <ToastContainer />
      <Card style={{ maxWidth: "400px", margin: "auto", marginTop: "50px" }}>
        <Card.Body>
          <Card.Title className="text-center">Inicio De Sesión</Card.Title>
          <Form>
            <Form.Group>
              <Form.Label>Nombre De Usuario:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingresa tu nombre de usuario..."
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa tu contraseña..."
                onChange={handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleLogin}
              className="mt-3"
              style={{ width: "100%" }}
            >
              Iniciar Sesión
            </Button>
          </Form>
          <p className="mt-3 text-center">
            ¿No tienes una cuenta?{" "}
            <Button variant="link" onClick={handleShowRegisterModal}>
              Registrarse
            </Button>
          </p>
        </Card.Body>
      </Card>

      {/* Registro Modal */}
      <Modal show={showRegisterModal} onHide={handleCloseRegisterModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre De Usuario:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Ingresa tu nombre de usuario..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Ingresa tu nombre..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Correo Electrónico:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Ingresa el correo electrónico..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Ingresa la contraseña..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Confirmación De Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirma la contraseña..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dirección:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Ingresa la dirección..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ciudad:</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Ingresa la ciudad donde vives..."
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Balance:</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                name="balance"
                placeholder="Enter your balance"
                value={registerCredentials.balance}
                onChange={handleRegisterChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo De Cuenta:</Form.Label>
              <Form.Select
                id="txttype"
                name="account_type"
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Selecciona tipo de cuenta
                </option>
                <option value="Checking">Corriente</option>
                <option value="Savings">Ahorros</option>
              </Form.Select>
            </Form.Group>
          </Form>
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(Login);
