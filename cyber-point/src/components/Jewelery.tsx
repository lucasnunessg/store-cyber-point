import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const JeweleryCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
      const fetchData = async() => {
      const response = await api.get('/jewelery')
      const allProductsData = response.data
      setAllProducts(allProductsData);
    };
   fetchData()
  },[])

  useEffect(() => {
    const filtered = allProducts.filter((products) => 
    products.title.toLowerCase().includes(search.toLowerCase())
  ) 
  setFilteredProducts(filtered)
  
  }, [allProducts, search])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }

  return(
    <div>
    <h1>Jewelery</h1>
    <input type='text'
    value={search}
    onChange={handleSearch}
    placeholder='Digite o produto aqui'
    />
    {filteredProducts.map((product) => (
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