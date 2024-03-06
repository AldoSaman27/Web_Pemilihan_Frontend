// Import Styles
import "./App.css";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// Import Pages
import Home from "./Pages/Home";
import Vote from "./Pages/Vote";
import NotFound from "./Pages/NotFound";

// Admin Pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import PasanganCalon from "./Pages/Admin/PasanganCalon";
import Pemilih from "./Pages/Admin/Pemilih";

// React Router Dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vote" element={<Vote />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/pasangan-calon" element={<PasanganCalon />} />
        <Route path="/admin/pemilih" element={<Pemilih />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
