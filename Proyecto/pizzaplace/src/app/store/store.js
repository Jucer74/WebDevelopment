import { configureStore } from '@reduxjs/toolkit';
//import { cartReducer } from './cartReducer';
import { authReducer } from './authSlice';

export const store = configureStore({
    reducer: {
        // cart: cartReducer,
        auth: authReducer,
        // orden, user, menu?
    },
});

export default store;