import { Route, Routes } from 'react-router-dom';
import Api from "./components/api";
import NavBar from "./components/NavBar";
import Electronics from "./components/Electronics";
import WomenCategory from './components/WomenCategory';
import JeweleryCategory from './components/Jewelery';
import MensCategory from './components/MensCategory';

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Api />} />
                <Route path="/electronics" element={<Electronics />} />
                <Route path="/women" element={<WomenCategory />} />
                <Route path='/jewelery' element= {<JeweleryCategory />} />
                <Route path='/mens' element={<MensCategory />} />
            </Routes>
        </div>
    );
}

export default App;
