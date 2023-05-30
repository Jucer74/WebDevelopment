import { configureStore } from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"


import userSlice from './slicesUser/userSlice';
import ordersSlice from './slicesOrders/ordersSlice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['register'],
}

const reducer = combineReducers({
    usuarioSesion: userSlice,
    shoppingCart: ordersSlice 
})

const persistedReducer = persistReducer(persistConfig, reducer)




export const store = configureStore({
        reducer: persistedReducer
    });