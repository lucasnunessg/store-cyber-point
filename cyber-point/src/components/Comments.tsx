import { useState, useEffect } from 'react';
import api from './fetchApi';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(`/products/${productId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Não foi possível encontrar o comentário', error);
      }
    }
    fetchComments();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <div>
      {/* Render comments here */}
    </div>
  );
};

export default Comments;
