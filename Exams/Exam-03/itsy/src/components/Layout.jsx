import React from "react";
import { Container } from "react-bootstrap";

export const Layout = (props) => (
  <Container id="layout" fluid className="g-0">{props.children}</Container>
);
