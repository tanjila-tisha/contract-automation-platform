export interface Contract {
  id: number;
  name: string;
  description: string;
  customerId: number;
}

export interface ContractsState {
  contracts: Array<Contract>;
  loading: boolean;
  error: string;
  loaded: boolean;
}

export interface Customer {
  id: number;
  name: string;
}

export interface CustomersState {
  customers: Array<Customer>;
  loading: boolean;
  error: string;
  loaded: boolean;
}
