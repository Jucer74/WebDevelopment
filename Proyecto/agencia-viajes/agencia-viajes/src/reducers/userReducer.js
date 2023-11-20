// userReducer.js
const initialState = {
    // Estado inicial del usuario
    username: null,
    loggedIn: false,
  };
  
  const userReducer = (state = initialState, action) => {
    // Lógica del reducer basada en el tipo de acción
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          username: action.payload.username,
          loggedIn: true,
        };
      case 'LOGOUT':
        return {
          ...state,
          username: null,
          loggedIn: false,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  