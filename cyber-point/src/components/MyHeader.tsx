import Login from './login';
import AddProduct from './AddProduct';

const headerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function MyHeader() {
  return (
    <div className="myHeader" style={headerStyle}>
      <header>
        <h1>Cyber Point Store</h1>
        <Login />
        <AddProduct />
        <hr />
      </header>
    </div>
  );
}

export default MyHeader;
