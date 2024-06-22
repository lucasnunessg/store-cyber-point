import { useCallback, useEffect, useState } from 'react';
import api from './fetchApi';
import '../App.css';

interface ApiProps {
  onNextPageClick?: () => void;
}

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
}

function Api({ onNextPageClick }: ApiProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [startExibition, setStartExibition] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [tempMinPrice, setTempMinPrice] = useState<number>(0);
  const [tempMaxPrice, setTempMaxPrice] = useState<number>(Infinity);
  const [quantityProducts, setQuantityProducts] = useState<{ [key: number]: number }>({});
  const productsPerPage = 4;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products"); 
        setProducts(response.data);
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
    setStartExibition(prev => prev + productsPerPage);
    if (onNextPageClick) {
      onNextPageClick();
    }
  }, [productsPerPage, onNextPageClick]);

  const handlePrevPage = useCallback(() => {
    setStartExibition(prev => prev - productsPerPage);
  }, [productsPerPage]);

  const addProductCount = (productId: number) => {
    setQuantityProducts(prevQuantify => ({
      ...prevQuantify,
      [productId]: (prevQuantify[productId] || 0) + 1
    }));
  };

  const handleProductCart = (productId: number) => {
    localStorage.setItem(`selectedProducts-${productId}`, JSON.stringify(productId));
  };

  const decreaseQuantity = (productId: number) => {
    setQuantityProducts(prevQuantity => ({
      ...prevQuantity,
      [productId]: Math.max((prevQuantity[productId] || 0) - 1, 0)
    }));
  };

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  const filteredProducts = products.filter((product) => {
    const productPrice = Number(product.price);
    return (
      product.title.toLowerCase().includes(search.toLowerCase()) &&
      productPrice >= minPrice &&
      productPrice <= maxPrice
    );
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTempMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMinPrice(Number(event.target.value));
  };

  const handleTempMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempMaxPrice(Number(event.target.value));
  };

  const applyPriceFilter = () => {
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
  };

  return (
    <div className="api-container">
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={startExibition === 0}>Anterior</button>
        <button onClick={handleNextPage} disabled={startExibition + productsPerPage >= products.length}>Próximo</button>
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
      <input
        type='text'
        placeholder='Digite o nome do produto'
        value={search}
        onChange={handleSearch}
      />
      <h3>Busque por preço</h3>
      <div>
        <input
          type="number"
          value={tempMinPrice}
          onChange={handleTempMinPriceChange}
          placeholder="Preço mínimo"
        />
        <input
          type="number"
          value={tempMaxPrice}
          onChange={handleTempMaxPriceChange}
          placeholder="Preço máximo"
        />
        <button onClick={applyPriceFilter}>Filtrar</button>
      </div>
      
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.slice(startExibition, startExibition + productsPerPage).map((product) => (
            <div key={product.id} className="product">
              <h3 className="product-title">{product.title}</h3>
              <img src={product.image} alt={product.title} className="product-image" />
              <p className="product-description">{product.description}</p>
              <p className="product-price">Price: ${product.price.toFixed(2)}</p>
              <div className="quantity-control">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <span className="quantity">{quantityProducts[product.id] || 0}</span>
                <button onClick={() => addProductCount(product.id)}>+</button>
              </div>
              <button onClick={() => handleProductCart(product.id)}>Adicionar ao carrinho</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Api;
