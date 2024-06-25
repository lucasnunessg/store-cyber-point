import Api from "./components/api";
import { Routes, Route } from 'react-router-dom';
import HomePage from "./components/HomePage";


function App() {
    return (
      <>
      <div>
        <Api />
        <Routes>
        <Route path="/" element={<HomePage />} />

        </Routes>
        </div>
        </>
    )
}

export default App  