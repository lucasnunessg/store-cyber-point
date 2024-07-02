import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/women');
        setProduct(response.data);
      } catch (error) {
        console.log("erro ao procurar produtos");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Women's Clothing</h1>
      <div>
        {product.map((product) => (
          <div key={product.id} className='product-item-women'>
            <h3>{product.title}</h3>
            <h3>{product.description}</h3>
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenCategory;
