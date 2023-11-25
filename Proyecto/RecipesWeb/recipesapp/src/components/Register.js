import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SIgn_img';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [data, setData] = useState([]);

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addData = (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = inpval;

    if (name === '') {
      toast.error('Name field is required!', {
        position: 'top-center',
      });
      return;
    } else if (email === '') {
      toast.error('Email field is required', {
        position: 'top-center',
      });
      return;
    } else if (!email.includes('@')) {
      toast.error('Please enter a valid email address', {
        position: 'top-center',
      });
      return;
    } else if (password === '') {
      toast.error('Password field is required', {
        position: 'top-center',
      });
      return;
    } else if (password.length < 6) {
      toast.error('Password length must be greater than five', {
        position: 'top-center',
      });
      return;
    } else if (confirmPassword === '') {
      toast.error('Confirm Password field is required', {
        position: 'top-center',
      });
      return;
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        position: 'top-center',
      });
      return;
    }

    const storedData = localStorage.getItem('useraccount');
    if (storedData) {
      const existingUser = JSON.parse(storedData).find((user) => user.email === email);

      if (existingUser) {
        toast.error('This email is already registered. Please use a different email.', {
          position: 'top-center',
        });
        return;
      }
    }

    const newUser = { name, email, password };
    const newData = [...data, newUser];
    setData(newData);
    localStorage.setItem('useraccount', JSON.stringify(newData));

    console.log('data added successfully');
    history('/');
  };

  useEffect(() => {
    const storedData = localStorage.getItem('useraccount');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
            <h3 style={{ color: 'rgb(40, 54, 24)' }} className="text-center col-lg-6">Sign Up</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
                <Form.Control type="text" name="name" onChange={getdata} placeholder="Enter Your Name" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="email" name="email" onChange={getdata} placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Control type="password" name="password" onChange={getdata} placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicConfirmPassword">
                <Form.Control type="password" name="confirmPassword" onChange={getdata} placeholder="Confirm Password" />
              </Form.Group>
              <Button variant="primary" className="col-lg-6" onClick={addData} style={{ background: 'rgb(96, 108, 56)' }} type="submit">
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Already Have an Account? <span><NavLink to="/">SignIn</NavLink></span>{' '}
            </p>
          </div>
          <SIgn_img />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Register;
