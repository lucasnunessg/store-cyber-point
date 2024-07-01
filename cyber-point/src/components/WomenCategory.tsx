import React, { useEffect, useState } from 'react';
import api from './fetchApi';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const WomenCategory = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/electronics');
        setProduct(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

});

export default WomenCategory;
