import { useSelector } from "react-redux";
import { getContractsLoading } from "../redux/contractsReducer";
import { Link } from "react-router-dom";
import { useCustomersContracts } from "../hooks/useCustomersContracts";

const ContractsList = (): JSX.Element => {
  const { contracts } = useCustomersContracts();
  const isContractsLoading = useSelector(getContractsLoading);

  return (
    <div className="container">
      <h1 className="heading align-center">Contracts</h1>
      {isContractsLoading ? (
        <div> Loading...</div>
      ) : (
        <div className="container-inner">
          {contracts.length ? (
            contracts.map((contract) => (
              <article className="section-box" key={contract.id}>
                <h2>{contract.name}</h2>
                <p>{contract.description}</p>
              </article>
            ))
          ) : (
            <h3>No contracts available to show</h3>
          )}
        </div>
      )}
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default ContractsList;
