import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
}

function Api() {
  const [products, setProducts] = useState<Product[]>([]); // Definindo o tipo de products como Product[]

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
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.image} alt={product.title} /> {}

          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
}

export default Api;
