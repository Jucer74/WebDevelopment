import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { history } from '_helpers';
import { userActions, alertActions } from '_store';

export { Register };

function Register() {
  const dispatch = useDispatch();

  // form validation rules
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  async function onSubmit(data) {
    dispatch(alertActions.clear());
    try {
      await dispatch(userActions.register(data)).unwrap();

      // redirect to login page and display success alert
      history.navigate('/account/login');
      dispatch(alertActions.success({ message: 'Registration successful', showAfterRedirect: true }));
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  }

  return (
    <div className="card mx-auto my-5 shadow-lg p-4" style={{ maxWidth: '400px' }}>
      <h4 className="card-header bg-primary text-white text-center">Register</h4>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              {...register('username')}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.username?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              {...register('firstName')}
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              {...register('lastName')}
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              {...register('password')}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>
          <button
            disabled={isSubmitting}
            className="btn btn-primary w-100"
            style={{ letterSpacing: '1px' }}
          >
            {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
            Register
          </button>
          <div className="text-center mt-3">
            <Link to="../login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
