import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const baseUrl = "https://javerianawebdevapi.azurewebsites.net/api/login";

export function Login() {

  // Control data
  const [loginInfo, setLoginInfo]= useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    const {name, value}= e.target;
    setLoginInfo({
      ...loginInfo,
      [name]: value
    });
  }


  const postLogin = async() => {
    await axios.post(baseUrl, loginInfo)
    .then (response=>{
      let result = response.data;
      console.log(result.token);
      sessionStorage.setItem('token', result.token);
      sessionStorage.setItem('userName', result.name);
    }).catch(error=>{
      console.log(error);
    })
  }    

  return (
  <Container className="text-center text-sm-left w-50">
    <h1>Login</h1>
    <Form>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" id="txtEmail" name="email" placeholder="username@domain.com" onChange={handleChange}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" id="txtPassword" name="password" onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" onClick={()=>postLogin()}>Submit</Button>      
    </Form>
  </Container>
  );
}
