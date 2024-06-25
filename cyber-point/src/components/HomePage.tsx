  import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate('http://localhost:3001/products');
  };

  return(
    <div>
      <div className="contacts">
      <h3>Contatos:</h3>
      <p>WhatsApp:</p>
      </div>
      <button onClick={goToProducts}>Produtos</button>
    </div>
  )


}

export default HomePage;