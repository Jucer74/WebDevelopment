// Importa la función configureStore de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Importa los reducers de otros archivos
import { alertReducer } from './alert.slice';
import { authReducer } from './auth.slice';
import { usersReducer } from './users.slice';

// Exporta todas las acciones y tipos de acción de los archivos slice
export * from './alert.slice';
export * from './auth.slice';
export * from './users.slice';

// Configura la tienda de Redux usando configureStore
export const store = configureStore({
  // Define los reducers combinados en un objeto
  reducer: {
    // Asocia el reducer alertReducer al estado 'alert'
    alert: alertReducer,
    // Asocia el reducer authReducer al estado 'auth'
    auth: authReducer,
    // Asocia el reducer usersReducer al estado 'users'
    users: usersReducer
  },
});
