import { useEffect, useState } from 'react';
import api from './fetchApi';

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

const Electronics = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página atual
  const [totalPages, setTotalPages] = useState<number>(1); // Total de páginas
  const productsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/electronics');
        const totalProducts = response.data.length;
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        setTotalPages(totalPages);

        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const currentProducts = response.data.slice(startIndex, endIndex);
        setProducts(currentProducts);

        setLoading(false);
      } catch (error) {
        setError(null)
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error.message}</p>;

  return (
    <div>
      <h1>Electronics</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-price">Price: ${product.price.toFixed(2)}</p>
            <img src={product.image} alt={product.title} />
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Prev Page
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Electronics;
