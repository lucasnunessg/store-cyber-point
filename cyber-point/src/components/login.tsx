import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logout, setLogout] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:3001/login', {
        email: email,
        password: password,
      })
      .then(response => {
        const token = response.data.token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
        const decodedToken = jwt_decode(token)
        const fullName = decodedToken.data.fullName;
        localStorage.setItem('fullName', fullName);

        navigate('/');
        window.location.reload();
      })
      .catch(error => {
        console.error("Error:", error);
        setError(error.response?.data.message || 'An error occurred');
      });
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('fullName')
    delete axios.defaults.headers.common['Authorization'];
    setLogout(true)
    setTimeout(() => {
      setLogout(false)
      window.location.reload();
    }, 500)
    navigate('/');
  }; 

  
  return (
    <form onSubmit={handleSubmit}>
      <div className='login-inputs'>
      <input
        id='inputMail'
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
        required
      />
      <input
        id='inputPassword'
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
        required
      />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
      { logout ? (
        <p>Saindo...</p>
      ) : (
        <button type="button" onClick={handleLogout}>Logout</button>
      )}
      </div>

    </form>
      
  );
}

export default Login;
