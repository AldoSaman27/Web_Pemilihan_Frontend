// Import Styles
import "../../Styles/Admin/AdminLogin.css";

// Import Images
import Logo from "../../Assets/smkn3.png";
import Loading from "../../Assets/loading.gif";

// Axios
import axios from "axios";

// Sweet Alert 2
import Swal from "sweetalert2";

// React Bootstrap
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";

// React
import { useEffect, useState } from "react";

// React Router Dom
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const Navigate = useNavigate();
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [alertValue, setAlertValue] = useState("");
  const [alertStatus, setAlertStatus] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    localStorage.clear();
  }, []);

  const HandleLogin = () => {
    if (
      usernameValue === "" ||
      usernameValue.length === 0 ||
      usernameValue === null ||
      usernameValue === undefined
    ) {
      setAlertValue("Username is required!");
      setAlertStatus(true);
      return 1;
    } else if (
      passwordValue === "" ||
      passwordValue.length === 0 ||
      passwordValue === null ||
      passwordValue === undefined
    ) {
      setAlertValue("Password is required!");
      setAlertStatus(true);
      return 1;
    }

    setButtonLoading(true);

    const formData = new FormData();
    formData.append("name", usernameValue);
    formData.append("password", passwordValue);
    axios.defaults.headers.common["Accept"] = "application/json";
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v2/auth/login`, formData)
      .then((ress) => {
        setButtonLoading(false);

        if (ress.data.message !== "Login success") {
          setAlertValue(ress.data.message);
          setAlertStatus(true);
          return 1;
        }

        localStorage.setItem("user.id", ress.data.user.id);
        localStorage.setItem("user.name", ress.data.user.name);
        localStorage.setItem("user.email", ress.data.user.email);
        localStorage.setItem("user.level", ress.data.user.level);
        localStorage.setItem("user.created_at", ress.data.user.created_at);
        localStorage.setItem("user.updated_at", ress.data.user.updated_at);
        localStorage.setItem("user.accessToken", ress.data.user.accessToken);
        Navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        if (err.response.data.message === "Invalid field") {
          setButtonLoading(false);
          Swal.fire({
            title: "Opss!",
            text:
              err.response.data.errors.name ||
              err.response.data.errors.email ||
              err.response.data.errors.password ||
              err.response.data.errors.level,
            icon: "error",
            showCancelButton: false,
            confirmButtonText: "OK",
          });
        }
      });
  };

  const HandleInputChange = (type, value) => {
    switch (type) {
      case 1:
        setUsernameValue(value);
        setAlertStatus(false);
        break;

      case 2:
        setPasswordValue(value);
        setAlertStatus(false);
        break;

      default:
        break;
    }
  };

  return (
    <section id="AdminLogin">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <div className="boxLogin d-flex flex-column align-items-center justify-content-center">
          <img
            src={Logo}
            alt="SMK Negeri 3 Gorontalo"
            width="100"
            className="mb-4"
          />
          <Alert
            key="danger"
            variant="danger"
            className={alertStatus ? null : "d-none"}
          >
            {alertValue}
          </Alert>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="name@example.com"
              onChange={(e) => HandleInputChange(1, e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => HandleInputChange(2, e.target.value)}
            />
          </FloatingLabel>
          <Button
            variant="primary"
            className="mt-3 d-flex align-items-center justify-content-center gap-2"
            onClick={HandleLogin}
            disabled={buttonLoading}
          >
            {buttonLoading ? (
              <img src={Loading} alt="Loading" width={20} height={20} />
            ) : null}
            Login
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default AdminLogin;
