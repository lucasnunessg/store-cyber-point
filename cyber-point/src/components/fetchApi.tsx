import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  // comentado pq quebrou aplicação withCredentials: true,

});




export default api;
