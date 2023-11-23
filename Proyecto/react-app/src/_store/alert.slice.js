// Importa la función createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Define el nombre del slice
const name = 'alert';

// Crea el estado inicial del slice
const initialState = createInitialState();

// Crea los reducers del slice
const reducers = createReducers();

// Crea el slice usando createSlice
const slice = createSlice({ name, initialState, reducers });

// Exporta las acciones y el reducer del slice
export const alertActions = { ...slice.actions };
export const alertReducer = slice.reducer;

// Implementación de funciones auxiliares

// Función para crear el estado inicial
function createInitialState() {
    return {
        value: null
    };
}

// Función para crear los reducers
function createReducers() {
    return {
        success,
        error,
        clear
    };

    // success reducer: actualiza el estado con un mensaje de éxito
    // payload puede ser un mensaje de cadena ('alert message') o un objeto
    // ({ message: 'alert message', showAfterRedirect: true })
    function success(state, action) {
        state.value = {
            type: 'alert-success',
            message: action.payload?.message || action.payload,
            showAfterRedirect: action.payload?.showAfterRedirect
        };
    }

    // error reducer: actualiza el estado con un mensaje de error
    // payload puede ser un mensaje de cadena ('alert message') o un objeto
    // ({ message: 'alert message', showAfterRedirect: true })
    function error(state, action) {
        state.value = {
            type: 'alert-danger',
            message: action.payload?.message || action.payload,
            showAfterRedirect: action.payload?.showAfterRedirect
        };
    }

    // clear reducer: limpia el estado de la alerta
    function clear(state) {
        // Si el indicador showAfterRedirect es true, la alerta no se limpia
        // después de un cambio de ruta (por ejemplo, después de un registro exitoso)
        if (state.value?.showAfterRedirect) {
            state.value.showAfterRedirect = false;
        } else {
            state.value = null;
        }
    }
}
