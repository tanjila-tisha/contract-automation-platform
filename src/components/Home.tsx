import { Link } from "react-router-dom";

const Home = (): JSX.Element => {
  return (
    <section className="home">
      <div>
        <h1 className="heading">The Contract automation platform</h1>
        <nav className="navigation">
          <ul>
            <li>
              <Link to="/contracts">Contracts</Link>
            </li>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Home;
