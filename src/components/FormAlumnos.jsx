import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";

function FormAlumnos() {
    const [datosAlumno, setDatosAlumno] = useState({
        NOMBRES: "",
        APELLIDO_PATERNO: "",
        APELLIDO_MATERNO: "",
        RUT: "",
        FECHA_NACIMIENTO: "",
        TELÉFONO: "",
        CORREO: "",
        FACULTAD: "",
        ESCUELA: "",
        CARRERA: "",
        REGIMEN: "",
        SEDE: "",
    });

    const [datosProfesor, setDatosProfesor] = useState({
        NOMBRES: "",
        APELLIDO_PATERNO: "",
        APELLIDO_MATERNO: "",
        TELÉFONO: "",
        CORREO: "",
        FACULTAD: "",
        ESCUELA: "",
        CARRERA: "",
    });

    const [datosEmpresaSupervisor, setdatosEmpresaSupervisor] = useState({
        NOMBRE: "",
        GIRO: "",
        DIRECCIÓN: "",
        TELÉFONO: "",
        PAGINA_WEB: "",
        NUM_COLABORADORES: "",
        AREA_DE_PRACTICA: "",
        NOMBRE_SUPERVISOR: "",
        CARGO_SUPERVISOR: "",
        CORREO_SUPERVISOR: "",
        TELEFONO_SUPERVISOR: "",
        FECHA_INICIO: "",
        FECHA_TERMINO: "",
    });

    let history = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const formData = {
            datosAlumno,
            datosProfesor,
            datosEmpresaSupervisor,
        };

        try {
            const res = await fetch(API + "/formularios-alumnos/crear-formulario", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 201) {
                alert("Formulario creado correctamente");
                history("/formalumnos");
            } else {
                alert("Error al crear el formulario");
                console.log(res);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className="col">
            <h4>Datos Alumno</h4>
            <div className="row">
                {Object.entries(datosAlumno).map(([campo, valor]) => (
                    <div key={campo} className="col-6 col-md-4 col-lg-3 col-xl-2">
                        {/* Puedes ajustar los tamaños de las columnas según tus necesidades */}
                        <Form.Group className="mb-3">
                            <Form.Label>{campo}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Ingrese ${campo}`}
                                value={valor}
                                onChange={(e) => setDatosAlumno({ ...datosAlumno, [campo]: e.target.value })}
                            />
                        </Form.Group>
                    </div>
                ))}
            </div>
            <h4>Datos Profesor</h4>
            <div className="row">
                {Object.entries(datosProfesor).map(([campo, valor]) => (
                    <div key={campo} className="col-6 col-md-4 col-lg-3 col-xl-2">
                        {/* Puedes ajustar los tamaños de las columnas según tus necesidades */}
                        <Form.Group className="mb-3">
                            <Form.Label>{campo}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Ingrese ${campo}`}
                                value={valor}
                                onChange={(e) => setDatosProfesor({ ...datosProfesor, [campo]: e.target.value })}
                            />
                        </Form.Group>
                    </div>
                ))}
            </div>
            <h4>Datos Supervisor</h4>
            <div className="row">
                {Object.entries(datosEmpresaSupervisor).map(([campo, valor]) => (
                    <div key={campo} className="col-6 col-md-4 col-lg-3 col-xl-2">
                        {/* Puedes ajustar los tamaños de las columnas según tus necesidades */}
                        <Form.Group className="mb-3">
                            <Form.Label>{campo}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Ingrese ${campo}`}
                                value={valor}
                                onChange={(e) => setdatosEmpresaSupervisor({ ...datosEmpresaSupervisor, [campo]: e.target.value })}
                            />
                        </Form.Group>
                    </div>
                ))}
            </div>
            <div>
                <Button variant="primary" onClick={(e) => handleCreate(e)}>
                    Guardar
                </Button>
            </div>
        </div>
    );
    
}

export { FormAlumnos };
