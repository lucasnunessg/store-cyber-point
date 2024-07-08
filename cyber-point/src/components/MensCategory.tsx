import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const MensCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [search, setSearch] = useState<string>(''); 




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

  useEffect(() => {
    const filtered = allProducts.filter((product) => 
    product.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredProducts(filtered)
  }, [search, allProducts])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };


  return (
    
    <div>
      <h1>Mens Clothing</h1>
      <div>
      <input
      type='text'
    placeholder='digite seu produto aqui'
    value={search}
    onChange={handleSearch} 
    />
      </div>
      {filteredProducts.map((product) => (
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
