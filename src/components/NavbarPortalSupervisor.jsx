import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavbarPortalSupervisor = () => {
  const { auth } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" style={{ width: '100%', margin: '0 20px' }} className="justify-content-center">
      <Navbar.Brand>UDLA</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Item>
          <Nav.Link disabled>{auth.user}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>{auth.perfil}</Nav.Link>
        </Nav.Item>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/iniciar-sesion-supervisor">
          Cerrar Sesión
        </Nav.Link>
        <Nav.Link as={Link} to="/portalsupervisor">
          Inicio
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export { NavbarPortalSupervisor };