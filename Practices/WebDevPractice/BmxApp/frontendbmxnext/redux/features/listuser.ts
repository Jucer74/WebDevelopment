import { createAction, createReducer } from "@reduxjs/toolkit";

// Action gestione list users
export const setListUsers = createAction<string[]>("listuser/setListUsers");

// Manage state
const initialState = {
  listUsers: [] as string[],
  // Inicializar otros campos de estado si es necesario
};

// Reducer for list users
const listUserReducer = createReducer(initialState, (builder) => {
  builder.addCase(setListUsers, (state, action) => {
    state.listUsers = action.payload;
  });
});

export default listUserReducer;

