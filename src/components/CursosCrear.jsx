import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function CursosCrear() {
    const [name, setName] = useState("");
    const [profesor, setProfesor] = useState("");
    const [rutProfesor, setRutProfesor] = useState("");  // Nuevo campo
    const [alumnos, setAlumnos] = useState("");
    const [nrc, setNRC] = useState("");  // Nuevo campo
    const [aci, setACI] = useState("");  // Nuevo campo
    const [periodo, setPeriodo] = useState("");

    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        const newCourse = {
            NOMBRE: name,
            PROFESOR: profesor,
            RUTPROFESOR: rutProfesor,
            NRC: nrc,
            ACI: aci,
            PERIODO: periodo,  // Agregado campo 'PERIODO'
        };

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
                navigate("/cursos");
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
        <div style={{ margin: "2rem" }}>
            <Form>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre del curso</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese nombre" required onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profesor">
                    <Form.Label>Profesor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese profesor" required onChange={(e) => setProfesor(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rutProfesor">
                    <Form.Label>Rut Profesor (sin puntos ni guion)</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese rut del profesor" required onChange={(e) => setRutProfesor(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="nrc">
                    <Form.Label>NRC</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese NRC" required onChange={(e) => setNRC(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="aci">
                    <Form.Label>ACI</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese ACI" required onChange={(e) => setACI(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="periodo">
                    <Form.Label>Período</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese período" required onChange={(e) => setPeriodo(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={(e) => handleCreate(e)}>
                    Crear Curso
                </Button>
            </Form>
        </div>
    )
}


export { CursosCrear };
