import React from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';

export const Login = () => {

  return (
    <div className='bg-black'>
      <h1 className="text-white">Login</h1>
      <Form>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2" className="text-white">
      Email/Username
      </Form.Label>
      <Form.Label column sm="2">
      
      </Form.Label>
      <Col sm="4">
      <Form.Control type="email" id="txtEmail" name="usuario" placeholder="Usuario"/>
      </Col>
      <Form.Label column sm="4">
      
          </Form.Label>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2" className="text-white">
            Password
          </Form.Label>
          <Form.Label column sm="2">
            
          </Form.Label>
          <Col sm="4">
          <Form.Control type="password" id="txtName" name="password" placeholder="Contraseña"/>
          </Col>
          <Form.Label column sm="4">
            
          </Form.Label>
        </Form.Group>

      </Form>
    
        <Button variant="primary" href = '/Semesters'>Log In</Button>{" "}
        <Button variant="outline-primary" href = '/Semesters'>Back</Button>
  </div>
      
        
  );
}