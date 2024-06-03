import { useState } from 'react';



function DarkMode() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const colorPage = isDarkMode ? 'black' : 'white';

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className='container' style={{ backgroundColor: colorPage }}>
      <div className='botaoColorMode'>
        <button onClick={toggleDarkMode}>Modo escuro ou Modo Claro</button>
      </div>
    </div>
  );
}

export default DarkMode;
