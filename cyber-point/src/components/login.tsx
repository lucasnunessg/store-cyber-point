import axios from 'axios';
import { FormEvent, useState } from 'react';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      console.log('Usuário logado', response.data);
    } catch (error) {
      if (email === '' || password === '') return setError('Dados vazios');
      setError('Credenciais inválidas, por favor, tente novamente');
      console.log('erro ao logar', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Faça seu login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor='email'>E-mail:</label>
          <input
            type='text'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;