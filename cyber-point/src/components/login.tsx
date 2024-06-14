import axios from 'axios';
import { FormEvent, useState } from 'react';
import '../App.css';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const handleSubmitEmail = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }
  
  const handlePasswordSubmit = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }).then(response => {
      console.log("Token aqqqq:", response.data.token);
      localStorage.setItem('token', response.data.token);
    }).catch(error => {
      setError(error.message);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={handleSubmitEmail} 
        required 
      />
      <input 
        type="password" 
        placeholder="Senha" 
        value={password} 
        onChange={handlePasswordSubmit} 
        required 
      />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
