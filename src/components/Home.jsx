import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Usuarios } from "./Usuarios";
import { Link, useNavigate } from "react-router-dom";
const API = "https://19-backend.danielgallegosw.repl.co"

function Home() {
    let history = useNavigate();
    const [usuarios, setUsuarios] = useState([]);



    const getUsuarios = async () => {
        try {
            const response = await fetch(API+'/usuarios/obtener-usuarios'); // Ruta para obtener usuarios
            const data = await response.json();
            setUsuarios(data.usuarios);
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    useEffect(() => {
        getUsuarios();
    }, []);

    const handleEdit = (id, name, password, permissions, rut) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("password", password);
        localStorage.setItem("permissions", permissions);
        localStorage.setItem("rut", rut);

        history("/edit")
    }

    const handleDelete = async (id) => {
        // Realizar la solicitud DELETE al servidor
        try {
          const response = await fetch(API+`/usuarios/eliminar-usuario/${id}`, {
            method: 'DELETE',
          });
      
          if (response.status === 200) {
            console.log('Usuario eliminado exitosamente');
            // Vuelve a cargar la lista de usuarios después de eliminar uno
            getUsuarios();
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
            <div style={{ margin: "1rem" }}>
            <h1>Usuarios</h1>
                <Table striped bordered hover size={"sm"}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Contraseña</th>
                            <th>Permisos</th>
                            <th>Rut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((u, index) => (
                                <tr key={index}>
                                    <td>{u._id}</td>
                                    <td>{u.NOMBRES}</td>
                                    <td>{u.CONTRASEÑA}</td>
                                    <td>{u.PERMISOS.join(', ')}</td>
                                    <td>{u.RUT}</td>
                                    <td>
                                        <Link to="/edit">
                                            <Button onClick={() => handleEdit(u._id, u.NOMBRES, u.CONTRASEÑA, u.PERMISOS, u.RUT)}>Editar</Button>
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

export { Home , API};