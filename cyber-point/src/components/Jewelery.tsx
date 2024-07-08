import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';

const JeweleryCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 
  const [loading, setLoading] = useState(true);
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get('/jewelery');
      const allProductsData = response.data;
      setAllProducts(allProductsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = allProducts.filter((product) => 
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setFilteredProducts(filtered.slice(startIndex, endIndex));
  }, [search, allProducts, currentPage]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); 
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  if(loading) return <p>Loading...</p>
  return (
    <div>
      <h1>Jewelery</h1>
      <input
        type='text'
        value={search}
        onChange={handleSearch}
        placeholder='Digite o produto aqui'
      />
      <div className='pagination'>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página: {currentPage} de {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Próxima</button>
      </div>
      {filteredProducts.map((product) => (
        <div key={product.id} className='jewelery-products'>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <img src={product.image} alt={product.title} />
          <p className="product-price">Price: ${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default JeweleryCategory;
