import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SIgn_img from './SIgn_img';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from './UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [inpval, setInpval] = useState({
    email: '',
    password: ''
  });

  const getdata = (e) => {
    const { value, name } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const addData = async (e) => {
    e.preventDefault();

    const getuserArr = localStorage.getItem('useraccount');
    const { email, password } = inpval;

    if (email === '') {
      toast.error('Email field is required', {
        position: 'top-center'
      });
      return;
    } else if (!email.includes('@')) {
      toast.error('Please enter a valid email address', {
        position: 'top-center'
      });
      return;
    } else if (password === '') {
      toast.error('Password field is required', {
        position: 'top-center'
      });
      return;
    } 

    if (getuserArr && getuserArr.length) {
      const userdata = JSON.parse(getuserArr);
      const userlogin = userdata.find((el) => el.email === email && el.password === password);

      if (!userlogin) {
        toast.error('Invalid details', {
          position: 'top-center'
        });
      } else {
        console.log('User login successfully');

        login(userlogin);
        localStorage.setItem("user_login", JSON.stringify(userlogin));
        window.location.href = '/home';
      }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <section className="d-flex justify-content-between">
          <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
            <h3 style={{ color: 'rgb(40, 54, 24)' }} className="text-center col-lg-6">Sign In</h3>
            <Form>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                <Form.Control type="email" name="email" onChange={getdata} placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                <Form.Control type="password" name="password" onChange={getdata} placeholder="Password" />
              </Form.Group>
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: 'rgb(96, 108, 56)' }}
                type="submit"
              >
                Submit
              </Button>
            </Form>
            <p className="mt-3">
              Don't Have an Account? <span><NavLink to="/register">SignUp</NavLink></span>{' '}
            </p>
          </div>
          <SIgn_img />
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
