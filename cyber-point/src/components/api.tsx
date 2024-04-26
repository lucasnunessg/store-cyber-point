import React, { useEffect, useState } from 'react';
import '../App.css'

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

function Api() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className='divProducts'>
      {products.map((product) => (
        <div key={product.id} className='product'>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} />
          <p>{product.description}</p>
          <p className='price'>Price: ${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default Api;
