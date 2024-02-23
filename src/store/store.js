import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../features/adminAuth";
import providerAuthReducer from "../features/providerAuth";
import userAuthReducer from "../features/userAuth";

export const store = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    providerAuth: providerAuthReducer,
    userAuth:userAuthReducer
  },
});
