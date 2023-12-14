import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";
import { NavbarPortalAdmin } from "./NavbarPortalAdmin.jsx";

function CursosMostrar() {
    const [cursos, setCursos] = useState([]);
    let history = useNavigate();

    const getCursos = async () => {
        try {
            const response = await fetch(API + '/cursos/obtener-cursos'); // Ruta para obtener usuarios
            const data = await response.json();
            setCursos(data.cursos);
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    const handleEdit = (id, profesor, rutProfesor, nrc, aci) => {
        localStorage.setItem("id", id);
        localStorage.setItem("profesor", profesor);
        localStorage.setItem("rutProfesor", rutProfesor);
        localStorage.setItem("nrc", nrc);
        localStorage.setItem("aci", aci);
      };
      

    const handleDelete = async (id) => {
        // Realizar la solicitud DELETE al servidor
        try {
            const response = await fetch(API + `/cursos/eliminar-curso/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 200) {
                console.log('Curso eliminado exitosamente');
                // Vuelve a cargar la lista de usuarios después de eliminar uno
                getCursos();
            } else {
                console.error('Error al eliminar el curso');
                console.log(response);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    }

    useEffect(() => {
        getCursos();
    }, []);


    return (
        <Fragment>
            <NavbarPortalAdmin />
            <div style={{ margin: "1rem" }}>
                <h1>Cursos</h1>
                <Table striped bordered hover size={"sm"}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Profesor</th>
                            <th>Rut Profesor</th>
                            <th>Alumnos</th>
                            <th>NRC</th>
                            <th>ACI</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.length > 0 ? (
                            cursos.map((u, index) => (
                                <tr key={index}>
                                    <td>{u._id}</td>
                                    
                                    <td>{u.PROFESOR}</td>
                                    <td>{u.RUTPROFESOR}</td>
                                    <td>{u.ALUMNOS.map(alumno => alumno.NOMBRES).join(', ')}</td>
                                    <td>{u.NRC}</td>
                                    <td>{u.ACI}</td>
                                    <td>
                                        <Link to="/cursos/editar">
                                        <Button onClick={() => handleEdit(u.PROFESOR, u.RUTPROFESOR, u.NRC, u.ACI)}>Editar</Button>
                                        </Link>
                                        <Button onClick={() => handleDelete(u._id)}>Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5}>No hay cursos</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Link className="d-grid gap-2" to="/cursos/crear">
                    <Button size="lg">Crear</Button>
                </Link>
            </div>
        </Fragment>
    )
}

export { CursosMostrar }