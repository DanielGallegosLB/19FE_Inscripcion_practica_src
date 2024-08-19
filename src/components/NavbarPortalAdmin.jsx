import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const NavbarPortalAdmin = () => {
  const { auth } = useAuth();
  return (
    <Navbar bg="dark" variant="dark" style={{ width: '100%', margin: '0 20px' }} className="justify-content-center">
      <Nav className="mr-auto">
        <Navbar.Brand style={{ borderLeft: '2px solid dark', paddingLeft: '20px' }}>
          UDLA
        </Navbar.Brand>
        <Nav.Item>
          <Nav.Link disabled>{auth.user}</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link disabled>{auth.perfil}</Nav.Link>
        </Nav.Item>
        <Nav.Link as={Link} to="/iniciar-sesion">
          Cerrar Sesión
        </Nav.Link>
        <Nav.Link as={Link} to="/portaladmin">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/manageprofiles">
          Perfiles
        </Nav.Link>
        <Nav.Link as={Link} to="/usersmanage">
          Usuarios
        </Nav.Link>
        <Nav.Link as={Link} to="/cursos">
          Cursos
        </Nav.Link>
        <Nav.Link as={Link} to="/formatos/manejar"> 
          Formatos
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export { NavbarPortalAdmin };
