import { createAction, createReducer } from "@reduxjs/toolkit";

// Action gestione token
export const setToken = createAction<string | null>("auth/setToken");

// Manage state
const initialState = {
  token: null as string | null,
  // Inicializar otros campos de estado si es necesario
};

// Reducer for auth
const authReducer = createReducer(initialState, (builder) => {
  builder.addCase(setToken, (state, action) => {
    state.token = action.payload;
  });
});

export default authReducer;
