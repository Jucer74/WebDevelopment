import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CDBInput, CDBCard, CDBCardBody, CDBIcon, CDBBtn, CDBLink, CDBContainer } from 'cdbreact';

function Register() {
  const [userData, setUserData] = useState({
    userEmail: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    // Validaciones básicas
    if (!userData.userEmail || !userData.firstName || !userData.lastName || !userData.password) {
      setError('Todos los campos son requeridos');
      return;
    }
    if (userData.password !== userData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Simulación de la llamada a la API
      const response = await axios.post('/api/register', userData);
      console.log('Usuario registrado:', response.data);
    } catch (error) {
      setError('Error en el registro');
    }
  };

  return (
    <CDBContainer>
      <CDBCard style={{ width: '30rem' }}>
        <CDBCardBody className="mx-4">
          <div className="text-center mt-4 mb-2">
            <p className="h4"> Sign up </p>
          </div>
          <div className="form-flex-row mb-n4">
            <div className="col">
              <CDBInput material hint="First name" type="text" />
            </div>
            <div className="col">
              <CDBInput material hint="Last name" type="text" />
            </div>
          </div>
          <CDBInput material hint="E-mail" type="email" />
          <p className="text-muted text-center small mt-n4">At least 8 characters and 1 digit</p>
          <CDBInput material hint="Password" type="password" />
          <CDBInput material hint="Phone number" type="text" />
          <p className="text-muted text-center small mt-n4">
            Optional - for two step authentication
          </p>
          <div className="d-flex justify-content-center align-items-center mt-4">
            <CDBInput type="Forms" />
            <p className="m-0">Subscribe to our newsletter</p>
          </div>
          <CDBBtn color="dark" className="btn-block my-3 mx-0">
            Sign up
          </CDBBtn>
          <p className="text-center"> or sign up with</p>
          <div className="flex-row mb-3 d-flex justify-content-center">
            <CDBBtn color="white" className="m-0" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn color="white" className="m-0" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="twitter" />
            </CDBBtn>
            <CDBBtn color="white" className="m-0" style={{ boxShadow: 'none' }}>
              <CDBIcon fab icon="google-plus-g" />
            </CDBBtn>
          </div>
          <p className="text-center m-0">
            Already have an account?{' '}
            <CDBLink className="d-inline p-0" to="#">
              Sign In
            </CDBLink>
          </p>
          <hr />
          <p className="text-center">
            By clicking <em>Sign up</em> you agree to our{' '}
            <CDBLink className="d-inline p-0" to="#">
              terms of service
            </CDBLink>
          </p>
        </CDBCardBody>
      </CDBCard>
    </CDBContainer>
  );
}

export default Register;