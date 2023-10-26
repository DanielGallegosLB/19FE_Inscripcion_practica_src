import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
const API = "http://localhost:3001"
//const API = "https://19-backend.danielgallegosw.repl.co"
//const API = "https://one9backend.onrender.com"

function ManageProfiles() {
  let history = useNavigate();
  const [perfiles, setPerfiles] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const getPerfiles = async () => {
    try {
      const response = await fetch(API + '/perfiles/obtener'); // Ruta para obtener usuarios
      const data = await response.json();
      setPerfiles(data.perfiles);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  const getUsuarios = async () => {
    try {
      const response = await fetch(API + '/usuarios/obtener-usuarios'); // Ruta para obtener usuarios
      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  useEffect(() => {
    getPerfiles();
    getUsuarios();
  }, []);

  const handleEdit = (id, name, password, roles) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
    localStorage.setItem("roles", roles);
    history("/edit")
  }

  const handleDelete = async (id) => {
    // Realizar la solicitud DELETE al servidor
    try {
      const response = await fetch(API + `/usuarios/eliminar-usuario/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        console.log('Usuario eliminado exitosamente');
        // Vuelve a cargar la lista de usuarios después de eliminar uno
        getPerfiles();
      } else {
        console.error('Error al eliminar el usuario');
        console.log(response);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  }

  return (
    <Fragment>
      <div>
        <h1>Perfiles</h1>
        <Table striped bordered hover size={"sm"}>
        <thead>
          <tr>
            <th>Módulos</th>
            {perfiles?.map((perfil, index) => (
              <th key={index}>{perfil.NOMBRE}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(perfiles[0] || {}).map((permiso, permisoIndex) => {
            if (permiso.startsWith("IP_")) {
              return (
                <tr key={permisoIndex}>
                  <td>{permiso}</td>
                  {perfiles?.map((perfil, index) => (
                    <td key={index}>
                      {perfil[permiso] ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faTimes} />}
                    </td>
                  ))}
                </tr>
              );
            }
            return null; // Omitir propiedades que no son permisos
          })}
        </tbody>
      </Table>

        <Link className="d-grid gap-2" to="/create">
          <Button size="lg">Crear</Button>
        </Link>
      </div>




      <div style={{ margin: "1rem" }}>
        <h1>Usuarios</h1>
        <Table striped bordered hover size={"sm"}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Roles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u, index) => (
                <tr key={index}>
                  <td>{u._id}</td>
                  <td>{u.NOMBRES}</td>
                  <td>{u.CONTRASEÑA}</td>
                  <td>{u.ROLES.join(', ')}</td>
                  <td>
                    <Link to="/edit">
                      <Button onClick={() => handleEdit(u._id, u.NOMBRES, u.CONTRASEÑA, u.ROLES)}>Editar</Button>
                    </Link>
                    <Button onClick={() => handleDelete(u._id)}>Eliminar</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No hay usuarios</td>
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

export { ManageProfiles };