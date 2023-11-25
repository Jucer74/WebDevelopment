import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    if (password !== confirmedPassword) {
      setError("Passwords don't match");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isEmailTaken = existingUsers.some((user) => user.email === email);

    if (isEmailTaken) {
      setError('Email is already registered');
      return;
    }

    const newUser = { firstName, lastName, email, password };
    localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));

    navigate('/login');
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="register-container p-4 rounded bg-dark text-light">
        <h2 className="text-center">RealEstate Register</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form onSubmit={register}>
          <FormGroup className="mb-3">
            <Label for="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="confirmedPassword">Confirm Password</Label>
            <Input
              id="confirmedPassword"
              type="password"
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
              required
            />
          </FormGroup>
          <Button color="primary" type="submit" className="w-100">
            Register
          </Button>
        </Form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};
