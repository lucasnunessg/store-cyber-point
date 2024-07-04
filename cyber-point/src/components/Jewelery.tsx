import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const JeweleryCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
      const fetchData = async() => {
      const response = await api.get('/jewelery')
      const allProductsData = response.data
      setAllProducts(allProductsData);
    };
   fetchData()
  },[])

  return(
    <div>
    <h1>Jewelery</h1>
    {allProducts.map((product) => (
      <div key={product.id} className='jewelery-products'>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <img src={product.image} alt={product.title} />
      </div>
    ))}
  </div>
  )
}

export default JeweleryCategory;