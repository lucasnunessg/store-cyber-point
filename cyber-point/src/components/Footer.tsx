
const footerStyle = {
  backgroundColor: '#f0f0f0',
  padding: '20px',
  textAlign: 'center' as const, 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const instagramIconStyle = {
  width: '20px',
  height: '20px',
  verticalAlign: 'middle',
  marginRight: '5px',
};

function MyFooter() {
  return (
    <div className="myFooter" style={footerStyle}>
      <footer>
        <h1>Cyber Point Store</h1>
        <p>Página web desenvolvida e mantida por: Lucas Pacheco Nunes</p>
        <p style={{ marginBottom: '0' }}>
          Página do Instagram: 
          <a href="https://www.instagram.com/_cyberpoint/" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1200px-Instagram-Icon.png" alt="Instagram Icon" style={instagramIconStyle} />
            _cyberpoint
          </a>
        </p>
        <hr />
      </footer>
    </div>
  );
}

export default MyFooter;
