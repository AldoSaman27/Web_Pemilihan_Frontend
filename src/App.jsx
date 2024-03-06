// Import Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Pages
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Vote from './Pages/Vote';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminHome from './Pages/Admin/AdminHome';
import PasanganCalon from './Pages/Admin/PasanganCalon';

// 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Pemilih from './Pages/Admin/Pemilih';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/vote' element={<Vote/>} />
                <Route path='/admin/login' element={<AdminLogin/>} />
                <Route path='/admin' element={<AdminHome/>} />
                <Route path='/admin/pasangan-calon' element={<PasanganCalon/>} />
                <Route path='/admin/pemilih' element={<Pemilih/>} />
                <Route path='*' element={<NotFound/>} />
            </Routes>
        </Router>
    )
}

export default App;