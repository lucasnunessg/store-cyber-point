import { Link } from 'react-router-dom';
import Login from './login';

function MyHeader() {
  return (
    <div className="myHeader">
      <header>
        <h1>Lucas Store</h1>
        <Login />
        <nav>
          <ul>
            <li><Link to="/products">Produtos</Link></li>
          </ul>
        </nav>
        <hr />
      </header>
    </div>
  );
}

export default MyHeader;
