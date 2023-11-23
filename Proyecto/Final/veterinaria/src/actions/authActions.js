import axios from 'axios';

export const loadUser = () => (dispatch, getState) => {
  // Configuración del usuario cargando
  dispatch({ type: 'USER_LOADING' });

  // Llamada a la API para cargar el usuario
  axios.get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: 'USER_LOADED',
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: 'AUTH_ERROR'
      });
    });
};

// Configurar el token en las cabeceras
export const tokenConfig = getState => {
  // Obtener el token del estado
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  // Si hay token, añadir a cabeceras
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};