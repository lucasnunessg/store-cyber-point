import React, { useEffect, useState } from 'react';
import api from './fetchApi';
import { jwtDecode } from 'jwt-decode';

interface Comment {
  client: {
    fullName: string;
    id: number;
  }
  clientId: number;
  productId: number;
  comments: string;
  fullName: string;
}

interface CommentsProps {
  productId: number;
}

interface DeecodedToken {
  data: {
    id: number;
    email: string;
    role: string;
    fullName: string;
  };
}

const Comments: React.FC<CommentsProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [clientId, setClientId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorGet, setErrorGet] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); 
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode<DeecodedToken>(token) : null;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/products/${productId}/comments`);
        console.log("to aqui, " , response.data)
        setComments(response.data);   
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
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!decodedToken) {
      setErrorGet('Usuário não autenticado!');
      return;
    }

    const { id: clientId, fullName } = decodedToken.data;

    if (clientId === null) {
      setErrorGet('ClientId não definido!');
      return;
    }

    try {
      const newComment = {
        productId,
        clientId,
        comments: newCommentText,
        fullName,
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
     <li key={comment.comments}>
      {comment.comments}
      <p>{comment.client.fullName}</p>
    </li>
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
