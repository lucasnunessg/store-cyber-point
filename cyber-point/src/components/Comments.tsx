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
  const token = Cookies.get('token');


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
      console.log("produto adicionado!", commentPost.data)
      setComments((prevComments) => [...prevComments, commentPost.data]);
    } catch (error) {
      console.error('Erro ao adicionar comentário', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h4>Comentários do produto:</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.comment}</li>
        ))}
      </ul>
        <div>
          {<h4>{clientId}</h4>}
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
