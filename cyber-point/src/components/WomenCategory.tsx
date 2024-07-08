import { useEffect, useState } from 'react';
import api from './fetchApi';
import Product from '../Interface/IProduct';



const WomenCategory = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [totalPages, setTotalPages] = useState<number>(1); 
  const [loading, setLoading] = useState(true)
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/women');
        const allProductsData = response.data;
        setAllProducts(allProductsData);
        setLoading(false)
      } catch (error) {
        console.log("Erro ao procurar produtos");
        setLoading(false)
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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    setCurrentPage(1); 
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }
  if (loading) return <p>Loading...</p>
  return (
    <div>
      <h1>Women's Clothing</h1>
      <div>
        <input 
          type='text'
          placeholder='Digite o nome do produto'
          value={search}
          onChange={handleSearch}
        />
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página: {currentPage} de {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
      <div>
        {filteredProducts.map((product) => (
          <div key={product.id} className='product-item-women'>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title} />
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WomenCategory;
