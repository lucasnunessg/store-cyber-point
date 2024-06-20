import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';

const AddProduct = async () => {
  const [productData, setProductData] = useState({
    id: '', 
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    try {
      const response = await axios.post('/api/products', productData);
      console.log('Produto adicionado com sucesso:', response.data);
      
      setProductData({
        id: '',
        title: '',
        price: '',
        description: '',
        image: '',
      });

    } catch (error) {
      console.error('Erro ao adicionar produto:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={productData.id}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="price">Preço:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Imagem URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={productData.image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AddProduct;
