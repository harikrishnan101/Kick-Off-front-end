import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../Styles/Navbar.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Navbarmain() {
  const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
  console.log(user,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2");
  const logout=()=>{
    localStorage.clear('token')
    navigate('/')
    
  }

  return (
    <Navbar expand="lg" className="navbar">
      <Container className="mt-4">
        <Navbar.Brand href="#" className="text-white">
          BookMyCourt
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Link to="/home" className="nav-link text-white">
              Home
            </Link>
            {/* <a href="#action2" className="nav-link text-white">
              My Booking
            </a> */}
            {user.role === 2 && (
              <Link to="/CourtRegistration" className="nav-link text-white ">
                Court Registration
              </Link>
            )}
            <Link to="/MyCourts" className="nav-link text-white">
              My Courts
            </Link>
          </Nav>
          <NavDropdown className="text-white" title={`${user.firstname} ${user.lastname}`}  id="navbarScrollingDropdown">
            <NavDropdown.Item href="#action3" className="mr-5">
              About
            </NavDropdown.Item>
            <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarmain;