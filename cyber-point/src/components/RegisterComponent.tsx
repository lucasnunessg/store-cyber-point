import { useState } from 'react';
import axios from 'axios';

const CreateClient = () => {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Correção na grafia de "success"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newClient = {
        fullName,
        address,
        contact,
        email,
        password,
      };
      console.log(newClient);
      const response = await axios.post('http://localhost:3001/clients', newClient);
      console.log(response.data)
      setSuccess('Cliente criado com sucesso!');
      setEmail('');
      setPassword('');
      setAddress('');
      setContact('');
      setFullName('');
      setError(''); 
    } catch (error) {
      console.error('Erro ao criar cliente', error);
      setError('Erro ao criar cliente. Por favor, tente novamente.');
      setSuccess(''); 
    }
  };

  return (
    <>
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Criar conta</button>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Senha</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Nome completo</label>
            <input
              type='text'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label>Endereço</label>
            <input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>Contato</label>
            <input
              type='text'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type='submit'>Cadastrar</button>
          <button type='button' onClick={() => setShowForm(false)}>Cancelar</button> {/* Correção: Adiciona type='button' */}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
      )}
    </>
  );
};

export default CreateClient;
