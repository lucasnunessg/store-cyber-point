import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

interface LoginResponse {
  token: string;
}

const login = async (email: string, password: string): Promise<void> => {
  try {
    const response: AxiosResponse<LoginResponse> = await api.post('/login', { email, password });
    const token: string = response.data.token;
    localStorage.setItem('token', token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      console.error('Erro de autenticação:', axiosError.message);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
};

export default api;
