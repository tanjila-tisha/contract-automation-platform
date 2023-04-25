import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CustomersState, Customer } from "../types";

const initialState: CustomersState = {
  customers: [],
  loading: false,
  error: "",
  loaded: false,
};

export const deleteCustomer = createAction(
  "customer/delete",
  (customerId: number) => {
    return {
      payload: {
        customerId,
      },
    };
  }
);

export const loadCustomers = createAsyncThunk("customers/load", async () => {
  const response = await (
    await fetch("http://localhost:3000/customer.json")
  ).json();
  return response;
});

const customersReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadCustomers.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(loadCustomers.fulfilled, (state, action) => {
    state.loading = false;
    state.customers = action.payload;
    state.loaded = true;
  });
  builder.addCase(loadCustomers.rejected, (state, action) => {
    state.loading = false;
    state.error =
      "Error, something went wrong. Contact support if problem persis";
  });
  builder.addCase(deleteCustomer, (state, action) => {
    const { customerId } = action.payload;
    state.customers = state.customers.filter(
      (customer) => customer.id !== customerId
    );
  });
});

// Selectors
export const getCustomers = (state: RootState): Customer[] =>
  state.customers.customers;

export const getCustomerLoading = (state: RootState): boolean =>
  state.customers.loading;

export const getCustomersLoaded = (state: RootState): boolean =>
  state.customers.loaded;

export const getError = (state: RootState): string => state.customers.error;

export default customersReducer;
