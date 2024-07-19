import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

interface DecodedToken {
  id: number;
}

const getClientIdFromToken = (): number | null => {
  const token = Cookies.get('token');
  if (!token) {
    return null;
  }

  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken.id; 
  } catch (error) {
    console.error('Erro ao decodificar o token', error);
    return null;
  }
};

export default getClientIdFromToken;
