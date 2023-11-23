// Importa las funciones necesarias de Redux Toolkit.
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Importa las acciones de alerta desde el store de Redux.
import { alertActions } from '_store';

// Importa objetos de ayuda, como el historial de navegación y una función fetchWrapper.
import { history, fetchWrapper } from '_helpers';

// Define el nombre del slice de Redux.
const name = 'auth';

// Crea el estado inicial utilizando una función de ayuda.
const initialState = createInitialState();

// Crea los reductores utilizando una función de ayuda.
const reducers = createReducers();

// Crea acciones adicionales y operaciones asincrónicas utilizando una función de ayuda.
const extraActions = createExtraActions();

// Crea el slice de Redux combinando el nombre, el estado inicial y los reductores.
const slice = createSlice({ name, initialState, reducers });

// Exporta las acciones y el reductor del slice de Redux.
export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// Implementación de las funciones de ayuda

// Crea el estado inicial tomando el valor de 'auth' almacenado en el almacenamiento local.
function createInitialState() {
    return {
        value: JSON.parse(localStorage.getItem('auth'))
    };
}

// Crea los reductores, en este caso solo uno llamado 'setAuth'.
function createReducers() {
    return {
        setAuth
    };

    // Reductor para actualizar el estado de autenticación.
    function setAuth(state, action) {
        state.value = action.payload;
    }
}

// Crea acciones adicionales y operaciones asincrónicas.
function createExtraActions() {
    // Define la URL base para las operaciones relacionadas con usuarios.
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;

    // Devuelve un objeto con dos acciones asincrónicas: login y logout.
    return {
        login: login(),
        logout: logout()
    };

    // Función que devuelve una operación asincrónica 'login'.
    function login() {
        return createAsyncThunk(
            // Tipo de la acción asincrónica.
            `${name}/login`,
            // Función asincrónica que realiza la operación de login.
            async function ({ username, password }, { dispatch }) {
                // Limpia las alertas antes de realizar la operación.
                dispatch(alertActions.clear());
                try {
                    // Realiza una solicitud de autenticación al servidor.
                    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });

                    // Actualiza el usuario autenticado en el estado de Redux.
                    dispatch(authActions.setAuth(user));

                    // Almacena los detalles del usuario y el token JWT en el almacenamiento local para mantener al usuario autenticado entre actualizaciones de página.
                    localStorage.setItem('auth', JSON.stringify(user));

                    // Obtiene la URL de retorno del estado de ubicación o utiliza la página de inicio por defecto.
                    const { from } = history.location.state || { from: { pathname: '/' } };
                    history.navigate(from);
                } catch (error) {
                    // En caso de error, muestra una alerta de error.
                    dispatch(alertActions.error(error));
                }
            }
        );
    }

    // Función que devuelve una operación asincrónica 'logout'.
    function logout() {
        return createAsyncThunk(
            // Tipo de la acción asincrónica.
            `${name}/logout`,
            // Función asincrónica que realiza la operación de logout.
            function (arg, { dispatch }) {
                // Actualiza el estado de autenticación a nulo.
                dispatch(authActions.setAuth(null));

                // Elimina la información de autenticación del almacenamiento local.
                localStorage.removeItem('auth');

                // Navega a la página de inicio de sesión.
                history.navigate('/account/login');
            }
        );
    }
}
