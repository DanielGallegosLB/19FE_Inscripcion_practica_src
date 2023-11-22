import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { API } from "./../apiSelection";

function UsersManage() {
    let history = useNavigate();
    const [usuarios, setUsuarios] = useState([]);

    const getUsuarios = async () => {
        try {
          const response = await fetch(API + '/usuarios/obtener-usuarios'); // Ruta para obtener usuarios
          const data = await response.json();
          setUsuarios(data.usuarios);
        } catch (error) {
          console.error('Error de red:', error);
        }
      }

    const handleEdit = (id, name, password, perfil) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
        localStorage.setItem("perfil", perfil);
        history("/edit")
      }

 
      useEffect(() => {
        getUsuarios();
      }, [])

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

      return (
        <div style={{ margin: "1rem" }}>
        <h1>Usuarios</h1>
        <Table striped bordered hover size={"sm"}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Contraseña</th>
              <th>Perfil</th>
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
                  <td>{u.PERFIL.join(', ')}</td>
                  <td>
                    <Link to="/edit">
                      <Button onClick={() => handleEdit(u._id, u.NOMBRES, u.CONTRASEÑA, u.PERFIL)}>Editar</Button>
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
      )

}

export { UsersManage };