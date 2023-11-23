import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import "../styles/login.css";
import { authActions } from '_store';

import React from 'react';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
}
from 'mdb-react-ui-kit';

export { Login };

function Login() {
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };


    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    return (
        
        <MDBContainer className="my-5">
        <MDBCard>
          <MDBRow className='g-0'>
      
            <MDBCol md='6'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp' alt="login form" className='rounded-start w-100'/>
            </MDBCol>
      
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
      
                
      
              <h4 className="fw-bold my-4 pb-3" style={{letterSpacing: '1px'}}>Log in</h4>
      
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                  </div>
                  <button disabled={isSubmitting} className="btn btn-custom-color">
                    {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                    Login
                  </button>
                  <Link to="../register" className="btn btn-link" style={{color: '#393f81'}}>Register</Link>
                </form>
    
      
              </MDBCardBody>
            </MDBCol>
      
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      


    );
}

export default Login;
