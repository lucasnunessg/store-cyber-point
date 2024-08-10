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
  const [clientId, setClientId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorGet, setErrorGet] = useState<string | null>(null);
 // const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true); // Adicionado para gerenciar o estado de carregamento
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/products/${productId}/comments`);
        setComments(response.data);
       // setFullName(response.clientId)
      } catch (error) {
        console.error('Erro ao buscar comentários', error);
        setError('Não foi possível buscar comentários');
      }
    };

    fetchComments();
  }, [productId]);

  useEffect(() => {
    const fetchClientId = async () => {
      try {
        const client = await api.get('/clients');
                setClientId(client.data.clientId);
        setLoading(false); // Define o carregamento como concluído
      } catch (error) {
        console.error('Erro ao obter clientId', error);
        setError('Não foi possível obter o clientId');
        setLoading(false); // Define o carregamento como concluído, mesmo em erro
      }
    };

    fetchClientId();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (clientId === null) {
      setErrorGet('ClientId não definido!');
      return;
    }

    try {
      const newComment = {
        productId,
        clientId,
        comments: newCommentText,
      };
      console.log("oii", clientId)

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

  if (loading) {
    return <p>Carregando...</p>; 
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h4>Comentários do produto:</h4>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {comments.map((comment) => (
            <li key={comment.clientId + comment.comments}>{comment.comments}</li>
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
          {errorGet && <p style={{ color: 'red' }}>{errorGet}</p>}
        </div>
      </form>
    </div>
  );
};

export default Comments;
