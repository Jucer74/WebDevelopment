import { createAction, createReducer } from "@reduxjs/toolkit";

// Action gestione list bikes
export const setListBikes = createAction<string[]>("listbike/setListBikes");

// Manage state
const initialState = {
  listBikes: [] as string[],
  // Inicializar otros campos de estado si es necesario
};

// Reducer for list bikes
const listBikeReducer = createReducer(initialState, (builder) => {
  builder.addCase(setListBikes, (state, action) => {
    state.listBikes = action.payload;
  });
});

export default listBikeReducer;
