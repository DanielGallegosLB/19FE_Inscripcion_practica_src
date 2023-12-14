import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavbarPortalAlumno = () => {
  const { auth } = useAuth();
  return (
    <Navbar bg="dark" variant="dark" style={{ width: '100%', margin: '0 20px' }} className="justify-content-center">
      
      <Nav className="mr-auto">
      <Navbar.Brand>UDLA</Navbar.Brand>
        <Nav.Item>
          <Nav.Link disabled>{auth.user}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>{auth.perfil}</Nav.Link>
        </Nav.Item>
        <Nav.Link as={Link} to="/iniciar-sesion">
          Cerrar Sesión
        </Nav.Link>
        <Nav.Link as={Link} to="/portalalumno">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/formalumnos">
          Inscribirse
        </Nav.Link>
        <Nav.Link as={Link} to="/formatos"> 
          Formatos
        </Nav.Link>
        <Nav.Link as={Link} to="/informe">
          Informe
        </Nav.Link>
        <Nav.Link as={Link} to="/miperfil">
          Mi Perfil
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export {NavbarPortalAlumno};
