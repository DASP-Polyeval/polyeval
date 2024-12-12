import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Navigation = () => {
  const navLinkStyle = { color: "white", fontSize: "15px" };
  const navbarBrandStyle = { color: "white", fontSize: "20px" };
  const dropdownItemStyle = { color: "black" };

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home" style={navbarBrandStyle}>
          PolyEval
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" style={navLinkStyle}>
              Aya
            </Nav.Link>
            <Nav.Link href="#link" style={navLinkStyle}>
              Flores-200
            </Nav.Link>
            <Nav.Link href="#link" style={navLinkStyle}>
              Polywrite
            </Nav.Link>
            <Nav.Link href="#link" style={navLinkStyle}>
              SIB-200
            </Nav.Link>
            <Nav.Link href="#link" style={navLinkStyle}>
              Taxi-1500
            </Nav.Link>
            <Nav.Link href="#link" style={navLinkStyle}>
              XLSum
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
