import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ContractsState, Contract } from "../types";

const initialState: ContractsState = {
  contracts: [],
  loading: false,
  error: "",
  loaded: false,
};

export const loadContracts = createAsyncThunk("contracts/load", async () => {
  const response = await (
    await fetch("http://localhost:3000/contracts.json")
  ).json();
  return response;
});

export const deleteContractsByCustomerId = createAction(
  "customer/delete",
  (customerId: number) => {
    return {
      payload: {
        customerId,
      },
    };
  }
);

const ContractsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadContracts.pending, (state) => {
    state.loading = true;
  });
  builder.addCase(loadContracts.fulfilled, (state, action) => {
    state.loading = false;
    state.contracts = action.payload;
    state.loaded = true;
  });
  builder.addCase(loadContracts.rejected, (state, action) => {
    state.loading = false;
    state.error =
      "Error, something went wrong. Contact support if problem persis";
  });
  builder.addCase(deleteContractsByCustomerId, (state, action) => {
    const { customerId } = action.payload;
    state.contracts = state.contracts.filter(
      (contact) => contact.customerId !== customerId
    );
  });
});

// Selectors
export const getContracts = (state: RootState): Contract[] =>
  state.contracts.contracts;

export const getContractsLoading = (state: RootState): boolean =>
  state.contracts.loading;

export const getContractsLoaded = (state: RootState): boolean =>
  state.contracts.loaded;

export const getError = (state: RootState): string => state.contracts.error;

export default ContractsReducer;
