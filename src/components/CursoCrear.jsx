import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../apiSelection";
import { useAuth } from "../hooks/useAuth";

function CursoCrear() {
    const [profesor, setProfesor] = useState("");
    const [rutProfesor, setRutProfesor] = useState("");
    const [nrc, setNRC] = useState("");
    const [aci, setACI] = useState("");
    const [periodo, setPeriodo] = useState("");
    const auth = useAuth();

    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();
        

        // Validar restricciones antes de enviar la solicitud
        if (!/^\d{4}$/.test(nrc)) {
            alert("El NRC debe contener 4 números");
            return;
        }

        if (!/^\d{1,3}$/.test(aci)) {
            alert("El ACI debe contener entre 1 y 3 números");
            return;
        }

        if (!/^\d+$/.test(periodo)) {
            alert("El período debe contener solo números");
            return;
        }

        const newCourse = {
            PROFESOR: profesor,
            RUTPROFESOR: rutProfesor,
            NRC: nrc,
            ACI: aci,
            PERIODO: periodo,
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
                navigate("/portalprofesor/curso");
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
                <Form.Group className="mb-3" controlId="profesor">
                    <Form.Label>Profesor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese profesor" required onChange={(e) => setProfesor(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rutProfesor">
                    <Form.Label>RUT Profesor</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese RUT profesor" onChange={(e) => setRutProfesor(e.target.value)} />
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

export { CursoCrear };
