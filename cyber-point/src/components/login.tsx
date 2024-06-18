import axios from 'axios';
import { FormEvent, useState } from 'react';
import '../App.css';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');

  const handleEmailChange = (event: FormEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  }

  const handlePasswordChange = (event: FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    axios.post('http://localhost:3001/login', {
      email: email,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      const token = response.data.token; 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log(response.data.token)
      localStorage.setItem('token', token);
      setEmail('');
      setPassword('');

    }).catch(error => {
      console.error("Error:", error);
      if (error.response) {
        setError(error.response.data.message || 'An error occurred');
      } else {
        setError(error.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={handleEmailChange} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={handlePasswordChange} 
        required 
      />
      <button type="submit">Login</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

export default Login;
