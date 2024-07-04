import React from 'react';
import axios from 'axios';
import Product from '../Interface/IProduct';



interface DeleteProductProps {
  product: Product;
  onDelete: (productId: number) => void;
  onCancel: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ product, onDelete, onCancel }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token'); 
      if (!token) {
        console.error('Token não encontrado. O usuário precisa estar autenticado.');
        return;
      }

      await axios.delete(`http://localhost:3001/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      onDelete(product.id);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className="delete-product">
      <p>Deseja realmente excluir o produto "{product.title}"?</p>
      <div className="delete-buttons">
        <button onClick={handleDelete}>Sim, Excluir</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
