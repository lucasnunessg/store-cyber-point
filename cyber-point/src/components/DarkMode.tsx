import { useCallback, useEffect, useState } from 'react';

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
    document.body.classList.toggle('light-mode', !isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prevMode => !prevMode);
  }, []);

  return (
    <div className='darkmode'>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light-Mode' : 'Dark-Mode'}
      </button>
    </div>
  );
};

export default DarkMode;
