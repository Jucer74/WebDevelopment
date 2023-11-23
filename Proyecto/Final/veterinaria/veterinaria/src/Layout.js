import React from 'react';
import { Container } from 'react-bootstrap';
import "./css/Layout.css"; // Asegúrate de tener tu archivo CSS correspondiente

export const Layout = (props) => (
  <Container>
    {props.children}
  </Container>
)