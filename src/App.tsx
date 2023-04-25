import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import CompanyList from "./components/ContractsList";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import CustomersList from "./components/CustomersList";

function App() {
  return (
    <Provider store={store}>
      <main className="App">
        <Router>
          <Routes>
            <Route path="/contracts" element={<CompanyList />}></Route>
            <Route path="/customers" element={<CustomersList />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
      </main>
    </Provider>
  );
}

export default App;
