import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";

function UsersManage() {
  let history = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getUsuarios = async () => {
    try {
      const response = await fetch(API + '/usuarios/obtener-usuarios');
      const data = await response.json();

      // Filtrar usuarios en función del término de búsqueda
      const filteredUsuarios = data.usuarios.filter(user =>
        user.RUT.includes(searchTerm)
      );

      setUsuarios(filteredUsuarios);
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  useEffect(() => {
    getUsuarios();
  }, [searchTerm]);

  const handleEdit = (id, rut, perfil) => {
    localStorage.setItem("id", id);
    localStorage.setItem("rut", rut);
    localStorage.setItem("perfil", perfil);
    history("/edit");
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(API + `/usuarios/eliminar-usuario/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Usuario eliminado exitosamente');
        getUsuarios();
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleSearch = () => {
    getUsuarios(); // El useEffect se encargará de realizar la búsqueda
  };

  return (
    <Fragment>
      <NavbarPortalAdmin />
    <div style={{ margin: "1rem" }}>
      
      <h1>Usuarios</h1>

      {/* Agrega el campo de búsqueda */}
      <Form>
        <Form.Group controlId="formSearch">
          <Form.Label>Buscar por RUT:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el RUT"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Buscar
        </Button>
      </Form>

      <Table striped bordered hover size={"sm"}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Rut</th>
            <th>Perfil</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u, index) => (
              <tr key={index}>
                <td>{u._id}</td>
                <td>{u.RUT}</td>
                <td>{u.PERFIL.join(', ')}</td>
                <td>
                  <Link to="/edit">
                    <Button onClick={() => handleEdit(u._id, u.RUT, u.PERFIL)}>Editar</Button>
                  </Link>
                  <Button onClick={() => handleDelete(u._id)}>Eliminar</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No hay usuarios</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Link className="d-grid gap-2" to="/create">
        <Button size="lg">Crear</Button>
      </Link>
    </div>
    </Fragment>
  );
}

export { UsersManage };

