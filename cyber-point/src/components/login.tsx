import axios from 'axios';
import { FormEvent, useState } from 'react';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    axios.post('/login', {
      email: email,
      password: password,
    }).then(response => {
      localStorage.setItem('token', response.data.token);
    }).catch(error => {
      setError(error);
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
