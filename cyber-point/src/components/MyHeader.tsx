import Login from "./login";
import { useState } from 'react';

import RegisterComponent from "./RegisterComponent";

const headerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

function MyHeader() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="myHeader" style={headerStyle}>
      <header>
        
        <h1>Cyber Point Store</h1>
        {!showForm && (
        <button onClick={() => setShowForm(true)}>Entrar</button>
      )}
      {showForm && (

      <Login />
      )}
        
      <RegisterComponent />
      
        <hr />
      </header>
    </div>
  );
}

export default MyHeader;
