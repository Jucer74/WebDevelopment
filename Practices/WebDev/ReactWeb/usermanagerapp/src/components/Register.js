import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export const Register = () => (
    <Container>
        <h2>Registro</h2>
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" placeholder="Ingresa tu nombre de usuario" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Correo Electrónico</Form.Label>
                <Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Ingresa tu contraseña" />
            </Form.Group>

            <Form.Group controlId="formBasicPasswordConfirmation">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Confirma tu contraseña" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Registrarse
            </Button>
        </Form>
    </Container>
);

