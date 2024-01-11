import React from 'react';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

const Footer = () => {
  return (
    <Navbar bg="dark" variant="dark" fixed="bottom">
      <Container>
        <Row className="w-100">
          <Col xs={12} md={4} className="text-center text-md-left">
            <p className="mb-0">Your Company Name</p>
          </Col>
          <Col xs={12} md={4} className="text-center">
            <p className="mb-0">Address, City, Country</p>
          </Col>
          <Col xs={12} md={4} className="text-center text-md-right">
            <p className="mb-0">© {new Date().getFullYear()} All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Footer;
