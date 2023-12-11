import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarPortalProfesor = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand>UDLA</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/profesor">
          Profesor
        </Nav.Link>
        <Nav.Link as={Link} to="/iniciar-sesion">
          Cerrar Sesión
        </Nav.Link>
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/portalprofesor/curso">
          Curso
        </Nav.Link>
        <Nav.Link as={Link} to="/informes">
          Informes
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export {NavbarPortalProfesor};
