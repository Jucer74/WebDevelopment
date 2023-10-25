import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "@/redux/features/auth";
import listUserReducer from "@/redux/features/listuser";
import listBikeReducer from "../features/listbike";
import errorAuthorizationReducer from "../features/errorauthorization";

// If localStorage is not available, create a noop storage
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// If localStorage is available, create a web storage
const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
  listuser: listUserReducer,
  listbike: listBikeReducer,
  authorization: errorAuthorizationReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage: storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Non-serializable middleware
const nonSerializableMiddleware = (getDefaultMiddleware: any) =>
  getDefaultMiddleware({
    serializableCheck: false,
  });

// Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: nonSerializableMiddleware,
});

// Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
