import { Container, Nav, Navbar } from 'react-bootstrap';

// Import Image
import Logo from '../Assets/smkn3.png';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const Navigate = useNavigate();

    return (
        <Navbar expand="lg" className="bg-body-tertiary shadow fixed-top">
            <Container>
                <Navbar.Brand className="fw-semibold">
                    <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top me-2"/>
                    SMK N 3 Gorontalo
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link onClick={() => Navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => Navigate("/vote")}>Vote</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;