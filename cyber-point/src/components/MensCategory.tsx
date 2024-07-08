import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const MensCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [search, setSearch] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 
  const productsPerPage = 4;





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
    const filtered = allProducts.filter((product) => //faz um filtro no novo array e verifica a condiçao, se contem, devolve true
    product.title.toLowerCase().includes(search.toLowerCase()));
    setTotalPages(filtered.length / productsPerPage)

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(filtered.slice(startIndex, endIndex));
  }, [search, allProducts, currentPage])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }


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
    <div className='pagination'>
      <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
      <span>Página: {currentPage} de {totalPages}</span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>Próximo</button>
    </div>
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
