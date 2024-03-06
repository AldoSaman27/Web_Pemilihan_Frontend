// Import Styles
import "../../../Styles/Admin/Components/AdminNavBar.css";

// React Boostrap Icons
import { PersonCircle } from "react-bootstrap-icons";

const AdminNavBar = () => {
  return (
    <div className="NavigationBar shadow d-flex align-items-center justify-content-end gap-2">
      <h6 className="fw-bold p-0 m-0">{localStorage.getItem("user.name")}</h6>
      <PersonCircle size={35} />
    </div>
  );
};

export default AdminNavBar;
