import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

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

    const handleEdit = (id, name, profesor, alumnos) => {
        localStorage.setItem("id", id)
        localStorage.setItem("name", name);
        localStorage.setItem("profesor", profesor);
        localStorage.setItem("alumnos", alumnos);
    }

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
            <Link to="/">
                <button>Inicio</button>
            </Link>
            <div style={{ margin: "1rem" }}>
                <h1>Cursos</h1>
                <Table striped bordered hover size={"sm"}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Profesor</th>
                            <th>Alumnos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cursos.length > 0 ? (
                            cursos.map((u, index) => (
                                <tr key={index}>
                                    <td>{u._id}</td>
                                    <td>{u.NOMBRE}</td>
                                    <td>{u.PROFESOR}</td>
                                    <td>{u.ALUMNOS.join(', ')}</td>
                                    <td>
                                        <Link to="/cursos/editar">
                                            <Button onClick={() => handleEdit(u._id, u.NOMBRE, u.PROFESOR, u.ALUMNOS)}>Editar</Button>
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