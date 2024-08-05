import React, { useEffect, useState } from 'react';
import api from './fetchApi';

interface Comment {
  clientId: number;
  productId: number;
  comments: string;
}

interface CommentsProps {
  productId: number;
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  // const [clientId] = useState<null>(null)
  const [error] = useState<string | null>(null);
  const [errorGet, setErrorGet] = useState<string | null>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/products/${productId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos', error);
      }
    };

    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

 
    try {
      const newComment = {
        productId,
        // clientId,
        comments: newCommentText,
      };

      const commentPost = await api.post(`/products/${productId}/comments`, newComment, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      setComments((prevComments) => [...prevComments, commentPost.data]);
      setNewCommentText('');
    } catch (error) {
      console.error('Erro ao adicionar comentário', error);
      setErrorGet('Não foi possível adicionar comentário, verifique se fez login.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Comentários do produto:</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {comments.map((comment) => (
            <h5>{comment.comments}</h5>
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
          {errorGet && <p style={{color: 'red'}}>{errorGet}</p>}
        </div>
      </form>
    </div>
  );
};

export default Comments;
