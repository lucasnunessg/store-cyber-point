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
  const [clientId] = useState<null>(null)
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/products`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
        setError('Não foi possível encontrar produto');
      }
    };

    fetchComments();
  }, [productId, token]);

  console.log(comments)
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
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
      setError('Não foi possível adicionar comentário, verifique se fez login.');
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
          {error && <p style={{color: 'red'}}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default Comments;
