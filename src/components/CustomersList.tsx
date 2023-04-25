import { useDispatch, useSelector } from "react-redux";
import { getCustomerLoading, deleteCustomer } from "../redux/customersReducer";
import {
  deleteContractsByCustomerId,
  getContractsLoading,
} from "../redux/contractsReducer";
import { AppDispatch } from "../store";
import { Link } from "react-router-dom";
import { useCustomersContracts } from "../hooks/useCustomersContracts";
import { Button } from "./Button";
import styled from "@emotion/styled";

const CustomersList = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, getContractsByCustomerId } = useCustomersContracts();
  const isCustomerLoading = useSelector(getCustomerLoading);
  const isContractsLoading = useSelector(getContractsLoading);

  interface props {
    textAlign?: string;
  }
  const H1 = styled.h1<props>`
    font-size: 30px;
    padding-bottom: 10px;
    text-align: ${(p) => (p.textAlign ? p.textAlign : "left")};
  `;

  return (
    <div className="container">
      <H1 textAlign="center">Customers</H1>
      {isCustomerLoading || isContractsLoading ? (
        <div> Loading...</div>
      ) : (
        <div className="container-inner">
          {customers.length ? (
            customers.map((customer) => (
              <article className="section-box" key={customer.id}>
                <h2>{customer.name}</h2>
                <Button
                  text="Delete"
                  onClick={() => {
                    dispatch(deleteContractsByCustomerId(customer.id));
                    dispatch(deleteCustomer(customer.id));
                  }}
                />
                {getContractsByCustomerId(customer.id).length > 0 ? (
                  <div className="customer-contract-list">
                    {getContractsByCustomerId(customer.id).map(
                      (customerContract) => (
                        <div
                          key={customerContract.id}
                          className="customer-contract"
                        >
                          {customerContract.name}
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <>There is no contract(s) associated with the customer</>
                )}
              </article>
            ))
          ) : (
            <h3>No customers available to show</h3>
          )}
        </div>
      )}
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default CustomersList;
