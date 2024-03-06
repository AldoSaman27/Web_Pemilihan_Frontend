// Import Styles
import "../../../Styles/Admin/Components/SideBar.css";

// Import Images
import Logo from "../../../Assets/smkn3.png";

// 
import { Speedometer2, Person, PersonVcard, BoxArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ Active }) => {
    const Navigate = useNavigate();
    
    return (
        <div className="SideBar">
            <div className="Headers d-flex align-items-center justify-content-center gap-2">
                <img src={Logo} alt="" width={35} />
                <h6 className="fw-bold p-0 m-0 text-white">SMKN 3 GORONTALO</h6>
            </div>
            <ul>
                <li className={`d-flex align-items-center gap-2 fw-semibold text-white ${Active === 1 ? 'Active' : ''}`} onClick={() => Navigate("/admin")}><Speedometer2 size={25}/>Dashboard</li>
                <li className={`d-flex align-items-center gap-2 fw-semibold text-white ${Active === 2 ? 'Active' : ''}`} onClick={() => Navigate("/admin/pasangan-calon")}><PersonVcard size={25}/>Pasangan Calon</li>
                <li className={`d-flex align-items-center gap-2 fw-semibold text-white ${Active === 3 ? 'Active' : ''}`} onClick={() => Navigate("/admin/pemilih")}><Person size={25}/>Pemilih</li>
                <div className="GapLine"></div>
                <li className="d-flex align-items-center gap-2 fw-semibold text-danger LogOut" onClick={() => Navigate("/admin/login")}><BoxArrowRight size={25}/>Log Out</li>
            </ul>
        </div>
    )
}

export default SideBar;