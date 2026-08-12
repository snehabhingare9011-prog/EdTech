
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        cart:cartReducer
    }
})
