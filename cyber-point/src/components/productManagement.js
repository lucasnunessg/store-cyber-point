import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const userRole = localStorage.getItem('role');
    setRole(userRole);
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h1>Product Management</h1>
      {role === 'admin' && (
        <button onClick={() => {/* logic to open create product form */}}>Create Product</button>
      )}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.title}
            {role === 'admin' && (
              <>
                <button onClick={() => {/* logic to open edit product form */}}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManagement;
