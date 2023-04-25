import { configureStore } from "@reduxjs/toolkit";
import contractsReducer from "./redux/contractsReducer";
import customersReducer from "./redux/customersReducer";

export const store = configureStore({
  reducer: {
    contracts: contractsReducer,
    customers: customersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
