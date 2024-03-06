// Import Styles
import "../Styles/NotFound.css";

// Import Components
import NavigationBar from "../Components/NavigationBar";

// React Bootstrap
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <NavigationBar />
      <section id="NotFound">
        <Container className="d-flex flex-column align-items-center justify-content-center">
          <h1 className="fw-bold">404</h1>
          <h2 className="fw-bold">Not Found</h2>
        </Container>
      </section>
    </>
  );
};

export default NotFound;
