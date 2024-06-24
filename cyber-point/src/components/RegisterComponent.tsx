import { useState } from 'react';
import axios from 'axios';

const CreateClient: React.FC = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState ('');
const [address, setAddress] = useState('');
const [contact, setContact] = useState('');
const [fullName, setFullName] = useState('');

const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try{
    const newClient = {
      fullName,
      address,
      contact,
      email,
      password,
    } 
    console.log(newClient)
    const response = await axios.post('http://localhost:3001/clients', newClient);
    console.log("Cliente criado", response.data);
    setEmail('');
    setPassword('');
    setAddress('');
    setContact('');
    setFullName('');
  }catch(error){
    console.error('erro ao criar cliente', error);
  }
};

return (
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
    <button type='submit'>Cadastrar</button>

  </form>
)
}

export default CreateClient;