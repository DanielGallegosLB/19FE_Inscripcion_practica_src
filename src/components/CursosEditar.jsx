import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Usuarios } from "./Usuarios";
import { Link, useNavigate } from "react-router-dom";
import { set } from "mongoose";
import { API } from "./Home.jsx";

function CursosEditar() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [profesor, setProfesor] = useState("");
    const [alumnos, setAlumnos] = useState("");
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


    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedCurso = {
            NOMBRE: name,
            PROFESOR: profesor,
            ALUMNOS: alumnos,
        };

        fetch(API + `/cursos/editar-curso/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCurso),
        })
        .then((response) => {
        if (response.status === 200) {
            alert("Curso actualizado correctamente");
            history("/cursos");
            return response.json();
        } else {
            alert("Error al actualizar el curso");
            console.log(response);
        }

        })
        .catch((error) => {
            console.error('Error de red:', error);
        });

    };

    useEffect(() => {
        getCursos();
        const stId = localStorage.getItem("id") || "";
        const stname = localStorage.getItem("name") || "";
        const stprofesor = localStorage.getItem("profesor") || "";
        const stalumnos = localStorage.getItem("alumnos") || "";
        
        setId(stId);
        setName(stname);
        setProfesor(stprofesor);
        setAlumnos(stalumnos);
        
    }, []);

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="id">
                    <Form.Label>id</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese id" value={id} required onChange={(e) => setId(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" value={name} required onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profesor">
                    <Form.Label>Profesor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese profesor" value={profesor} required onChange={(e) => setProfesor(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="alumnos">
                    <Form.Label>alumnos</Form.Label>
                    <Form.Control type="list" placeholder="Ingrese alumnos (separados por coma)" value={alumnos} required onChange={(e) => setAlumnos(e.target.value)} />
                </Form.Group>


                <Button variant="primary" onClick={(e) => handleUpdate(e)}>
                    Guardar
                </Button>

            </Form>
        </div>

    )



}

export { CursosEditar };