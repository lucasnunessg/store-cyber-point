import React from 'react';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
}

interface DeleteProductProps {
  product: Product;
  onDelete: (productId: number) => void;
  onCancel: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({ product, onDelete, onCancel }) => {
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // Impede a propagação do evento para evitar fechar o modal prematuramente

    try {
      await axios.delete(`http://localhost:3001/products/${product.id}`);
      onDelete(product.id);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  return (
    <div className="delete-product-modal">
      <p>Deseja realmente excluir o produto "{product.title}"?</p>
      <div className="delete-buttons">
        <button onClick={handleDelete}>Sim, Excluir</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default DeleteProduct;
