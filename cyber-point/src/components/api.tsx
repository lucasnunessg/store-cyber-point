import { useCallback, useEffect, useState } from 'react';
import '../App.css';

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

function Api() {
  const [products, setProducts] = useState<Product[]>([]);
  const [startExibition, setstartExibition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const productsPerPage = 4;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const handleNextPage = useCallback(() => {
    setstartExibition(startExibition + productsPerPage);
  }, [startExibition, productsPerPage]);

  const handlePrevPage = useCallback(() => {
    setstartExibition(startExibition - productsPerPage);
  },[startExibition, productsPerPage]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);
   // aqui o toggle nao depende da pagina ser renderizada ou atualizada 
   // e sim se é true ou false, nao precisa depender de nada p acréscimo de callback
   const filteredProducts = products.filter((product) =>
   product.title.toLowerCase().includes(search.toLowerCase())
 );
  return (
    <div>
           
      <div className='button-container'>
        <button onClick={handlePrevPage} disabled={startExibition === 0} className="pagination-button">Anterior</button>
        <button onClick={handleNextPage} disabled={startExibition + productsPerPage >= products.length} className="pagination-button">Próximo</button>
        <button onClick={toggleDarkMode} className="toggle-button">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
      <input type='text' placeholder='Digite o nome do produto' 
      value={search}
      
      onChange={(e)=> setSearch(e.target.value)}></input>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='divProducts'>
          {filteredProducts.slice(startExibition, startExibition + productsPerPage)
          .map((product) => (
            <div key={product.id} className='product'>
              <h3>{product.title}</h3>
              <img src={product.image} alt={product.title} />
              <p>{product.description}</p>
              <p className='price'>Price: ${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Api;
