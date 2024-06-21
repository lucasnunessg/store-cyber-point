import AddProduct from './AddProduct';
import Login from './login';

function MyHeader() {
  return (
    <div className="myHeader">
      <header>
        <h1>Lucas Store</h1>
        <Login />
        <AddProduct />
        <hr />
      </header>
    </div>
  );
}

export default MyHeader;
