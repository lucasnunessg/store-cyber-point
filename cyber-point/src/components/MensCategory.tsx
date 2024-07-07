import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const MensCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/mens');
        const allProductsData = response.data;
        setAllProducts(allProductsData);
      } catch (error) {
        console.log("Erro ao procurar produtos");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {allProducts.map((product) => (
        <div key={product.id} className='product-item'>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <img src={product.image} alt={product.title} />
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MensCategory;
