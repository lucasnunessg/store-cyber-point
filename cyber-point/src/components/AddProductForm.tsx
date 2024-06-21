import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        setIsAdmin(response.data.role === 'admin');
      }).catch(error => {
        console.error('Erro ao verificar a role do usuário:', error);
      });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/products', {
        title,
        price,
        description,
        image
      });
      console.log('Produto adicionado:', response.data);
      setTitle('');
      setPrice('');
      setDescription('');
      setImage('');
    } catch (error) {
      console.error('Erro ao adicionar o produto:', error);
    }
  };

  if (!isAdmin) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
