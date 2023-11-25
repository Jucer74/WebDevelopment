import React from 'react';
import { Container } from 'react-bootstrap';

export const Layout = (props) => (
  <Container fluid style={{ padding: 0 }}> 
    {props.children}
  </Container>
)