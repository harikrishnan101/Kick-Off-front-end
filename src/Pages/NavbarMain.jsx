import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';

function Navbarmain() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear('token');
    navigate('/');
  };

  return (
    <Navbar expand="lg" className="navbar" style={{ backgroundColor: '#1b1b30' }}>
      <Container className="mt-4">
        <Navbar.Brand as={Link} to="/" className="text-white">
          BookMyCourt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px' }} navbarScroll>
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            <Link to="/CourtRegistration" className="nav-link text-white">
              Court Registration
            </Link>
            <Link to="/MyCourts" className="nav-link text-white">
              My Courts
            </Link>
          </Nav>
          <NavDropdown title="Menu" id="navbarScrollingDropdown" className="text-white">
            <NavDropdown.Item href="#action3" className="mr-5">
              About
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarmain;
