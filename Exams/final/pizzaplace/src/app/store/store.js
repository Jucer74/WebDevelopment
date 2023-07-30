import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './cartReducer';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        // orden, user, menu?
    },
})