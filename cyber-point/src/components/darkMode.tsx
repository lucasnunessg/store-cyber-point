
interface DarkModeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

function DarkMode({ isDarkMode, toggleDarkMode }: DarkModeProps) {
  const colorPage = isDarkMode ? 'black' : 'white';

  return (
    <div className='container' style={{ backgroundColor: colorPage }}>
      <div className='botaoColorMode'>
        <button onClick={toggleDarkMode}>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</button>
      </div>
    </div>
  );
}

export default DarkMode;
