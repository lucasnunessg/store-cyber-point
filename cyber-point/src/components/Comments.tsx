import { useState, useEffect } from 'react';
import api from './fetchApi';

const Comments = () => {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [clientId, setClientId] = useState('');
  const [productId, setProductId] = useState('');

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await api.get(`/products/:${productId}/comments`);
        setComment(response.data);
      } catch (error) {
        console.error('Não foi possível encontrar o comentário', error);
      }
    }
    fetchComments();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
 try{
  const newComment = {
    clientId,
    productId,
    comment,
  }
  const comentPost = await api.post('/products/:id/comments', newComment);
    setNewComment(comentPost.data)
    console.log("Comentário criado com sucesso!", comentPost.data);
    setClientId('');
    setProductId('');
 }   catch(e){
  console.error('erro ao buscar comentário', e)
 }
 
}

  return (
    <form onSubmit={handleSubmit}>
      <div>
      <h4>Comentários do produto:</h4>
      <input
      type='text'
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      />
      </div>
    </form>
    
  );
};

export default Comments;
