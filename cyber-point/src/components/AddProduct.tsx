import React, { useState } from 'react';
import axios from 'axios';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const produto = {
        title,
        price,
        description,
        image,
      }
      console.log("produto aqui" , produto)
      const response = await axios.post('http://localhost:3001/products', produto );
      console.log("Produto adicionado!", response.data);
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Erro ao adicionar produto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Preço:</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Imagem:</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};

export default AddProduct;
