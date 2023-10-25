import { createAction, createReducer } from "@reduxjs/toolkit";

// Action gestione error authorization
export const setErrorId = createAction<number>("errorauthorization/setErrorId");
export const setError = createAction<string>("errorauthorization/setError");

// Manage state
const initialState = {
  errorId: 0,
  error: "",
  // Inicializar otros campos de estado si es necesario
};

// Reducer for error authorization
const errorAuthorizationReducer = createReducer(initialState, (builder) => {
  builder.addCase(setErrorId, (state, action) => {
    state.errorId = action.payload;
  });
  builder.addCase(setError, (state, action) => {
    state.error = action.payload;
  });
});

export default errorAuthorizationReducer;
