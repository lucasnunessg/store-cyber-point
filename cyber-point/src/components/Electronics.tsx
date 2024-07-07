import React, { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';



const Electronics = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]); 
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 
  const [search, setSearch] = useState<string>(''); 
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/electronics');
        const allProductsData = response.data;
        setAllProducts(allProductsData); 
        setLoading(false);
      } catch (error) {
        setError(null);
        setLoading(false);
      }
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

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, 1));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Electronics</h1>
      <div>
        <input
          type='text'
          placeholder='Digite o nome do produto'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className='pagination'>
        <button onClick={goToPrevPage} disabled={currentPage === 1}>Anterior</button>
        <span>Página: {currentPage} de {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>Próxima</button>

      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>

    </div>
  );
};

export default Electronics;
