import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import axios from 'axios';


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
        Cookies.set('token', token);
        navigate('/');
      })
      .catch(error => {
        console.error("Error:", error);
        setError(error.response?.data.message || 'An error occurred');
      });
  };

  const handleLogout = () => {
    Cookies.remove('token');
    delete axios.defaults.headers.common['Authorization'];
    setLogout(true)
    setTimeout(() => {
      setLogout(false)
    }, 1100)
    navigate('/');
  }; 
  
  return (
    <form onSubmit={handleSubmit}>
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

      )
    }
    </form>
  );
}

export default Login;
