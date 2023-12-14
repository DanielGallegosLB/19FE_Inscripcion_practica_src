import React, { useState, useEffect, Fragment } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { API } from "./../apiSelection";
import { useAuth } from "../hooks/useAuth";
import { NavbarPortalAlumno } from "./NavbarPortalAlumno";

function FormAlumnos() {
    const auth = useAuth();
    const [rut, setRut] = useState("");
    const [datosAlumno, setDatosAlumno] = useState({
        NOMBRES: "",
        APELLIDO_PATERNO: "",
        APELLIDO_MATERNO: "",
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

    const [datosEmpresaSupervisor, setDatosEmpresaSupervisor] = useState({
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

    useEffect(() => {
        setRut(auth.rut || localStorage.getItem("rut"));
    }, []);


    const handleCreate = async (e) => {
        e.preventDefault();

        const formData = {
            NOMBRES: datosAlumno.NOMBRES,
            APELLIDO_PATERNO: datosAlumno.APELLIDO_PATERNO,
            APELLIDO_MATERNO: datosAlumno.APELLIDO_MATERNO,
            FECHA_DE_NACIMIENTO: datosAlumno.FECHA_NACIMIENTO,
            TELÉFONO: datosAlumno.TELÉFONO,
            CORREO: datosAlumno.CORREO,
            FACULTAD: datosAlumno.FACULTAD,
            ESCUELA: datosAlumno.ESCUELA,
            CARRERA: datosAlumno.CARRERA,
            REGÍMEN: datosAlumno.REGÍMEN,
            SEDE: datosAlumno.SEDE,
            ...datosProfesor,
            ...datosEmpresaSupervisor,
            formalumnos: {
                profesor: {
                    NOMBRES: datosProfesor.NOMBRES,
                    APELLIDO_PATERNO: datosProfesor.APELLIDO_PATERNO,
                    APELLIDO_MATERNO: datosProfesor.APELLIDO_MATERNO,
                    TELÉFONO: datosProfesor.TELÉFONO,
                    CORREO: datosProfesor.CORREO,
                    FACULTAD: datosProfesor.FACULTAD,
                    ESCUELA: datosProfesor.ESCUELA,
                    CARRERA: datosProfesor.CARRERA,
                },
                empresaSupervisor: {
                    NOMBRE: datosEmpresaSupervisor.NOMBRE,
                    GIRO: datosEmpresaSupervisor.GIRO,
                    DIRECCIÓN: datosEmpresaSupervisor.DIRECCIÓN,
                    TELÉFONO: datosEmpresaSupervisor.TELÉFONO,
                    PAGINA_WEB: datosEmpresaSupervisor.PAGINA_WEB,
                    NUM_COLABORADORES: datosEmpresaSupervisor.NUM_COLABORADORES,
                    AREA_DE_PRACTICA: datosEmpresaSupervisor.AREA_DE_PRACTICA,
                    NOMBRE_SUPERVISOR: datosEmpresaSupervisor.NOMBRE_SUPERVISOR,
                    CARGO_SUPERVISOR: datosEmpresaSupervisor.CARGO_SUPERVISOR,
                    CORREO_SUPERVISOR: datosEmpresaSupervisor.CORREO_SUPERVISOR,
                    TELEFONO_SUPERVISOR: datosEmpresaSupervisor.TELEFONO_SUPERVISOR,
                    FECHA_INICIO: datosEmpresaSupervisor.FECHA_INICIO,
                    FECHA_TERMINO: datosEmpresaSupervisor.FECHA_TERMINO,
                },
            },
        };

      


        try {
            const res = await fetch(API + `/usuarios/subirFormulario/${rut}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.status === 200) {
                alert("Formulario subido correctamente");
                // Puedes redirigir a donde necesites después de subir el formulario
            } else {
                alert("Error al subir el formulario");
                console.log(res);
            }
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <Fragment>
            <NavbarPortalAlumno />
        
            <div className="container">
            <h4>Datos Alumno</h4>
            <div className="row">
                {Object.entries(datosAlumno).map(([campo, valor]) => (
                    <div key={campo} className="col-6 col-md-4 col-lg-3 col-xl-2">
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
                        <Form.Group className="mb-3">
                            <Form.Label>{campo}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder={`Ingrese ${campo}`}
                                value={valor}
                                onChange={(e) => setDatosEmpresaSupervisor({ ...datosEmpresaSupervisor, [campo]: e.target.value })}
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
            
        
        </Fragment>
    );
}

export { FormAlumnos };
