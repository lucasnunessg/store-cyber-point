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
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/women');
        setAllProducts(response.data);
      } catch (error) {
        console.log("Erro ao procurar produtos");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => 
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, allProducts]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>Women's Clothing</h1>
      <div>
        <input 
          type='text'
          placeholder='Digite aqui o nome do produto'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-item-women'>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenCategory;
