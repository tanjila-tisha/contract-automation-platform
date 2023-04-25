import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  getContracts,
  getContractsLoaded,
  loadContracts,
} from "../redux/contractsReducer";
import {
  getCustomers,
  getCustomersLoaded,
  loadCustomers,
} from "../redux/customersReducer";
import { Contract, Customer } from "../types";

interface Returns {
  contracts: Contract[];
  customers: Customer[];
  getContractsByCustomerId: (customerId: number) => Contract[];
}

export const useCustomersContracts = (): Returns => {
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector(getCustomers);
  const contracts = useSelector(getContracts);
  const isCustomersLoaded = useSelector(getCustomersLoaded);
  const isContractsLoaded = useSelector(getContractsLoaded);

  useEffect(() => {
    if (!isContractsLoaded || !isCustomersLoaded) {
      dispatch(loadContracts());
      dispatch(loadCustomers());
    }
  }, [dispatch, isCustomersLoaded, isContractsLoaded]);

  const getContractsByCustomerId = (customerId: number) =>
    contracts.filter(
      (contract: Contract) => contract.customerId === customerId
    );

  return { contracts, customers, getContractsByCustomerId };
};
