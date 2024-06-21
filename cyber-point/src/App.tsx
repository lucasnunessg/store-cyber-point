import { Route, Routes } from 'react-router-dom';
import Api from "./components/api";
import AddProductPage from './components/AddProductPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Api />} />
      <Route path="/add-product" element={<AddProductPage />} />
    </Routes>
  );
}

export default App;
