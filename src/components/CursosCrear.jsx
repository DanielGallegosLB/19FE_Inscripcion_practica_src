import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function CursosCrear() {
    const [name, setName] = useState("");
    const [profesor, setProfesor] = useState("");
    const [alumnos, setAlumnos] = useState("");

    let history = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        const newCourse = {
            NOMBRE: name,
            PROFESOR: profesor,
            ALUMNOS: alumnos,
        };
        console.log("NOMBRE "+name)
        console.log("PROFESOR "+profesor)
        console.log("ALUMNOS "+alumnos)


        try {
            const res = await fetch(API + '/cursos/crear-curso', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCourse),
            });

            if (res.status === 201) {
                alert("Curso creado correctamente");
                history("/cursos");
                return res.json();
            } else {
                alert("Error al crear el curso");
                console.log(res.json());
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
        
    }

    return (
        <div style={{ margin: "15rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profesor">
                    <Form.Label>Profesor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese profesor" required onChange={(e) => setProfesor(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="alumnos">
                    <Form.Label>alumnos</Form.Label>
                    <Form.Control type="list" placeholder="Ingrese alumnos (separados por coma)" required onChange={(e) => setAlumnos(e.target.value)} />
                </Form.Group>

                <Link to={"/cursos"}>
                    <Button variant="primary" onClick={(e) => handleCreate(e)}>
                        Crear Curso
                    </Button>
                </Link>
            </Form>
        </div>
    )
}

export { CursosCrear };