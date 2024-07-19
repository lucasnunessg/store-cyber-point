import React, { useEffect, useState } from 'react';
import api from './fetchApi';
import Cookies from 'js-cookie';

interface Comment {
  clientId: number;
  productId: number;
  comment: string;
}

interface CommentsProps {
  productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [clientId, setClientId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/products/${productId}/comments`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar comentários', error);
        setError('Não foi possível encontrar produto');
      }
    };

    fetchComments();
  }, [productId, token]);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const response = await api.get(`/clients/${clientId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setClientId(response.data.id);
      } catch (error) {
        console.error('Erro ao buscar clientId', error);
        setError('Não foi possível encontrar cliente');
      }
    };

    fetchClientId();
  }, [clientId, token]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (clientId === null) {
      console.error('Client ID não encontrado');
      setError('Client ID não encontrado');
      return;
    }

    try {
      const newComment = {
        productId,
        clientId,
        comment: newCommentText,
      };

      const commentPost = await api.post(`/products/${productId}/comments`, newComment, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      console.log('Comentário adicionado!', commentPost.data);
      setComments((prevComments) => [...prevComments, commentPost.data]);
      setNewCommentText('');
      setError(null); 
    } catch (error) {
      console.error('Erro ao adicionar comentário', error);
      setError('Não foi possível adicionar comentário');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Comentários do produto:</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment.comment}</li>
          ))}
        </ul>
        <div>
          <input
            type="text"
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Adicione um comentário"
          />
          <button type="submit">Adicionar Comentário</button>
        </div>
      </form>
    </div>
  );
};

export default Comments;
