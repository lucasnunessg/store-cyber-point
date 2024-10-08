import React, { useCallback, useEffect, useState } from 'react';
import api from './fetchApi';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';
import AddProduct from './AddProduct'; 
import Product from '../Interface/IProduct';
import Comments from './Comments';
import '../css/App.css';
import  { jwtDecode } from 'jwt-decode';

interface ApiProps {
  onNextPageClick?: () => void;
}

interface CurrencyRates {
  [key: string]: number;
}

interface DecodedToken {
  data: {
    role: string;
  }
}

const currencyRates: CurrencyRates = {
  USD: 1,
  BRL: 5.5,
  EUR: 0.9
};

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<{ product: Product, quantity: number }[]>([]); 
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD'); 
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
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

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken: DecodedToken = jwtDecode(token);
        console.log("aqui ta o token decodificado", decodedToken)
        setIsAuthenticated(decodedToken.data.role === 'admin');
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setIsAuthenticated(false);
      }
    } else {
      console.log("Nenhum token encontrado");
      setIsAuthenticated(false);
    }
  }, []);
  
  

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

  const handleCurrencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCurrency(event.target.value);
  };

  const convertPriceToSelectedCurrency = (price: number) => {
    const rate = currencyRates[selectedCurrency];
    return (price * rate).toFixed(2);
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

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    setProducts(products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    ));
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await api.delete(`/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleProductCart = (productId: number) => {
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct) {
      const existingItem = cart.find(item => item.product.id === productId);
      if (existingItem) {
        setCart(prevCart =>
          prevCart.map(item =>
            item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCart(prevCart => [...prevCart, { product: selectedProduct, quantity: 1 }]);
      }
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart =>
      prevCart.reduce((acc, item) => {
        if (item.product.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as { product: Product, quantity: number }[])
    );
  };

  if (isAuthenticated === null) {
    return <p>Verificando autenticação...</p>;
  }



  return (
    <div className="api-container">
      <div className="pagination-buttons">
        <button onClick={handlePrevPage} disabled={startExibition === 0}>Anterior</button>
        <button onClick={handleNextPage} disabled={startExibition + productsPerPage >= products.length}>Próximo</button>
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
      <select value={selectedCurrency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </select>
      <input
        type="text"
        placeholder="Digite o nome do produto"
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
  
      {isAuthenticated && (
        <AddProduct /> //tive q extrair de "data" antes no token, pq ele estava dentro do objeto data
      )}
      
      <div className="product-list">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredProducts.slice(startExibition, startExibition + productsPerPage).map((product) => (
            <div key={product.id} className="product">
              <h3 className="product-title">{product.title}</h3>
              <img src={product.image} alt={product.title} className="product-image" />
              <p className="product-description">{product.description}</p>
              <p className="product-price">Preço: {convertPriceToSelectedCurrency(product.price)} {selectedCurrency}</p>
              <div className="quantity-control">
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                <span className="quantity">{quantityProducts[product.id] || 0}</span>
                <button onClick={() => addProductCount(product.id)}>+</button>
              </div>
              <Comments productId={product.id} />   
              <button onClick={() => handleProductCart(product.id)}>Adicionar ao carrinho</button>
              {isAuthenticated && (
                <>
                  <button onClick={() => handleEditProduct(product)}>Editar</button>
                  <DeleteProduct product={product} onDelete={() => handleDeleteProduct(product.id)} onCancel={() => {}} />
                </>
              )}
            </div>
          ))
        )}
      </div>

      {editingProduct && (
        <EditProduct
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {/* Exemplo de como mostrar o carrinho */}
      <div className="cart">
        <h2>Carrinho</h2>
        <ul>
          {cart.map(item => (
            <li key={item.product.id}>
              {item.product.title} - ${item.product.price.toFixed(2)} x {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
              <button onClick={() => handleRemoveFromCart(item.product.id)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Api;
