import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'; 
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig ={
    key: "root",
    version: 1,
    storage
}

const reducer = combineReducers({
    auth: authReducer,
})

const PersistReducer = persistReducer(persistConfig, reducer);


const store = configureStore({
    reducer: PersistReducer,
});

export default store;
