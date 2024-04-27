import { useEffect, useState } from 'react';
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

  const handleNextPage = () => {
    setstartExibition(startExibition + productsPerPage);
  };

  const handlePrevPage = () => {
    setstartExibition(startExibition - productsPerPage);
  };

  return (
    
    <div className='container'>
      <div className='button-container'>
        <button onClick={handlePrevPage} disabled={startExibition === 0} className="pagination-button">Anterior</button>
        <button onClick={handleNextPage} disabled={startExibition + productsPerPage >= products.length} className="pagination-button">Próximo</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='divProducts'>
          {products.slice(startExibition, startExibition + productsPerPage).map((product) => (
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
