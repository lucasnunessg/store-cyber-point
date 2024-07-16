import React, { useState, useEffect } from 'react';
import api from './fetchApi';

interface Comment {
  clientId: string;
  productId: number; // Alterado para número, para refletir o tipo de productId
  comment: string;
}

export interface CommentsProps {
  productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get<Comment[]>(`/products/${productId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Não foi possível encontrar os comentários', error);
      }
    }
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const newComment: Comment = {
        clientId,
        productId,
        comment: newCommentText,
      };

      const commentPost = await api.post<Comment>(`/products/${productId}/comments`, newComment);
      setComments((prevComments) => [...prevComments, commentPost.data]);
      setNewCommentText('');
      setClientId('');
    } catch (error) {
      console.error('Erro ao adicionar comentário', error);
    }
  };

  return (
    <div>
      <h4>Comentários do produto:</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Adicione um comentário"
          />
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            placeholder="ID do Cliente"
          />
          <button type="submit">Adicionar Comentário</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
