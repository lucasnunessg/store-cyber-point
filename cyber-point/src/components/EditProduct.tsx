import React, { useState } from 'react';
import axios from 'axios';
import Product from '../Interface/IProduct';




interface EditProductProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onSave, onCancel }) => {
  const [title, setTitle] = useState<string>(product.title);
  const [price, setPrice] = useState<number>(product.price);
  const [description, setDescription] = useState<string>(product.description);
  const [image, setImage] = useState<string>(product.image);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedProduct = { ...product, title, price, description, image };
      await axios.put(`http://localhost:3001/products/${product.id}`, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onSave(updatedProduct);
    } catch (error) {
      console.error('Erro ao editar produto', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Preço</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <label>Descrição</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Imagem</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Salvar alterações</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default EditProduct;
