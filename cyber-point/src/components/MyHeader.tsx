import Login from './login';
import ProductManagement from './ProductManagement';

function MyHeader() {
  return (
    <div className="myHeader">
      <header>
        <h1>Lucas Store</h1>
        <Login />
        <ProductManagement />
        <hr />
      </header>
    </div>
  );
}

export default MyHeader;
