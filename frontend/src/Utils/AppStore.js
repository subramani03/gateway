import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import registrationReducer from "./RegistrationSlice";

// Create a persist config
const persistConfig = {
    key: "root",
    storage, // Saves to localStorage
};

console.log(registrationReducer)
// Combine reducers (if you have multiple reducers)
const rootReducer = combineReducers({
    registration: registrationReducer,
});

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const Appstore = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(Appstore); // Create persistor
export default Appstore;
