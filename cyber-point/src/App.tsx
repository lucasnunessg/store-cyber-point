import { Route, Routes } from 'react-router-dom';
import Api from "./components/api";
import NavBar from "./components/NavBar";
import Electronics from "./components/Electronics";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Api />} />
                <Route path="/electronics" element={<Electronics />} />
            </Routes>
        </div>
    );
}

export default App;
